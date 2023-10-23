import { deleteOne, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const deleteExpense = async (req: Request, res: Response): Promise<any> => {
    const { id, companyId } = req.params;

    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para esta funcionalidade", 403);

        const findExpense = await findUnique("expense", { id: Number(id) });

        if (!findExpense) throw new CustomError("Despesa não encontrada", 400);

        const findExpenseInCompany = await findFirst("companyExpenses", { expenseId: Number(id), companyId: Number(companyId) });

        await deleteOne("expense", Number(id));
        await deleteOne("companyExpenses", Number(findExpenseInCompany.id));

        res.status(202).json({ mensagem: "Despesa deletada com sucesso" });

    } catch (error: any) {
        res.status(error.status).json({ mensagem: error.message });
    }

}

module.exports = { deleteExpense }