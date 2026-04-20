import React, { useState } from 'react';
import { Send, Mail, CheckCircle, FileText } from 'lucide-react';
import LeadFormModal from '@/components/LeadFormModal';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message: text } = form;
    const phone = '';
    const message = `Email: ${email}\n\n${text}`;

    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          message,
        }),
      });

      if (!res.ok) {
        console.error('send-order failed', await res.text());
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
            <button
              type="button"
              onClick={() => setLeadFormOpen(true)}
              className="interactive-card block w-full p-6 text-left"
            >
              <Mail className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display font-semibold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">info.melanomusic@gmail.com</p>
            </button>
            <a href="https://t.me/melano_sounds" target="_blank" rel="noopener noreferrer" className="interactive-card block p-6">
              <Send className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display font-semibold">Telegram</h3>
              <p className="mt-1 text-sm text-muted-foreground">@melano_sounds</p>
            </a>
            <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 shrink-0 text-primary" />
                <h3 className="font-display font-semibold leading-tight">Юр. информация</h3>
              </div>
              <div className="mt-2 text-sm leading-snug text-muted-foreground">
                <p>Мельникова Анастасия Викторовна</p>
                <p className="mt-1.5">ИНН 591111416790 • самозанятая</p>
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
      <LeadFormModal open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </section>
  );
};

export default Contact;
