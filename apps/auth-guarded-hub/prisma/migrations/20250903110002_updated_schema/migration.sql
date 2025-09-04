/*
  Warnings:

  - You are about to drop the `RestrictedContentBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestrictedContentPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RestrictedContentBlock" DROP CONSTRAINT "RestrictedContentBlock_pageSlug_fkey";

-- DropTable
DROP TABLE "public"."RestrictedContentBlock";

-- DropTable
DROP TABLE "public"."RestrictedContentPage";

-- CreateTable
CREATE TABLE "public"."RestrictedBlock" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "slotKey" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "minTier" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestrictedBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RestrictedBlock_pageSlug_slotKey_minTier_idx" ON "public"."RestrictedBlock"("pageSlug", "slotKey", "minTier");

-- CreateIndex
CREATE UNIQUE INDEX "RestrictedBlock_pageSlug_slotKey_minTier_key" ON "public"."RestrictedBlock"("pageSlug", "slotKey", "minTier");
