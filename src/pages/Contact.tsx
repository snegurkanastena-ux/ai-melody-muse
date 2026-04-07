import React, { useState } from 'react';
import { Send, Mail, MessageSquare, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msgs = JSON.parse(localStorage.getItem('melano_messages') || '[]');
    msgs.push({ ...form, date: new Date().toISOString(), id: Date.now().toString() });
    localStorage.setItem('melano_messages', JSON.stringify(msgs));
    setSubmitted(true);
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
            <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
              <Mail className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display font-semibold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">melano@example.com</p>
            </div>
            <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
              <Send className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display font-semibold">Telegram</h3>
              <p className="mt-1 text-sm text-muted-foreground">@melano_music</p>
            </div>
            <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
              <MessageSquare className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display font-semibold">Музыкальные платформы</h3>
              <p className="mt-1 text-sm text-muted-foreground">Скоро появятся ссылки на стриминговые площадки</p>
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
