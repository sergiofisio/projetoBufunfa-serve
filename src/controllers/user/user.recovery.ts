import {
  findUnique,
  prisma,
} from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import generateResetToken from "../../utils/generateRecoveryToken";
import sendPasswordResetEmail from "../../utils/sendEmail";
import { CustomError } from './../../class/class';

export const sendRecoveryEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email);
    let table = "";
    let findUser;

    const userCEO = await findUnique("ceo", { email });
    const userEmployee = await findUnique("employee", { email });

    userCEO ? (table = "ceo") : (table = "employee");

    if (userCEO) {
      table = "ceo";
      findUser = userCEO;
    } else if (userEmployee) {
      table = "employee";
      findUser = userEmployee;
    }

    if (!userCEO && !userEmployee) {
      throw new CustomError("Email não encontrado", 400);
    }

    const token = generateResetToken(email);
    await prisma[table].update({
      where: { email },
      data: {
        ...findUser,
        recoveryPassword: token,
      },
    });

    await sendPasswordResetEmail(email, token);

    return res.status(200).json({ message: "Email enviado com sucesso" });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.message });
  }
};
