/*
  Warnings:

  - You are about to drop the column `statusTaskId` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_statusTaskId_fkey";

-- AlterTable
ALTER TABLE "employeeTasks" ADD COLUMN     "statusTaskId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "statusTaskId";

-- AddForeignKey
ALTER TABLE "employeeTasks" ADD CONSTRAINT "employeeTasks_statusTaskId_fkey" FOREIGN KEY ("statusTaskId") REFERENCES "statusTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
