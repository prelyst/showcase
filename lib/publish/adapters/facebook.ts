const GRAPH = 'https://graph.facebook.com/v21.0';

type GraphError = { error?: { message?: string; type?: string; code?: number } };

function enc(token: string) {
  return encodeURIComponent(token);
}

export type FacebookIdentity = { id: string; name: string; isPage: boolean };

/**
 * Resolves the account we publish as. We publish to a Page, so prefer the
 * first managed Page; fall back to the user identity for display only.
 */
export async function fetchFacebookIdentity(accessToken: string): Promise<FacebookIdentity | null> {
  const pagesResponse = await fetch(`${GRAPH}/me/accounts?fields=id,name&access_token=${enc(accessToken)}`, {
    cache: 'no-store',
  });

  if (pagesResponse.ok) {
    const json = (await pagesResponse.json().catch(() => null)) as { data?: { id: string; name?: string }[] } | null;
    const page = json?.data?.[0];
    if (page?.id) return { id: page.id, name: page.name || 'Facebook Page', isPage: true };
  }

  const meResponse = await fetch(`${GRAPH}/me?fields=id,name&access_token=${enc(accessToken)}`, { cache: 'no-store' });
  if (!meResponse.ok) return null;

  const me = (await meResponse.json().catch(() => null)) as { id?: string; name?: string } | null;
  if (!me?.id) return null;

  return { id: me.id, name: me.name || 'Facebook', isPage: false };
}

/** Looks up the Page access token for `pageId` from the user's managed Pages. */
async function getPageAccessToken(userAccessToken: string, pageId: string): Promise<string> {
  const response = await fetch(`${GRAPH}/me/accounts?fields=id,access_token&access_token=${enc(userAccessToken)}`, {
    cache: 'no-store',
  });

  const json = (await response.json().catch(() => ({}))) as GraphError & {
    data?: { id: string; access_token: string }[];
  };

  if (response.status === 401) {
    const err = new Error('Facebook access token is invalid or expired.');
    (err as Error & { code?: string }).code = 'unauthorized';
    throw err;
  }

  if (!response.ok) {
    throw new Error(json.error?.message || `Could not load Facebook Pages (${response.status})`);
  }

  const page = json.data?.find((p) => p.id === pageId) || json.data?.[0];
  if (!page?.access_token) {
    throw new Error('No manageable Facebook Page found — make sure you granted Page access during connect.');
  }

  return page.access_token;
}

export type FacebookPostResult = { id: string; url: string };

/**
 * Publishes a text post to the Facebook Page identified by `pageId`.
 * `userAccessToken` is the stored user token; we exchange it for the
 * Page token, then post to /{pageId}/feed.
 */
export async function postToFacebook(userAccessToken: string, text: string, pageId: string): Promise<FacebookPostResult> {
  const pageToken = await getPageAccessToken(userAccessToken, pageId);

  const response = await fetch(`${GRAPH}/${pageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ message: text, access_token: pageToken }),
    cache: 'no-store',
  });

  const json = (await response.json().catch(() => ({}))) as GraphError & { id?: string };

  if (!response.ok || !json.id) {
    throw new Error(json.error?.message || `Facebook publish failed (${response.status})`);
  }

  // The id is "{pageId}_{postId}"; the post is reachable at facebook.com/{id}.
  return { id: json.id, url: `https://www.facebook.com/${json.id}` };
}
