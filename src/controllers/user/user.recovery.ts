import {
  createOrUpdate,
  findUnique,
  prisma,
} from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import generateResetToken from "../../utils/generateRecoveryToken";
import { handleError } from "../../utils/zodErrorHandler";
import sendPasswordResetEmail from "../../utils/sendEmail";

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
      return res.status(400).json({ error: "Email not found" });
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

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    const { status, message } = handleError(error);
    return res.status(status).json({ message });
  }
};
