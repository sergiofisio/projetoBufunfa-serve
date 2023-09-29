import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const hireEmployee = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const type = req.user?.type;

    let companyId: number

    if (type === "ceo" || type === "employee") {
        companyId = req.user?.companyId as number
    } else {
        companyId = req.user?.id as number
    }

    try {
        if (type === "employee") throw new Error("Você não tem acesso a esta funcionalidade");

        const findEmployeeInCompany = await findFirst("employee", { companyId });

        if (findEmployeeInCompany) throw new Error("Este funcionario ja está contratado");

        const employee = await findUnique("employee", { id: Number(id) });

        if (!employee) throw new Error("Funcionário não encontrado");

        const updateEmployee = await createOrUpdate("employee", { companyId }, Number(id));
        console.log({ updateEmployee });
        res.json({ mensagem: "Funcionario contratado com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}

module.exports = { hireEmployee }