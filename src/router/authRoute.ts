const route = require("express").Router();
import { Request, Response } from "express";

route.get("/teste/:table", (req: Request, res: Response) => {
    res.send("teste token");
})

module.exports = route;