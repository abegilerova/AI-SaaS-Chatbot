// lib/prisma.ts
import { PrismaClient } from "@prisma/client";


// Prevent multiple Prisma instances in development (Next.js Hot Reloading issue)
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const client =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;