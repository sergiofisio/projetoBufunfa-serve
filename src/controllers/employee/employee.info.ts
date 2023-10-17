import { findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const employeeInfo = async (req: Request, res: Response): Promise<any> => {
    const { employeeId } = req.params;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new CustomError("Você não tem acesso a esta funcionalidade", 403);

        const employeeInfo = await findUnique("employee", { id: Number(employeeId) }, {
            company: { include: { company: true } },
            tasks: { include: { task: { include: { companyTasks: true } } } },
            expenses: {
                include: {
                    expense: true
                }
            },
            loans: {
                include: {
                    loan: true
                }
            }
        });

        delete employeeInfo.password
        delete employeeInfo.recoveryPassword

        res.json({ employeeInfo });

    } catch (error: any) {
        res.status(error.status).json({ error: error.message });

    }
}

module.exports = { employeeInfo }