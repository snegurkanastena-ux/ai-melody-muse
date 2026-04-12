import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Shield, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLegal: React.FC = () => {
  const [privacy, setPrivacy] = useState('');
  const [offer, setOffer] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => { setPrivacy(localStorage.getItem('melano_privacy') || ''); setOffer(localStorage.getItem('melano_offer') || ''); }, []);

  const handleSave = () => {
    localStorage.setItem('melano_privacy', privacy);
    localStorage.setItem('melano_offer', offer);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="text-xs text-primary/50 uppercase tracking-[0.3em] font-medium mb-2">Документы</p>
        <h1 className="font-display text-3xl font-bold text-white">Юридическое</h1>
        <p className="text-sm text-white/25 mt-1">Политика конфиденциальности и оферта</p>
      </div>

      {[
        { icon: Shield, label: 'Политика конфиденциальности', color: 'text-blue-400', bg: 'bg-blue-400/10', value: privacy, set: setPrivacy, placeholder: 'Текст политики...' },
        { icon: FileText, label: 'Публичная оферта', color: 'text-emerald-400', bg: 'bg-emerald-400/10', value: offer, set: setOffer, placeholder: 'Текст оферты...' },
      ].map((doc, i) => (
        <motion.div key={doc.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-xl ${doc.bg} flex items-center justify-center`}>
              <doc.icon className={`h-4 w-4 ${doc.color}`} />
            </div>
            <p className="text-sm font-medium text-white/70">{doc.label}</p>
          </div>
          <textarea value={doc.value} onChange={e => doc.set(e.target.value)} placeholder={doc.placeholder}
            className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm text-white/50 placeholder:text-white/12 focus:outline-none focus:border-primary/20 resize-none transition-colors duration-300 font-mono leading-relaxed" rows={14} />
        </motion.div>
      ))}

      <button onClick={handleSave}
        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-8 py-3.5 text-sm font-medium text-white hover:shadow-[0_0_30px_-5px_hsl(340_60%_55%/0.3)] transition-all duration-300">
        {saved ? <><CheckCircle className="h-4 w-4" /> Сохранено</> : <><Save className="h-4 w-4" /> Сохранить</>}
      </button>
    </div>
  );
};

export default AdminLegal;
