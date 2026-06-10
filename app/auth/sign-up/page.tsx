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
      title={<>Start your <em className="italic text-[#B8541F]">Showcase</em>.</>}
      description="Create a real Supabase-backed account without leaving the product tone. The account surface should feel like part of Showcase, not a separate service."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#4A453C]">
          <span>Already have an account?</span>
          <Link href="/auth/sign-in" className="font-medium text-[#B8541F] hover:text-[#1A1814]">
            Sign in instead
          </Link>
        </div>
      }
    >
      <div className="mb-6 md:hidden">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Phase 3A · sign up</div>
        <h1 className="mb-2 font-serif text-[34px] leading-[1.08] tracking-[-0.03em] text-[#1A1814]">
          Start your <em className="italic text-[#B8541F]">Showcase</em>.
        </h1>
        <p className="text-[14px] leading-[1.6] text-[#4A453C]">Create an account and step into your publishing workspace.</p>
      </div>

      <div className="mb-5 rounded-[16px] border border-[#E8E3D4] bg-[#F4F1EA] p-4">
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Account creation</div>
        <div className="font-serif text-[22px] italic text-[#1A1814]">Supabase Auth sign-up</div>
        <div className="mt-2 text-[13px] leading-[1.55] text-[#4A453C]">
          New creator accounts are created directly in Supabase Auth while keeping the same Showcase visual language used everywhere else in the app.
        </div>
      </div>

      {!configured ? <div className="mb-4 rounded-[12px] border border-[#F2DCD1] bg-[#FBF1EC] px-4 py-3 text-[13px] text-[#A0381F]">Supabase auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.</div> : null}
      {errorMessage ? <div className="mb-4 rounded-[12px] border border-[#F2DCD1] bg-[#FBF1EC] px-4 py-3 text-[13px] text-[#A0381F]">{errorMessage}</div> : null}

      <form action={signUpAction} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Maya Rivera"
            className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none placeholder:text-[#85806F] focus:border-[#B8541F]"
          />
        </div>

        <div>
          <label htmlFor="username" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="mayarivera"
            className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none placeholder:text-[#85806F] focus:border-[#B8541F]"
          />
        </div>

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
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
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
          className="inline-flex w-full items-center justify-center rounded-[12px] bg-[#1A1814] px-5 py-[14px] text-[15px] font-medium text-[#F4F1EA] transition hover:bg-[#B8541F]"
        />
      </form>
    </AuthCard>
  );
}
