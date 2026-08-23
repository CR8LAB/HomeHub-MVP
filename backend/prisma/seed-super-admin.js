import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("HomeHubAdmin123!", 10);

  const superAdmin = await prisma.user.upsert({
    where: {
      email: "admin@homeroots.co.za",
    },

    update: {
      firstName: "Platform",
      lastName: "Admin",
      passwordHash,
      systemRole: "SUPER_ADMIN",
      isVerified: true,
      isActive: true,
    },

    create: {
      firstName: "Platform",
      lastName: "Admin",
      email: "admin@homeroots.co.za",
      passwordHash,
      systemRole: "SUPER_ADMIN",
      isVerified: true,
      isActive: true,
    },
  });

  console.log("Super admin created:", superAdmin.email);

  console.log("System role:", superAdmin.systemRole);
}

main()
  .catch((error) => {
    console.error("Super admin seed failed:", error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
