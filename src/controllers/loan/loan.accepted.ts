import { createOrUpdate } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const acceptLoan = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const { id } = req.params
    const type = req.user?.type

    try {
        if (type !== "ceo") throw new Error("Você não a esta funcionalidade");

        await createOrUpdate("loan", { ...data }, Number(id));

        res.status(201).json({ mensagem: "Emprestimo aceito" });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { acceptLoan }