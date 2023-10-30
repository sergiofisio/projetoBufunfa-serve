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
                { description: { contains: data.description + " - " + id } }
            ]
        });

        if (findLoan) {

            const findLoanInCompany = await findFirst("companyLoans", {
                AND: [
                    { loanId: Number(findLoan.id), companyId: Number(data.companyId) }
                ]
            })

            const findLoanInEmployee = await findFirst("employeeLoans", {
                AND: [
                    { loanId: Number(findLoan.id), employeeId: Number(id) }
                ]
            })

            if (findLoanInCompany && findLoanInEmployee) throw new CustomError("Emprestimo já existente", 402);
        }

        const loan = await createOrUpdate("loan", { description: data.description + " - " + id, interestRate: Number(data.interestRate), value: data.value, dueDate: String(data.dueDate) });

        await createOrUpdate("employeeLoans", { employeeId: Number(id), loanId: loan.id });

        await createOrUpdate("companyLoans", { companyId: Number(data.companyId), loanId: loan.id });

        await createOrUpdate("notify", { table: 'loan', tableId: loan.id, companyId: Number(data.companyId), employeeId: Number(id) });

        res.status(201).json({ mensagem: "Emprestimo criado com sucesso" });
    } catch (error: any) {
        console.log(error);

        return res.status(error.status).json({ error: error.message });
    }
}

module.exports = { createLoan }