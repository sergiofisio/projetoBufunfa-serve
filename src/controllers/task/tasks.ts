import { findMany, findUnique } from '../../prismaFunctions/prisma';
import { Request, Response } from "express";

const getTaskInfo = async (req: Request, res: Response): Promise<any> => {
    const { taskId } = req.params;

    try {
        const task = await findUnique("task", { id: Number(taskId) });

        if (!task) throw new Error("Tarefa não encontrada");

        res.status(200).json({ task: task });

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const getAllTasks = async (req: Request, res: Response): Promise<any> => {
    try {
        const tasks = await findMany("task");
        res.status(200).json({ tasks: tasks });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getAllTasks, getTaskInfo }