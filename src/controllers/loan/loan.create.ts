import { createOrUpdate } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const createLoan = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const id = req.user?.id;
    data.employeeId = Number(id)

    try {
        await createOrUpdate("loan", data);

        res.status(201).json({ mensagem: "Emprestimo criado com sucesso" });
    } catch (error: any) {
        console.log(error);

        return res.status(400).json({ error: error.message });
    }
}

module.exports = { createLoan }