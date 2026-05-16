import { z } from 'zod';

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(80),
  bio: z.string().max(280).optional().or(z.literal('')),
  slug: z.string().min(2).max(40).regex(/^[a-z0-9-]+$/),
  location: z.string().max(80).optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  isPublic: z.boolean(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
