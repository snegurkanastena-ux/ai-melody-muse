import React, { useState } from 'react';
import { Save, CheckCircle, Key, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSettings: React.FC = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    setError('');
    const storedPass = localStorage.getItem('melano_admin_pass') || 'melano2025';
    if (currentPass !== storedPass) { setError('Текущий пароль неверный'); return; }
    if (newPass.length < 6) { setError('Минимум 6 символов'); return; }
    if (newPass !== confirmPass) { setError('Пароли не совпадают'); return; }
    localStorage.setItem('melano_admin_pass', newPass);
    setCurrentPass(''); setNewPass(''); setConfirmPass('');
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <p className="text-xs text-primary/50 uppercase tracking-[0.3em] font-medium mb-2">Безопасность</p>
        <h1 className="font-display text-3xl font-bold text-white">Настройки</h1>
        <p className="text-sm text-white/25 mt-1">Управление доступом к студии</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 space-y-5"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Key className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/70">Смена пароля</p>
            <p className="text-[11px] text-white/25">Обновите пароль для входа в панель</p>
          </div>
        </div>

        {[
          { label: 'Текущий пароль', value: currentPass, set: setCurrentPass },
          { label: 'Новый пароль', value: newPass, set: setNewPass },
          { label: 'Повторите пароль', value: confirmPass, set: setConfirmPass },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">{f.label}</label>
            <input type="password" value={f.value} onChange={e => f.set(e.target.value)}
              className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white focus:outline-none focus:border-primary/20 transition-colors duration-300" />
          </div>
        ))}

        {error && <p className="text-xs text-red-400/80">{error}</p>}

        <button onClick={handleChangePassword}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-8 py-3.5 text-sm font-medium text-white hover:shadow-[0_0_30px_-5px_hsl(340_60%_55%/0.3)] transition-all duration-300">
          {saved ? <><CheckCircle className="h-4 w-4" /> Сохранено</> : <><Shield className="h-4 w-4" /> Сменить пароль</>}
        </button>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
