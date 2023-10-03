/*
  Warnings:

  - You are about to drop the column `companyId` on the `loan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "loan" DROP CONSTRAINT "loan_companyId_fkey";

-- AlterTable
ALTER TABLE "employeeLoans" ADD COLUMN     "companyId" INTEGER;

-- AlterTable
ALTER TABLE "loan" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "employeeLoans" ADD CONSTRAINT "employeeLoans_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
