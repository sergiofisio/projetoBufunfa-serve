import { findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const employeeFind = async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new Error("Você não tem acesso a esta funcionalidade");

        const employee = await findUnique("employee", { email });

        if (!employee) throw new Error("Funcionário indicado não encontrado");

        delete employee.password;
        delete employee.recoveryPassword;

        res.json(employee);
    } catch (error: any) {
        res.status(error.status).json({ error: error.message });

    }
}

module.exports = { employeeFind }