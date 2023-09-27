import { Request, Response } from "express";
import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { create } from "domain";

const takeTask = async (req: Request, res: Response): Promise<any> => {
    const { idTask, employeeId } = req.params;

    console.log({ idTask, employeeId });


    try {
        const task = await findUnique('task', { id: Number(idTask) });

        if (!task) throw new Error("Tarefa não encontrado");

        const taskInTasks = await findFirst('EmployeeTasks', { taskId: task.id });

        if (taskInTasks) throw new Error("Funcionario ja tem essa tarefa");

        await createOrUpdate('EmployeeTasks', { taskId: task.id, employeeId: Number(employeeId) });

        res.status(200).json({ mensagem: "Tarefa adicionada com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { takeTask }