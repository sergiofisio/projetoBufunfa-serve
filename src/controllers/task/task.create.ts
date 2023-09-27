import { createOrUpdate, deleteOne, findFirst, findMany, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

async function createTask(req: Request, res: Response): Promise<any> {
    const data = req.body;

    try {
        const findTask = await findFirst("task", { title: { contains: data.title, } });

        if (findTask) throw new Error("Tarefa ja foi criada");

        const task = await createOrUpdate("task", data);

        res.status(201).json({ mensagem: "Tarefa criada com sucesso" });

    } catch (error: any) {
        console.log(error);

        res.status(400).json({ mensagem: error.message });

    }
}

module.exports = { createTask }