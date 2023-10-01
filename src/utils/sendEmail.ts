import { Response } from "express";

const nodemailer = require("nodemailer");

async function sendPasswordResetEmail(email: string, resetToken: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST as string,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME as string,
      pass: process.env.EMAIL_PASSWORD as string,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "suporte.bufunfa@gmail.com",
    to: email,
    subject: "Recuperação de senha",
    html: `
        <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
        <a href="http://seusite.com/redefinir-senha?token=${resetToken}">Redefinir senha</a>
      `,
  };

  new Promise((resolve, reject) => {
    transporter
      .sendMail(mailOptions)
      .then((res: Response) => {
        return resolve(res);
      })
      .catch((err: Error) => {
        return reject(err);
      })
      .finally(() => {
        transporter.close();
      });
  });
}

export default sendPasswordResetEmail;
