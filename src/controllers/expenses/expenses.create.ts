import { createOrUpdate } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const createExpense = async (req: Request, res: Response): Promise<any> => {
    const id = req.user?.id
    const data = req.body;
    data.employeeId = Number(id)

    try {
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