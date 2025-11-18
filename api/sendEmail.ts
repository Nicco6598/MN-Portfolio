import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import "dotenv/config";

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { email, message, selectedProject } = req.body;

  // Configura il trasportatore SMTP di Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true per 465, false per altre porte
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } satisfies SMTPTransport.Options);

  // Configura le opzioni dell'email
  const mailOptions = {
    from: `"Portfolio Modulo Contatti" <${process.env.SMTP_USER}>`,
    to: 'nicco6598@gmail.com', // Cambia con la tua email
    subject: 'Nuovo messaggio dal sito web',
    text: `Email: ${email}\n\nMessaggio:\n${message}\n\nProgetto Selezionato: ${selectedProject || 'Nessun progetto selezionato'}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Messaggio inviato: %s', info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error);
    res.status(500).json({ success: false, error: 'Errore durante l\'invio dell\'email' });
  }
}

module.exports = sendEmail;
