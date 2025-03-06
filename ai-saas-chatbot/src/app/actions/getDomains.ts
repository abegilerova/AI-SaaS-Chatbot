"use server";
import { client } from "@/lib/prisma";// Adjust this path based on your project

export const getDomains = async () => {
  try {
    const domains = await client.domain.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });
    return domains;
  } catch (error) {
    console.error("Error fetching domains:", error);
    return [];
  }
};
