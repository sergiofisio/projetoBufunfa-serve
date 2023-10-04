import { createOrUpdate, deleteOne, findMany, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

async function updateTask(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const data = req.body;
    const type = req.user?.type

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para atualizar tarefas", 403);
        const findTask = await findUnique("task", { id: Number(id) });

        if (!findTask) throw new CustomError("Tarefa não encontrada", 400);

        await createOrUpdate("task", { ...data }, Number(id));

        res.status(202).json({ mensagem: "Tarefa atualizada com sucesso" });
    } catch (error: any) {
        res.status(error.status).json({ mensagem: error.message });
    }
}

module.exports = { updateTask }