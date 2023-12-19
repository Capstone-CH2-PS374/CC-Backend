const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.Category.createMany({
    data: [
      { categoryId: 1, category: "Pet and Animal Service" },
      { categoryId: 2, category: "Healthcare" },
      { categoryId: 3, category: "Youth Development" },
      { categoryId: 4, category: "Enviromental" },
      { categoryId: 5, category: "Event Organizer" },
      { categoryId: 6, category: "IT" },
    ],
  });
  console.log({ category });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
