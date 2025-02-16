"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser({
  clerkId,
  fullname,
  type,
}: {
  clerkId: string;
  fullname: string;
  type: string;
}) {
  try {
    const savedUser = await prisma.user.upsert({
      where: { id: clerkId }, // Add the 'id' property with the value of 'clerkId'
      update: { updatedAt: new Date() },
      create: {
        clerkId,
        fullname,
        type,
      },
    });

    return savedUser;
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error("Failed to save user");
  }
}
