import React, { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';

interface ContentData {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  ctaText: string;
  contactEmail: string;
  contactTelegram: string;
  socialVk: string;
  socialYoutube: string;
  socialTelegram: string;
}

const defaultContent: ContentData = {
  heroTitle: 'Музыка, рождённая из историй',
  heroSubtitle: 'Создаю уникальные песни, тексты и музыкальные проекты с помощью нейросетей. Каждая композиция — это ваша история, воплощённая в звуке.',
  aboutText: 'Я — Анастасия Мельникова, AI-музыкант и автор песен. Мой творческий псевдоним — MELANØ.',
  ctaText: 'Готовы создать свою уникальную песню? Оставьте заявку, и мы обсудим вашу историю.',
  contactEmail: 'hello@melano.music',
  contactTelegram: '@melano_music',
  socialVk: '',
  socialYoutube: '',
  socialTelegram: '',
};

const AdminContent: React.FC = () => {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('melano_content');
    if (stored) setContent(JSON.parse(stored));
  }, []);

  const handleSave = () => {
    localStorage.setItem('melano_content', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Field = ({ label, field, multiline }: { label: string; field: keyof ContentData; multiline?: boolean }) => (
    <div>
      <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">{label}</label>
      {multiline ? (
        <textarea value={content[field]} onChange={e => setContent({ ...content, [field]: e.target.value })}
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 focus:outline-none resize-none" rows={4} />
      ) : (
        <input value={content[field]} onChange={e => setContent({ ...content, [field]: e.target.value })}
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/30" />
      )}
    </div>
  );

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Контент сайта</h1>
        <p className="text-sm text-white/40 mt-1">Редактирование текстов и контактов</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
          <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Главная страница</p>
          <Field label="Заголовок Hero" field="heroTitle" />
          <Field label="Подзаголовок" field="heroSubtitle" multiline />
          <Field label="CTA текст" field="ctaText" multiline />
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
          <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Обо мне</p>
          <Field label="Текст о себе" field="aboutText" multiline />
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
          <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Контакты и соцсети</p>
          <Field label="Email" field="contactEmail" />
          <Field label="Telegram" field="contactTelegram" />
          <Field label="VK" field="socialVk" />
          <Field label="YouTube" field="socialYoutube" />
          <Field label="Telegram канал" field="socialTelegram" />
        </div>
      </div>

      <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
        {saved ? <><CheckCircle className="h-4 w-4" /> Сохранено</> : <><Save className="h-4 w-4" /> Сохранить изменения</>}
      </button>
    </div>
  );
};

export default AdminContent;
