const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedTask() {
  const existingStatuses = await prisma.statusTask.findMany();
  const statusesToCreate = [
    { status: "a fazer" },
    { status: "enviado" },
    { status: "validar" },
    { status: "feita" },
  ].filter(
    (status) => !existingStatuses.some((s) => s.status === status.status)
  );

  if (statusesToCreate.length > 0) {
    await prisma.statusTask.createMany({
      data: statusesToCreate,
    });
  }
}

module.exports = seedTask;
