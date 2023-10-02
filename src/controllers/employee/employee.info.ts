import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const employeeInfo = async (req: Request, res: Response): Promise<any> => {
    const { employeeId } = req.params;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new Error("Você não tem acesso a esta funcionalidade");

        const employeeInfo = await findUnique("employee", { id: Number(employeeId) }, {
            company: { include: { company: true } },
            employeeTasks: {
                include: {
                    tasks: true
                }
            },
            expenses: {
                include: {
                    expenses: true
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
        if (employeeInfo.company.length) {
            employeeInfo.company.forEach((company: any) => {
                delete company.id
                delete company.employeeId
                delete company.companyId
            })
        }

        if (employeeInfo.employeeTasks.length) {
            employeeInfo.employeeTasks.forEach((employeeTask: any) => {
                delete employeeTask.id
                delete employeeTask.employeeId
                delete employeeTask.taskId
            })
        }
        console.log(employeeInfo.expenses);

        if (employeeInfo.expenses.length) {
            employeeInfo.expenses.forEach((expense: any) => {
                delete expense.id
                delete expense.employeeId
                delete expense.taskId
            })
        }
        if (employeeInfo.loans.length) {
            employeeInfo.loans.forEach((loan: any) => {
                delete loan.id
                delete loan.employeeId
                delete loan.taskId
            })
        }

        res.json({ employeeInfo });

    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });

    }
}

module.exports = { employeeInfo }