import { redirect } from 'next/navigation';

import { getCurrentSessionUser } from '@/lib/server/auth';

export default async function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  const sessionUser = await getCurrentSessionUser();

  if (!sessionUser) {
    redirect('/auth/sign-in');
  }

  return children;
}
