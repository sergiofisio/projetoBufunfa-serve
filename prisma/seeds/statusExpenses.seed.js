const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function statusExpense() {
  await prisma.statusExpense.createMany({
    data: [{ status: "a pagar" }, { status: "pago" }],
  });
}

module.exports = statusExpense;
