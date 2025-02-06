-- CreateEnum
CREATE TYPE "Plans" AS ENUM ('STANDARD', 'PRO', 'ULTIMATE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stripeId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "plan" "Plans"[],
    "credits" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Billing_userId_key" ON "Billing"("userId");
