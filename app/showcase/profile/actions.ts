'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getProfileByUserId, isProfileSlugTaken, updateProfileByUserId } from '@/lib/repositories/profile-repository';
import { updateProfileSchema } from '@/lib/validators/profile';
import { getCurrentUserId } from '@/lib/server/auth';

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeOptional(value: FormDataEntryValue | null) {
  const stringValue = String(value || '').trim();
  return stringValue || '';
}

export async function updateProfileAction(formData: FormData) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    redirect('/showcase/profile?error=profile-not-found');
  }

  const parsed = updateProfileSchema.safeParse({
    displayName: String(formData.get('displayName') || '').trim(),
    bio: normalizeOptional(formData.get('bio')),
    slug: normalizeSlug(String(formData.get('slug') || '')),
    location: normalizeOptional(formData.get('location')),
    website: normalizeOptional(formData.get('website')),
    isPublic: String(formData.get('isPublic')) === 'true',
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || 'Invalid profile details';
    redirect(`/showcase/profile?error=${encodeURIComponent(message)}`);
  }

  const data = parsed.data;

  if (await isProfileSlugTaken(data.slug, userId)) {
    redirect('/showcase/profile?error=slug-already-taken');
  }

  await updateProfileByUserId(userId, {
    displayName: data.displayName,
    slug: data.slug,
    bio: data.bio || null,
    location: data.location || null,
    website: data.website || null,
    isPublic: data.isPublic,
  });

  revalidatePath('/showcase/profile');
  revalidatePath('/showcase/compose');

  redirect('/showcase/profile?saved=1');
}
