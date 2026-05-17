import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import { getSupabaseEnv, isSupabaseConfigured } from '@/lib/supabase/env';

export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();

  if (!url || !anonKey) {
    return null;
  }

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Ignore cookie writes during rendering contexts.
        }
      },
    },
  });
}
