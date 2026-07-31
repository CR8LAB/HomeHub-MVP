import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function validateActivationCodeService(activationCode) {
    if (!activationCode) {
        return {
            success: false,
            message: "Activation code is required."
        };
    }

    const codeRecord = await prisma.activationCode.findUnique({
        where: {
            code: activationCode
        },
        include: {
            household: true
        }
    });

    if (!codeRecord) {
        return {
            success: false,
            message: "Invalid activation code."
        };
    }

    if (!codeRecord.isClaimed) {
        return {
            success: true,
            mode: "setup"
        };
    }

    return {
        success: true,
        mode: "join",
        household: codeRecord.household?.name ?? null
    };
}