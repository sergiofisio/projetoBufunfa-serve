import bcrypt from 'bcrypt';
import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express"

const updateCompany = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const companyId = req.user?.companyId;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new Error("Você não tem permissão para esta funcionalidade");

        await createOrUpdate("company", { ...data }, Number(companyId));

        res.json({ mensagem: "Empresa atualizada com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}
module.exports = { updateCompany }