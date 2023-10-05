import { createOrUpdate, prisma } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

export async function resetPassword(req: Request, res: Response) {
  try {
    const { password } = req.body;
    const { table, email, recoveryToken } = req.params

    const findUser = await prisma[table].findUnique({ where: { email } });

    if (!findUser) {
      throw new CustomError("Usuário não encontrado", 400);
    }

    if (!recoveryToken) {
      throw new CustomError("Token Inválido", 402);
    }

    if (findUser.recoveryPassword !== recoveryToken) {
      throw new CustomError("Token Inválido", 402);
    }

    await createOrUpdate(
      table,
      { ...findUser, password, recoveryPassword: null },
      findUser.id
    );

    // await createOrUpdate({
    //   where: { email },
    //   data: {

    //   },
    // });

    return res.status(200).json({ message: "Senha atualizada com sucesso" });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.messag });
  }
}
