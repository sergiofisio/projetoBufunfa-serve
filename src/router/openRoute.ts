const { login } = require('../controllers/user/user.login');
import { Request, Response } from "express";
import register from "../controllers/user/user.register";

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
    res.send("Servidor inicializado");
});

route.post("/register/:table", register);
route.post("/login/:table", login)

module.exports = route;
