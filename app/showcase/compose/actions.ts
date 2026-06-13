'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getProfileByUserId } from '@/lib/repositories/profile-repository';
import { createDraftPost, publishPost, updateDraftPost, updatePostTargets } from '@/lib/repositories/post-repository';
import { getCurrentUserId } from '@/lib/server/auth';
import { updateDraftPostSchema, updatePostTargetsSchema } from '@/lib/validators/post';

const ALL_PLATFORMS = ['SHOWCASE', 'X', 'THREADS', 'FACEBOOK', 'INSTAGRAM', 'YOUTUBE'] as const;

/** Reads the attached media URL/type from the compose form (empty -> null). */
function readMedia(formData: FormData): { mediaUrl: string | null; mediaType: 'image' | 'video' | null } {
  const url = String(formData.get('mediaUrl') || '').trim();
  if (!url) return { mediaUrl: null, mediaType: null };
  const type = String(formData.get('mediaType') || 'image').trim();
  return { mediaUrl: url, mediaType: type === 'video' ? 'video' : 'image' };
}

export async function saveDraftAction(formData: FormData) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    redirect('/showcase/compose?error=profile-not-found');
  }

  const content = String(formData.get('content') || '').trim();
  const draftId = String(formData.get('draftId') || '').trim();
  const { mediaUrl, mediaType } = readMedia(formData);
  const selectedTargets = ALL_PLATFORMS.filter((platform) => String(formData.get(`target-${platform}`)) === 'on');

  const parsed = updateDraftPostSchema.safeParse({
    postId: draftId || 'pending-draft',
    content,
    mediaUrl,
    mediaType,
  });

  if (!content) {
    redirect('/showcase/compose?error=content-required');
  }

  if (!parsed.success && draftId) {
    const message = parsed.error.issues[0]?.message || 'Invalid draft content';
    redirect(`/showcase/compose?error=${encodeURIComponent(message)}`);
  }

  let draft = draftId ? await updateDraftPost({ postId: draftId, content, mediaUrl, mediaType }) : null;

  if (!draft) {
    draft = await createDraftPost(
      {
        profileId: profile.id,
        content,
        mediaUrl,
        mediaType,
      },
      userId,
    );
  }

  if (!draft) {
    redirect('/showcase/compose?error=unable-to-save-draft');
  }

  const targetPayload = ALL_PLATFORMS.map((platform) => ({
    platform,
    enabled: selectedTargets.includes(platform),
  }));

  const targetsParsed = updatePostTargetsSchema.safeParse({
    postId: draft.id,
    targets: targetPayload,
  });

  if (!targetsParsed.success) {
    const message = targetsParsed.error.issues[0]?.message || 'Invalid publish targets';
    redirect(`/showcase/compose?error=${encodeURIComponent(message)}`);
  }

  await updatePostTargets(targetsParsed.data);

  revalidatePath('/showcase/compose');
  revalidatePath('/showcase/profile');

  redirect('/showcase/compose?saved=1');
}

export async function publishNowAction(formData: FormData) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    redirect('/showcase/compose?error=profile-not-found');
  }

  const content = String(formData.get('content') || '').trim();
  const draftId = String(formData.get('draftId') || '').trim();
  const { mediaUrl, mediaType } = readMedia(formData);
  const selectedTargets = ALL_PLATFORMS.filter((platform) => String(formData.get(`target-${platform}`)) === 'on');

  if (!content) {
    redirect('/showcase/compose?error=content-required');
  }

  // Instagram cannot publish text-only — an image is required.
  if (selectedTargets.includes('INSTAGRAM') && !mediaUrl) {
    redirect('/showcase/compose?error=' + encodeURIComponent('Instagram requires an image. Attach one before publishing.'));
  }

  let draft = draftId ? await updateDraftPost({ postId: draftId, content, mediaUrl, mediaType }) : null;

  if (!draft) {
    draft = await createDraftPost(
      {
        profileId: profile.id,
        content,
        mediaUrl,
        mediaType,
      },
      userId,
    );
  }

  if (!draft) {
    redirect('/showcase/compose?error=unable-to-save-draft');
  }

  await updatePostTargets({
    postId: draft.id,
    targets: ALL_PLATFORMS.map((platform) => ({
      platform,
      enabled: selectedTargets.includes(platform),
    })),
  });

  await publishPost(draft.id);

  revalidatePath('/showcase/compose');
  revalidatePath('/showcase/monitor');
  revalidatePath('/showcase/profile');
  revalidatePath('/showcase/feed');
  revalidatePath('/showcase/discover'); // trending hashtags aggregate from posts

  redirect('/showcase/feed?published=1');
}

export async function scheduleDraftAction(formData: FormData) {
  await saveDraftAction(formData);
}
