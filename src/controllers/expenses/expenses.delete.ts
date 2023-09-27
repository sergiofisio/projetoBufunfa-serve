import { deleteOne, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const deleteTask = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const expense = await findUnique("expense", { id: Number(id) });

        if (!expense) throw new Error("Tarefa não encontrada");

        if (expense.value > 0) throw new Error("A despesa não pode ser deletado, tem certeza que você pagou?");

        await deleteOne("expense", Number(id));

        res.status(202).json({ mensagem: "Despesa deletada com sucesso" });

    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }

}

module.exports = { deleteTask }