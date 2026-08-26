import prisma from "../config/prisma.js";

export async function getAllAgenciesService() {
  const agencies = await prisma.agency.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      members: true,
      activationCodes: true,
    },
  });

  return {
    success: true,

    agencies: agencies.map((agency) => ({
      id: agency.id,
      name: agency.name,
      slug: agency.slug,
      codePrefix: agency.codePrefix,
      city: agency.city,

      status: agency.status,
      paymentStatus: agency.paymentStatus,
      isActive: agency.isActive,

      createdAt: agency.createdAt,

      memberCount: agency.members.length,
      activationCodeCount: agency.activationCodes.length,
    })),
  };
}
