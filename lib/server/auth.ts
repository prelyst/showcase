import { createSupabaseServerClient } from '@/lib/supabase/server';

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
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const username = typeof user.user_metadata?.username === 'string'
    ? user.user_metadata.username
    : typeof user.email === 'string'
      ? user.email.split('@')[0]
      : 'creator';

  const name = typeof user.user_metadata?.full_name === 'string'
    ? user.user_metadata.full_name
    : typeof user.user_metadata?.name === 'string'
      ? user.user_metadata.name
      : username;

  return {
    id: user.id,
    email: user.email ?? '',
    name,
    username,
  };
}

export async function isAuthenticated() {
  const user = await getCurrentSessionUser();
  return Boolean(user);
}
