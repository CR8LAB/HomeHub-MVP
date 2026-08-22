import prisma from "../config/prisma.js";

export async function getAgencyHouseholdsService(agencyId) {
  const activationCodes = await prisma.activationCode.findMany({
    where: {
      agencyId: Number(agencyId),
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
  });

  return {
    success: true,

    households: activationCodes.map((item) => ({
      activationCodeId: item.id,
      activationCode: item.code,
      claimedAt: item.claimedAt,

      household: {
        id: item.household.id,
        familyName: item.household.familyName,
        city: item.household.city,
        createdAt: item.household.createdAt,
      },
    })),
  };
}
