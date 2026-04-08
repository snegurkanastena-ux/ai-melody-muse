import React, { useState, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronUp, StickyNote, FileText } from 'lucide-react';

interface Order {
  id: string; name: string; email: string; phone: string; comment: string;
  items: { title: string; qty: number; price: number }[];
  total: number; date: string; status: string; note?: string;
}

const statusConfig: Record<string, { label: string; class: string }> = {
  new: { label: 'Новая', class: 'bg-primary/15 text-primary' },
  in_progress: { label: 'В работе', class: 'bg-amber-400/15 text-amber-400' },
  done: { label: 'Завершена', class: 'bg-emerald-400/15 text-emerald-400' },
};

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('melano_orders') || '[]'));
  }, []);

  const save = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem('melano_orders', JSON.stringify(updated));
  };

  const updateStatus = (id: string, status: string) => save(orders.map(o => o.id === id ? { ...o, status } : o));
  const deleteOrder = (id: string) => { if (confirm('Удалить заявку?')) save(orders.filter(o => o.id !== id)); };
  const updateNote = (id: string, note: string) => save(orders.map(o => o.id === id ? { ...o, note } : o));

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Заявки</h1>
          <p className="text-sm text-white/40 mt-1">Управление заявками клиентов</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[{ key: 'all', label: 'Все' }, { key: 'new', label: 'Новые' }, { key: 'in_progress', label: 'В работе' }, { key: 'done', label: 'Завершены' }].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${filter === f.key ? 'bg-primary/15 text-primary border border-primary/20' : 'text-white/40 border border-white/[0.06] hover:text-white/60'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <FileText className="mx-auto h-10 w-10 text-white/15 mb-3" />
          <p className="text-white/40">Заявок нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => {
            const isOpen = expanded === order.id;
            const sc = statusConfig[order.status] || statusConfig.new;
            return (
              <div key={order.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={() => setExpanded(isOpen ? null : order.id)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-sm font-medium text-white">{order.name}</p>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${sc.class}`}>{sc.label}</span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">{order.email} {order.phone && `· ${order.phone}`}</p>
                    <p className="text-xs text-white/30 mt-0.5">{new Date(order.date).toLocaleString('ru-RU')}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="text-sm font-semibold text-primary">{order.total?.toLocaleString('ru-RU')} ₽</p>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-white/30" /> : <ChevronDown className="h-4 w-4 text-white/30" />}
                  </div>
                </div>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-white/[0.04] pt-4 space-y-4">
                    {order.items?.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Состав заказа</p>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-white/70">{item.title} × {item.qty}</span>
                            <span className="text-white/50">{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {order.comment && (
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Комментарий</p>
                        <p className="text-sm text-white/60 italic">«{order.comment}»</p>
                      </div>
                    )}

                    {/* Note */}
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Заметка</p>
                      <textarea
                        value={order.note || ''}
                        onChange={e => updateNote(order.id, e.target.value)}
                        placeholder="Добавить заметку..."
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-primary/30 resize-none"
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-white/70 focus:outline-none"
                      >
                        <option value="new">Новая</option>
                        <option value="in_progress">В работе</option>
                        <option value="done">Завершена</option>
                      </select>
                      <button onClick={() => deleteOrder(order.id)} className="ml-auto text-white/30 hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
