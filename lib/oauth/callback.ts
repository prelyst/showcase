import { ConnectedAccountStatus } from '@prisma/client';

import { createNotification } from '@/lib/repositories/notification-repository';
import { upsertOAuthConnectedAccount } from '@/lib/repositories/connected-account-repository';
import { decodeOAuthState } from '@/lib/oauth/state';
import { getOAuthProviderByPlatform, getOAuthProviderEnv, isOAuthProviderConfigured } from '@/lib/oauth/providers';

function buildPlaceholderTokens(platform: string, code: string) {
  const suffix = code.slice(-8) || 'pending';
  return {
    accessToken: `oauth_stub_${platform.toLowerCase()}_${suffix}`,
    refreshToken: `refresh_stub_${platform.toLowerCase()}_${suffix}`,
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60),
  };
}

export async function handleOAuthCallback(input: {
  platform: string;
  code: string | null;
  state: string | null;
  error: string | null;
  errorDescription: string | null;
}) {
  const decodedState = input.state ? decodeOAuthState(input.state) : null;

  if (!decodedState) {
    return { redirectTo: '/showcase/settings?oauth=invalid-state' };
  }

  const provider = getOAuthProviderByPlatform(input.platform);

  if (!provider) {
    return { redirectTo: '/showcase/settings?oauth=unsupported-provider' };
  }

  if (input.error) {
    await upsertOAuthConnectedAccount({
      userId: decodedState.userId,
      platform: provider.platform,
      accountHandle: 'Connection failed',
      accountName: provider.label,
      status: ConnectedAccountStatus.ERROR,
      errorMessage: input.errorDescription || input.error,
      accessToken: null,
      refreshToken: null,
      tokenExpiresAt: null,
    });

    await createNotification({
      userId: decodedState.userId,
      type: 'account_error',
      actorName: 'Showcase',
      actorHandle: '@showcase',
      message: `${provider.label} connection failed`,
      metadata: {
        detail: input.errorDescription || 'The provider rejected the connection request.',
      },
    });

    return { redirectTo: `/showcase/settings?oauth=${encodeURIComponent(input.error)}` };
  }

  if (!input.code) {
    return { redirectTo: '/showcase/settings?oauth=missing-code' };
  }

  if (!isOAuthProviderConfigured(provider)) {
    return { redirectTo: '/showcase/settings?oauth=provider-not-configured' };
  }

  const env = getOAuthProviderEnv(provider);
  void env;

  const tokens = buildPlaceholderTokens(provider.platform, input.code);

  await upsertOAuthConnectedAccount({
    userId: decodedState.userId,
    platform: provider.platform,
    accountHandle: `@${provider.key}-${decodedState.userId.slice(0, 6)}`,
    accountName: provider.label,
    status: ConnectedAccountStatus.ACTIVE,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    tokenExpiresAt: tokens.tokenExpiresAt,
    errorMessage: null,
  });

  await createNotification({
    userId: decodedState.userId,
    type: 'account_connected',
    actorName: 'Showcase',
    actorHandle: '@showcase',
    message: `${provider.label} connected`,
    metadata: {
      detail: `${provider.label} is now ready for authenticated publishing once live API delivery is enabled.`,
      oauth: 'scaffolded',
    },
  });

  return { redirectTo: '/showcase/settings?connected=1' };
}
