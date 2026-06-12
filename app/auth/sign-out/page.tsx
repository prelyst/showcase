import { AuthCard } from '@/components/auth/auth-card';
import { signOutAction } from '../sign-in/actions';

export default function SignOutPage() {
  return (
    <AuthCard
      eyebrow="Session"
      title={<>Leave your <em className="italic text-[#B8541F]">workspace</em>?</>}
      description="You can sign out here without dropping the app into a generic account page. Keeping the auth edges inside the same product tone matters."
    >
      <div className="mb-6 rounded-[16px] border border-divider bg-surface p-4 text-[14px] leading-[1.6] text-[#4A453C]">
        You&apos;ll be returned to the Showcase sign-in screen. Your drafts and profile data remain in the app once real auth + DB are fully wired.
      </div>

      <form action={signOutAction}>
        <button className="inline-flex w-full items-center justify-center rounded-[12px] bg-[#1A1814] px-5 py-[14px] text-[15px] font-medium text-white transition hover:bg-[#B8541F]">
          Sign out
        </button>
      </form>
    </AuthCard>
  );
}
