import { deleteOne, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";
import { CustomError } from './../../class/class';

const deleteLoan = async (req: Request, res: Response): Promise<any> => {
    const { table, id } = req.params
    const type = req.user?.type

    try {
        if (type !== "ceo") throw new CustomError("Você não tem permissão para esta funcionalidade", 403);
        const loan = await findUnique("loan", { id: Number(id) });

        if (loan.value > 0 && type !== 'ceo') throw new CustomError("O emprestimo não pode ser deletado, tem certeza que você terminou de pagar?", 401);

        await deleteOne("loan", Number(id));

        res.status(201).json({ mensagem: "Emprestimo deletado com sucesso" });
    } catch (error: any) {
        return res.status(error.status).json({ error: error.message });
    }
}

module.exports = { deleteLoan }