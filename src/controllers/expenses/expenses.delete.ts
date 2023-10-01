import { deleteOne, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const deleteExpense = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const type = req.user?.type;

    try {
        const expense = await findUnique("expense", { id: Number(id) });

        if (!expense) throw new Error("Tarefa não encontrada");

        if (expense.statusExpenseId === 1 || type !== "ceo") throw new Error("A despesa não pode ser deletado, tem certeza que você pagou?");

        await deleteOne("expense", Number(id));

        res.status(202).json({ mensagem: "Despesa deletada com sucesso" });

    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }

}

module.exports = { deleteExpense }