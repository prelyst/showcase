import { getCurrentUserId } from '@/lib/server/auth';
import { createPkcePair, encodeOAuthState } from '@/lib/oauth/state';
import { getOAuthCallbackUrl, getOAuthProviderByPlatform, getOAuthProviderEnv, isOAuthProviderConfigured } from '@/lib/oauth/providers';

export async function buildOAuthAuthorizationUrl(platform: string) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return { error: 'not-authenticated' as const };
  }

  const provider = getOAuthProviderByPlatform(platform);

  if (!provider) {
    return { error: 'provider-unsupported' as const };
  }

  if (!isOAuthProviderConfigured(provider)) {
    return { error: 'provider-not-configured' as const, provider };
  }

  const { clientId } = getOAuthProviderEnv(provider);
  const redirectUri = getOAuthCallbackUrl(provider.key);
  const pkce = provider.usesPkce ? createPkcePair() : null;
  const state = encodeOAuthState({
    userId,
    platform: provider.platform,
    redirectTo: '/showcase/settings',
    codeVerifier: pkce?.codeVerifier,
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    state,
    scope: provider.scope.join(' '),
    ...(provider.usesPkce ? { code_challenge: pkce!.codeChallenge, code_challenge_method: 'S256' } : {}),
    ...(provider.authorizeParams ?? {}),
  });

  return {
    error: null,
    provider,
    redirectUrl: `${provider.authUrl}?${params.toString()}`,
  };
}
