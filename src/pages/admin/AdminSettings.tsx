import React, { useState } from 'react';
import { Save, CheckCircle, Key } from 'lucide-react';

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
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Настройки</h1>
        <p className="text-sm text-white/40 mt-1">Управление доступом</p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-white">Смена пароля</p>
        </div>

        {[
          { label: 'Текущий пароль', value: currentPass, set: setCurrentPass },
          { label: 'Новый пароль', value: newPass, set: setNewPass },
          { label: 'Повторите пароль', value: confirmPass, set: setConfirmPass },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">{f.label}</label>
            <input type="password" value={f.value} onChange={e => f.set(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/30" />
          </div>
        ))}

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button onClick={handleChangePassword} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
          {saved ? <><CheckCircle className="h-4 w-4" /> Сохранено</> : <><Save className="h-4 w-4" /> Сменить пароль</>}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
