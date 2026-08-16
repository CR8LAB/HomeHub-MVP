import prisma from "../config/prisma.js";

export async function getAgencyDashboardService(agencyId) {
  const normalizedAgencyId = Number(agencyId);

  const [totalCodes, activatedCodes, availableCodes, recentActivations] =
    await Promise.all([
      prisma.activationCode.count({
        where: {
          agencyId: normalizedAgencyId,
        },
      }),

      prisma.activationCode.count({
        where: {
          agencyId: normalizedAgencyId,
          isClaimed: true,
        },
      }),

      prisma.activationCode.count({
        where: {
          agencyId: normalizedAgencyId,
          isClaimed: false,
          isEnabled: true,
        },
      }),

      prisma.activationCode.findMany({
        where: {
          agencyId: normalizedAgencyId,
          isClaimed: true,
          householdId: {
            not: null,
          },
        },

        include: {
          household: true,
        },

        orderBy: {
          claimedAt: "desc",
        },

        take: 5,
      }),
    ]);

  return {
    success: true,

    dashboard: {
      totalCodes,
      activatedCodes,
      availableCodes,

      totalHouseholds: activatedCodes,

      recentActivations: recentActivations.map((activationCode) => ({
        id: activationCode.id,
        code: activationCode.code,
        claimedAt: activationCode.claimedAt,

        household: {
          id: activationCode.household.id,

          familyName: activationCode.household.familyName,

          city: activationCode.household.city,
        },
      })),
    },
  };
}
