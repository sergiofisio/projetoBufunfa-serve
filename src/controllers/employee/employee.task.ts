import { Request, Response } from "express";
import { createOrUpdate, deleteOne, findFirst, findMany, findUnique } from "../../prismaFunctions/prisma";

const takeTask = async (req: Request, res: Response): Promise<any> => {
    const id = req.user?.id;
    let message: string = "Tarefas já cadastradas para este Funcionario"

    try {
        const allTasks = await findMany('task');
        allTasks.map(async (task: any): Promise<any> => {

            const taskInTasks = await findFirst('employeeTasks', { employeeId: Number(id), taskId: task.id });

            if (taskInTasks) {
                return
            } else {
                await createOrUpdate('employeeTasks', { taskId: task.id, employeeId: Number(id) });
                message = "Tarefas adicionada com sucesso"
            }
        })

        return res.status(200).json({ mensagem: message });
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