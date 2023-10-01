import { findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const companyInfo = async (req: Request, res: Response): Promise<any> => {
    const { companyId } = req.params;
    const type = req.user?.type;

    try {
        const company = await findUnique("company", { id: Number(companyId) }, {
            ceos: { include: { ceo: true } },
            companyEmployees: { include: { employee: true } },
        });
        if (company.ceos.length) {
            company.ceos.forEach((ceo: any) => {
                delete ceo.id
                delete ceo.ceoId
                delete ceo.companyId
                delete ceo.ceo.password
                delete ceo.ceo.recoveryPassword
            });
        }

        if (company.companyEmployees.length) {
            company.companyEmployees.forEach((employee: any) => {
                delete employee.id
                delete employee.employeeId
                delete employee.companyId
                delete employee.employee.password
                delete employee.employee.recoveryPassword
            });
        }

        // if (type === "employee") {
        //     delete company.salary
        //     delete company.recoveryPassword
        //     delete company.cnpj
        // }

        res.status(200).json({ company });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });

    }
}

module.exports = { companyInfo };