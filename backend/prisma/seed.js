import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const activationCodes = [
        { code: "HH-000001" },
        { code: "HH-000002" },
        { code: "HH-000003" },
        { code: "HH-000004" },
        { code: "HH-000005" }
    ];

    for (const activationCode of activationCodes) {
        await prisma.activationCode.upsert({
            where: {
                code: activationCode.code
            },

            update: {},

            create: {
                code: activationCode.code,
                isClaimed: false
            }
        });
    }

    console.log("Activation codes created successfully.");
}

main()
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });