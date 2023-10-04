import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express"
import { CustomError } from '../../class/class';

const updateCompany = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const { companyId } = req.params;
    const type = req.user?.type;

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para esta funcionalidade!", 403);

        const findCompany = await findUnique("company", { id: Number(companyId) });

        if (!findCompany) throw new CustomError("Empresa não encontrada", 404);

        await createOrUpdate("company", { ...data }, Number(companyId));

        res.json({ mensagem: "Empresa atualizada com sucesso" });
    } catch (error: any) {
        res.status(error.status).json({ error: error.message });
    }
}
module.exports = { updateCompany }