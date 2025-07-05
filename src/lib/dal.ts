import "server-only";
import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { account } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const verifySession = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.query.account.findFirst({
    where: eq(account.clerkId, userId),
    columns: { id: true, clerkId: true, email: true },
  });

  if (!existingUser) {
    await db
      .insert(account)
      .values({
        clerkId: userId,
        email: "",
      })
      .onConflictDoNothing();
  }

  return {
    isAuth: true,
    clerkId: userId,
  };
});

export const getAccount = cache(async () => {
  const session = await verifySession();

  const data = await db.query.account.findFirst({
    where: eq(account.clerkId, session.clerkId),
    columns: {
      id: true,
      email: true,
      clerkId: true,
    },
  });

  return data;
});
