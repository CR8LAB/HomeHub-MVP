import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getHomeInfoService(householdId) {
    const homeInfo = await prisma.homeInfo.findUnique({
        where: {
            householdId: Number(householdId)
        }
    });

    if (!homeInfo) {
        return {
            success: true,
            homeInfo: null,
            message: "No home information has been added yet."
        };
    }

    return {
        success: true,
        homeInfo
    };
}

export async function updateHomeInfoService(
    householdId,
    homeInfoData
) {
    const {
        wifiName,
        wifiPassword,
        alarmCode,
        gateCode,
        notes
    } = homeInfoData;

    const homeInfo = await prisma.homeInfo.upsert({
        where: {
            householdId: Number(householdId)
        },

        update: {
            wifiName,
            wifiPassword,
            alarmCode,
            gateCode,
            notes
        },

        create: {
            householdId: Number(householdId),
            wifiName,
            wifiPassword,
            alarmCode,
            gateCode,
            notes
        }
    });

    return {
        success: true,
        message: "Home information updated successfully.",
        homeInfo
    };
}