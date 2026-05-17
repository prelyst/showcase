import { createProfile, getProfileByUserId, isProfileSlugTaken } from '@/lib/repositories/profile-repository';
import { getUserSettings, upsertUserSettings } from '@/lib/repositories/settings-repository';
import { getUserById, upsertUserByAuth } from '@/lib/repositories/user-repository';
import { getCurrentSessionUser } from '@/lib/server/auth';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32) || 'creator';
}

async function getAvailableSlug(base: string, userId: string) {
  const normalized = slugify(base);

  if (!(await isProfileSlugTaken(normalized, userId))) {
    return normalized;
  }

  for (let index = 2; index < 1000; index += 1) {
    const candidate = `${normalized}-${index}`;
    if (!(await isProfileSlugTaken(candidate, userId))) {
      return candidate;
    }
  }

  return `${normalized}-${Date.now().toString().slice(-6)}`;
}

export async function ensureCurrentUserBootstrapped() {
  const sessionUser = await getCurrentSessionUser();

  if (!sessionUser) {
    return null;
  }

  const appUser = await upsertUserByAuth({
    id: sessionUser.id,
    email: sessionUser.email,
    name: sessionUser.name,
    username: sessionUser.username,
    image: null,
  });

  if (!appUser) {
    return null;
  }

  const existingProfile = await getProfileByUserId(appUser.id);

  if (!existingProfile) {
    const slug = await getAvailableSlug(sessionUser.username || sessionUser.email.split('@')[0] || 'creator', appUser.id);

    await createProfile({
      userId: appUser.id,
      displayName: sessionUser.name || sessionUser.username,
      slug,
      bio: 'New to Showcase. Setting up my publishing space.',
      isPublic: true,
    });
  }

  const settings = await getUserSettings(appUser.id);

  if (!settings) {
    await upsertUserSettings(appUser.id, {
      defaultAllPlatforms: true,
      showShowcaseFooter: true,
      webPushNotifications: false,
      dailyDigestEmail: true,
    });
  }

  return getUserById(appUser.id);
}
