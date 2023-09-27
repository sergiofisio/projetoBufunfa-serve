import { createOrUpdate, deleteOne, findMany, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

async function updateTask(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const data = req.body;

    try {
        const findTask = await findUnique("Task", { id: Number(id) });

        if (!findTask) throw new Error("Tarefa não encontrada");

        await createOrUpdate("Task", { ...data }, Number(id));

        res.status(202).json({ mensagem: "Tarefa atualizada com sucesso" });
    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
}

module.exports = { updateTask }