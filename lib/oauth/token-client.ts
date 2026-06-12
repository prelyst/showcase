import { getOAuthCallbackUrl, getOAuthProviderEnv, type OAuthProviderConfig } from '@/lib/oauth/providers';

export type OAuthTokenSet = {
  accessToken: string;
  refreshToken: string | null;
  tokenExpiresAt: Date | null;
  scopes: string[];
};

type RawTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  error?: string;
  error_description?: string;
};

function buildAuthHeaders(provider: OAuthProviderConfig) {
  const { clientId, clientSecret } = getOAuthProviderEnv(provider);
  const headers: Record<string, string> = { 'Content-Type': 'application/x-www-form-urlencoded' };

  // Confidential clients (those with a secret) authenticate via HTTP Basic.
  if (clientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  }

  return headers;
}

function normalize(provider: OAuthProviderConfig, raw: RawTokenResponse): OAuthTokenSet {
  if (!raw.access_token) {
    throw new Error(raw.error_description || raw.error || `${provider.label}: token endpoint returned no access_token`);
  }

  return {
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token ?? null,
    tokenExpiresAt: raw.expires_in ? new Date(Date.now() + raw.expires_in * 1000) : null,
    scopes: raw.scope ? raw.scope.split(/[\s,]+/).filter(Boolean) : provider.scope,
  };
}

async function postToken(provider: OAuthProviderConfig, body: URLSearchParams): Promise<RawTokenResponse> {
  const response = await fetch(provider.tokenUrl, {
    method: 'POST',
    headers: buildAuthHeaders(provider),
    body,
    cache: 'no-store',
  });

  const raw = (await response.json().catch(() => ({}))) as RawTokenResponse;

  if (!response.ok) {
    throw new Error(raw.error_description || raw.error || `${provider.label}: token request failed (${response.status})`);
  }

  return raw;
}

/** Exchanges an authorization code for an access/refresh token set. */
export async function exchangeAuthorizationCode(
  provider: OAuthProviderConfig,
  code: string,
  codeVerifier?: string,
): Promise<OAuthTokenSet> {
  const { clientId } = getOAuthProviderEnv(provider);
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: getOAuthCallbackUrl(provider.key),
    client_id: clientId,
  });

  if (provider.usesPkce && codeVerifier) {
    body.set('code_verifier', codeVerifier);
  }

  return normalize(provider, await postToken(provider, body));
}

/** Exchanges a refresh token for a fresh access token. */
export async function refreshOAuthToken(provider: OAuthProviderConfig, refreshToken: string): Promise<OAuthTokenSet> {
  const { clientId } = getOAuthProviderEnv(provider);
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
  });

  const tokens = normalize(provider, await postToken(provider, body));
  // Some providers omit refresh_token on refresh — keep the existing one.
  return { ...tokens, refreshToken: tokens.refreshToken ?? refreshToken };
}
