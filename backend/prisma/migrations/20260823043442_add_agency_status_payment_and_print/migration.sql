-- CreateEnum
CREATE TYPE "AgencyStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "PrintStatus" AS ENUM ('PENDING', 'PRINTED');

-- AlterTable
ALTER TABLE "ActivationCode" ADD COLUMN     "printStatus" "PrintStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "printedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "status" "AgencyStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "isActive" SET DEFAULT false;
