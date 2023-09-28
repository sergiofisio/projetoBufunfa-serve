import { Request, Response } from "express";
import multer from "multer";

const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.BACKBLAZE_ENDPOINT_S3);
const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.BACKBLAZE_KEYID,
        secretAccessKey: process.env.BACKBLAZE_APPLICATIONKEY,
    },
});

const uploadImg = async (req: Request, res: Response) => {
    const { table } = req.params
    const id = req.user?.id

    const imagem: any = req.file;

    try {
        if (!imagem) throw new Error("Nenhum arquivo enviado")
        const fileUpload = await s3
            .upload({
                Bucket: process.env.BACKBLAZE_BUCKET,
                Key: `${imagem.originalname}_${id}_${table}`,
                Body: imagem.buffer,
                ContentType: imagem.mimetype,
            })
            .promise();
        res.json({ fileUpload });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer o upload do arquivo" });
    }
};

module.exports = {
    uploadImg
}