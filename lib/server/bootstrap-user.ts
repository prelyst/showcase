import { createProfile, getProfileByUserId, isProfileSlugTaken } from '@/lib/repositories/profile-repository';
import { getUserSettings, upsertUserSettings } from '@/lib/repositories/settings-repository';
import { getUserById, upsertUserByAuth } from '@/lib/repositories/user-repository';
import { getCurrentSessionUser, type SessionUser } from '@/lib/server/auth';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32) || 'creator';
}

function normalizeSessionIdentity(sessionUser: SessionUser) {
  const baseUsername = sessionUser.username || sessionUser.email.split('@')[0] || 'creator';
  const safeUsername = slugify(baseUsername).replace(/-/g, '') || 'creator';
  const safeName = sessionUser.name?.trim() || safeUsername;

  return {
    username: safeUsername.slice(0, 24),
    name: safeName,
  };
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

async function tryCreateProfileWithRetry(
  userId: string,
  displayName: string,
  baseSlug: string,
  maxRetries = 3,
) {
  let slug = await getAvailableSlug(baseSlug, userId);

  for (let attempt = 0; attempt < maxRetries; attempt += 1) {
    try {
      const profile = await createProfile({
        userId,
        displayName,
        slug,
        bio: 'New to Showcase. Setting up my publishing space.',
        isPublic: true,
      });

      return profile;
    } catch (error) {
      const isUniqueConstraint =
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2002';

      if (isUniqueConstraint && attempt < maxRetries - 1) {
        slug = await getAvailableSlug(baseSlug, userId);
        continue;
      }

      throw error;
    }
  }

  return null;
}

export async function ensureCurrentUserBootstrapped() {
  const sessionUser = await getCurrentSessionUser();

  if (!sessionUser) {
    return null;
  }

  const normalizedIdentity = normalizeSessionIdentity(sessionUser);

  let appUser;
  try {
    appUser = await upsertUserByAuth({
      id: sessionUser.id,
      email: sessionUser.email,
      name: normalizedIdentity.name,
      username: normalizedIdentity.username,
      image: null,
    });
  } catch {
    return null;
  }

  if (!appUser) {
    return null;
  }

  let existingProfile;
  try {
    existingProfile = await getProfileByUserId(appUser.id);
  } catch {
    // Continue without profile — will try to create one below
  }

  if (!existingProfile) {
    try {
      await tryCreateProfileWithRetry(
        appUser.id,
        normalizedIdentity.name,
        normalizedIdentity.username || sessionUser.email.split('@')[0] || 'creator',
      );
    } catch {
      // Profile creation failed — user can still use the app
    }
  }

  let settings;
  try {
    settings = await getUserSettings(appUser.id);
  } catch {
    // Continue without settings — will try to create defaults below
  }

  if (!settings) {
    try {
      await upsertUserSettings(appUser.id, {
        defaultAllPlatforms: true,
        showShowcaseFooter: true,
        webPushNotifications: false,
        dailyDigestEmail: true,
      });
    } catch {
      // Settings creation failed — user can still use the app
    }
  }

  try {
    return getUserById(appUser.id);
  } catch {
    return null;
  }
}
