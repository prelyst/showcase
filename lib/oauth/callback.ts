import { ConnectedAccountStatus, Platform } from '@prisma/client';

import { createNotification } from '@/lib/repositories/notification-repository';
import { upsertOAuthConnectedAccount } from '@/lib/repositories/connected-account-repository';
import { decodeOAuthState } from '@/lib/oauth/state';
import { getOAuthProviderByPlatform, isOAuthProviderConfigured } from '@/lib/oauth/providers';
import { exchangeAuthorizationCode } from '@/lib/oauth/token-client';
import { fetchLinkedInIdentity } from '@/lib/publish/adapters/linkedin';
import { fetchXIdentity } from '@/lib/publish/adapters/x';

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

  let tokens;
  try {
    tokens = await exchangeAuthorizationCode(provider, input.code, decodedState.codeVerifier);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Token exchange failed.';

    await upsertOAuthConnectedAccount({
      userId: decodedState.userId,
      platform: provider.platform,
      accountHandle: 'Connection failed',
      accountName: provider.label,
      status: ConnectedAccountStatus.ERROR,
      errorMessage: message,
      accessToken: null,
      refreshToken: null,
      tokenExpiresAt: null,
    });

    return { redirectTo: `/showcase/settings?oauth=${encodeURIComponent('token-exchange-failed')}` };
  }

  // Resolve the real account handle/id where we have an adapter for it.
  let accountHandle = `@${provider.key}`;
  let accountName: string | null = provider.label;
  let externalId: string | null = null;

  if (provider.platform === Platform.X) {
    const identity = await fetchXIdentity(tokens.accessToken);
    if (identity) {
      accountHandle = `@${identity.username}`;
      accountName = identity.name;
      externalId = identity.id;
    }
  } else if (provider.platform === Platform.LINKEDIN) {
    const identity = await fetchLinkedInIdentity(tokens.accessToken);
    if (identity) {
      accountHandle = identity.name;
      accountName = identity.name;
      externalId = identity.sub; // member id → urn:li:person:{sub}
    }
  }

  await upsertOAuthConnectedAccount({
    userId: decodedState.userId,
    platform: provider.platform,
    accountHandle,
    accountName,
    externalId,
    status: ConnectedAccountStatus.ACTIVE,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    tokenExpiresAt: tokens.tokenExpiresAt,
    scopes: tokens.scopes,
    errorMessage: null,
  });

  await createNotification({
    userId: decodedState.userId,
    type: 'account_connected',
    actorName: 'Showcase',
    actorHandle: '@showcase',
    message: `${provider.label} connected`,
    metadata: {
      detail: `${accountHandle} is connected and ready for publishing.`,
    },
  });

  return { redirectTo: '/showcase/settings?connected=1' };
}
