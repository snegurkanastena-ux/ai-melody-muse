import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

function parseBody(raw: unknown): Record<string, unknown> {
  if (raw == null) return {};
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  if (typeof raw === "object") return raw as Record<string, unknown>;
  return {};
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ success: false });
    return;
  }

  try {
    const body = parseBody(req.body);
    const name = body.name;
    const contact = body.contact;
    const message = body.message;

    const nameStr = typeof name === "string" ? name.trim() : "";
    const contactStr = typeof contact === "string" ? contact.trim() : "";
    const messageStr = typeof message === "string" ? message.trim() : "";

    if (!nameStr || !contactStr || !messageStr) {
      console.error("send-email error:", "validation", {
        hasName: Boolean(nameStr),
        hasContact: Boolean(contactStr),
        hasMessage: Boolean(messageStr),
      });
      res.status(400).json({ success: false });
      return;
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const leadsTo = process.env.LEADS_EMAIL_TO;
    const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT ?? "465");

    if (!smtpUser || !smtpPass || !leadsTo) {
      console.error("send-email error:", "missing SMTP env", {
        hasUser: Boolean(smtpUser),
        hasPass: Boolean(smtpPass),
        hasLeadsTo: Boolean(leadsTo),
      });
      res.status(500).json({ success: false });
      return;
    }

    const port =
      Number.isFinite(smtpPort) && smtpPort > 0 ? smtpPort : 465;
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    await transporter.verify();

    await transporter.sendMail({
      from: smtpUser,
      to: leadsTo,
      subject: "Новая заявка с кнопки Email — melanomusic.ru",
      text: `Имя: ${nameStr}
Контакт: ${contactStr}
Сообщение: ${messageStr}`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("send-email error:", error);
    res.status(500).json({ success: false });
  }
}
