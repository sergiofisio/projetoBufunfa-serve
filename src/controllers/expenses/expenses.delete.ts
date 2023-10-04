import { deleteOne, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const deleteExpense = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para esta funcionalidade", 403);

        const expense = await findUnique("expense", { id: Number(id) });

        if (!expense) throw new CustomError("Tarefa não encontrada", 400);

        await deleteOne("expense", Number(id));

        res.status(202).json({ mensagem: "Despesa deletada com sucesso" });

    } catch (error: any) {
        res.status(error.status).json({ mensagem: error.message });
    }

}

module.exports = { deleteExpense }