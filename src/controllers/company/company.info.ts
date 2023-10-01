import { findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const companyInfo = async (req: Request, res: Response): Promise<any> => {
    const { companyId } = req.params;
    const type = req.user?.type;

    try {
        const company = await findUnique("company", { id: Number(companyId) }, {
            ceos: true,
            employees: true,
        });

        company.ceos.forEach((ceo: any) => {
            delete ceo.password
            delete ceo.recoveryPassword
        });

        company.employees.forEach((employee: any) => {
            delete employee.password
            delete employee.recoveryPassword
        })

        delete company.password;

        if (type === "employee") {
            delete company.salary
            delete company.recoveryPassword
            delete company.cnpj
        }

        res.status(200).json({ company });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });

    }
}

module.exports = { companyInfo };