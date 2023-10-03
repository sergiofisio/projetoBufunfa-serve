import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const createExpense = async (req: Request, res: Response): Promise<any> => {
    const type = req.user?.type
    const data = req.body;

    try {
        if (type !== "ceo") throw new Error("Você não tem permissão para esta funcionalidade");
        const findCompany = await findUnique("company", { id: data.companyId });

        if (!findCompany) throw new Error("Empresa não encontrada");
        await createOrUpdate("expense", data);

        res.status(201).json({ mensagem: "Despesa criada com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createExpense
}