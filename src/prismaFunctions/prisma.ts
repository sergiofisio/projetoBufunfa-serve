const { PrismaClient } = require("@prisma/client");

export const prisma = new PrismaClient();

class includes {
  id?: number;
  name?: string;
  ceos?: { include: { ceo: true } };
  company?: { include: { company: boolean } };
  companyEmployees?: { include: { employee: boolean } };
  employees?: boolean;
  statusExpenseId?: boolean;
  companyId?: number;
  employeeTasks?: boolean | {
    include: {
      task: boolean;
    };
  };
  tasks?: boolean | { include: { task: boolean | { include: { companyTasks: boolean } } } };
  expenses?: boolean | { include: { expense: boolean | { include: { companyExpenses: boolean } } } };
  loans?: boolean | { include: { loan: boolean } }
  notify?: boolean
  where?: any
  loanId?: number
  employeeId?: number
}

/**
 * Encontra um único registro em uma tabela específica com base em uma condição fornecida.
 * @param table O nome da tabela em que o registro será encontrado.
 * @param data Opcional. Os critérios de pesquisa para encontrar o registro, por exemplo pode ser usado id ou email.
 * @param includes Opcional. Os relacionamentos incluídos no resultado da consulta.
 * @returns O registro encontrado.
 */

export async function findUnique(
  table: string,
  data?: any,
  includes?: includes
) {

  const where = data;
  const Infos = await prisma[table].findUnique({
    where,
    include: includes ? includes : undefined,
  });
  return Infos;
}

/**
 * Função para buscar um único registro em uma tabela específica no banco de dados.
 *
 * @param table O nome da tabela do banco de dados na qual deseja buscar o registro.
 * @param includes (opcional) Um objeto com opções de inclusão de relacionamentos.
 * @returns Uma Promise que resolve para o registro encontrado.
 */

export async function findMany(table: string, includes?: includes) {
  const Infos = await prisma[table].findMany({
    include: includes ? includes : undefined,
  });
  return Infos;
}

/**
 * Cria ou atualiza um registro em uma tabela específica.
 * @param table O nome da tabela em que o registro será criado ou atualizado.
 * @param data Os dados do registro a serem criados ou atualizados.
 * @param id Opcional. O valor da chave primária do registro a ser atualizado.
 * @returns O registro criado ou atualizado.
 */

export async function createOrUpdate(table: string, data: any, id?: number | string) {

  if (id) {
    return await prisma[table].update({
      where: { id: Number(id) },
      data: { ...data },
    });
  }

  return await prisma[table].create({
    data,
  });
}

/**
 * Exclui um registro de uma tabela específica com base no valor da chave primária.
 * @param table O nome da tabela em que o registro será excluído.
 * @param id O valor da chave primária do registro a ser excluído.
 * @returns O resultado da exclusão do registro.
 */

export async function deleteOne(table: string, id: number) {
  return await prisma[table].delete({
    where: { id: Number(id) },
  });
}

/**
 * Encontra o primeiro registro em uma tabela específica com base em uma condição fornecida.
 * @param table O nome da tabela em que o registro será encontrado.
 * @param data Os critérios de pesquisa para encontrar o registro, por exemplo pode ser usado id ou email.
 * @returns O registro encontrado.
 */
export async function findFirst(table: string, data: any) {

  const Infos = await prisma[table].findFirst({
    where: data
  })

  return Infos;
}