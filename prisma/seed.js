const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  try {
    const seedsPath = path.join(__dirname, "seeds");

    const files = fs.readdirSync(seedsPath);

    for (const file of files) {
      const seedFilePath = path.join(seedsPath, file);
      const seed = require(seedFilePath);
      await seed(prisma);
    }

    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
  }
}

seed().catch((e) => {
  console.error(e);
});
