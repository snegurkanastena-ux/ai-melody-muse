import type { VercelRequest, VercelResponse } from "@vercel/node";

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

    const data = (await response.json()) as unknown;

    if (!response.ok) {
      res.status(500).json({ error: data });
      return;
    }

    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ error: "Internal error" });
  }
}
