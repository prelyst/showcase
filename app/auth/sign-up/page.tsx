import Link from 'next/link';

import { AuthCard } from '@/components/auth/auth-card';
import { PasswordInput } from '@/components/auth/password-input';
import { PendingActionButton } from '@/components/pending-action-button';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { signUpAction } from '../sign-in/actions';

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : null;
  const configured = isSupabaseConfigured();

  return (
    <AuthCard
      eyebrow="Phase 3A · sign up"
      title={<>Start your <em className="italic text-accent">Showcase</em>.</>}
      description="Create a real Supabase-backed account without leaving the product tone. The account surface should feel like part of Showcase, not a separate service."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-subtle">
          <span>Already have an account?</span>
          <Link href="/auth/sign-in" className="font-medium text-accent hover:text-ink">
            Sign in instead
          </Link>
        </div>
      }
    >
      <div className="mb-6 md:hidden">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Phase 3A · sign up</div>
        <h1 className="mb-2 font-serif text-[34px] leading-[1.08] tracking-[-0.03em] text-ink">
          Start your <em className="italic text-accent">Showcase</em>.
        </h1>
        <p className="text-[14px] leading-[1.6] text-subtle">Create an account and step into your publishing workspace.</p>
      </div>

      <div className="mb-5 rounded-[16px] border border-divider bg-surface p-4">
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Account creation</div>
        <div className="font-serif text-[22px] italic text-ink">Supabase Auth sign-up</div>
        <div className="mt-2 text-[13px] leading-[1.55] text-subtle">
          New creator accounts are created directly in Supabase Auth while keeping the same Showcase visual language used everywhere else in the app.
        </div>
      </div>

      {!configured ? <div className="mb-4 rounded-[12px] border border-danger-tint bg-accent-tint px-4 py-3 text-[13px] text-danger">Supabase auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.</div> : null}
      {errorMessage ? <div className="mb-4 rounded-[12px] border border-danger-tint bg-accent-tint px-4 py-3 text-[13px] text-danger">{errorMessage}</div> : null}

      <form action={signUpAction} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Your full name"
            className="w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="username" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="yourusername"
            className="w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none placeholder:text-muted focus:border-accent"
          />
        </div>

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
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        </div>

        <PendingActionButton
          disabled={!configured}
          idle="Create account"
          pending="Creating account..."
          className="inline-flex w-full items-center justify-center rounded-[12px] bg-ink px-5 py-[14px] text-[15px] font-medium text-white transition hover:bg-accent"
        />
      </form>
    </AuthCard>
  );
}
