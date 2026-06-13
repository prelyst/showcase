import { Platform } from '@prisma/client';

export type OAuthProviderConfig = {
  platform: Platform;
  key: Lowercase<Exclude<Platform, 'SHOWCASE'>>;
  label: string;
  authUrl: string;
  tokenUrl: string;
  scope: string[];
  usesPkce?: boolean;
  clientIdEnv: string;
  clientSecretEnv?: string;
  authorizeParams?: Record<string, string>;
  // How client credentials are sent to the token endpoint. X accepts HTTP
  // Basic ('basic', the default); LinkedIn requires them in the form body.
  tokenAuthStyle?: 'basic' | 'body';
};

export const oauthProviders: Record<string, OAuthProviderConfig> = {
  x: {
    platform: Platform.X,
    key: 'x',
    label: 'X',
    authUrl: 'https://x.com/i/oauth2/authorize',
    tokenUrl: 'https://api.x.com/2/oauth2/token',
    scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    usesPkce: true,
    clientIdEnv: 'OAUTH_X_CLIENT_ID',
    clientSecretEnv: 'OAUTH_X_CLIENT_SECRET',
  },
  facebook: {
    platform: Platform.FACEBOOK,
    key: 'facebook',
    label: 'Facebook',
    authUrl: 'https://www.facebook.com/v21.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v21.0/oauth/access_token',
    scope: ['public_profile', 'pages_show_list', 'pages_manage_posts', 'pages_read_engagement'],
    clientIdEnv: 'OAUTH_FACEBOOK_CLIENT_ID',
    clientSecretEnv: 'OAUTH_FACEBOOK_CLIENT_SECRET',
    // Meta token endpoint expects the secret in the body.
    tokenAuthStyle: 'body',
  },
  instagram: {
    platform: Platform.INSTAGRAM,
    key: 'instagram',
    label: 'Instagram',
    authUrl: 'https://www.instagram.com/oauth/authorize',
    tokenUrl: 'https://api.instagram.com/oauth/access_token',
    scope: ['instagram_business_basic', 'instagram_business_content_publish'],
    clientIdEnv: 'OAUTH_INSTAGRAM_CLIENT_ID',
    clientSecretEnv: 'OAUTH_INSTAGRAM_CLIENT_SECRET',
    tokenAuthStyle: 'body',
  },
  youtube: {
    platform: Platform.YOUTUBE,
    key: 'youtube',
    label: 'YouTube',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/youtube.upload'],
    clientIdEnv: 'OAUTH_YOUTUBE_CLIENT_ID',
    clientSecretEnv: 'OAUTH_YOUTUBE_CLIENT_SECRET',
    authorizeParams: { access_type: 'offline', prompt: 'consent' },
  },
  threads: {
    platform: Platform.THREADS,
    key: 'threads',
    label: 'Threads',
    authUrl: 'https://threads.net/oauth/authorize',
    tokenUrl: 'https://graph.threads.net/oauth/access_token',
    scope: ['threads_basic', 'threads_content_publish'],
    clientIdEnv: 'OAUTH_THREADS_CLIENT_ID',
    clientSecretEnv: 'OAUTH_THREADS_CLIENT_SECRET',
    // Threads (Meta) expects client_secret in the form body, like LinkedIn.
    tokenAuthStyle: 'body',
  },
};

export function getOAuthProviderByPlatform(platform: Platform | string) {
  const key = String(platform).toLowerCase();
  return oauthProviders[key] ?? null;
}

export function getOAuthProviderEnv(provider: OAuthProviderConfig) {
  return {
    clientId: process.env[provider.clientIdEnv] || '',
    clientSecret: provider.clientSecretEnv ? process.env[provider.clientSecretEnv] || '' : '',
  };
}

export function isOAuthProviderConfigured(provider: OAuthProviderConfig) {
  const { clientId, clientSecret } = getOAuthProviderEnv(provider);
  return Boolean(clientId && (!provider.clientSecretEnv || clientSecret));
}

export function getOAuthCallbackUrl(providerKey: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}/auth/oauth/${providerKey}/callback`;
}
