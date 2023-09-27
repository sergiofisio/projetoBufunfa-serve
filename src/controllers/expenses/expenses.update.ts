import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const updateExpense = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const data = req.body;

    try {
        const expense = await findUnique("expense", { id: Number(id) });

        if (!expense) throw new Error("Despesa não encontrada");

        await createOrUpdate("expense", { ...data }, Number(id));

        res.status(201).json({ mensagem: "Despesa atualizada com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    updateExpense
}