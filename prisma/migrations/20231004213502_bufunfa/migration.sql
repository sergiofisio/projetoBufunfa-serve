/*
  Warnings:

  - You are about to drop the column `companyId` on the `employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee" DROP COLUMN "companyId";

-- AlterTable
ALTER TABLE "employeeLoans" ALTER COLUMN "accepted" DROP NOT NULL,
ALTER COLUMN "accepted" DROP DEFAULT;
