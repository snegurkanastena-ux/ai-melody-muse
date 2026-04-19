import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Music, Send } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'Обо мне' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/services', label: 'Услуги' },
  { to: '/contact', label: 'Контакты' },
];

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          <span className="font-display text-xl font-bold tracking-wider text-foreground">MELANØ</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.to ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/checkout"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:box-glow sm:flex"
          >
            <Send className="h-3 w-3" />
            Заказать песню
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center text-muted-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50 bg-background md:hidden"
          >
            <nav className="container flex flex-col gap-1 py-4">
              {navLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary ${location.pathname === l.to ? 'bg-secondary text-primary' : 'text-muted-foreground'}`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/checkout"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                <Send className="h-4 w-4" />
                Заказать песню
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="border-t border-border/50 bg-card/50">
    <div className="container py-16">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            <span className="font-display text-xl font-bold tracking-wider">MELANØ</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            AI-музыкант и автор песен. Создаю уникальные музыкальные истории с помощью нейросетей.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-foreground">Навигация</h4>
          <div className="flex flex-col gap-2">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-foreground">Услуги</h4>
          <div className="flex flex-col gap-2">
            <Link to="/catalog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Персональные песни</Link>
            <Link to="/catalog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Тексты на заказ</Link>
            <Link to="/catalog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Музыка для проектов</Link>
            <Link to="/catalog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Джинглы</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-foreground">Контакты</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>info.melanomusic@gmail.com</span>
            <a href="https://t.me/melano_sounds" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
  Telegram: @melano_sounds
</a>
          </div>
          <div className="mt-4 flex gap-3">
            <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Telegram">
              <Send className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row">
        <p className="text-xs text-muted-foreground">© 2026 NeuroEra by Anastasia Melnikova</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/checkout" className="text-xs text-muted-foreground transition-colors hover:text-primary">Оплата</Link>
          <Link to="/offer" className="text-xs text-muted-foreground transition-colors hover:text-primary">Оферта</Link>
          <Link to="/contact" className="text-xs text-muted-foreground transition-colors hover:text-primary">Контакты</Link>
        </div>
      </div>
    </div>
  </footer>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
