import { Request, Response } from "express";
import { createOrUpdate, deleteOne, findFirst, findUnique } from "../../prismaFunctions/prisma";

const takeTask = async (req: Request, res: Response): Promise<any> => {
    const { taskId } = req.params;
    const id = req.user?.id;

    try {
        const task = await findUnique('task', { id: Number(taskId) });

        if (!task) throw new Error("Tarefa não encontrado");

        const taskInTasks = await findFirst('employeeTasks', { taskId: task.id });

        if (taskInTasks) throw new Error("Funcionario ja tem essa tarefa");

        await createOrUpdate('employeeTasks', { taskId: task.id, employeeId: Number(id) });

        res.status(200).json({ mensagem: "Tarefa adicionada com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
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