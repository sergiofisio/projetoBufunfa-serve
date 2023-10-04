import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const createLoan = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const id = req.user?.id;

    try {
        const findCompany = await findUnique("company", { id: Number(data.companyId) });
        if (!findCompany) throw new CustomError("Empresa não encontrada", 401);

        const findLoan = await findFirst("loan", {
            AND: [
                { description: { contains: data.description } },
                { companyId: { equals: data.companyId } }
            ]
        });

        if (findLoan) throw new CustomError("Emprestimo já existente", 402);

        const loan = await createOrUpdate("loan", data);

        await createOrUpdate("employeeLoans", { employeeId: Number(id), loanId: loan.id, companyId: Number(data.companyId) });

        res.status(201).json({ mensagem: "Emprestimo criado com sucesso" });
    } catch (error: any) {

        return res.status(error.status).json({ error: error.message });
    }
}

module.exports = { createLoan }