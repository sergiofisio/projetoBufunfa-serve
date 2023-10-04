import { handleError } from "../../utils/zodErrorHandler";
import { createOrUpdate, prisma } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

export async function resetPassword(req: Request, res: Response) {
  try {
    const { password } = req.body;
    const { table, email, recoveryToken } = req.params

    const findUser = await prisma[table].findUnique({ where: { email } });

    if (!findUser) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    if (!recoveryToken) {
      return res.status(400).json({ message: "Token Inválido" });
    }

    if (findUser.recoveryPassword !== recoveryToken) {
      return res.status(400).json({ error: "Token Inválido" });
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
  } catch (error) {
    console.log(error);
    const { status, message } = handleError(error);
    return res.status(status).json({ message });
  }
}
