// api/sendEmail.ts
import { NowRequest, NowResponse } from '@vercel/node';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req: NowRequest, res: NowResponse) => {
  const { email, message, selectedProject } = req.body;

  const msg = {
    to: 'your-email@example.com', // Cambia con la tua email
    from: 'your-email@example.com', // Cambia con l'email verificata su SendGrid
    subject: 'Nuovo messaggio dal sito web',
    text: `Email: ${email}\n\nMessaggio:\n${message}\n\nProgetto Selezionato: ${selectedProject || 'Nessun progetto selezionato'}`,
  };

  try {
    await sendgrid.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error);
    res.status(500).json({ success: false, error: 'Errore durante l\'invio dell\'email' });
  }
};
