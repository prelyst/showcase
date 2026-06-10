'use server';

import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signInSchema, signUpSchema } from '@/lib/validators/auth';

export async function signInAction(formData: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    const errorMsg = result.error.issues.map((e) => e.message).join(', ');
    redirect(`/auth/sign-in?error=${encodeURIComponent(errorMsg)}`);
  }

  const { email, password } = result.data;

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
  const result = signUpSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    const errorMsg = result.error.issues.map((e) => e.message).join(', ');
    redirect(`/auth/sign-up?error=${encodeURIComponent(errorMsg)}`);
  }

  const { email, password, fullName, username } = result.data;

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
