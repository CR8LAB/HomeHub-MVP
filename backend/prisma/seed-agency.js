import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("HomeHub123!", 10);

  // Create or find the agency
  const agency = await prisma.agency.upsert({
    where: {
      slug: "seeff-bloemfontein",
    },

    update: {
      codePrefix: "SEEFF-BFN",
    },

    create: {
      name: "Seeff Bloemfontein",
      slug: "seeff-bloemfontein",
      codePrefix: "SEEFF-BFN",
      city: "Bloemfontein",
      isActive: true,
    },
  });

  // Create or find the admin user
  const user = await prisma.user.upsert({
    where: {
      email: "admin@seeff-homehub.co.za",
    },

    update: {
      passwordHash,
      isActive: true,
    },

    create: {
      firstName: "Agency",
      lastName: "Admin",
      email: "admin@seeff-homehub.co.za",
      passwordHash,
      isVerified: true,
      isActive: true,
    },
  });

  // Link the user to Seeff Bloemfontein
  const membership = await prisma.agencyMember.upsert({
    where: {
      userId_agencyId: {
        userId: user.id,
        agencyId: agency.id,
      },
    },

    update: {
      role: "ADMIN",
    },

    create: {
      userId: user.id,
      agencyId: agency.id,
      role: "ADMIN",
    },
  });

  console.log("Agency created:", agency.name);
  console.log("Admin created:", user.email);
  console.log("Agency role:", membership.role);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
