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

export async function updateAgencyPaymentService(agencyId, paymentStatus) {
  const allowedStatuses = ["PENDING", "PAID", "OVERDUE"];

  if (!allowedStatuses.includes(paymentStatus)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid payment status.",
    };
  }

  const agency = await prisma.agency.findUnique({
    where: {
      id: Number(agencyId),
    },
  });

  if (!agency) {
    return {
      success: false,
      statusCode: 404,
      message: "Agency not found.",
    };
  }

  const updatedAgency = await prisma.agency.update({
    where: {
      id: Number(agencyId),
    },

    data: {
      paymentStatus,
    },
  });

  return {
    success: true,
    statusCode: 200,
    message: "Agency payment status updated.",

    agency: {
      id: updatedAgency.id,
      name: updatedAgency.name,
      status: updatedAgency.status,
      paymentStatus: updatedAgency.paymentStatus,
      isActive: updatedAgency.isActive,
    },
  };
}
