import React, { useState } from 'react';
import { LogIn, Music, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onLogin: () => void;
}

const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('melano_admin_pass') || 'melano2025';
    if (pass === stored) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070c] relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[200px] animate-glow-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-plum/[0.06] blur-[180px]" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-rose-glow/[0.03] blur-[120px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm mx-4"
      >
        <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-2xl p-10 shadow-[0_0_80px_-20px_hsl(340_60%_55%/0.15)]">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-5 relative"
            >
              <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-plum/20 border border-primary/10">
                <Music className="h-9 w-9 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight">MELANØ</h1>
            <p className="mt-2 text-sm text-white/30 tracking-wide">Студия · Панель управления</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-[0.2em] font-medium">Пароль доступа</label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                className={`w-full rounded-2xl border bg-white/[0.03] px-5 py-4 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-300 ${error ? 'border-red-500/50 animate-[shake_0.5s]' : 'border-white/[0.06]'}`}
                placeholder="••••••••"
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-red-400/80"
                >
                  Неверный пароль
                </motion.p>
              )}
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-4 text-sm font-medium text-white hover:shadow-[0_0_30px_-5px_hsl(340_60%_55%/0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogIn className="h-4 w-4" /> Войти в студию
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
