import { createOrUpdate } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const createLoan = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const id = req.user?.id;

    try {
        await createOrUpdate("loan", { ...data, employeeId: Number(id) });

        res.status(201).json({ mensagem: "Emprestimo criado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { createLoan }