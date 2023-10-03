/*
  Warnings:

  - You are about to drop the column `companyId` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `task` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `employeeExpenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expense" DROP CONSTRAINT "expense_companyId_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_companyId_fkey";

-- AlterTable
ALTER TABLE "employeeExpenses" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employeeTasks" ADD COLUMN     "companyId" INTEGER;

-- AlterTable
ALTER TABLE "expense" DROP COLUMN "companyId";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "employeeTasks" ADD CONSTRAINT "employeeTasks_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeExpenses" ADD CONSTRAINT "employeeExpenses_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
