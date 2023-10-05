import { findMany, findUnique } from '../../prismaFunctions/prisma';
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const getFunctionInfo = async (req: Request, res: Response): Promise<any> => {
    const { companyFunction, id } = req.params;

    try {
        const info = await findUnique(companyFunction, { id: Number(id) });

        if (!info) throw new CustomError(`${companyFunction === 'task' ? 'Tarefa' : companyFunction === 'expense' ? 'Despesa' : 'Emprestimo'} não encontrada`, 400);

        res.status(200).json({ [companyFunction]: info });

    } catch (error: any) {
        console.log(error);

        res.status(error.status).json({ error: error.message });
    }
}

const getFunctionAllInfo = async (req: Request, res: Response): Promise<any> => {
    const { companyFunction } = req.params;

    try {
        const info = await findMany(companyFunction);

        if (!info) throw new CustomError(`${companyFunction === 'task' ? 'Tarefas' : companyFunction === 'expense' ? 'Despesas' : 'Emprestimos'} não encontradas`, 400);

        res.status(200).json({ [companyFunction]: info });
    } catch (error: any) {
        res.status(error.status).json({ error: error.message });
    }
}

module.exports = { getFunctionInfo, getFunctionAllInfo }