const { login } = require('../controllers/login');
import { Request, Response } from "express";
import createCeoController from "../controllers/createCeo";

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  res.send("Servidor inicializado");
});

route.post("/register/:table", createCeoController);
route.post("/login/:table", login)

module.exports = route;
