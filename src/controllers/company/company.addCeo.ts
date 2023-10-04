import { CustomError } from "../../class/class";
import { createOrUpdate, findFirst, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express"

const addCeo = async (req: Request, res: Response): Promise<any> => {
    const { email, companyName } = req.body;
    const type = req.user?.type;
    const { companyId } = req.params;

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para esta funcionalidade", 403);

        const findUser = await findUnique("ceo", { email });

        if (!findUser) throw new CustomError("Usuário não encontrado", 401);

        const ceoInCompany = await findFirst("companyCeos", { ceoId: Number(findUser.id), companyId: Number(companyId) });

        if (ceoInCompany) throw new CustomError("Este ceo já está adicionado à empresa", 400);

        await createOrUpdate("companyCeos", { ceoId: Number(findUser.id), companyId: Number(companyId) });

        res.json({ mensagem: `Ceo adicionado à empresa ${companyName} com sucesso` });
    } catch (error: any) {
        res.status(error.status).json({ error: error.message });

    }
}

module.exports = { addCeo }