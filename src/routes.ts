const express = require('express');
import { Request, Response, NextFunction } from "express";
const { verifyToken } = require("./middleware/auth");

const allRoutes = express()

allRoutes.use(express.json())

allRoutes.use((req: Request, _: Response, next: NextFunction) => {
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log({ url, metodo: req.method });
  next();
});

allRoutes.use(require("./router/openRoute"));

// allRoutes.use(verifyToken)

// allRoutes.use(require("./router/authRoute"));

module.exports = allRoutes;