-- CreateTable
CREATE TABLE "empresa" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slogan" TEXT,
    "descricao" TEXT,
    "cnpj" TEXT NOT NULL,
    "logo" TEXT,
    "background" TEXT,
    "salario" INTEGER,
    "ceoId" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "codRecSenha" TEXT,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CEO" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "codRecSenha" TEXT,

    CONSTRAINT "CEO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresa_email_key" ON "empresa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CEO_email_key" ON "CEO"("email");

-- AddForeignKey
ALTER TABLE "empresa" ADD CONSTRAINT "empresa_ceoId_fkey" FOREIGN KEY ("ceoId") REFERENCES "CEO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
