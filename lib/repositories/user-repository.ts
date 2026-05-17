import { prisma } from '@/lib/db/prisma';

export async function getUserById(id: string) {
  if (!prisma) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id },
  });
}

export async function upsertUserByAuth(input: {
  id: string;
  email: string;
  name?: string | null;
  username?: string | null;
  image?: string | null;
}) {
  if (!prisma) {
    return null;
  }

  return prisma.user.upsert({
    where: { id: input.id },
    update: {
      email: input.email,
      name: input.name ?? undefined,
      username: input.username ?? undefined,
      image: input.image ?? undefined,
    },
    create: {
      id: input.id,
      email: input.email,
      name: input.name ?? null,
      username: input.username ?? null,
      image: input.image ?? null,
    },
  });
}
