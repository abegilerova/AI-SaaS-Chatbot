"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveUser(name: string, email: string) {
  try {
    const user = await prisma.user.create({
      data: { fullname, email },
    });
    return { success: true, user };
  } catch (error) {
    console.error("Error saving user:", error);
    return { success: false, error: "Failed to save user" };
  }
}