import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Send, CheckCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { name, phone, email, comment } = form;
    const message = [
      `Email: ${email}`,
      comment && `Комментарий: ${comment}`,
      items.length > 0 &&
        `Заказ:\n${items
          .map(
            (i) =>
              `${i.product.title} × ${i.quantity} — ${(i.product.price * i.quantity).toLocaleString("ru-RU")} ₽`,
          )
          .join("\n")}\nИтого: ${totalPrice.toLocaleString("ru-RU")} ₽`,
    ]
      .filter(Boolean)
      .join("\n\n");

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
        setLoading(false);
        return;
      }

      clearCart();
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-24">
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="font-display text-3xl font-bold">Заявка отправлена!</h1>
          <p className="mt-3 text-muted-foreground">Мы получили вашу заявку. Проверьте почту — отправили подтверждение.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Оформление заявки</h1>
          <p className="mt-2 text-muted-foreground">Заполните форму, и я свяжусь с вами для обсуждения деталей</p>

          {items.length > 0 && (
            <div className="mt-8 rounded-2xl border border-border/30 bg-card/50 p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ваш заказ</h3>
              <div className="mt-3 space-y-2">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.title} × {item.quantity}</span>
                    <span className="text-primary">{(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
                <div className="border-t border-border/30 pt-2 flex justify-between font-display font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Имя *</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Ваше имя" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="email@example.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Телефон</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="+7 (___) ___-__-__" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Комментарий и пожелания</label>
              <textarea rows={4} value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))} className="w-full rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Расскажите о вашей идее, событии, настроении..." />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-medium text-primary-foreground transition-all disabled:cursor-not-allowed disabled:opacity-60 ${loading ? "" : "hover:box-glow"}`}
            >
              <Send className="h-4 w-4" /> {loading ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
