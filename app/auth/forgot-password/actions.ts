'use server';

import { redirect } from 'next/navigation';

import { limitAuthAttempt } from '@/lib/server/rate-limit';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { forgotPasswordSchema, resetPasswordSchema } from '@/lib/validators/auth';

const TOO_MANY = (path: string, retry: number) =>
  `${path}?error=${encodeURIComponent(`Too many attempts. Try again in ${retry}s.`)}`;

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export async function requestPasswordResetAction(formData: FormData) {
  const limit = await limitAuthAttempt('forgot-password');
  if (!limit.success) {
    redirect(TOO_MANY('/auth/forgot-password', limit.retryAfterSeconds));
  }

  const result = forgotPasswordSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    const errorMsg = result.error.issues.map((e) => e.message).join(', ');
    redirect(`/auth/forgot-password?error=${encodeURIComponent(errorMsg)}`);
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect('/auth/forgot-password?error=supabase-not-configured');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
    redirectTo: `${appUrl()}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    redirect(`/auth/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/auth/forgot-password?sent=1');
}

export async function updatePasswordAction(formData: FormData) {
  const limit = await limitAuthAttempt('reset-password');
  if (!limit.success) {
    redirect(TOO_MANY('/auth/reset-password', limit.retryAfterSeconds));
  }

  const result = resetPasswordSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    const errorMsg = result.error.issues.map((e) => e.message).join(', ');
    redirect(`/auth/reset-password?error=${encodeURIComponent(errorMsg)}`);
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect('/auth/reset-password?error=supabase-not-configured');
  }

  const { error } = await supabase.auth.updateUser({ password: result.data.password });
  if (error) {
    redirect(`/auth/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect('/auth/sign-in?password_reset=1');
}
