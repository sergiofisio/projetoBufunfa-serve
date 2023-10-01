import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express"

const addCeo = async (req: Request, res: Response): Promise<any> => {
    const id = req.user?.id;
    const { email, companyName } = req.body;
    const type = req.user?.type;
    const { companyId } = req.params;

    try {
        if (type !== "ceo") throw new Error("Você não tem permissão para esta funcionalidade");

        const findUser = await findUnique("ceo", { email });

        if (!findUser) throw new Error("Usuário não encontrado");

        const updateCompany = await createOrUpdate("companyCeos", { ceoId: Number(findUser.id), companyId: Number(companyId) });

        console.log({ updateCompany });


        res.json({ mensagem: `Ceo adicionado à empresa ${companyName} com sucesso` });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message });

    }
}

module.exports = { addCeo }