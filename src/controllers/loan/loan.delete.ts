import { deleteOne, findUnique } from "../../prismaFunctions/prisma";
import { Request, Response } from "express";

const deleteLoan = async (req: Request, res: Response): Promise<any> => {
    const { table, id } = req.params
    const type = req.user?.type

    try {
        const loan = await findUnique("loan", { id: Number(id) });

        if (loan.value > 0 && type !== 'ceo') throw new Error("O emprestimo não pode ser deletado, tem certeza que você terminou de pagar?");

        await deleteOne("loan", Number(id));

        res.status(201).json({ mensagem: "Emprestimo deletado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { deleteLoan }