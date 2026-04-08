import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FileText, ShoppingBag, Package, Disc3, Scale, Settings, LogOut, Menu, X, Music
} from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Дашборд', end: true },
  { to: '/admin/orders', icon: FileText, label: 'Заявки' },
  { to: '/admin/products', icon: Package, label: 'Товары и услуги' },
  { to: '/admin/catalog', icon: Disc3, label: 'Каталог песен' },
  { to: '/admin/content', icon: ShoppingBag, label: 'Контент' },
  { to: '/admin/legal', icon: Scale, label: 'Юр. страницы' },
  { to: '/admin/settings', icon: Settings, label: 'Настройки' },
];

interface Props {
  onLogout: () => void;
}

const AdminLayout: React.FC<Props> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
      isActive
        ? 'bg-primary/15 text-primary font-medium'
        : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
    }`;

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
          <Music className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-display text-sm font-bold text-white tracking-tight">MELANØ</p>
          <p className="text-[10px] text-white/30 uppercase tracking-widest">Admin</p>
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
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 mt-auto">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut className="h-4 w-4" /> Выйти
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/[0.04] bg-[#0d0d14]">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#0d0d14] border-r border-white/[0.04]">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-white/[0.04] bg-[#0a0a0f]/80 backdrop-blur-xl px-4 lg:px-8">
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-auto text-xs text-white/30">
            Анастасия Мельникова
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
