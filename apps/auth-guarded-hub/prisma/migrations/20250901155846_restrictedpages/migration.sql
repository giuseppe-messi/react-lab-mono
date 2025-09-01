-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('FREE', 'BASIC', 'PRO');

-- CreateTable
CREATE TABLE "public"."RestrictedContentPage" (
    "slug" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestrictedContentPage_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "public"."RestrictedContentBlock" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "minTier" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestrictedContentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RestrictedContentBlock_pageSlug_minTier_order_idx" ON "public"."RestrictedContentBlock"("pageSlug", "minTier", "order");

-- AddForeignKey
ALTER TABLE "public"."RestrictedContentBlock" ADD CONSTRAINT "RestrictedContentBlock_pageSlug_fkey" FOREIGN KEY ("pageSlug") REFERENCES "public"."RestrictedContentPage"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
