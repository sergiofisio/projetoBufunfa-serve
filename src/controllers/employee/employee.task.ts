import { Request, Response } from "express";
import { createOrUpdate, deleteOne, findFirst, findMany, findUnique } from "../../prismaFunctions/prisma";
import { CustomError } from './../../class/class';

const takeTask = async (req: Request, res: Response): Promise<any> => {
    const id = req.user?.id;
    const { companyId } = req.params;

    try {
        const allTasks = await findMany('companyTasks');

        if (!allTasks.length) throw new CustomError("Não há tarefas cadastradas", 404);

        let message: string;
        let taskAdded = false;

        await Promise.all(allTasks.map(async (task: any): Promise<any> => {
            if (task.companyId !== Number(companyId)) return;

            const taskInTasks = await findFirst('employeeTasks', { employeeId: Number(id), taskId: task.id });

            if (taskInTasks) {
                return;
            } else {
                await createOrUpdate('employeeTasks', { taskId: task.taskId, employeeId: Number(id) });
                taskAdded = true;
            }
        }));

        if (taskAdded) {
            message = "Tarefas adicionadas com sucesso";
        } else {
            throw new CustomError("Tarefas já cadastradas para este Funcionario", 402);
        }

        return res.status(200).json({ mensagem: message });

    } catch (error: any) {
        console.log(error);

        return res.status(error.status).json({ error: error.message });
    }
}

const deleteTaskEmployee = async (req: Request, res: Response): Promise<any> => {
    const { taskId } = req.params;

    const id = req.user?.id;


    try {
        const taskInTasks = await findFirst('employeeTasks', { employeeId: Number(id), taskId: Number(taskId) });

        if (!taskInTasks) throw new Error("Tarefa não cadastrada para este Funcionario");

        await deleteOne('employeeTasks', taskInTasks.id);

        res.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
    } catch (error: any) {
        console.log(error);

        return res.status(400).json({ error: error.message });
    }
}

module.exports = { takeTask, deleteTaskEmployee }