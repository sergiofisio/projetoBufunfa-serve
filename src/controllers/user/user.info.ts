import { deleteProperties } from "../../utils/functions";
import { findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const getUserInfo = async (req: Request, res: Response): Promise<any> => {
    const { table } = req.params;
    const userId = req.user?.id;
    console.log(userId);


    try {
        const include = table === 'employee'
            ? {
                company: {
                    include: { company: true }
                }, employeeTasks: {
                    include: { task: true }
                }, expenses: {
                    include: { expense: true }
                }, loans: {
                    include: { loan: true }
                },
            } : table === 'ceo' ? { companies: { include: { company: true } } } : {};

        const user = await findUnique(table, { id: Number(userId) }, include);

        if (user.companies?.length) {
            deleteProperties(user.companies, ['id', 'employeeId', 'companyId']);
        }

        if (user.company?.length) {
            deleteProperties(user.company, ['id', 'employeeId', 'companyId']);
        }

        if (user.employeeTasks?.length) {
            deleteProperties(user.employeeTasks, ['id', 'employeeId', 'taskId']);
        }

        if (user.expenses?.length) {
            deleteProperties(user.expenses, ['id', 'employeeId', 'expenseId']);
        }

        if (user.loans?.length) {
            deleteProperties(user.loans, ['id', 'employeeId', 'loanId']);
        }

        if (user.type === 'employee' && user.type !== table) {
            throw new Error('Você não tem acesso a este recurso');
        }

        delete user.password;
        delete user.recoveryPassword;

        if (!user) {
            throw new Error('Usuario não encontrado');
        }

        res.status(200).json({ [table]: user });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUserInfo };