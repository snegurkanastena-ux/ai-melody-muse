import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Package, Plus, Clock, CheckCircle, AlertCircle, TrendingUp, Disc3, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

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

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const statCards = [
    { label: 'Всего заявок', value: stats.total, icon: FileText, gradient: 'from-blue-500/20 to-cyan-500/10', iconColor: 'text-blue-400', glow: 'shadow-[0_0_30px_-10px_hsl(210_80%_60%/0.2)]' },
    { label: 'Новые', value: stats.newOrders, icon: AlertCircle, gradient: 'from-primary/20 to-rose-glow/10', iconColor: 'text-primary', glow: 'shadow-[0_0_30px_-10px_hsl(340_60%_55%/0.2)]' },
    { label: 'В работе', value: stats.inProgress, icon: Clock, gradient: 'from-amber-500/20 to-orange-500/10', iconColor: 'text-amber-400', glow: 'shadow-[0_0_30px_-10px_hsl(40_80%_55%/0.2)]' },
    { label: 'Завершены', value: stats.done, icon: CheckCircle, gradient: 'from-emerald-500/20 to-teal-500/10', iconColor: 'text-emerald-400', glow: 'shadow-[0_0_30px_-10px_hsl(160_60%_45%/0.2)]' },
  ];

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      {/* Header */}
      <motion.div variants={item} className="flex items-end justify-between">
        <div>
          <p className="text-xs text-primary/60 uppercase tracking-[0.3em] font-medium mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> Добро пожаловать
          </p>
          <h1 className="font-display text-3xl font-bold text-white">Студия MELANØ</h1>
          <p className="text-sm text-white/30 mt-1">Обзор вашего творческого пространства</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -2, scale: 1.02 }}
            className={`rounded-2xl border border-white/[0.06] bg-gradient-to-br ${s.gradient} p-5 relative overflow-hidden ${s.glow} transition-shadow duration-500`}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
            <s.icon className={`h-5 w-5 ${s.iconColor} mb-4`} />
            <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
            <p className="text-[11px] text-white/35 mt-1 tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress + Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Completion Rate */}
        <motion.div variants={item} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="h-4 w-4 text-emerald-400/70" />
              <p className="text-sm font-medium text-white/70">Прогресс заказов</p>
            </div>
            <span className="text-2xl font-bold text-white">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2 bg-white/[0.04] rounded-full" />
          <div className="flex justify-between mt-3 text-[10px] text-white/25 uppercase tracking-wider">
            <span>Начало</span>
            <span>Завершено</span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3">
          <p className="text-sm font-medium text-white/70 mb-4">Быстрые действия</p>
          <Link to="/admin/products" className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 px-4 py-3 text-sm text-primary/90 hover:from-primary/15 hover:to-primary/10 transition-all duration-300 group">
            <span className="flex items-center gap-2.5"><Plus className="h-4 w-4" /> Новый продукт</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>
          <Link to="/admin/orders" className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3 text-sm text-white/50 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-300 group">
            <span className="flex items-center gap-2.5"><FileText className="h-4 w-4" /> Заявки клиентов</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>
          <Link to="/admin/catalog" className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3 text-sm text-white/50 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-300 group">
            <span className="flex items-center gap-2.5"><Disc3 className="h-4 w-4" /> Каталог релизов</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Active Projects */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-5 w-1 rounded-full bg-gradient-to-b from-primary to-primary/30" />
          <h2 className="font-display text-lg font-semibold text-white">Активные проекты</h2>
        </div>
        {orders.filter(o => o.status === 'in_progress').length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01] p-10 text-center">
            <Package className="mx-auto h-8 w-8 text-white/10 mb-3" />
            <p className="text-white/25 text-sm">Нет активных проектов</p>
            <p className="text-white/15 text-xs mt-1">Возьмите заявку в работу, чтобы она появилась здесь</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {orders.filter(o => o.status === 'in_progress').slice(0, 4).map(order => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl border border-amber-400/10 bg-gradient-to-br from-amber-400/[0.04] to-transparent p-5 relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-amber-400/60 animate-pulse" />
                <p className="text-sm font-medium text-white mb-1">{order.name}</p>
                <p className="text-xs text-white/30 mb-3">{new Date(order.date).toLocaleDateString('ru-RU')}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-400/60 uppercase tracking-wider">В работе</span>
                  <span className="text-sm font-semibold text-white/60">{order.total?.toLocaleString('ru-RU')} ₽</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recent Orders */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-5 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-400/30" />
          <h2 className="font-display text-lg font-semibold text-white">Последние заявки</h2>
        </div>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01] p-10 text-center">
            <FileText className="mx-auto h-8 w-8 text-white/10 mb-3" />
            <p className="text-white/25 text-sm">Заявок пока нет</p>
          </div>
        ) : (
          <div className="space-y-2">
            {orders.slice(0, 5).map(order => (
              <motion.div
                key={order.id}
                whileHover={{ x: 4 }}
                className="rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.03] p-4 flex items-center justify-between gap-4 transition-colors duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`shrink-0 h-10 w-10 rounded-xl flex items-center justify-center ${
                    order.status === 'new' ? 'bg-primary/10' :
                    order.status === 'in_progress' ? 'bg-amber-400/10' : 'bg-emerald-400/10'
                  }`}>
                    {order.status === 'new' ? <AlertCircle className="h-4 w-4 text-primary/70" /> :
                     order.status === 'in_progress' ? <Clock className="h-4 w-4 text-amber-400/70" /> :
                     <CheckCircle className="h-4 w-4 text-emerald-400/70" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/80 truncate">{order.name}</p>
                    <p className="text-[11px] text-white/25">{new Date(order.date).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm font-medium text-white/50">{order.total?.toLocaleString('ru-RU')} ₽</span>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] ${
                    order.status === 'new' ? 'bg-primary/10 text-primary/80' :
                    order.status === 'in_progress' ? 'bg-amber-400/10 text-amber-400/80' :
                    'bg-emerald-400/10 text-emerald-400/80'
                  }`}>
                    {order.status === 'new' ? 'Новая' : order.status === 'in_progress' ? 'В работе' : 'Готово'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
