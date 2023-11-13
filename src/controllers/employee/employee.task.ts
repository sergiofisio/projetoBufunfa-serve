import { Request, Response } from "express";
import { createOrUpdate, deleteOne, findFirst, findMany, findUnique } from "../../prismaFunctions/prisma";
import { CustomError } from './../../class/class';

const takeTask = async (req: Request, res: Response): Promise<any> => {
    const id = req.user?.id;
    const { companyId } = req.params;

    try {
        const allExpenses = await findMany('companyExpenses');

        const allTasks = await findMany('companyTasks');

        if (!allTasks.length) res.json({ mensagem: "Nenhuma Tarefa cadastrada" });

        let message: string;
        let taskAdded = false;

        await Promise.all(allExpenses.map(async (expense: any): Promise<any> => {
            if (expense.companyId !== Number(companyId)) return;

            const taskInTasks = await findFirst('employeeExpenses', { employeeId: Number(id), expenseId: expense.id });

            if (taskInTasks) {
                return;
            } else {
                await createOrUpdate('employeeExpenses', { expenseId: expense.expenseId, employeeId: Number(id) });
                taskAdded = true;
            }
        }));

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
            message = "Tarefas e despesas adicionadas com sucesso";
        } else {
            message = "Todas tarefas e/ou despesas ja foram adicionadas";
        }

        return res.status(200).json({ mensagem: message });

    } catch (error: any) {
        console.log(error);

        return res.status(error.status).json({ error: error.message });
    }
}

const updateEmployeeTask = async (req: Request, res: Response): Promise<any> => {
    const { taskId, statusId } = req.params;
    const id = req.user?.id;

    try {
        const taskInTasks = await findFirst('employeeTasks', { employeeId: Number(id), taskId: Number(taskId) });

        if (!taskInTasks) throw new CustomError("Tarefa não cadastrada para este Funcionario", 401);

        await createOrUpdate('employeeTasks', { statusTaskId: statusId }, taskInTasks.id);

        res.status(200).json({ mensagem: "Tarefa atualizada com sucesso" });

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

module.exports = { takeTask, updateEmployeeTask, deleteTaskEmployee }