import { createOrUpdate, deleteOne, findFirst, findMany, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

async function createTask(req: Request, res: Response): Promise<any> {
    const data = req.body;
    const type = req.user?.type
    const { companyId } = req.params

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para criar tarefas", 403);
        const findTask = await findFirst("task", {
            AND: [
                { title: { contains: data.title } },
                { companyId: { equals: Number(companyId) } }
            ]
        });

        if (findTask) throw new CustomError("Tarefa ja foi criada", 401);

        await createOrUpdate("task", { ...data, companyId: (Number(companyId)) });

        res.status(201).json({ mensagem: "Tarefa criada com sucesso" });

    } catch (error: any) {

        res.status(error.status).json({ mensagem: error.message });

    }
}

module.exports = { createTask }