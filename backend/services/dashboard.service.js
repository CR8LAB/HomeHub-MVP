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
            }
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

    const police = emergencyContacts.find(
        contact => contact.type === "POLICE"
    );

    const ambulance = emergencyContacts.find(
        contact => contact.type === "AMBULANCE"
    );

    const fire = emergencyContacts.find(
        contact => contact.type === "FIRE"
    );

    const security = emergencyContacts.find(
        contact => contact.type === "SECURITY"
    );

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

            quickAccess: {
                police: police?.phone ?? "",
                ambulance: ambulance?.phone ?? "",
                fire: fire?.phone ?? "",
                security: security?.phone ?? ""
            },

            homeInfo: {
                available: Boolean(homeInfo),
                wifiName: homeInfo?.wifiName ?? null
            }
        }
    };
}