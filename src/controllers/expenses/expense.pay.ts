import { Request, Response } from "express";
import { CustomError } from './../../class/class';
import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";

const payExpense = async (req: Request, res: Response): Promise<any> => {
    const { id, companyId } = req.params;
    const data = req.body;
    const user = req.user;

    try {

        const employeeExpenses = await findFirst("employeeExpenses", { expenseId: Number(id), employeeId: Number(companyId) });

        const expense = await findUnique("expense", { id: Number(employeeExpenses.expenseId) });

        const expenseUpdate = await createOrUpdate("employeeExpenses", { ...data }, employeeExpenses.id)

        const company = await findFirst("companyEmployees", { employeeId: Number(user?.id), companyId: Number(companyId) });

        console.log(Number(company.salary), Number(expense.value));

        const salary = Number(company.salary) - Number(expense.value)

        await createOrUpdate("companyEmployees", {
            salary
        }, Number(company.id));


        res.json({ expenseUpdate });

    } catch (error: any) {
        console.log(error);

        res.status(error.status).json({ error: error.message });

    }
}

module.exports = { payExpense }