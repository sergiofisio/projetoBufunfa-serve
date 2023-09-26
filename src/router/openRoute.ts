import { Request, Response } from "express";
import createCeoController from "../controllers/createCeo";

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  res.send("Servidor inicializado");
});

route.post("/register/:table", createCeoController);

module.exports = route;
