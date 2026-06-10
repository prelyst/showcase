import { cache } from 'react';

import { getConnectedAccountsForUser } from '@/lib/repositories/connected-account-repository';
import { getNotificationsForUser } from '@/lib/repositories/notification-repository';
import { getPostsForProfile } from '@/lib/repositories/post-repository';
import { getProfileByUserId } from '@/lib/repositories/profile-repository';
import { getUserSettings } from '@/lib/repositories/settings-repository';
import { getCurrentUserView } from '@/lib/server/current-user';

export const getShowcaseSessionData = cache(async () => {
  const { user: currentUser } = await getCurrentUserView();

  if (!currentUser) {
    return {
      currentUser: null,
      profile: null,
      posts: [],
      connectedAccounts: [],
      settings: null,
      notifications: [],
    };
  }

  const userId = currentUser.id;
  const profile = await getProfileByUserId(userId);
  const profileId = profile?.id ?? null;

  const [posts, connectedAccounts, settings, notifications] = await Promise.all([
    profileId ? getPostsForProfile(profileId) : Promise.resolve([]),
    getConnectedAccountsForUser(userId),
    getUserSettings(userId),
    getNotificationsForUser(userId),
  ]);

  return {
    currentUser,
    profile,
    posts,
    connectedAccounts,
    settings,
    notifications,
  };
});
