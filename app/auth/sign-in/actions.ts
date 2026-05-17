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

export async function signUpAction(formData: FormData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const fullName = String(formData.get('fullName') || '').trim();
  const username = String(formData.get('username') || '').trim();

  if (!fullName) {
    redirect('/auth/sign-up?error=missing-name');
  }

  if (!username) {
    redirect('/auth/sign-up?error=missing-username');
  }

  if (!email) {
    redirect('/auth/sign-up?error=missing-email');
  }

  if (!password) {
    redirect('/auth/sign-up?error=missing-password');
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect('/auth/sign-up?error=supabase-not-configured');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name: fullName,
      },
    },
  });

  if (error) {
    redirect(`/auth/sign-up?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/auth/sign-in?signed_up=1');
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect('/auth/sign-in?signed_out=1');
}
