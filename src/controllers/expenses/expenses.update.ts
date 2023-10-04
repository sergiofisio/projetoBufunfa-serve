import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const updateExpense = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const data = req.body;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para esta funcionalidade", 403);

        const expense = await findUnique("expense", { id: Number(id) });

        if (!expense) throw new CustomError("Despesa não encontrada", 400);

        await createOrUpdate("expense", { ...data }, Number(id));

        res.status(201).json({ mensagem: "Despesa atualizada com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(error.status).json({ error: error.message });
    }
}

module.exports = {
    updateExpense
}