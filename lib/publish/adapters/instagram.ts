const IG_GRAPH = 'https://graph.instagram.com';

type GraphError = { error?: { message?: string; type?: string; code?: number } };

function enc(value: string) {
  return encodeURIComponent(value);
}

/**
 * Exchanges a short-lived Instagram token (returned by the login flow) for a
 * long-lived (~60 day) token. Returns null on failure so the caller can fall
 * back to the short-lived token.
 */
export async function exchangeInstagramLongLivedToken(
  shortLivedToken: string,
  clientSecret: string,
): Promise<{ accessToken: string; expiresInSeconds: number } | null> {
  const url = `${IG_GRAPH}/access_token?grant_type=ig_exchange_token&client_secret=${enc(clientSecret)}&access_token=${enc(shortLivedToken)}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) return null;

  const json = (await response.json().catch(() => null)) as { access_token?: string; expires_in?: number } | null;
  if (!json?.access_token) return null;

  return { accessToken: json.access_token, expiresInSeconds: json.expires_in ?? 0 };
}

export type InstagramIdentity = { id: string; username: string };

/** Looks up the Instagram user id + username (id is the publish target). */
export async function fetchInstagramIdentity(accessToken: string): Promise<InstagramIdentity | null> {
  const response = await fetch(`${IG_GRAPH}/me?fields=user_id,username&access_token=${enc(accessToken)}`, {
    cache: 'no-store',
  });
  if (!response.ok) return null;

  const json = (await response.json().catch(() => null)) as { user_id?: string | number; id?: string; username?: string } | null;
  const id = json?.user_id ?? json?.id;
  if (!id) return null;

  return { id: String(id), username: json?.username || 'instagram' };
}

export type InstagramPostResult = { id: string; url: string };

/**
 * Publishes an image post to Instagram. Two-step flow:
 *   1. create a media container (image_url + caption)
 *   2. publish that container
 * Instagram cannot post text-only, so `imageUrl` is required.
 */
export async function postToInstagram(
  accessToken: string,
  caption: string,
  igUserId: string,
  imageUrl: string,
): Promise<InstagramPostResult> {
  // Step 1 — create the image container.
  const createResponse = await fetch(`${IG_GRAPH}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ image_url: imageUrl, caption, access_token: accessToken }),
    cache: 'no-store',
  });

  const createJson = (await createResponse.json().catch(() => ({}))) as GraphError & { id?: string };

  if (createResponse.status === 401) {
    const err = new Error('Instagram access token is invalid or expired.');
    (err as Error & { code?: string }).code = 'unauthorized';
    throw err;
  }

  if (!createResponse.ok || !createJson.id) {
    throw new Error(createJson.error?.message || `Instagram container creation failed (${createResponse.status})`);
  }

  // Step 2 — publish the container.
  const publishResponse = await fetch(`${IG_GRAPH}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ creation_id: createJson.id, access_token: accessToken }),
    cache: 'no-store',
  });

  const publishJson = (await publishResponse.json().catch(() => ({}))) as GraphError & { id?: string };

  if (!publishResponse.ok || !publishJson.id) {
    throw new Error(publishJson.error?.message || `Instagram publish failed (${publishResponse.status})`);
  }

  const mediaId = publishJson.id;

  // Best-effort permalink for a real post URL.
  let url = 'https://www.instagram.com/';
  try {
    const permalinkResponse = await fetch(`${IG_GRAPH}/${mediaId}?fields=permalink&access_token=${enc(accessToken)}`, {
      cache: 'no-store',
    });
    if (permalinkResponse.ok) {
      const permalinkJson = (await permalinkResponse.json().catch(() => ({}))) as { permalink?: string };
      if (permalinkJson.permalink) url = permalinkJson.permalink;
    }
  } catch {
    // Non-fatal — the post succeeded even if the permalink lookup didn't.
  }

  return { id: mediaId, url };
}
