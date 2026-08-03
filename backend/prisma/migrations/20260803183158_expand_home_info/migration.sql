/*
  Warnings:

  - You are about to drop the column `alarmCode` on the `HomeInfo` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `HomeInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HomeInfo" DROP COLUMN "alarmCode",
DROP COLUMN "notes",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "alarmCompany" TEXT,
ADD COLUMN     "alarmPhone" TEXT,
ADD COLUMN     "electricityBox" TEXT,
ADD COLUMN     "electricityFaults" TEXT,
ADD COLUMN     "electricityMeter" TEXT,
ADD COLUMN     "municipalityAccount" TEXT,
ADD COLUMN     "municipalityPhone" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "refuseDay" TEXT,
ADD COLUMN     "securityCompany" TEXT,
ADD COLUMN     "securityPhone" TEXT,
ADD COLUMN     "waterFaults" TEXT,
ADD COLUMN     "waterMeter" TEXT;
