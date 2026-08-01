import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loginService({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email: normalizedEmail
        },

        include: {
            households: {
                include: {
                    household: true
                }
            }
        }
    });

    if (!user || !user.passwordHash || !user.isActive) {
        return {
            success: false,
            message: "Invalid email or password."
        };
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        return {
            success: false,
            message: "Invalid email or password."
        };
    }

    const membership = user.households[0];

    if (!membership) {
        return {
            success: false,
            message: "User is not linked to a household."
        };
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured.");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            householdId: membership.householdId,
            role: membership.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }
    );

    return {
        success: true,
        message: "Login successful.",
        token,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            householdId: membership.householdId,
            householdName: membership.household.familyName,
            role: membership.role
        }
    };
}
export async function getCurrentUserService(
    userId,
    householdId
) {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        },

        include: {
            households: {
                where: {
                    householdId: Number(householdId)
                },

                include: {
                    household: true
                }
            }
        }
    });

    if (!user || !user.isActive) {
        return {
            success: false,
            message: "User not found."
        };
    }

    const membership = user.households[0];

    if (!membership) {
        return {
            success: false,
            message: "Household membership not found."
        };
    }

    return {
        success: true,

        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,

            householdId: membership.householdId,
            householdName: membership.household.familyName,
            city: membership.household.city,

            role: membership.role
        }
    };
}