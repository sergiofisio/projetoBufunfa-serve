import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express"

const addCeo = async (req: Request, res: Response): Promise<any> => {
    const { email, companyName } = req.body;
    const type = req.user?.type;
    const { companyId } = req.params;

    try {
        if (type !== "ceo") throw new Error("Você não tem permissão para esta funcionalidade");

        const findUser = await findUnique("ceo", { email });

        if (!findUser) throw new Error("Usuário não encontrado");

        const ceoInCompany = await findFirst("companyCeos", { ceoId: Number(findUser.id), companyId: Number(companyId) });

        if (ceoInCompany) throw new Error("Este ceo já está adicionado à empresa");

        const updateCompany = await createOrUpdate("companyCeos", { ceoId: Number(findUser.id), companyId: Number(companyId) });

        res.json({ mensagem: `Ceo adicionado à empresa ${companyName} com sucesso` });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });

    }
}

module.exports = { addCeo }