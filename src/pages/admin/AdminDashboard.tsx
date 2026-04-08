import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Package, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Order {
  id: string; name: string; email: string; phone: string; comment: string;
  items: { title: string; qty: number; price: number }[];
  total: number; date: string; status: string;
}

const AdminDashboard: React.FC = () => {
  const orders: Order[] = useMemo(() => JSON.parse(localStorage.getItem('melano_orders') || '[]'), []);

  const stats = useMemo(() => ({
    total: orders.length,
    newOrders: orders.filter(o => o.status === 'new').length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    done: orders.filter(o => o.status === 'done').length,
  }), [orders]);

  const statCards = [
    { label: 'Всего заявок', value: stats.total, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Новые', value: stats.newOrders, icon: AlertCircle, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'В работе', value: stats.inProgress, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Завершены', value: stats.done, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Дашборд</h1>
        <p className="text-sm text-white/40 mt-1">Обзор вашего проекта</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} mb-3`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link to="/admin/products" className="flex items-center gap-2 rounded-xl bg-primary/15 border border-primary/20 px-4 py-2.5 text-sm text-primary hover:bg-primary/25 transition-colors">
          <Plus className="h-4 w-4" /> Добавить товар
        </Link>
        <Link to="/admin/orders" className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">
          <FileText className="h-4 w-4" /> Посмотреть заявки
        </Link>
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="font-display text-lg font-semibold text-white mb-4">Последние заявки</h2>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
            <FileText className="mx-auto h-8 w-8 text-white/20 mb-3" />
            <p className="text-white/40 text-sm">Заявок пока нет</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{order.name}</p>
                  <p className="text-xs text-white/40">{new Date(order.date).toLocaleDateString('ru-RU')} · {order.total?.toLocaleString('ru-RU')} ₽</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${
                  order.status === 'new' ? 'bg-primary/15 text-primary' :
                  order.status === 'in_progress' ? 'bg-amber-400/15 text-amber-400' :
                  'bg-emerald-400/15 text-emerald-400'
                }`}>
                  {order.status === 'new' ? 'Новая' : order.status === 'in_progress' ? 'В работе' : 'Завершена'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
