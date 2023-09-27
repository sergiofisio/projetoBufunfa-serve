-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slogan" TEXT,
    "description" TEXT,
    "cnpj" TEXT NOT NULL,
    "logo" TEXT,
    "background" TEXT,
    "salary" INTEGER,
    "password" TEXT NOT NULL,
    "recoveryPassword" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ceo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "photo" TEXT,
    "companyId" INTEGER,
    "password" TEXT NOT NULL,
    "recoveryPassword" TEXT,

    CONSTRAINT "ceo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "photo" TEXT,
    "salary" INTEGER,
    "companyId" INTEGER,
    "password" TEXT NOT NULL,
    "recoveryPassword" TEXT,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "value" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employeeTasks" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER,
    "taskId" INTEGER NOT NULL,
    "statusTaskId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "employeeTasks_pkey" PRIMARY KEY ("id")
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
    "value" INTEGER NOT NULL,
    "statusExpenseId" INTEGER NOT NULL DEFAULT 1,
    "type" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "recorrent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusExpense" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "statusExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_email_key" ON "company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "ceo_email_key" ON "ceo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ceo_cpf_key" ON "ceo"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_cpf_key" ON "employee"("cpf");

-- AddForeignKey
ALTER TABLE "ceo" ADD CONSTRAINT "ceo_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeTasks" ADD CONSTRAINT "employeeTasks_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeTasks" ADD CONSTRAINT "employeeTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeTasks" ADD CONSTRAINT "employeeTasks_statusTaskId_fkey" FOREIGN KEY ("statusTaskId") REFERENCES "statusTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_statusExpenseId_fkey" FOREIGN KEY ("statusExpenseId") REFERENCES "statusExpense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
