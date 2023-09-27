import { Request, Response } from "express";
import { ceoSchema } from "../schemas/userSchema";
import { createOrUpdate, findUnique, prisma } from "../prismaFunctions/prisma";
import bcrypt from "bcrypt";
import { handleError } from "../utils/zodErrorHandler";

async function register(req: Request, res: Response) {
  try {
    const { table } = req.params;
    const { name, email, password, cpf } = ceoSchema.parse(req.body);

    const findEmail = await findUnique(table, { email });

    if (findEmail) {
      return res
        .status(400)
        .json({ message: "Já existe um usuário com o email informado" });
    }

    const findCpf = await prisma[table].findUnique({ where: { cpf } });
    if (findCpf) {
      return res
        .status(400)
        .json({ message: "Já existe um usuário com o cpf informado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createCeo = await createOrUpdate(table, {
      ...req.body,
      password: hashedPassword,
    });

    return res.status(201).json({ Mensagem: "Usuário criado com sucesso" });
  } catch (error) {
    const { status, message } = handleError(error);
    return res.status(status).json({ message });
  }
}

export default register;
