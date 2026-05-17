'use server';

import { ConnectedAccountStatus, Platform } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { upsertConnectedAccount } from '@/lib/repositories/connected-account-repository';
import { createNotification } from '@/lib/repositories/notification-repository';
import { upsertUserSettings } from '@/lib/repositories/settings-repository';
import { getCurrentUserId } from '@/lib/server/auth';

export async function updateSettingsAction(formData: FormData) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  const nextSettings = {
    defaultAllPlatforms: String(formData.get('defaultAllPlatforms')) === 'on',
    showShowcaseFooter: String(formData.get('showShowcaseFooter')) === 'on',
    webPushNotifications: String(formData.get('webPushNotifications')) === 'on',
    dailyDigestEmail: String(formData.get('dailyDigestEmail')) === 'on',
  };

  await upsertUserSettings(userId, nextSettings);

  await createNotification({
    userId,
    type: 'settings',
    message: 'Your Showcase preferences were updated',
    metadata: {
      detail: 'Settings changes are now saved to your account.',
      settings: nextSettings,
    },
  });

  revalidatePath('/showcase/settings');
  revalidatePath('/showcase/compose');

  redirect('/showcase/settings?saved=1');
}

export async function toggleConnectedAccountAction(formData: FormData) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  const platform = String(formData.get('platform') || '').toUpperCase() as Platform;
  const action = String(formData.get('action') || 'connect');

  const accountHandle = action === 'connect'
    ? `@${platform.toLowerCase()}-${userId.slice(0, 6)}`
    : 'Not connected';

  const status = action === 'connect' ? ConnectedAccountStatus.ACTIVE : ConnectedAccountStatus.INACTIVE;

  await upsertConnectedAccount({
    userId,
    platform,
    accountHandle,
    accountName: platform,
    status,
  });

  await createNotification({
    userId,
    type: action === 'connect' ? 'account_connected' : 'account_disconnected',
    actorName: 'Showcase',
    actorHandle: '@showcase',
    message: action === 'connect' ? `${platform} connected` : `${platform} disconnected`,
    metadata: {
      detail: action === 'connect'
        ? `${platform} is now available as a publishing lane.`
        : `${platform} has been removed from your publishing lanes.`,
    },
  });

  revalidatePath('/showcase/settings');
  revalidatePath('/showcase/discover');

  redirect(`/showcase/settings?connected=${action === 'connect' ? '1' : '0'}`);
}
