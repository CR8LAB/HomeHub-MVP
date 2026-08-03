
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

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

export async function createHouseholdService({
    activationCode,
    familyName,
    city
}) {
    if (!activationCode || !familyName || !city) {
        return {
            success: false,
            message: "Activation code, family name and city are required."
        };
    }

    const codeRecord =
        await prisma.activationCode.findUnique({
            where: {
                code: activationCode
            }
        });

    if (!codeRecord) {
        return {
            success: false,
            message: "Invalid activation code."
        };
    }

    if (codeRecord.isClaimed) {
        return {
            success: false,
            message: "Activation code has already been claimed."
        };
    }

    const household = await prisma.$transaction(async (tx) => {
        const newHousehold = await tx.household.create({
            data: {
                familyName,
                city
            }
        });

        await tx.activationCode.update({
            where: {
                id: codeRecord.id
            },
            data: {
                isClaimed: true,
                householdId: newHousehold.id
            }
        });

        return newHousehold;
    });

    return {
        success: true,
        message: "Household created successfully.",
        household
    };
}

export async function createOwnerService({
    householdId,
    firstName,
    lastName,
    email,
    password
}) {
    if (
        !householdId ||
        !firstName ||
        !lastName ||
        !email ||
        !password
    ) {
        return {
            success: false,
            message: "All owner fields are required."
        };
    }

    const household = await prisma.household.findUnique({
        where: {
            id: Number(householdId)
        }
    });

    if (!household) {
        return {
            success: false,
            message: "Household not found."
        };
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        return {
            success: false,
            message: "A user with this email already exists."
        };
    }

    const existingOwner = await prisma.householdMember.findFirst({
        where: {
            householdId: Number(householdId),
            role: "OWNER"
        }
    });

    if (existingOwner) {
        return {
            success: false,
            message: "This household already has an owner."
        };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const owner = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                firstName,
                lastName,
                email,
                passwordHash,
                isVerified: true
            }
        });

        await tx.householdMember.create({
            data: {
                userId: newUser.id,
                householdId: Number(householdId),
                role: "OWNER"
            }
        });

        return newUser;
    });

    return {
        success: true,
        message: "Owner account created successfully.",
        owner: {
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            householdId: Number(householdId),
            role: "OWNER"
        }
    };
}