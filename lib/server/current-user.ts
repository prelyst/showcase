import { getProfileByUserId } from '@/lib/repositories/profile-repository';
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

export async function getCurrentUserView() {
  const sessionUser = await getCurrentSessionUser();

  if (!sessionUser) {
    return {
      id: null,
      email: '',
      displayName: 'Maya Rivera',
      username: 'mayarivera',
      slug: 'mayarivera',
      initials: 'MR',
      bio: 'Writer thinking about the quiet web. Books forthcoming. Slow is a feature.',
      website: null,
      hasProfile: false,
    };
  }

  const profile = await getProfileByUserId(sessionUser.id);

  const displayName = profile?.displayName || sessionUser.name || toTitleCase(sessionUser.username);
  const username = profile?.slug || sessionUser.username;

  return {
    id: sessionUser.id,
    email: sessionUser.email,
    displayName,
    username,
    slug: profile?.slug || sessionUser.username,
    initials: getInitials(displayName),
    bio: profile?.bio || 'Your Showcase profile is ready. Add a bio to introduce your voice.',
    website: profile?.website || null,
    hasProfile: Boolean(profile),
  };
}
