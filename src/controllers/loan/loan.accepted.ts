import { createOrUpdate } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const acceptLoan = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const { id } = req.params
    const type = req.user?.type

    try {
        if (type !== "ceo") throw new CustomError("Você não tem acesso a esta funcionalidade", 403);

        await createOrUpdate("loan", { ...data }, Number(id));

        const expense = await createOrUpdate("expense", { ...data, date: String(data.date), loan: true });

        await createOrUpdate("companyExpenses", { expenseId: expense.id, companyId: Number(data.companyId) });

        res.status(201).json({
            mensagem: `Emprestimo ${data.accepted ? "aceito" : "rejeitado"}`
        });
    } catch (error: any) {
        return res.status(error.status).json({ error: error.message });
    }
}

module.exports = { acceptLoan }