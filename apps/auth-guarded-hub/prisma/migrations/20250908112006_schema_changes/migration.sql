/*
  Warnings:

  - You are about to drop the column `minTier` on the `RestrictedBlock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pageSlug,section,plan]` on the table `RestrictedBlock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."RestrictedBlock_pageSlug_section_minTier_idx";

-- DropIndex
DROP INDEX "public"."RestrictedBlock_pageSlug_section_minTier_key";

-- AlterTable
ALTER TABLE "public"."RestrictedBlock" DROP COLUMN "minTier",
ADD COLUMN     "plan" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "RestrictedBlock_pageSlug_section_plan_idx" ON "public"."RestrictedBlock"("pageSlug", "section", "plan");

-- CreateIndex
CREATE UNIQUE INDEX "RestrictedBlock_pageSlug_section_plan_key" ON "public"."RestrictedBlock"("pageSlug", "section", "plan");
