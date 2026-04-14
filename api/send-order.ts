import type { IncomingMessage, ServerResponse } from "node:http";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
    return;
  }

  let parsed: { name?: string; phone?: string; message?: string };
  try {
    parsed = JSON.parse((await readBody(req)) || "{}");
  } catch {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Invalid JSON" }));
    return;
  }

  const { name, phone, message } = parsed;

  const text = `Новая заявка:
Имя: ${name ?? ""}
Телефон: ${phone ?? ""}
Сообщение: ${message ?? ""}`;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
      }),
    },
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ status: "success" }));
}
