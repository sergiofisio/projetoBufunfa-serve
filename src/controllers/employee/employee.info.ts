import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const employeeInfo = async (req: Request, res: Response): Promise<any> => {
    const { employeeId } = req.params;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new Error("Você não tem acesso a esta funcionalidade");

        const employeeInfo = await findUnique("employee", { id: Number(employeeId) }, {
            company: { include: { company: true } },
            tasks: { include: { task: true } },
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
        console.log(error);

        res.status(400).json({ error: error.message });

    }
}

module.exports = { employeeInfo }