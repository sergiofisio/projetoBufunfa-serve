-- CreateTable
CREATE TABLE "notify" (
    "id" SERIAL NOT NULL,
    "table" TEXT NOT NULL,
    "tableId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notify_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notify" ADD CONSTRAINT "notify_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notify" ADD CONSTRAINT "notify_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
