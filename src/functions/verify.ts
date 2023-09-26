import { findUnique } from "../prismaFunctions/prisma";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const verifyInput = (inputs: any) => {
    for (let input in inputs) {
        if (!inputs[input]) {
            return { missingInput: input };
        }
    }
    return false;
};

const verifyExistEmail = async (table: string, email: string) => {
    const existEmail = await findUnique(table, email)
    if (existEmail) {
        return true;
    }

    return false;
};

module.exports = { verifyInput, verifyExistEmail };
