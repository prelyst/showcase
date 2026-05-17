import Link from 'next/link';

import { AuthCard } from '@/components/auth/auth-card';
import { signInAction } from './actions';

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string; signed_out?: string }> }) {
  const params = await searchParams;
  const error = params.error === 'missing-email';
  const signedOut = params.signed_out === '1';

  return (
    <AuthCard
      eyebrow="Phase 3A · auth"
      title={<>A quieter place to <em className="italic text-[#B8541F]">publish</em>.</>}
      description="Sign in to continue into your Showcase workspace. The auth flow is being introduced in-app first so it matches the product, not a generic template."
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
        <div className="font-serif text-[22px] italic text-[#1A1814]">Demo session bridge</div>
        <div className="mt-2 text-[13px] leading-[1.55] text-[#4A453C]">
          This is the themed Phase 3A auth surface. Real Supabase Auth session exchange is the next wiring step, but the product-facing sign-in flow already matches Showcase styling.
        </div>
      </div>

      {signedOut ? <div className="mb-4 rounded-[12px] border border-[#D9D3C4] bg-[#F4F1EA] px-4 py-3 text-[13px] text-[#4A453C]">You were signed out.</div> : null}
      {error ? <div className="mb-4 rounded-[12px] border border-[#F2DCD1] bg-[#FBF1EC] px-4 py-3 text-[13px] text-[#A0381F]">Enter an email to continue.</div> : null}

      <form action={signInAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="maya@showcase.app"
            defaultValue="maya@showcase.app"
            className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none placeholder:text-[#85806F] focus:border-[#B8541F]"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            defaultValue="showcase"
            className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none placeholder:text-[#85806F] focus:border-[#B8541F]"
          />
        </div>

        <button className="inline-flex w-full items-center justify-center rounded-[12px] bg-[#1A1814] px-5 py-[14px] text-[15px] font-medium text-[#F4F1EA] transition hover:bg-[#B8541F]">
          Enter Showcase
        </button>
      </form>

      <div className="mt-5 text-center text-[13px] text-[#85806F]">
        No account yet? <span className="font-medium text-[#4A453C]">Creator onboarding will land in a later slice.</span>
      </div>
    </AuthCard>
  );
}
