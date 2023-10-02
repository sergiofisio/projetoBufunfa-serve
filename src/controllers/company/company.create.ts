import bcrypt from 'bcrypt';
import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express"

const createCompany = async (req: Request, res: Response): Promise<any> => {
    let data = req.body;
    const id = req.user?.id;
    const type = req.user?.type;
    console.log(type);


    try {
        if (type !== "ceo") throw new Error("Você não tem permissão para esta funcionalidade");

        const findCompany = await findUnique("company", { cnpj: data.cnpj })

        if (findCompany) throw new Error("Ja existe uma empresa com esse CNPJ no nosso cadastro");

        const company = await createOrUpdate("company", data);

        data = { ceoId: Number(id), companyId: company.id }

        await createOrUpdate("companyCeos", data)

        res.json({ mensagem: "Empresa criada com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}
module.exports = { createCompany }