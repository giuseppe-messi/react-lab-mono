/*
  Warnings:

  - You are about to drop the column `slotKey` on the `RestrictedBlock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pageSlug,section,minTier]` on the table `RestrictedBlock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `section` to the `RestrictedBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."RestrictedBlock_pageSlug_slotKey_minTier_idx";

-- DropIndex
DROP INDEX "public"."RestrictedBlock_pageSlug_slotKey_minTier_key";

-- AlterTable
ALTER TABLE "public"."RestrictedBlock" DROP COLUMN "slotKey",
ADD COLUMN     "section" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "RestrictedBlock_pageSlug_section_minTier_idx" ON "public"."RestrictedBlock"("pageSlug", "section", "minTier");

-- CreateIndex
CREATE UNIQUE INDEX "RestrictedBlock_pageSlug_section_minTier_key" ON "public"."RestrictedBlock"("pageSlug", "section", "minTier");
