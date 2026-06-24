import Link from 'next/link';

import { AuthCard } from '@/components/auth/auth-card';
import { PasswordInput } from '@/components/auth/password-input';
import { PendingActionButton } from '@/components/pending-action-button';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { signInAction } from './actions';

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string; signed_out?: string; password_reset?: string }> }) {
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : null;
  const signedOut = params.signed_out === '1';
  const passwordReset = params.password_reset === '1';
  const configured = isSupabaseConfigured();

  return (
    <AuthCard
      eyebrow="Phase 3A · auth"
      title={<>A quieter place to <em className="italic text-accent">publish</em>.</>}
      description="Sign in to continue into your Showcase workspace. The auth flow stays inside the product tone while now using real Supabase session exchange."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-subtle">
          <span>Need the public site instead?</span>
          <Link href="/" className="font-medium text-accent hover:text-ink">
            Back to homepage
          </Link>
        </div>
      }
    >
      <div className="mb-6 md:hidden">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Phase 3A · auth</div>
        <h1 className="mb-2 font-serif text-[34px] leading-[1.08] tracking-[-0.03em] text-ink">
          A quieter place to <em className="italic text-accent">publish</em>.
        </h1>
        <p className="text-[14px] leading-[1.6] text-subtle">Sign in to continue into your Showcase workspace.</p>
      </div>

      <div className="mb-5 rounded-[16px] border border-divider bg-surface p-4">
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Current auth mode</div>
        <div className="font-serif text-[22px] italic text-ink">Supabase session exchange</div>
        <div className="mt-2 text-[13px] leading-[1.55] text-subtle">
          The visual language stays in Showcase, but the session path now expects real Supabase Auth credentials and stores a real authenticated session.
        </div>
      </div>

      {!configured ? <div className="mb-4 rounded-[12px] border border-danger-tint bg-accent-tint px-4 py-3 text-[13px] text-danger">Supabase auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.</div> : null}
      {signedOut ? <div className="mb-4 rounded-[12px] border border-border bg-surface px-4 py-3 text-[13px] text-subtle">You were signed out.</div> : null}
      {passwordReset ? <div className="mb-4 rounded-[12px] border border-border bg-surface px-4 py-3 text-[13px] text-subtle">Password updated. Sign in with your new password.</div> : null}
      {errorMessage ? <div className="mb-4 rounded-[12px] border border-danger-tint bg-accent-tint px-4 py-3 text-[13px] text-danger">{errorMessage}</div> : null}

      <form action={signInAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <Link href="/auth/forgot-password" className="mt-2 inline-block text-[13px] text-muted hover:text-accent">
            Forgot password?
          </Link>
        </div>

        <PendingActionButton
          disabled={!configured}
          idle="Enter Showcase"
          pending="Entering Showcase..."
          className="inline-flex w-full items-center justify-center rounded-[12px] bg-ink px-5 py-[14px] text-[15px] font-medium text-white transition hover:bg-accent"
        />
      </form>

      <div className="mt-5 text-center text-[13px] text-muted">
        No account yet?{' '}
        <Link href="/auth/sign-up" className="font-medium text-accent hover:text-ink">
          Create one here
        </Link>
      </div>
    </AuthCard>
  );
}
