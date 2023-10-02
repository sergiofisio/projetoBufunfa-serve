import { NextFunction, Request, Response } from "express";
import { TokenPayload, User } from "src/interface/user";
import { VerifyErrors, } from "jsonwebtoken"
import { findUnique } from "../prismaFunctions/prisma";

const jwt = require("jsonwebtoken");

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = (req.headers["authorization"] as string).split(" ")[1];

        if (!token) {
            res.status(401).json({ error: "Token não encontrado" });
        } else {
            jwt.verify(token, process.env.JWT_SECRET, async (err: VerifyErrors, decoded: TokenPayload): Promise<any> => {
                if (err) {
                    return res.status(401).json({ error: "Token inválido" });
                } else {
                    const user = await findUnique(req.originalUrl.split("/")[2], { id: decoded.id });


                    if (!user) {
                        return res.status(401).json({ error: "Token inválido" });
                    }

                    req.user = user;

                    next();
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { verifyToken };
