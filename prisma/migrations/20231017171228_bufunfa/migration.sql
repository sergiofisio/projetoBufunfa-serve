-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slogan" TEXT,
    "description" TEXT,
    "cnpj" TEXT NOT NULL,
    "logo" TEXT,
    "background" TEXT,
    "salary" INTEGER DEFAULT 0,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

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
    "salary" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "companyEmployees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companyTasks" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER,
    "companyId" INTEGER,

    CONSTRAINT "companyTasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companyExpenses" (
    "id" SERIAL NOT NULL,
    "expenseId" INTEGER,
    "companyId" INTEGER,

    CONSTRAINT "companyExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companyLoans" (
    "id" SERIAL NOT NULL,
    "loanId" INTEGER,
    "companyId" INTEGER,

    CONSTRAINT "companyLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ceo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "photo" TEXT,
    "password" TEXT NOT NULL,
    "recoveryPassword" TEXT,
    "type" TEXT DEFAULT 'ceo',

    CONSTRAINT "ceo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "photo" TEXT,
    "password" TEXT NOT NULL,
    "recoveryPassword" TEXT,
    "type" TEXT DEFAULT 'employee',

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
    "taskId" INTEGER,
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
    "type" TEXT NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employeeExpenses" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER,
    "expenseId" INTEGER NOT NULL,
    "statusExpenseId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "employeeExpenses_pkey" PRIMARY KEY ("id")
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
    "dueDate" INTEGER NOT NULL,
    "interestRate" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employeeLoans" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER,
    "loanId" INTEGER,
    "accepted" BOOLEAN,

    CONSTRAINT "employeeLoans_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "statusTask_status_key" ON "statusTask"("status");

-- CreateIndex
CREATE UNIQUE INDEX "statusExpense_status_key" ON "statusExpense"("status");

-- AddForeignKey
ALTER TABLE "companyCeos" ADD CONSTRAINT "companyCeos_ceoId_fkey" FOREIGN KEY ("ceoId") REFERENCES "ceo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyCeos" ADD CONSTRAINT "companyCeos_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyEmployees" ADD CONSTRAINT "companyEmployees_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyEmployees" ADD CONSTRAINT "companyEmployees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyTasks" ADD CONSTRAINT "companyTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyTasks" ADD CONSTRAINT "companyTasks_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyExpenses" ADD CONSTRAINT "companyExpenses_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyExpenses" ADD CONSTRAINT "companyExpenses_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyLoans" ADD CONSTRAINT "companyLoans_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companyLoans" ADD CONSTRAINT "companyLoans_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeTasks" ADD CONSTRAINT "employeeTasks_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeTasks" ADD CONSTRAINT "employeeTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeTasks" ADD CONSTRAINT "employeeTasks_statusTaskId_fkey" FOREIGN KEY ("statusTaskId") REFERENCES "statusTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeExpenses" ADD CONSTRAINT "employeeExpenses_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeExpenses" ADD CONSTRAINT "employeeExpenses_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeExpenses" ADD CONSTRAINT "employeeExpenses_statusExpenseId_fkey" FOREIGN KEY ("statusExpenseId") REFERENCES "statusExpense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeLoans" ADD CONSTRAINT "employeeLoans_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeLoans" ADD CONSTRAINT "employeeLoans_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
