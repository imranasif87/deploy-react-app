/*import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
// const nodemailer = require("nodemailer");


export async function sendEmail() {

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "malenefikseth@hotmail.com",
            pass: "Bruker123",
        },
        logger: true
      });
  
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Sender Name" <from@example.net>',
        to: "malenefikseth@hotmail.com",
        subject: "Hello from node",
        text: "Hello world?",
        html: "<strong>Hello world?</strong>",
        headers: { 'x-myheader': 'test header' }
      });
  
      console.log("Message sent: %s", info.response);
    } catch (error) {
      console.error(error);
    }
  }*/
