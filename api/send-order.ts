import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { name, phone, message } = req.body ?? {};

    const text = `
Новая заявка:
Имя: ${name}
Телефон: ${phone}
Сообщение: ${message}
`;

    let telegramSent = false;
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: text,
          }),
        },
      );

      await response.json();
      telegramSent = response.ok;
    } catch {
      telegramSent = false;
    }

    let emailSent = false;
    try {
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const leadsTo = process.env.LEADS_EMAIL_TO;

      if (smtpUser && smtpPass && leadsTo) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST ?? "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT ?? "465"),
          secure: true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: smtpUser,
          to: leadsTo,
          subject: "Новая заявка с melanomusic.ru",
          text: `Имя: ${name ?? ""}
Телефон: ${phone ?? ""}
Сообщение: ${message ?? ""}`,
        });
        emailSent = true;
      }
    } catch {
      emailSent = false;
    }

    const success = telegramSent || emailSent;

    res.status(success ? 200 : 500).json({
      success,
      telegramSent,
      emailSent,
    });
  } catch {
    res.status(500).json({
      success: false,
      telegramSent: false,
      emailSent: false,
    });
  }
}
