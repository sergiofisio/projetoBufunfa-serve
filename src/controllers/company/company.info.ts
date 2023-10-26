import { deleteProperties } from "../../utils/functions";
import { findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const companyInfo = async (req: Request, res: Response): Promise<any> => {
    const { companyId } = req.params;
    const type = req.user?.type;

    try {
        const company = await findUnique("company", { id: Number(companyId) }, {
            ceos: {
                include: { ceo: true }
            },
            companyEmployees: {
                include: { employee: true }
            },
            tasks: { include: { task: true } },
            expenses: { include: { expense: true } },
            loans: { include: { loan: true } },
            notify: true
        });

        if (company.ceos.length)
            deleteProperties(company.ceos, [], "ceo", ['password', 'recoveryPassword']);

        if (company.companyEmployees.length)
            deleteProperties(company.companyEmployees, [], "employee", ['password', 'recoveryPassword']);

        if (type === "employee") {
            deleteProperties(company, ['salary', 'cnpj']);
        }

        res.status(200).json({ company });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}

module.exports = { companyInfo };