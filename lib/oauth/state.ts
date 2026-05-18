import crypto from 'node:crypto';

const STATE_TTL_MS = 1000 * 60 * 15;

export type OAuthStatePayload = {
  userId: string;
  platform: string;
  redirectTo: string;
  codeVerifier?: string;
  createdAt: number;
};

function getSecret() {
  return process.env.SHOWCASE_OAUTH_STATE_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'showcase-dev-secret';
}

export function createPkcePair() {
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');

  return { codeVerifier, codeChallenge };
}

export function encodeOAuthState(payload: Omit<OAuthStatePayload, 'createdAt'> & { createdAt?: number }) {
  const fullPayload: OAuthStatePayload = {
    ...payload,
    createdAt: payload.createdAt ?? Date.now(),
  };

  const data = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto.createHmac('sha256', getSecret()).update(data).digest('base64url');

  return `${data}.${signature}`;
}

export function decodeOAuthState(value: string): OAuthStatePayload | null {
  const [data, signature] = value.split('.');

  if (!data || !signature) {
    return null;
  }

  const expected = crypto.createHmac('sha256', getSecret()).update(data).digest('base64url');

  if (signature !== expected) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8')) as OAuthStatePayload;

    if (!payload.userId || !payload.platform || !payload.redirectTo) {
      return null;
    }

    if (Date.now() - payload.createdAt > STATE_TTL_MS) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
