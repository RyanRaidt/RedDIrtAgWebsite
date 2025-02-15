import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.part.createMany({
    data: [
      { name: "Seeder Row Unit", price: 120.99 },
      { name: "Drill Disk", price: 85.5 },
      { name: "Hydraulic Hose", price: 45.75 },
    ],
  });

  console.log("✅ Sample products added!");
}

main()
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect());
