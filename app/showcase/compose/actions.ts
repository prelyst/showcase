'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getProfileByUserId } from '@/lib/repositories/profile-repository';
import { createDraftPost, publishPost, updateDraftPost, updatePostTargets } from '@/lib/repositories/post-repository';
import { getCurrentUserId } from '@/lib/server/auth';
import { updateDraftPostSchema, updatePostTargetsSchema } from '@/lib/validators/post';

const ALL_PLATFORMS = ['SHOWCASE', 'X', 'LINKEDIN', 'BLUESKY', 'REDDIT', 'YOUTUBE', 'THREADS'] as const;

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
  const selectedTargets = ALL_PLATFORMS.filter((platform) => String(formData.get(`target-${platform}`)) === 'on');

  const parsed = updateDraftPostSchema.safeParse({
    postId: draftId || 'pending-draft',
    content,
  });

  if (!content) {
    redirect('/showcase/compose?error=content-required');
  }

  if (!parsed.success && draftId) {
    const message = parsed.error.issues[0]?.message || 'Invalid draft content';
    redirect(`/showcase/compose?error=${encodeURIComponent(message)}`);
  }

  let draft = draftId ? await updateDraftPost({ postId: draftId, content }) : null;

  if (!draft) {
    draft = await createDraftPost(
      {
        profileId: profile.id,
        content,
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
  const selectedTargets = ALL_PLATFORMS.filter((platform) => String(formData.get(`target-${platform}`)) === 'on');

  if (!content) {
    redirect('/showcase/compose?error=content-required');
  }

  let draft = draftId ? await updateDraftPost({ postId: draftId, content }) : null;

  if (!draft) {
    draft = await createDraftPost(
      {
        profileId: profile.id,
        content,
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

  redirect('/showcase/monitor?published=1');
}

export async function scheduleDraftAction(formData: FormData) {
  await saveDraftAction(formData);
}
