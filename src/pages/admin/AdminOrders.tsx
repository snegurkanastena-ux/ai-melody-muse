import React, { useState, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronUp, FileText, Clock, CheckCircle, AlertCircle, Play, Archive, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Order {
  id: string; name: string; email: string; phone: string; comment: string;
  items: { title: string; qty: number; price: number }[];
  total: number; date: string; status: string; note?: string;
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; bg: string; text: string; dot: string }> = {
  new: { label: 'Новая', icon: AlertCircle, bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary' },
  in_progress: { label: 'В работе', icon: Clock, bg: 'bg-amber-400/10', text: 'text-amber-400', dot: 'bg-amber-400' },
  done: { label: 'Завершена', icon: CheckCircle, bg: 'bg-emerald-400/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
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

  const filters = [
    { key: 'all', label: 'Все', count: orders.length },
    { key: 'new', label: 'Новые', count: orders.filter(o => o.status === 'new').length },
    { key: 'in_progress', label: 'В работе', count: orders.filter(o => o.status === 'in_progress').length },
    { key: 'done', label: 'Завершены', count: orders.filter(o => o.status === 'done').length },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs text-primary/50 uppercase tracking-[0.3em] font-medium mb-2">Управление</p>
        <h1 className="font-display text-3xl font-bold text-white">Заявки</h1>
        <p className="text-sm text-white/25 mt-1">Входящие запросы от клиентов</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`rounded-2xl px-4 py-2 text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
              filter === f.key
                ? 'bg-gradient-to-r from-primary/15 to-primary/5 text-primary border border-primary/15 shadow-[0_0_20px_-8px_hsl(340_60%_55%/0.2)]'
                : 'text-white/30 border border-white/[0.04] hover:text-white/50 hover:border-white/[0.08]'
            }`}>
            {f.label}
            {f.count > 0 && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === f.key ? 'bg-primary/20' : 'bg-white/[0.05]'}`}>{f.count}</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01] p-16 text-center">
          <FileText className="mx-auto h-10 w-10 text-white/8 mb-4" />
          <p className="text-white/25 text-sm">Заявок нет</p>
          <p className="text-white/15 text-xs mt-1">Новые заявки появятся здесь автоматически</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => {
            const isOpen = expanded === order.id;
            const sc = statusConfig[order.status] || statusConfig.new;
            const Icon = sc.icon;
            return (
              <motion.div
                key={order.id}
                layout
                className="rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden hover:border-white/[0.08] transition-colors duration-300"
              >
                <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={() => setExpanded(isOpen ? null : order.id)}>
                  <div className={`shrink-0 h-11 w-11 rounded-xl ${sc.bg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${sc.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-sm font-medium text-white/90">{order.name}</p>
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] ${sc.bg} ${sc.text}`}>
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs text-white/30 mt-1">{order.email} {order.phone && `· ${order.phone}`}</p>
                    <p className="text-[11px] text-white/15 mt-0.5">{new Date(order.date).toLocaleString('ru-RU')}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <p className="text-sm font-semibold text-white/50">{order.total?.toLocaleString('ru-RU')} ₽</p>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-4 w-4 text-white/20" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-white/[0.03] pt-5 space-y-5">
                        {order.items?.length > 0 && (
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-3">Состав заказа</p>
                            <div className="space-y-2">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm rounded-xl bg-white/[0.02] px-4 py-2.5">
                                  <span className="text-white/60">{item.title} × {item.qty}</span>
                                  <span className="text-white/40 font-medium">{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {order.comment && (
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Комментарий</p>
                            <p className="text-sm text-white/40 italic bg-white/[0.02] rounded-xl px-4 py-3">«{order.comment}»</p>
                          </div>
                        )}

                        {/* Note */}
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                            <MessageSquare className="h-3 w-3" /> Заметка
                          </p>
                          <textarea
                            value={order.note || ''}
                            onChange={e => updateNote(order.id, e.target.value)}
                            placeholder="Добавить внутреннюю заметку..."
                            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/60 placeholder:text-white/15 focus:outline-none focus:border-primary/20 resize-none transition-colors duration-300"
                            rows={2}
                          />
                        </div>

                        {/* Quick actions */}
                        <div className="flex items-center gap-2 pt-2 flex-wrap">
                          {order.status === 'new' && (
                            <button
                              onClick={() => updateStatus(order.id, 'in_progress')}
                              className="flex items-center gap-2 rounded-xl bg-amber-400/10 border border-amber-400/15 px-4 py-2.5 text-xs text-amber-400/80 hover:bg-amber-400/15 transition-all duration-300"
                            >
                              <Play className="h-3.5 w-3.5" /> Взять в работу
                            </button>
                          )}
                          {order.status === 'in_progress' && (
                            <button
                              onClick={() => updateStatus(order.id, 'done')}
                              className="flex items-center gap-2 rounded-xl bg-emerald-400/10 border border-emerald-400/15 px-4 py-2.5 text-xs text-emerald-400/80 hover:bg-emerald-400/15 transition-all duration-300"
                            >
                              <CheckCircle className="h-3.5 w-3.5" /> Завершить
                            </button>
                          )}
                          {order.status === 'done' && (
                            <button
                              onClick={() => updateStatus(order.id, 'new')}
                              className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2.5 text-xs text-white/40 hover:text-white/60 transition-all duration-300"
                            >
                              <Archive className="h-3.5 w-3.5" /> Вернуть
                            </button>
                          )}
                          <select
                            value={order.status}
                            onChange={e => updateStatus(order.id, e.target.value)}
                            className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-xs text-white/50 focus:outline-none cursor-pointer"
                          >
                            <option value="new">Новая</option>
                            <option value="in_progress">В работе</option>
                            <option value="done">Завершена</option>
                          </select>
                          <button onClick={() => deleteOrder(order.id)} className="ml-auto text-white/15 hover:text-red-400/70 transition-colors duration-300">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
