const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedTask() {
  await prisma.statusTask.createMany({
    data: [
      { status: "a fazer" },
      { status: "enviado" },
      { status: "validar" },
      { status: "feita" },
    ],
  });
}

module.exports = seedTask;
