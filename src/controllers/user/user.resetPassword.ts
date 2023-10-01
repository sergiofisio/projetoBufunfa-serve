import { handleError } from "../../utils/zodErrorHandler";
import { createOrUpdate, prisma } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

export async function resetPassword(req: Request, res: Response) {
  try {
    const { password } = req.body;
    const { email, recoveryToken } = req.query;

    const userCEO = await prisma.ceo.findUnique({ where: { email } });
    const userEmployee = await prisma.employee.findUnique({ where: { email } });

    let findUser;
    let table;

    if (userCEO) {
      table = "ceo";
      findUser = userCEO;
    } else if (userEmployee) {
      table = "employee";
      findUser = userEmployee;
    }

    if (!findUser) {
      return res.status(400).json({ error: "Email not found" });
    }

    if (!recoveryToken) {
      return res.status(400).json({ message: "Token not found" });
    }

    if (findUser.recoveryPassword !== recoveryToken) {
      return res.status(400).json({ error: "Invalid token" });
    }

    await createOrUpdate(
      table as string,
      { ...findUser, password, recoveryPassword: null },
      findUser.id
    );

    // await createOrUpdate({
    //   where: { email },
    //   data: {

    //   },
    // });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    const { status, message } = handleError(error);
    return res.status(status).json({ message });
  }
}
