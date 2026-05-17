import { redirect } from 'next/navigation';

import { isAuthenticated } from '@/lib/server/auth';
import { ensureCurrentUserBootstrapped } from '@/lib/server/bootstrap-user';

export default async function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/sign-in');
  }

  await ensureCurrentUserBootstrapped();

  return children;
}
