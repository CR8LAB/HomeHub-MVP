import prisma from "../config/prisma.js";

export async function getDashboardService(householdId) {
    const id = Number(householdId);

    const [
        household,
        recentTodos,
        totalTodos,
        completedTodos,
        emergencyContacts,
        homeInfo
    ] = await prisma.$transaction([
        prisma.household.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                familyName: true,
                city: true
            }
        }),

        prisma.todo.findMany({
            where: {
                householdId: id
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3
        }),

        prisma.todo.count({
            where: {
                householdId: id
            }
        }),

        prisma.todo.count({
            where: {
                householdId: id,
                completed: true
            }
        }),

        prisma.emergencyContact.findMany({
            where: {
                householdId: id
            },
            orderBy: {
                name: "asc"
            },
            take: 3
        }),

        prisma.homeInfo.findUnique({
            where: {
                householdId: id
            },
            select: {
                id: true,
                wifiName: true
            }
        })
    ]);

    if (!household) {
        return {
            success: false,
            message: "Household not found."
        };
    }

    return {
        success: true,
        dashboard: {
            household,

            todoSummary: {
                total: totalTodos,
                completed: completedTodos,
                remaining: totalTodos - completedTodos,
                recent: recentTodos
            },

            emergencyContacts,

            homeInfo: {
                available: Boolean(homeInfo),
                wifiName: homeInfo?.wifiName ?? null
            }
        }
    };
}