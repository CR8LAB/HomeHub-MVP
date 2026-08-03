import prisma from "../config/prisma.js";

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
        nickname,
        address,
        municipalityAccount,
        electricityMeter,
        waterMeter,
        electricityBox,
        municipalityPhone,
        electricityFaults,
        waterFaults,
        refuseDay,
        securityCompany,
        securityPhone,
        alarmCompany,
        alarmPhone,
        gateCode,
        wifiName,
        wifiPassword
    } = homeInfoData;

    const homeInfo = await prisma.homeInfo.upsert({
        where: {
            householdId: Number(householdId)
        },
        update: {
            nickname,
            address,
            municipalityAccount,
            electricityMeter,
            waterMeter,
            electricityBox,
            municipalityPhone,
            electricityFaults,
            waterFaults,
            refuseDay,
            securityCompany,
            securityPhone,
            alarmCompany,
            alarmPhone,
            gateCode,
            wifiName,
            wifiPassword
        },
        create: {
            householdId: Number(householdId),
            nickname,
            address,
            municipalityAccount,
            electricityMeter,
            waterMeter,
            electricityBox,
            municipalityPhone,
            electricityFaults,
            waterFaults,
            refuseDay,
            securityCompany,
            securityPhone,
            alarmCompany,
            alarmPhone,
            gateCode,
            wifiName,
            wifiPassword
        }
    });

    return {
        success: true,
        message: "Home information updated successfully.",
        homeInfo
    };
}