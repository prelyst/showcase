const X_API = 'https://api.x.com/2';

export type XIdentity = { id: string; username: string; name: string };

/** Looks up the authenticated user's X identity (handle, id) for display. */
export async function fetchXIdentity(accessToken: string): Promise<XIdentity | null> {
  const response = await fetch(`${X_API}/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (!response.ok) return null;

  const json = (await response.json().catch(() => null)) as { data?: XIdentity } | null;
  return json?.data ?? null;
}

export type XPostResult = { id: string; url: string };

/**
 * Publishes a tweet on behalf of the user that owns `accessToken`.
 * Throws on failure; the executor turns that into a failed lane.
 */
export async function postToX(accessToken: string, text: string, username?: string | null): Promise<XPostResult> {
  const response = await fetch(`${X_API}/tweets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
    cache: 'no-store',
  });

  const json = (await response.json().catch(() => ({}))) as {
    data?: { id: string };
    detail?: string;
    title?: string;
    status?: number;
    errors?: { message?: string }[];
  };

  if (response.status === 401) {
    const err = new Error('X access token is invalid or expired.');
    (err as Error & { code?: string }).code = 'unauthorized';
    throw err;
  }

  if (!response.ok || !json.data?.id) {
    const message = json.detail || json.errors?.[0]?.message || json.title || `X publish failed (${response.status})`;
    throw new Error(message);
  }

  const handle = username?.replace(/^@/, '') || 'i/web';
  return { id: json.data.id, url: `https://x.com/${handle}/status/${json.data.id}` };
}
