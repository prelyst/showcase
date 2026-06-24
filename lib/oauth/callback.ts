import { ConnectedAccountStatus, Platform } from '@prisma/client';

import { createNotification } from '@/lib/repositories/notification-repository';
import { upsertOAuthConnectedAccount } from '@/lib/repositories/connected-account-repository';
import { decodeOAuthState } from '@/lib/oauth/state';
import { getOAuthProviderByPlatform, getOAuthProviderEnv, isOAuthProviderConfigured } from '@/lib/oauth/providers';
import { exchangeAuthorizationCode } from '@/lib/oauth/token-client';
import { fetchFacebookIdentity } from '@/lib/publish/adapters/facebook';
import { exchangeInstagramLongLivedToken, fetchInstagramIdentity } from '@/lib/publish/adapters/instagram';
import { fetchLinkedInIdentity } from '@/lib/publish/adapters/linkedin';
import { fetchThreadsIdentity } from '@/lib/publish/adapters/threads';
import { fetchXIdentity } from '@/lib/publish/adapters/x';
import { fetchYouTubeIdentity } from '@/lib/publish/adapters/youtube';

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

  // Tokens may be upgraded (e.g. Instagram short-lived -> long-lived) below.
  let accessToken = tokens.accessToken;
  let tokenExpiresAt = tokens.tokenExpiresAt;

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
  } else if (provider.platform === Platform.THREADS) {
    const identity = await fetchThreadsIdentity(tokens.accessToken);
    if (identity) {
      accountHandle = `@${identity.username}`;
      accountName = identity.username;
      externalId = identity.id; // Threads user id → used in publish calls
    }
  } else if (provider.platform === Platform.FACEBOOK) {
    const identity = await fetchFacebookIdentity(tokens.accessToken);
    if (identity) {
      accountHandle = identity.name;
      accountName = identity.name;
      externalId = identity.id; // Page id → publish target for /{pageId}/feed
    }
  } else if (provider.platform === Platform.INSTAGRAM) {
    // Upgrade the short-lived login token to a long-lived (~60 day) one.
    const { clientSecret } = getOAuthProviderEnv(provider);
    if (clientSecret) {
      const longLived = await exchangeInstagramLongLivedToken(accessToken, clientSecret);
      if (longLived) {
        accessToken = longLived.accessToken;
        tokenExpiresAt = longLived.expiresInSeconds ? new Date(Date.now() + longLived.expiresInSeconds * 1000) : tokenExpiresAt;
      }
    }
    const identity = await fetchInstagramIdentity(accessToken);
    if (identity) {
      accountHandle = `@${identity.username}`;
      accountName = identity.username;
      externalId = identity.id; // IG user id → publish target for /{ig-user-id}/media
    }
  } else if (provider.platform === Platform.YOUTUBE) {
    const identity = await fetchYouTubeIdentity(tokens.accessToken);
    if (identity) {
      accountHandle = identity.title;
      accountName = identity.title;
      externalId = identity.id; // YouTube channel id
    }
  }

  await upsertOAuthConnectedAccount({
    userId: decodedState.userId,
    platform: provider.platform,
    accountHandle,
    accountName,
    externalId,
    status: ConnectedAccountStatus.ACTIVE,
    accessToken,
    refreshToken: tokens.refreshToken,
    tokenExpiresAt,
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
