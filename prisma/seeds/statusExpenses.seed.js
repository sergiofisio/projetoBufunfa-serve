const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function statusExpense() {
  const existingStatus = await prisma.statusExpense.findMany();
  const statusToCreate = [{ status: "a pagar" }, { status: "pago" }].filter(
    (status) => !existingStatus.some((s) => s.status === status.status)
  );

  if (statusToCreate.length > 0) {
    await prisma.statusExpense.createMany({
      data: statusToCreate,
    });
  }
}

module.exports = statusExpense;
