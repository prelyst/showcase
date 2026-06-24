import Link from 'next/link';

import { AuthCard } from '@/components/auth/auth-card';
import { PasswordInput } from '@/components/auth/password-input';
import { PendingActionButton } from '@/components/pending-action-button';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { updatePasswordAction } from '../forgot-password/actions';

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : null;
  const configured = isSupabaseConfigured();

  return (
    <AuthCard
      eyebrow="Phase 3A · choose password"
      title={<>Choose a new <em className="italic text-accent">password</em>.</>}
      description="After opening the secure email link, set a replacement password for your Showcase account."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-subtle">
          <span>Already updated it?</span>
          <Link href="/auth/sign-in" className="font-medium text-accent hover:text-ink">
            Back to sign in
          </Link>
        </div>
      }
    >
      <div className="mb-6 md:hidden">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Phase 3A · choose password</div>
        <h1 className="mb-2 font-serif text-[34px] leading-[1.08] tracking-[-0.03em] text-ink">
          Choose a new <em className="italic text-accent">password</em>.
        </h1>
        <p className="text-[14px] leading-[1.6] text-subtle">Set a fresh password after using your reset email.</p>
      </div>

      {!configured ? <div className="mb-4 rounded-[12px] border border-danger-tint bg-accent-tint px-4 py-3 text-[13px] text-danger">Supabase auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.</div> : null}
      {errorMessage ? <div className="mb-4 rounded-[12px] border border-danger-tint bg-accent-tint px-4 py-3 text-[13px] text-danger">{errorMessage}</div> : null}

      <form action={updatePasswordAction} className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            New password
          </label>
          <PasswordInput id="password" name="password" placeholder="Create a new password" autoComplete="new-password" />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Confirm password
          </label>
          <PasswordInput id="confirmPassword" name="confirmPassword" placeholder="Confirm your new password" autoComplete="new-password" />
        </div>

        <PendingActionButton
          disabled={!configured}
          idle="Update password"
          pending="Updating password..."
          className="inline-flex w-full items-center justify-center rounded-[12px] bg-ink px-5 py-[14px] text-[15px] font-medium text-white transition hover:bg-accent"
        />
      </form>
    </AuthCard>
  );
}
