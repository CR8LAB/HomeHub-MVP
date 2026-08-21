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

function generateRandomSuffix(length = 6) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let suffix = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    suffix += characters[randomIndex];
  }

  return suffix;
}

export async function createAgencyActivationCodeService(agencyId) {
  const agency = await prisma.agency.findUnique({
    where: {
      id: Number(agencyId),
    },
  });

  if (!agency || !agency.isActive) {
    return {
      success: false,
      message: "Agency not found or inactive.",
    };
  }

  if (!agency.codePrefix) {
    return {
      success: false,
      message: "Agency code prefix is not configured.",
    };
  }

  let code;
  let existingCode;

  do {
    const suffix = generateRandomSuffix();

    code = `${agency.codePrefix}-${suffix}`;

    existingCode = await prisma.activationCode.findUnique({
      where: {
        code,
      },
    });
  } while (existingCode);

  const activationCode = await prisma.activationCode.create({
    data: {
      code,
      agencyId: agency.id,
      isClaimed: false,
      isEnabled: true,
    },
  });

  return {
    success: true,
    message: "Activation code created successfully.",

    activationCode,
  };
}
