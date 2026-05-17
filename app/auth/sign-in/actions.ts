'use server';

import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function signInAction(formData: FormData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!email) {
    redirect('/auth/sign-in?error=missing-email');
  }

  if (!password) {
    redirect('/auth/sign-in?error=missing-password');
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect('/auth/sign-in?error=supabase-not-configured');
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/showcase/feed');
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect('/auth/sign-in?signed_out=1');
}
