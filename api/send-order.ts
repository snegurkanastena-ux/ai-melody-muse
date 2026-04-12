export const config = { runtime: 'edge' };

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  const { name, phone, message } = (await request.json()) as {
    name?: string;
    phone?: string;
    message?: string;
  };

  const text = `Новая заявка:
Имя: ${name ?? ''}
Телефон: ${phone ?? ''}
Сообщение: ${message ?? ''}`;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
      }),
    },
  );

  return new Response(JSON.stringify({ status: 'success' }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
