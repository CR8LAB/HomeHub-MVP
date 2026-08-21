/*
  Warnings:

  - A unique constraint covering the columns `[codePrefix]` on the table `Agency` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "codePrefix" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Agency_codePrefix_key" ON "Agency"("codePrefix");
