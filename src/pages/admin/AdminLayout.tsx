import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Package, Disc3, ShoppingBag, Scale, Settings, LogOut, Menu, X, Music, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Студия', end: true },
  { to: '/admin/orders', icon: FileText, label: 'Заявки' },
  { to: '/admin/products', icon: Package, label: 'Продукты' },
  { to: '/admin/catalog', icon: Disc3, label: 'Релизы' },
  { to: '/admin/content', icon: ShoppingBag, label: 'Контент' },
  { to: '/admin/legal', icon: Scale, label: 'Юридическое' },
  { to: '/admin/settings', icon: Settings, label: 'Настройки' },
];

interface Props {
  onLogout: () => void;
}

const AdminLayout: React.FC<Props> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] transition-all duration-300 relative ${
      isActive
        ? 'bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-medium shadow-[inset_0_0_20px_hsl(340_60%_55%/0.08)]'
        : 'text-white/35 hover:text-white/70 hover:bg-white/[0.03]'
    }`;

  const sidebar = (
    <div className="flex flex-col h-full relative">
      {/* Sidebar glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-primary/[0.06] blur-[60px] pointer-events-none" />

      <div className="p-6 pb-8 flex items-center gap-3.5 relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-plum/15 border border-primary/10 shadow-[0_0_20px_hsl(340_60%_55%/0.1)]">
          <Music className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-display text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            MELANØ <Sparkles className="h-3 w-3 text-primary/60" />
          </p>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.25em]">Studio</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 mt-auto border-t border-white/[0.03]">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] text-white/20 hover:text-red-400/80 hover:bg-red-400/[0.04] transition-all duration-300"
        >
          <LogOut className="h-4 w-4" /> Выйти
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#07070c]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[260px] flex-col border-r border-white/[0.03] bg-gradient-to-b from-[#0c0c14] to-[#08080e] relative">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-[260px] bg-gradient-to-b from-[#0c0c14] to-[#08080e] border-r border-white/[0.03]"
            >
              {sidebar}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-white/[0.03] bg-[#07070c]/90 backdrop-blur-2xl px-5 lg:px-8">
          <button className="lg:hidden text-white/30 hover:text-white transition-colors" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400/80 animate-pulse" />
            <span className="text-xs text-white/25 tracking-wide">Анастасия Мельникова</span>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-10 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
