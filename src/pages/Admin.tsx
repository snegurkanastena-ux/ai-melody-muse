import React, { useState, useEffect } from 'react';
import { Shield, Package, MessageSquare, FileText, LogIn, Trash2 } from 'lucide-react';

interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
  items: { title: string; qty: number; price: number }[];
  total: number;
  date: string;
  status: string;
}

const Admin: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [tab, setTab] = useState<'orders' | 'messages'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<{ id: string; name: string; email: string; message: string; date: string }[]>([]);

  useEffect(() => {
    if (authed) {
      setOrders(JSON.parse(localStorage.getItem('melano_orders') || '[]'));
      setMessages(JSON.parse(localStorage.getItem('melano_messages') || '[]'));
    }
  }, [authed]);

  const updateOrderStatus = (id: string, status: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem('melano_orders', JSON.stringify(updated));
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem('melano_orders', JSON.stringify(updated));
  };

  if (!authed) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-24">
        <div className="w-full max-w-sm rounded-2xl border border-border/30 bg-card/50 p-8">
          <div className="mb-6 text-center">
            <Shield className="mx-auto mb-3 h-10 w-10 text-primary" />
            <h1 className="font-display text-2xl font-bold">Админ-панель</h1>
            <p className="mt-1 text-sm text-muted-foreground">Введите пароль для входа</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); if (pass === 'melano2025') setAuthed(true); }}>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" placeholder="Пароль" />
            <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground">
              <LogIn className="h-4 w-4" /> Войти
            </button>
          </form>
        </div>
      </section>
    );
  }

  const statusLabels: Record<string, string> = { new: 'Новая', in_progress: 'В работе', done: 'Завершена' };

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="font-display text-3xl font-bold">Админ-панель</h1>

        <div className="mt-8 flex gap-2">
          {[
            { key: 'orders' as const, icon: Package, label: 'Заявки' },
            { key: 'messages' as const, icon: MessageSquare, label: 'Сообщения' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-primary-foreground' : 'border border-border/50 text-muted-foreground hover:border-primary'}`}>
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="mt-6 space-y-4">
            {orders.length === 0 && <p className="text-muted-foreground">Заявок пока нет.</p>}
            {orders.map(order => (
              <div key={order.id} className="rounded-2xl border border-border/30 bg-card/50 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-display font-semibold">{order.name}</p>
                    <p className="text-sm text-muted-foreground">{order.email} {order.phone && `· ${order.phone}`}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleString('ru-RU')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)} className="rounded-lg border border-border/50 bg-background px-3 py-1.5 text-xs focus:outline-none">
                      <option value="new">Новая</option>
                      <option value="in_progress">В работе</option>
                      <option value="done">Завершена</option>
                    </select>
                    <button onClick={() => deleteOrder(order.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                {order.items && order.items.length > 0 && (
                  <div className="mt-4 space-y-1">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-sm text-secondary-foreground">{item.title} × {item.qty} — {(item.price * item.qty).toLocaleString('ru-RU')} ₽</p>
                    ))}
                    <p className="font-display font-bold text-primary">Итого: {order.total?.toLocaleString('ru-RU')} ₽</p>
                  </div>
                )}
                {order.comment && <p className="mt-3 text-sm text-muted-foreground italic">«{order.comment}»</p>}
              </div>
            ))}
          </div>
        )}

        {tab === 'messages' && (
          <div className="mt-6 space-y-4">
            {messages.length === 0 && <p className="text-muted-foreground">Сообщений пока нет.</p>}
            {messages.map(msg => (
              <div key={msg.id} className="rounded-2xl border border-border/30 bg-card/50 p-6">
                <p className="font-display font-semibold">{msg.name}</p>
                <p className="text-sm text-muted-foreground">{msg.email} · {new Date(msg.date).toLocaleString('ru-RU')}</p>
                <p className="mt-3 text-sm text-secondary-foreground">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
