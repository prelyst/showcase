import { NextRequest, NextResponse } from 'next/server';

import { handleOAuthCallback } from '@/lib/oauth/callback';

export async function GET(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const { provider } = await context.params;
  const searchParams = request.nextUrl.searchParams;

  const result = await handleOAuthCallback({
    platform: provider,
    code: searchParams.get('code'),
    state: searchParams.get('state'),
    error: searchParams.get('error'),
    errorDescription: searchParams.get('error_description'),
  });

  return NextResponse.redirect(new URL(result.redirectTo, request.url));
}
