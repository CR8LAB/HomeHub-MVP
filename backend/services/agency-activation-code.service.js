import prisma from "../config/prisma.js";

export async function getAgencyActivationCodesService(agencyId) {
  const codes = await prisma.activationCode.findMany({
    where: {
      agencyId: Number(agencyId),
    },

    include: {
      household: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    success: true,

    activationCodes: codes.map((code) => ({
      id: code.id,
      code: code.code,

      isClaimed: code.isClaimed,
      isEnabled: code.isEnabled,

      createdAt: code.createdAt,
      claimedAt: code.claimedAt,

      household: code.household
        ? {
            id: code.household.id,
            familyName: code.household.familyName,
            city: code.household.city,
          }
        : null,
    })),
  };
}
