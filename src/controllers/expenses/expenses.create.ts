import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const createExpense = async (req: Request, res: Response): Promise<any> => {
    const type = req.user?.type
    const { companyId } = req.params
    const data = req.body;

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para esta funcionalidade", 403);
        const findCompany = await findUnique("company", { id: Number(companyId) });

        if (!findCompany) throw new CustomError("Empresa não encontrada", 402);

        const [day, month, year] = data.date.split("/");
        const timestampDate = new Date(Number(year), Number(month) - 1, Number(day)).getTime();;

        const expense = await createOrUpdate("expense", { ...data, date: String(data.date) });

        await createOrUpdate("companyExpenses", { expenseId: expense.id, companyId: Number(companyId) });

        res.status(201).json({ mensagem: "Despesa criada com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(error.status).json({ error: error.message });
    }
}

module.exports = {
    createExpense
}