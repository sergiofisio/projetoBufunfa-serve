import { CustomError } from "../../class/class";
import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const hireEmployee = async (req: Request, res: Response): Promise<any> => {
    const { employeeId, companyId } = req.params;
    const type = req.user?.type;

    try {
        if (type !== "ceo") {
            throw new CustomError("Você não tem acesso a esta funcionalidade", 403);
        }

        const findEmployeeInCompany = await findFirst("companyEmployees", { employeeId: Number(employeeId), companyId: Number(companyId) });

        if (findEmployeeInCompany) {
            throw new CustomError("Este funcionário já está contratado na empresa", 400);
        }

        const updateEmployee = await createOrUpdate("companyEmployees", { employeeId: Number(employeeId), companyId: Number(companyId) });

        console.log({ updateEmployee });
        res.json({ mensagem: "Funcionario contratado com sucesso" });
    } catch (error: any) {
        res.status(error.status).json({ error: error.message });
    }
}

module.exports = { hireEmployee }