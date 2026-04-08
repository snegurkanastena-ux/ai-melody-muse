import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Disc3, Music, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CatalogItem {
  id: string; title: string; description: string; genre: string; mood: string; audioUrl: string; cover: string;
}

const moodColors: Record<string, string> = {
  'романтичное': 'from-primary/30 to-rose-glow/15',
  'рок': 'from-red-500/25 to-orange-500/10',
  'меланхоличное': 'from-blue-500/25 to-indigo-500/10',
  'энергичное': 'from-amber-500/25 to-yellow-500/10',
  'драматичное': 'from-purple-500/25 to-plum/15',
};

const getGradient = (mood: string) => {
  const key = Object.keys(moodColors).find(k => mood.toLowerCase().includes(k));
  return key ? moodColors[key] : 'from-primary/20 to-plum/15';
};

const AdminCatalog: React.FC = () => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('melano_catalog') || '[]'));
  }, []);

  const save = (list: CatalogItem[]) => { setItems(list); localStorage.setItem('melano_catalog', JSON.stringify(list)); };
  const openNew = () => { setEditing({ id: `cat-${Date.now()}`, title: '', description: '', genre: '', mood: '', audioUrl: '', cover: '' }); setIsNew(true); };
  const openEdit = (item: CatalogItem) => { setEditing({ ...item }); setIsNew(false); };
  const handleSave = () => { if (!editing) return; save(isNew ? [...items, editing] : items.map(i => i.id === editing.id ? editing : i)); setEditing(null); };
  const handleDelete = (id: string) => { if (confirm('Удалить?')) save(items.filter(i => i.id !== id)); };

  if (editing) {
    const fields = [
      { key: 'title' as const, label: 'Название трека' },
      { key: 'genre' as const, label: 'Жанр' },
      { key: 'mood' as const, label: 'Настроение' },
      { key: 'audioUrl' as const, label: 'Аудио (ссылка)' },
      { key: 'cover' as const, label: 'Обложка (ссылка)' },
    ];
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-primary/50 uppercase tracking-[0.3em] font-medium mb-2">{isNew ? 'Новый релиз' : 'Редактирование'}</p>
            <h1 className="font-display text-2xl font-bold text-white">{editing.title || 'Без названия'}</h1>
          </div>
          <button onClick={() => setEditing(null)} className="text-white/20 hover:text-white/50 transition-colors p-2 rounded-xl hover:bg-white/[0.03]"><X className="h-5 w-5" /></button>
        </div>

        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 space-y-5">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">{f.label}</label>
              <input value={editing[f.key]} onChange={e => setEditing({ ...editing, [f.key]: e.target.value })}
                className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white focus:outline-none focus:border-primary/20 transition-colors duration-300" />
            </div>
          ))}
          <div>
            <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Описание</label>
            <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })}
              className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white/60 focus:outline-none focus:border-primary/20 resize-none transition-colors duration-300" rows={3} />
          </div>
        </div>

        <button onClick={handleSave}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-8 py-3.5 text-sm font-medium text-white hover:shadow-[0_0_30px_-5px_hsl(340_60%_55%/0.3)] transition-all duration-300">
          <Save className="h-4 w-4" /> Сохранить
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs text-primary/50 uppercase tracking-[0.3em] font-medium mb-2">Дискография</p>
          <h1 className="font-display text-3xl font-bold text-white">Релизы</h1>
          <p className="text-sm text-white/25 mt-1">Ваши музыкальные работы</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/10 px-5 py-3 text-sm text-primary/90 hover:from-primary/20 hover:shadow-[0_0_20px_-5px_hsl(340_60%_55%/0.2)] transition-all duration-300">
          <Plus className="h-4 w-4" /> Новый релиз
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01] p-16 text-center">
          <Disc3 className="mx-auto h-12 w-12 text-white/8 mb-4" />
          <p className="text-white/25 text-sm">Каталог пуст</p>
          <p className="text-white/15 text-xs mt-1">Добавьте свой первый релиз</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <motion.div key={item.id} whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden group relative transition-shadow duration-500 hover:shadow-[0_0_40px_-10px_hsl(340_60%_55%/0.12)]">
              {/* Cover */}
              <div className={`h-44 bg-gradient-to-br ${getGradient(item.mood)} relative flex items-center justify-center`}>
                {item.cover ? (
                  <img src={item.cover} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <Disc3 className="h-16 w-16 text-white/10 animate-[spin_8s_linear_infinite]" />
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button onClick={() => openEdit(item)}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-red-500/30 transition-all">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <p className="text-sm font-medium text-white/90 truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  {item.genre && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/30">{item.genre}</span>}
                  {item.mood && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary/60">{item.mood}</span>}
                </div>
                {item.description && <p className="text-xs text-white/25 mt-2 line-clamp-2">{item.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCatalog;
