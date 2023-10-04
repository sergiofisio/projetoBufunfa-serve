import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express"
import { CustomError } from '../../class/class';

const createCompany = async (req: Request, res: Response): Promise<any> => {
    let data = req.body;
    const id = req.user?.id;
    const type = req.user?.type;
    console.log(type);


    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para esta funcionalidade", 403);

        const findCompany = await findUnique("company", { cnpj: data.cnpj })

        if (findCompany) throw new CustomError("Ja existe uma empresa com esse CNPJ no nosso cadastro", 400);

        const company = await createOrUpdate("company", data);

        data = { ceoId: Number(id), companyId: company.id }

        await createOrUpdate("companyCeos", data)

        res.json({ mensagem: "Empresa criada com sucesso" });
    } catch (error: any) {
        console.log(error);

        res.status(error.status).json({ error: error.message });
    }
}
module.exports = { createCompany }