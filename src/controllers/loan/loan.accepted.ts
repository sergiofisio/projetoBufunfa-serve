import { createOrUpdate, findFirst } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const acceptLoan = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const { id } = req.params
    const type = req.user?.type

    try {
        if (type !== "ceo") throw new CustomError("Você não tem acesso a esta funcionalidade", 403);

        const findLoan = await findFirst("employeeLoans", { loanId: Number(id) });

        if (!findLoan) throw new CustomError("Emprestimo não encontrado", 404);

        if (findLoan.accepted) throw new CustomError("Este empréstimo já foi aceito", 403);

        if (!findLoan.accepted) throw new CustomError("Emprestimo ja foi rejeitado", 404);

        const acceptLoan = await createOrUpdate("loan", { accepted: data.accepted }, id);

        const expense = await createOrUpdate("expense", { title: `Emprestimo de ${data.employeeName}`, description: data.description, value: Number(data.value), date: String(data.date), type: "fixo", loan: true });

        await createOrUpdate("employeeExpenses", { expenseId: Number(expense.id), employeeId: Number(data.employeeId) });

        res.status(201).json({
            mensagem: `Emprestimo ${acceptLoan.accepted ? "aceito" : "rejeitado"}`
        });
    } catch (error: any) {
        return res.status(error.status).json({ error: error.message });
    }
}

module.exports = { acceptLoan }