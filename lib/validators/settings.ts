import { z } from 'zod';

export const updateSettingsSchema = z.object({
  defaultAllPlatforms: z.boolean(),
  showShowcaseFooter: z.boolean(),
  webPushNotifications: z.boolean(),
  dailyDigestEmail: z.boolean(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
