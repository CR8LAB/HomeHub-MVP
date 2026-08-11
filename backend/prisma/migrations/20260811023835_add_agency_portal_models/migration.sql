-- CreateEnum
CREATE TYPE "AgencyRole" AS ENUM ('ADMIN', 'AGENT');

-- AlterTable
ALTER TABLE "ActivationCode" ADD COLUMN     "agencyId" INTEGER,
ADD COLUMN     "claimedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Agency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT,
    "logoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyMember" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "role" "AgencyRole" NOT NULL DEFAULT 'AGENT',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agency_slug_key" ON "Agency"("slug");

-- CreateIndex
CREATE INDEX "AgencyMember_agencyId_idx" ON "AgencyMember"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyMember_userId_agencyId_key" ON "AgencyMember"("userId", "agencyId");

-- CreateIndex
CREATE INDEX "ActivationCode_agencyId_idx" ON "ActivationCode"("agencyId");

-- AddForeignKey
ALTER TABLE "ActivationCode" ADD CONSTRAINT "ActivationCode_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyMember" ADD CONSTRAINT "AgencyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyMember" ADD CONSTRAINT "AgencyMember_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
