import React, { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';

const AdminLegal: React.FC = () => {
  const [privacy, setPrivacy] = useState('');
  const [offer, setOffer] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPrivacy(localStorage.getItem('melano_privacy') || '');
    setOffer(localStorage.getItem('melano_offer') || '');
  }, []);

  const handleSave = () => {
    localStorage.setItem('melano_privacy', privacy);
    localStorage.setItem('melano_offer', offer);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Юридические страницы</h1>
        <p className="text-sm text-white/40 mt-1">Политика конфиденциальности и оферта</p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3">
        <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Политика конфиденциальности</p>
        <textarea value={privacy} onChange={e => setPrivacy(e.target.value)} placeholder="Текст политики конфиденциальности..."
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none resize-none" rows={12} />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3">
        <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Публичная оферта</p>
        <textarea value={offer} onChange={e => setOffer(e.target.value)} placeholder="Текст публичной оферты..."
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none resize-none" rows={12} />
      </div>

      <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
        {saved ? <><CheckCircle className="h-4 w-4" /> Сохранено</> : <><Save className="h-4 w-4" /> Сохранить</>}
      </button>
    </div>
  );
};

export default AdminLegal;
