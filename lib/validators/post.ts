import { z } from 'zod';

const mediaUrl = z.string().url().max(2048).nullable().optional();
const mediaType = z.enum(['image', 'video']).nullable().optional();

export const createDraftPostSchema = z.object({
  profileId: z.string().min(1),
  content: z.string().min(1).max(3000),
  mediaUrl,
  mediaType,
});

export const updateDraftPostSchema = z.object({
  postId: z.string().min(1),
  content: z.string().min(1).max(3000),
  mediaUrl,
  mediaType,
});

export const updatePostTargetsSchema = z.object({
  postId: z.string().min(1),
  targets: z.array(
    z.object({
      platform: z.enum(['SHOWCASE', 'X', 'THREADS', 'FACEBOOK', 'INSTAGRAM', 'YOUTUBE']),
      enabled: z.boolean(),
    })
  ),
});

export type CreateDraftPostInput = z.infer<typeof createDraftPostSchema>;
export type UpdateDraftPostInput = z.infer<typeof updateDraftPostSchema>;
export type UpdatePostTargetsInput = z.infer<typeof updatePostTargetsSchema>;
