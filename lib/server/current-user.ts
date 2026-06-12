import { cache } from 'react';

import { getProfileByUserId } from '@/lib/repositories/profile-repository';
import { ensureCurrentUserBootstrapped } from '@/lib/server/bootstrap-user';
import { getCurrentSessionUser } from '@/lib/server/auth';

function toTitleCase(value: string) {
  return value
    .split(/[._\-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getInitials(name: string) {
  const parts = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '');

  return parts.join('') || 'SC';
}

interface CurrentUserView {
  id: string;
  email: string;
  displayName: string;
  username: string;
  slug: string;
  initials: string;
  bio: string;
  website: string | null;
  hasProfile: boolean;
}

/**
 * Memoized per request so the shell and the page share one result instead of
 * each re-running auth + bootstrap + profile lookup.
 */
export const getCurrentUserView = cache(async (): Promise<{ user: CurrentUserView | null; reason?: string }> => {
  const sessionUser = await getCurrentSessionUser();

  if (!sessionUser) {
    return { user: null, reason: 'unauthenticated' };
  }

  try {
    await ensureCurrentUserBootstrapped();
  } catch {
    return { user: null, reason: 'bootstrap-failed' };
  }

  let profile = null;

  try {
    profile = await getProfileByUserId(sessionUser.id);
  } catch {
    // Degrade gracefully — return user without profile
  }

  const displayName = profile?.displayName || sessionUser.name || toTitleCase(sessionUser.username);
  const username = profile?.slug || sessionUser.username;

  return {
    user: {
      id: sessionUser.id,
      email: sessionUser.email,
      displayName,
      username,
      slug: profile?.slug || sessionUser.username,
      initials: getInitials(displayName),
      bio: profile?.bio || 'Your Showcase profile is ready. Add a bio to introduce your voice.',
      website: profile?.website || null,
      hasProfile: Boolean(profile),
    },
  };
});
