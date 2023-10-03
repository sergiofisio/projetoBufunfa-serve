-- AlterTable
ALTER TABLE "loan" ADD COLUMN     "companyId" INTEGER;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
