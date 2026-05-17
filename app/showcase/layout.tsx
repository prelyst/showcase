import { redirect } from 'next/navigation';

import { isAuthenticated } from '@/lib/server/auth';

export default async function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/sign-in');
  }

  return children;
}
