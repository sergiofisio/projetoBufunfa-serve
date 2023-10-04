import { Request, Response } from "express";
import { findUnique } from "../../prismaFunctions/prisma";
import { User } from "@src/interface/user";
import { CustomError } from './../../class/class';

const { verifyInput } = require("../../functions/verify");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

interface CustomRequest extends Request {
    user: User
}

const login = async (req: CustomRequest, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const { table } = req.params

    try {
        const verifyResult = await verifyInput({ email, password });

        if (verifyResult) throw new CustomError(verifyResult, 400);

        const user = await findUnique(table, { email });

        if (!user) throw new CustomError("Email e/ou Senha incorretos", 403);

        const passwordIsValid = compareSync(password, user.password);

        if (!passwordIsValid) throw new CustomError("Email e/ou Senha incorretos", 403);
        delete user.password
        delete user.recoveryPassword

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ user, token });
    } catch (error: any) {
        if (error.missingInput)
            return res.status(error.status).json({ missingInput: error.missingInput });

        return res.status(error.status).json({ error: error.message });
    }
};

module.exports = { login };