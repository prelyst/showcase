import Link from 'next/link';

import { AuthCard } from '@/components/auth/auth-card';

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      eyebrow="Phase 3A · password reset"
      title={<>Reset your <em className="italic text-accent">password</em>.</>}
      description="Enter your email address and we'll send you a link to reset your password. The reset flow is handled by Supabase Auth."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-subtle">
          <span>Remember your password?</span>
          <Link href="/auth/sign-in" className="font-medium text-accent hover:text-ink">
            Back to sign in
          </Link>
        </div>
      }
    >
      <div className="mb-6 md:hidden">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Phase 3A · password reset</div>
        <h1 className="mb-2 font-serif text-[34px] leading-[1.08] tracking-[-0.03em] text-ink">
          Reset your <em className="italic text-accent">password</em>.
        </h1>
        <p className="text-[14px] leading-[1.6] text-subtle">We'll send a reset link to your email.</p>
      </div>

      <div className="mb-6 rounded-[16px] border border-divider bg-surface p-4">
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Password reset</div>
        <div className="font-serif text-[22px] italic text-ink">Supabase Auth</div>
        <div className="mt-2 text-[13px] leading-[1.55] text-subtle">
          Password resets are handled securely through Supabase. You'll receive an email with a reset link.
        </div>
      </div>

      <form className="space-y-4">
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

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-[12px] bg-ink px-5 py-[14px] text-[15px] font-medium text-white transition hover:bg-accent"
        >
          Send reset link
        </button>
      </form>
    </AuthCard>
  );
}
