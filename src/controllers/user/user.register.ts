import { Request, Response } from "express";
import { ceoSchema } from "../../schemas/userSchema";
import { createOrUpdate, findUnique, prisma } from "../../prismaFunctions/prisma";
import bcrypt from "bcrypt";
import { handleError } from "../../utils/zodErrorHandler";
import { CustomError } from './../../class/class';

async function register(req: Request, res: Response) {
  try {
    const { table } = req.params;
    const { name, email, password, cpf } = ceoSchema.parse(req.body);

    const findEmailinCeo = await findUnique('ceo', { email });
    const findEmailinEmployee = await findUnique('employee', { email });

    if (findEmailinCeo || findEmailinEmployee) {
      throw new CustomError("Já existe um usuário com o email cadastrado no nosso sistema", 400);
    }

    const findCpf = await prisma[table].findUnique({ where: { cpf } });
    if (findCpf) {
      throw new CustomError("Já existe um usuário com o cpf informado", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createOrUpdate(table, {
      ...req.body,
      password: hashedPassword,
    });

    return res.status(201).json({ Mensagem: "Usuário criado com sucesso" });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.message });
  }
}

export default register;
