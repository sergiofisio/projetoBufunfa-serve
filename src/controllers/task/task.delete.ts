import { deleteOne, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const deleteTask = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const type = req.user?.type

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para deletar tarefas", 403);
        const findTask = await findUnique("task", { id: Number(id) });

        if (!findTask) throw new CustomError("Tarefa não encontrada", 400);

        await deleteOne("task", Number(id));

        res.status(202).json({ mensagem: "Tarefa deletada com sucesso" });

    } catch (error: any) {
        res.status(error.status).json({ mensagem: error.message });
    }

}

module.exports = { deleteTask }