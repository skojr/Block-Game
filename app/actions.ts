"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function saveScore(game: string, moves: number) {
  const session = await auth();
  if (!session?.user?.email) return; // or throw

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return;

  await prisma.score.create({
    data: {
      game,          // e.g. "Block Game"
      moves,         // your moves counter
      userId: user.id,
    },
  });
}
