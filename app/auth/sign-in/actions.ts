'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { authCookieName } from '@/lib/server/auth';

export async function signInAction(formData: FormData) {
  const email = String(formData.get('email') || '').trim();

  if (!email) {
    redirect('/auth/sign-in?error=missing-email');
  }

  const cookieStore = await cookies();
  cookieStore.set(authCookieName, 'demo', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect('/showcase/feed');
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(authCookieName);
  redirect('/auth/sign-in?signed_out=1');
}
