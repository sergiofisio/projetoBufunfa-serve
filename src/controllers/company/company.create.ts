import bcrypt from 'bcrypt';
import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express"

const createCompany = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const id = req.user?.id;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new Error("Você não tem permissão para esta funcionalidade");

        data.password = await bcrypt.hash(data.password, 10);

        const company = await createOrUpdate("company", data);

        const ceo = await findUnique("ceo", { id: Number(id) })

        await createOrUpdate("ceo", { ...ceo, companyId: company.id }, ceo.id)

        res.json({ mensagem: "Empresa criada com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}
module.exports = { createCompany }