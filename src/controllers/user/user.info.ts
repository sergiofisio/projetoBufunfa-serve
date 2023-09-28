import { findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const getUserInfo = async (req: Request, res: Response): Promise<any> => {
    const { table } = req.params;
    const id = req.user?.id;

    try {
        const include = table === 'employee' ? {
            employeeTasks: {
                include: {
                    tasks: true
                }
            },
            expenses: true
        } : {};

        const user = await findUnique(table, { id: Number(id) }, include);

        if (user.type === "employee" && user.type !== table) throw new Error("Você não tem acesso a este recurso")

        delete user.password
        delete user.recoveryPassword

        if (!user) throw new Error("Usuario não encontrado");

        res.status(200).json({ [table]: user });

    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}

module.exports = { getUserInfo };