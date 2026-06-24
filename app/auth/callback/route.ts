import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/showcase/feed';

  if (!code) {
    return NextResponse.redirect(new URL('/auth/sign-in?error=missing-auth-code', url.origin));
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.redirect(new URL('/auth/sign-in?error=supabase-not-configured', url.origin));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL(`/auth/sign-in?error=${encodeURIComponent(error.message)}`, url.origin));
  }

  return NextResponse.redirect(new URL(next.startsWith('/') ? next : '/showcase/feed', url.origin));
}
