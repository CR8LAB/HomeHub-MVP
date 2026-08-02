-- CreateTable
CREATE TABLE "HomeInfo" (
    "id" SERIAL NOT NULL,
    "householdId" INTEGER NOT NULL,
    "wifiName" TEXT,
    "wifiPassword" TEXT,
    "alarmCode" TEXT,
    "gateCode" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeInfo_householdId_key" ON "HomeInfo"("householdId");

-- AddForeignKey
ALTER TABLE "HomeInfo" ADD CONSTRAINT "HomeInfo_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE CASCADE ON UPDATE CASCADE;
