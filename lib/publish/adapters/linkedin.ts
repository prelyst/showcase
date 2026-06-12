const LINKEDIN_API = 'https://api.linkedin.com';

export type LinkedInIdentity = { sub: string; name: string };

/** OpenID Connect userinfo → the member id (`sub`) used to build the author URN. */
export async function fetchLinkedInIdentity(accessToken: string): Promise<LinkedInIdentity | null> {
  const response = await fetch(`${LINKEDIN_API}/v2/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (!response.ok) return null;

  const json = (await response.json().catch(() => null)) as { sub?: string; name?: string } | null;
  if (!json?.sub) return null;

  return { sub: json.sub, name: json.name || 'LinkedIn member' };
}

export type LinkedInPostResult = { id: string; url: string };

/**
 * Publishes a text share via the ugcPosts API (w_member_social scope).
 * `memberId` is the OpenID `sub`; the author URN is urn:li:person:{memberId}.
 */
export async function postToLinkedIn(accessToken: string, text: string, memberId: string): Promise<LinkedInPostResult> {
  const response = await fetch(`${LINKEDIN_API}/v2/ugcPosts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: `urn:li:person:${memberId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
    }),
    cache: 'no-store',
  });

  if (response.status === 401) {
    const err = new Error('LinkedIn access token is invalid or expired.');
    (err as Error & { code?: string }).code = 'unauthorized';
    throw err;
  }

  const json = (await response.json().catch(() => ({}))) as { id?: string; message?: string };

  // The share URN comes back in the body `id` (or the x-restli-id header).
  const urn = json.id || response.headers.get('x-restli-id');

  if (!response.ok || !urn) {
    throw new Error(json.message || `LinkedIn publish failed (${response.status})`);
  }

  return { id: urn, url: `https://www.linkedin.com/feed/update/${urn}/` };
}
