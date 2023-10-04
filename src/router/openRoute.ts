const { login } = require('../controllers/user/user.login');
import { Request, Response } from "express";
import register from "../controllers/user/user.register";
import { resetPassword } from "../controllers/user/user.resetPassword";
import { sendRecoveryEmail } from './../controllers/user/user.recovery';

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
    res.send("Servidor inicializado");
});

route.post('/recovery', sendRecoveryEmail)
route.post("/register/:table", register);
route.post("/login/:table", login)
route.put('/resetPassword/:table/:email/recoveryToken', resetPassword)

module.exports = route;
