import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createOrUpdate, findUnique } from "../../prismaFunctions/prisma";
import { CustomError } from './../../class/class';

const update = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const { table } = req.params;
    const id = req.user?.id;

    try {
        const user = await findUnique(table, { id: Number(id) });

        if (!user) throw new CustomError("Funcionário não encontrado", 400);

        if (Number(user.id) !== Number(id) && user.type !== table) throw new Error("Você não tem acesso a este recurso")

        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }

        await createOrUpdate(table, { ...data }, Number(id));

        res.status(202).json({ mensagem: "Usuário atualizado com sucesso" });
    } catch (error: any) {

        return res.status(error.status).json({ error: error.message });
    }
}

module.exports = { update }