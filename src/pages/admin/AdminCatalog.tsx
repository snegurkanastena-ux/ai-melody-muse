import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Disc3 } from 'lucide-react';

interface CatalogItem {
  id: string; title: string; description: string; genre: string; mood: string; audioUrl: string; cover: string;
}

const AdminCatalog: React.FC = () => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('melano_catalog') || '[]'));
  }, []);

  const save = (list: CatalogItem[]) => { setItems(list); localStorage.setItem('melano_catalog', JSON.stringify(list)); };

  const openNew = () => {
    setEditing({ id: `cat-${Date.now()}`, title: '', description: '', genre: '', mood: '', audioUrl: '', cover: '' });
    setIsNew(true);
  };

  const openEdit = (item: CatalogItem) => { setEditing({ ...item }); setIsNew(false); };

  const handleSave = () => {
    if (!editing) return;
    save(isNew ? [...items, editing] : items.map(i => i.id === editing.id ? editing : i));
    setEditing(null);
  };

  const handleDelete = (id: string) => { if (confirm('Удалить?')) save(items.filter(i => i.id !== id)); };

  if (editing) {
    return (
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-white">{isNew ? 'Новая песня' : 'Редактирование'}</h1>
          <button onClick={() => setEditing(null)} className="text-white/30 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-4">
          {(['title', 'description', 'genre', 'mood', 'audioUrl', 'cover'] as const).map(key => (
            <div key={key}>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                {{ title: 'Название', description: 'Описание', genre: 'Жанр', mood: 'Настроение', audioUrl: 'Аудио (ссылка)', cover: 'Обложка (ссылка)' }[key]}
              </label>
              {key === 'description' ? (
                <textarea value={editing[key]} onChange={e => setEditing({ ...editing, [key]: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 focus:outline-none resize-none" rows={3} />
              ) : (
                <input value={editing[key]} onChange={e => setEditing({ ...editing, [key]: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/30" />
              )}
            </div>
          ))}
          <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" /> Сохранить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Каталог песен</h1>
          <p className="text-sm text-white/40 mt-1">Музыкальные работы</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 rounded-xl bg-primary/15 border border-primary/20 px-4 py-2.5 text-sm text-primary hover:bg-primary/25 transition-colors">
          <Plus className="h-4 w-4" /> Добавить
        </button>
      </div>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <Disc3 className="mx-auto h-10 w-10 text-white/15 mb-3" />
          <p className="text-white/40">Каталог пуст</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-plum/20 shrink-0 flex items-center justify-center">
                <Disc3 className="h-5 w-5 text-primary/60" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                <p className="text-xs text-white/40">{item.genre} · {item.mood}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="text-white/30 hover:text-white transition-colors"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="text-white/30 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCatalog;
