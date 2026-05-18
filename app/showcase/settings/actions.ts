'use server';

import { ConnectedAccountStatus, Platform } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { disconnectConnectedAccount } from '@/lib/repositories/connected-account-repository';
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
  const action = String(formData.get('action') || 'disconnect');

  if (action !== 'disconnect') {
    redirect('/showcase/settings?oauth=use-provider-connect');
  }

  await disconnectConnectedAccount(userId, platform);

  await createNotification({
    userId,
    type: 'account_disconnected',
    actorName: 'Showcase',
    actorHandle: '@showcase',
    message: `${platform} disconnected`,
    metadata: {
      detail: `${platform} has been removed from your publishing lanes.`,
    },
  });

  revalidatePath('/showcase/settings');
  revalidatePath('/showcase/discover');

  redirect('/showcase/settings?connected=0');
}
