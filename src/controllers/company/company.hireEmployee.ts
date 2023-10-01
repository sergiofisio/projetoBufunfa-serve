import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const hireEmployee = async (req: Request, res: Response): Promise<any> => {
    const { id, companyId } = req.params;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new Error("Você não tem acesso a esta funcionalidade");

        const findEmployeeInCompany = await findFirst("companyEmployees", { employeeId: Number(id), companyId: Number(companyId) });

        if (findEmployeeInCompany) throw new Error("Este funcionario ja está contratado na empresa");

        const updateEmployee = await createOrUpdate("companyEmployees", { employeeId: Number(id), companyId: Number(companyId) });

        console.log({ updateEmployee });
        res.json({ mensagem: "Funcionario contratado com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}

module.exports = { hireEmployee }