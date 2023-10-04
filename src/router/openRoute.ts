const { login } = require('../controllers/user/user.login');
import { Request, Response } from "express";
import register from "../controllers/user/user.register";
import { resetPassword } from "../controllers/user/user.resetPassword";
import { sendRecoveryEmail } from './../controllers/user/user.recovery';

const route = require("express").Router();

route.get("*", (req: Request, res: Response) => {
    const swaggerLink = `${req.protocol}://${req.get("host")}${req.originalUrl}swaggerDocs`;
    const responseText = `Bem-vindo ao projeto Bufunfa! Visite o nosso swagger no link: <a href="${swaggerLink}">${swaggerLink}</a>`;
    res.send(responseText);
});

route.post('/recovery', sendRecoveryEmail)
route.post("/register/:table", register);
route.post("/login/:table", login)
route.put('/resetPassword/:table/:email/recoveryToken', resetPassword)

module.exports = route;
