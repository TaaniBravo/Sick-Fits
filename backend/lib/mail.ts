import { createTransport } from "nodemailer";

const transport = createTransport({
  //@ts-ignore or any
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string): string => {
    return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>😘, Taani Maama</p>
    </div>
    `
}

interface MailResponse {
    message: string;
}

export const sendPasswordResetEmail = async (resetToken: string, to: string): Promise<void> => {
  // email the user a token
  const info = (await transport.sendMail({
      to,
      from: "taani@sickfits.com",
      subject: 'Your password reset token',
      html: makeANiceEmail(`Your password reset token is here!
      <a href=${process.env.FRONTEND_URL}/reset?token=${resetToken}>
      Click here to reset</a>
      `)
  })) as MailResponse;
}