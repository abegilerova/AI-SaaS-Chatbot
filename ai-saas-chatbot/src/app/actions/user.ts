// src/app/actions/user.ts

import { client } from "@/lib/prisma"; // Make sure this is correctly imported

export async function createUser({ fullname, clerkId, type, stripeId }: { fullname: string; clerkId: string; type: string; stripeId?: string }) {
  try {
    const newUser = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        stripeId: stripeId || "",
      },
    });
    return newUser;
  } catch (error) {
    console.error("❌ Error creating user in database", error);
    return null;
  }
}
