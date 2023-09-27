import { createOrUpdate, deleteOne, findMany, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

async function updateTask(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const data = req.body;
    const type = req.user?.type

    try {
        if (type !== "ceo") throw new Error("Você não tem permissão para atualizar tarefas");
        const findTask = await findUnique("task", { id: Number(id) });

        if (!findTask) throw new Error("Tarefa não encontrada");

        await createOrUpdate("task", { ...data }, Number(id));

        res.status(202).json({ mensagem: "Tarefa atualizada com sucesso" });
    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
}

module.exports = { updateTask }