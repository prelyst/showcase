import { NextRequest, NextResponse } from 'next/server';

import { buildOAuthAuthorizationUrl } from '@/lib/oauth/start';

export async function GET(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const { provider } = await context.params;
  const result = await buildOAuthAuthorizationUrl(provider);

  if (result.error === 'not-authenticated') {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  if (result.error) {
    return NextResponse.redirect(new URL(`/showcase/settings?oauth=${result.error}`, request.url));
  }

  return NextResponse.redirect(result.redirectUrl);
}
