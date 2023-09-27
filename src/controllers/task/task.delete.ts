import { deleteOne, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const deleteTask = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const type = req.user?.type

    try {
        if (type !== "ceo") throw new Error("Você não tem permissão para deletar tarefas");
        const findTask = await findUnique("task", { id: Number(id) });

        if (!findTask) throw new Error("Tarefa não encontrada");

        await deleteOne("task", Number(id));

        res.status(202).json({ mensagem: "Tarefa deletada com sucesso" });

    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }

}

module.exports = { deleteTask }