import Link from 'next/link';

import { AuthCard } from '@/components/auth/auth-card';
import { PasswordInput } from '@/components/auth/password-input';
import { PendingActionButton } from '@/components/pending-action-button';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { signInAction } from './actions';

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string; signed_out?: string }> }) {
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : null;
  const signedOut = params.signed_out === '1';
  const configured = isSupabaseConfigured();

  return (
    <AuthCard
      eyebrow="Phase 3A · auth"
      title={<>A quieter place to <em className="italic text-[#B8541F]">publish</em>.</>}
      description="Sign in to continue into your Showcase workspace. The auth flow stays inside the product tone while now using real Supabase session exchange."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#4A453C]">
          <span>Need the public site instead?</span>
          <Link href="/" className="font-medium text-[#B8541F] hover:text-[#1A1814]">
            Back to homepage
          </Link>
        </div>
      }
    >
      <div className="mb-6 md:hidden">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Phase 3A · auth</div>
        <h1 className="mb-2 font-serif text-[34px] leading-[1.08] tracking-[-0.03em] text-[#1A1814]">
          A quieter place to <em className="italic text-[#B8541F]">publish</em>.
        </h1>
        <p className="text-[14px] leading-[1.6] text-[#4A453C]">Sign in to continue into your Showcase workspace.</p>
      </div>

      <div className="mb-5 rounded-[16px] border border-[#E8E3D4] bg-[#F4F1EA] p-4">
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Current auth mode</div>
        <div className="font-serif text-[22px] italic text-[#1A1814]">Supabase session exchange</div>
        <div className="mt-2 text-[13px] leading-[1.55] text-[#4A453C]">
          The visual language stays in Showcase, but the session path now expects real Supabase Auth credentials and stores a real authenticated session.
        </div>
      </div>

      {!configured ? <div className="mb-4 rounded-[12px] border border-[#F2DCD1] bg-[#FBF1EC] px-4 py-3 text-[13px] text-[#A0381F]">Supabase auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.</div> : null}
      {signedOut ? <div className="mb-4 rounded-[12px] border border-[#D9D3C4] bg-[#F4F1EA] px-4 py-3 text-[13px] text-[#4A453C]">You were signed out.</div> : null}
      {errorMessage ? <div className="mb-4 rounded-[12px] border border-[#F2DCD1] bg-[#FBF1EC] px-4 py-3 text-[13px] text-[#A0381F]">{errorMessage}</div> : null}

      <form action={signInAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none placeholder:text-[#85806F] focus:border-[#B8541F]"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <Link href="/auth/forgot-password" className="mt-2 inline-block text-[13px] text-[#85806F] hover:text-[#B8541F]">
            Forgot password?
          </Link>
        </div>

        <PendingActionButton
          disabled={!configured}
          idle="Enter Showcase"
          pending="Entering Showcase..."
          className="inline-flex w-full items-center justify-center rounded-[12px] bg-[#1A1814] px-5 py-[14px] text-[15px] font-medium text-[#F4F1EA] transition hover:bg-[#B8541F]"
        />
      </form>

      <div className="mt-5 text-center text-[13px] text-[#85806F]">
        No account yet?{' '}
        <Link href="/auth/sign-up" className="font-medium text-[#B8541F] hover:text-[#1A1814]">
          Create one here
        </Link>
      </div>
    </AuthCard>
  );
}
