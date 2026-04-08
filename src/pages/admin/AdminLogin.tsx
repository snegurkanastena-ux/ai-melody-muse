import React, { useState } from 'react';
import { Shield, LogIn, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onLogin: () => void;
}

const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'melano2025') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-plum/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Music className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">MELANØ</h1>
            <p className="mt-1 text-sm text-white/40">Панель управления</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Пароль</label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors ${error ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                placeholder="Введите пароль"
                autoFocus
              />
              {error && <p className="mt-2 text-xs text-red-400">Неверный пароль</p>}
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              <LogIn className="h-4 w-4" /> Войти
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
