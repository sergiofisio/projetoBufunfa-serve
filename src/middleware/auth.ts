import { NextFunction, Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {

    next();


};

module.exports = { verifyToken };