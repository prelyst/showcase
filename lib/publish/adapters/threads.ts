const THREADS_API = 'https://graph.threads.net/v1.0';

export type ThreadsIdentity = { id: string; username: string };

/** Looks up the authenticated Threads user's id + username for display. */
export async function fetchThreadsIdentity(accessToken: string): Promise<ThreadsIdentity | null> {
  const response = await fetch(`${THREADS_API}/me?fields=id,username&access_token=${encodeURIComponent(accessToken)}`, {
    cache: 'no-store',
  });

  if (!response.ok) return null;

  const json = (await response.json().catch(() => null)) as { id?: string; username?: string } | null;
  if (!json?.id) return null;

  return { id: json.id, username: json.username || 'threads' };
}

type ThreadsError = { error?: { message?: string; type?: string; code?: number } };

function errorMessage(json: ThreadsError, status: number, fallback: string): string {
  return json.error?.message || `${fallback} (${status})`;
}

export type ThreadsPostResult = { id: string; url: string };

/**
 * Publishes a text post to Threads. This is a two-step flow:
 *   1. create a media container (media_type=TEXT)
 *   2. publish that container
 * `userId` is the Threads user id (stored as the account's externalId).
 */
export async function postToThreads(accessToken: string, text: string, userId: string): Promise<ThreadsPostResult> {
  // Step 1 — create the text container.
  const createResponse = await fetch(`${THREADS_API}/${userId}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ media_type: 'TEXT', text, access_token: accessToken }),
    cache: 'no-store',
  });

  const createJson = (await createResponse.json().catch(() => ({}))) as ThreadsError & { id?: string };

  if (createResponse.status === 401) {
    const err = new Error('Threads access token is invalid or expired.');
    (err as Error & { code?: string }).code = 'unauthorized';
    throw err;
  }

  if (!createResponse.ok || !createJson.id) {
    throw new Error(errorMessage(createJson, createResponse.status, 'Threads container creation failed'));
  }

  // Step 2 — publish the container.
  const publishResponse = await fetch(`${THREADS_API}/${userId}/threads_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ creation_id: createJson.id, access_token: accessToken }),
    cache: 'no-store',
  });

  const publishJson = (await publishResponse.json().catch(() => ({}))) as ThreadsError & { id?: string };

  if (!publishResponse.ok || !publishJson.id) {
    throw new Error(errorMessage(publishJson, publishResponse.status, 'Threads publish failed'));
  }

  const mediaId = publishJson.id;

  // Best-effort: fetch the permalink for a real post URL.
  let url = `https://www.threads.net/`;
  try {
    const permalinkResponse = await fetch(
      `${THREADS_API}/${mediaId}?fields=permalink&access_token=${encodeURIComponent(accessToken)}`,
      { cache: 'no-store' },
    );
    if (permalinkResponse.ok) {
      const permalinkJson = (await permalinkResponse.json().catch(() => ({}))) as { permalink?: string };
      if (permalinkJson.permalink) url = permalinkJson.permalink;
    }
  } catch {
    // Non-fatal — the post succeeded even if the permalink lookup didn't.
  }

  return { id: mediaId, url };
}
