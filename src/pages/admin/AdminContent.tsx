import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Type, User, Globe, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContentData {
  heroTitle: string; heroSubtitle: string; aboutText: string; ctaText: string;
  contactEmail: string; contactTelegram: string; socialVk: string; socialYoutube: string; socialTelegram: string;
}

const defaultContent: ContentData = {
  heroTitle: 'Музыка, рождённая из историй',
  heroSubtitle: 'Создаю уникальные песни, тексты и музыкальные проекты с помощью нейросетей.',
  aboutText: 'Я — Анастасия Мельникова, AI-музыкант и автор песен. Мой творческий псевдоним — MELANØ.',
  ctaText: 'Готовы создать свою уникальную песню? Оставьте заявку.',
  contactEmail: 'hello@melano.music', contactTelegram: '@melano_music',
  socialVk: '', socialYoutube: '', socialTelegram: '',
};

const AdminContent: React.FC = () => {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => { const s = localStorage.getItem('melano_content'); if (s) setContent(JSON.parse(s)); }, []);

  const handleSave = () => {
    localStorage.setItem('melano_content', JSON.stringify(content));
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const Field = ({ label, field, multiline }: { label: string; field: keyof ContentData; multiline?: boolean }) => (
    <div>
      <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">{label}</label>
      {multiline ? (
        <textarea value={content[field]} onChange={e => setContent({ ...content, [field]: e.target.value })}
          className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white/60 focus:outline-none focus:border-primary/20 resize-none transition-colors duration-300" rows={4} />
      ) : (
        <input value={content[field]} onChange={e => setContent({ ...content, [field]: e.target.value })}
          className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white focus:outline-none focus:border-primary/20 transition-colors duration-300" />
      )}
    </div>
  );

  const sections = [
    {
      icon: Type, label: 'Hero-секция', color: 'text-primary', bg: 'bg-primary/10',
      fields: [
        { label: 'Заголовок', field: 'heroTitle' as const },
        { label: 'Подзаголовок', field: 'heroSubtitle' as const, multiline: true },
      ]
    },
    {
      icon: User, label: 'Обо мне', color: 'text-blue-400', bg: 'bg-blue-400/10',
      fields: [{ label: 'Текст о себе', field: 'aboutText' as const, multiline: true }]
    },
    {
      icon: Megaphone, label: 'Призыв к действию', color: 'text-amber-400', bg: 'bg-amber-400/10',
      fields: [{ label: 'CTA текст', field: 'ctaText' as const, multiline: true }]
    },
    {
      icon: Globe, label: 'Контакты и соцсети', color: 'text-emerald-400', bg: 'bg-emerald-400/10',
      fields: [
        { label: 'Email', field: 'contactEmail' as const },
        { label: 'Telegram', field: 'contactTelegram' as const },
        { label: 'VK', field: 'socialVk' as const },
        { label: 'YouTube', field: 'socialYoutube' as const },
        { label: 'Telegram канал', field: 'socialTelegram' as const },
      ]
    },
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="text-xs text-primary/50 uppercase tracking-[0.3em] font-medium mb-2">Конструктор</p>
        <h1 className="font-display text-3xl font-bold text-white">Контент сайта</h1>
        <p className="text-sm text-white/25 mt-1">Настройте содержание страниц</p>
      </div>

      <div className="space-y-5">
        {sections.map((section, i) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-xl ${section.bg} flex items-center justify-center`}>
                <section.icon className={`h-4 w-4 ${section.color}`} />
              </div>
              <p className="text-sm font-medium text-white/70">{section.label}</p>
            </div>
            {section.fields.map(f => (
              <Field key={f.field} label={f.label} field={f.field} multiline={f.multiline} />
            ))}
          </motion.div>
        ))}
      </div>

      <button onClick={handleSave}
        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-8 py-3.5 text-sm font-medium text-white hover:shadow-[0_0_30px_-5px_hsl(340_60%_55%/0.3)] transition-all duration-300">
        {saved ? <><CheckCircle className="h-4 w-4" /> Сохранено</> : <><Save className="h-4 w-4" /> Сохранить</>}
      </button>
    </div>
  );
};

export default AdminContent;
