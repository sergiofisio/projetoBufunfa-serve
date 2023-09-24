/*
  Warnings:

  - You are about to drop the `CEO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "empresa" DROP CONSTRAINT "empresa_ceoId_fkey";

-- DropTable
DROP TABLE "CEO";

-- DropTable
DROP TABLE "empresa";

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slogan" TEXT,
    "description" TEXT,
    "cnpj" TEXT NOT NULL,
    "logo" TEXT,
    "background" TEXT,
    "salary" INTEGER,
    "ceoId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "recoveryPassword" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "photo" TEXT,
    "salary" INTEGER,
    "ceo" BOOLEAN NOT NULL DEFAULT false,
    "employee" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "recoveryPassword" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "value" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "employeeId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "statusEmployee" BOOLEAN NOT NULL DEFAULT false,
    "statusCeo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusTask" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "statusTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "value" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'a pagar',
    "type" TEXT NOT NULL,
    "expensesId" INTEGER NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_ceoId_fkey" FOREIGN KEY ("ceoId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_expensesId_fkey" FOREIGN KEY ("expensesId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
