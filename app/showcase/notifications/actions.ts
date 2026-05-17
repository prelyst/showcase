'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { markAllNotificationsRead, markNotificationRead } from '@/lib/repositories/notification-repository';
import { getCurrentUserId } from '@/lib/server/auth';

export async function markNotificationReadAction(formData: FormData) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  const notificationId = String(formData.get('notificationId') || '');

  if (!notificationId) {
    redirect('/showcase/notifications');
  }

  await markNotificationRead(notificationId, userId);

  revalidatePath('/showcase/notifications');
  redirect('/showcase/notifications?read=1');
}

export async function markAllNotificationsReadAction() {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  await markAllNotificationsRead(userId);

  revalidatePath('/showcase/notifications');
  redirect('/showcase/notifications?read=all');
}
