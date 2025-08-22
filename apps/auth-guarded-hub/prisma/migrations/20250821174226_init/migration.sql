/*
  Warnings:

  - You are about to drop the column `tokenHash` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[secretHash]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `secretHash` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Session_tokenHash_key";

-- AlterTable
ALTER TABLE "public"."Session" DROP COLUMN "tokenHash",
ADD COLUMN     "secretHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_secretHash_key" ON "public"."Session"("secretHash");
