import { cookies } from 'next/headers';

import { DEMO_USER_ID } from '@/lib/constants/demo-user';
import { isSupabaseConfigured } from '@/lib/supabase/env';

const AUTH_COOKIE_NAME = 'showcase-demo-auth';

type SessionUser = {
  id: string;
  email: string;
  name: string;
  username: string;
};

export async function getCurrentUserId() {
  const user = await getCurrentSessionUser();
  return user?.id ?? null;
}

export async function getCurrentSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (isSupabaseConfigured() && authCookie === 'demo') {
    return {
      id: DEMO_USER_ID,
      email: 'maya@showcase.app',
      name: 'Maya Rivera',
      username: 'mayarivera',
    };
  }

  if (authCookie === 'demo') {
    return {
      id: DEMO_USER_ID,
      email: 'maya@showcase.app',
      name: 'Maya Rivera',
      username: 'mayarivera',
    };
  }

  return null;
}

export async function isAuthenticated() {
  const user = await getCurrentSessionUser();
  return Boolean(user);
}

export const authCookieName = AUTH_COOKIE_NAME;
