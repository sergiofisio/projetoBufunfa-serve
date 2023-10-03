import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const createLoan = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const id = req.user?.id;

    try {
        const findCompany = await findUnique("company", { id: Number(data.companyId) });
        if (!findCompany) throw new Error("Empresa não encontrada");

        const findLoan = await findFirst("loan", {
            AND: [
                { description: { contains: data.description } },
                { companyId: { equals: data.companyId } }
            ]
        });

        if (findLoan) throw new Error("Emprestimo já existente");

        const loan = await createOrUpdate("loan", data);

        await createOrUpdate("employeeLoans", { employeeId: Number(id), loanId: loan.id, companyId: Number(data.companyId) });

        res.status(201).json({ mensagem: "Emprestimo criado com sucesso" });
    } catch (error: any) {
        console.log(error);

        return res.status(400).json({ error: error.message });
    }
}

module.exports = { createLoan }