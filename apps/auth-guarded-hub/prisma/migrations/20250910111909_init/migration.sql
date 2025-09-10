-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('PUBLIC', 'FREE', 'BASIC', 'PRO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plan" "public"."Plan" NOT NULL DEFAULT 'PUBLIC',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "secretHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RestrictedBlock" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "plan" "public"."Plan" NOT NULL DEFAULT 'PUBLIC',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestrictedBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_secretHash_key" ON "public"."Session"("secretHash");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "public"."Session"("userId");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "public"."Session"("expiresAt");

-- CreateIndex
CREATE INDEX "RestrictedBlock_pageSlug_section_plan_idx" ON "public"."RestrictedBlock"("pageSlug", "section", "plan");

-- CreateIndex
CREATE UNIQUE INDEX "RestrictedBlock_pageSlug_section_plan_key" ON "public"."RestrictedBlock"("pageSlug", "section", "plan");

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
