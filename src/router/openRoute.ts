const { login } = require("../controllers/user/user.login");
import { Request, Response } from "express";
import register from "../controllers/user/user.register";
import { sendRecoveryEmail } from "../controllers/user/user.recovery";
import { resetPassword } from "../controllers/user/user.resetPassword";

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  res.send("Servidor inicializado");
});

route.post("/recovery", sendRecoveryEmail);
route.patch("/recovery", resetPassword);
route.post("/register/:table", register);
route.post("/login/:table", login);

module.exports = route;
