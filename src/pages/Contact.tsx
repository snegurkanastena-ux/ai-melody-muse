import React, { useState } from 'react';
import { Send, Mail, MessageSquare, CheckCircle, Music } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message: text } = form;
    const phone = "";
    const message = `Email: ${email}\n\n${text}`;

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          message,
        }),
      });

      if (!res.ok) {
        console.error("send-order failed", await res.text());
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Контакты</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Давайте создадим вместе</h1>
          <p className="mt-4 text-muted-foreground">Напишите мне — и мы обсудим вашу идею</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <a href="mailto:info.melanomusic@gmail.com" className="block rounded-2xl border border-border/30 bg-card/50 p-6 transition-colors hover:border-primary/40">
              <Mail className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display font-semibold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">info.melanomusic@gmail.com</p>
            </a>
            <a href="https://t.me/melano_sounds" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-border/30 bg-card/50 p-6 transition-colors hover:border-primary/40">
              <Send className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display font-semibold">Telegram</h3>
              <p className="mt-1 text-sm text-muted-foreground">@melano_sounds</p>
            </a>
            <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
              <Music className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display font-semibold">Музыкальные платформы</h3>
              <div className="mt-3 flex flex-col gap-2">
                <a href="https://music.apple.com/us/artist/%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D0%B8%D1%8F-%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2%D0%B0/1509718473?l=ru" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Apple Music →</a>
                <a href="https://vk.ru/artist/anastasiamelnikova_mtu4ode1mjiyoa" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">VK Музыка →</a>
                <a href="https://music.yandex.ru/artist/9096774?ref_id=68155A05-5966-4C17-8D89-A956114AE282&utm_medium=copy_link" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Яндекс Музыка →</a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-primary" />
                <h3 className="font-display text-xl font-bold">Сообщение отправлено!</h3>
                <p className="mt-2 text-sm text-muted-foreground">Я отвечу вам в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-lg font-semibold">Написать мне</h3>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" placeholder="Ваше имя" />
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" placeholder="Email" />
                <textarea required rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none" placeholder="Ваше сообщение..." />
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground hover:box-glow">
                  <Send className="h-4 w-4" /> Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
