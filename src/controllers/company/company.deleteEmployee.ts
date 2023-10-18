import {
  createOrUpdate,
  deleteOne,
  findFirst,
  findUnique,
} from "../../prismaFunctions/prisma";
import { CustomError } from "../../class/class";
import { Request, Response } from "express";

const deleteEmployee = async (req: Request, res: Response): Promise<any> => {
  const { employeeId, companyId } = req.params;
  const type = req.user?.type;

  console.log({ employeeId, companyId });


  try {
    if (type !== "ceo")
      throw new CustomError("Não tem permissão para esta funcionalidade", 403);

    const findEmployeeInCompany = await findFirst("companyEmployees", {
      employeeId: Number(employeeId),
      companyId: Number(companyId),
    });

    if (!findEmployeeInCompany)
      throw new CustomError("Funcionário não encontrado", 404);


    await deleteOne(
      "companyEmployees",
      Number(findEmployeeInCompany.id)
    );

    res.status(202).json({
      message: "Funcionário excluído com sucesso",
    })
  } catch (error: any) {
    res.status(error.status).json({ error: error.message });
  }
};

module.exports = {
  deleteEmployee,
};
