/*
  Warnings:

  - You are about to drop the column `accepted` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `loan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ceo" DROP CONSTRAINT "ceo_companyId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_companyId_fkey";

-- DropForeignKey
ALTER TABLE "loan" DROP CONSTRAINT "loan_employeeId_fkey";

-- AlterTable
ALTER TABLE "loan" DROP COLUMN "accepted",
DROP COLUMN "employeeId";

-- CreateTable
CREATE TABLE "companyCeos" (
    "id" SERIAL NOT NULL,
    "ceoId" INTEGER,
    "companyId" INTEGER,

    CONSTRAINT "companyCeos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companyEmployees" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER,
    "companyId" INTEGER,

    CONSTRAINT "companyEmployees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employeeLoans" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER,
    "loanId" INTEGER,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "employeeLoans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "companyCeos" ADD CONSTRAINT "companyCeos_ceoId_fkey" FOREIGN KEY ("ceoId") REFERENCES "ceo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyCeos" ADD CONSTRAINT "companyCeos_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyEmployees" ADD CONSTRAINT "companyEmployees_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyEmployees" ADD CONSTRAINT "companyEmployees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeLoans" ADD CONSTRAINT "employeeLoans_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeLoans" ADD CONSTRAINT "employeeLoans_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
