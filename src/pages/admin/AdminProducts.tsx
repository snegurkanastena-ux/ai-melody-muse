import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Package } from 'lucide-react';
import { Product, ProductCategory, ProductMood, categoryLabels, moodLabels } from '@/data/products';

const defaultProduct: Omit<Product, 'id'> = {
  title: '', description: '', fullDescription: '', price: 0,
  category: 'custom', mood: 'romantic', coverGradient: 'from-primary/20 to-plum/20',
  includes: [], timeline: '', format: '', targetAudience: '', type: 'service',
};

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [includesText, setIncludesText] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('melano_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      import('@/data/products').then(m => {
        setProducts(m.products);
        localStorage.setItem('melano_products', JSON.stringify(m.products));
      });
    }
  }, []);

  const save = (list: Product[]) => {
    setProducts(list);
    localStorage.setItem('melano_products', JSON.stringify(list));
  };

  const openNew = () => {
    const p = { ...defaultProduct, id: `product-${Date.now()}` } as Product;
    setEditing(p);
    setIsNew(true);
    setIncludesText('');
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setIsNew(false);
    setIncludesText(p.includes.join('\n'));
  };

  const handleSave = () => {
    if (!editing) return;
    const updated = { ...editing, includes: includesText.split('\n').filter(Boolean) };
    if (isNew) {
      save([...products, updated]);
    } else {
      save(products.map(p => p.id === updated.id ? updated : p));
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить товар?')) save(products.filter(p => p.id !== id));
  };

  if (editing) {
    return (
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-white">{isNew ? 'Новый товар' : 'Редактирование'}</h1>
          <button onClick={() => setEditing(null)} className="text-white/30 hover:text-white"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-4">
          {([
            { key: 'title', label: 'Название', type: 'text' },
            { key: 'description', label: 'Краткое описание', type: 'text' },
            { key: 'price', label: 'Цена (₽)', type: 'number' },
            { key: 'timeline', label: 'Сроки выполнения', type: 'text' },
            { key: 'format', label: 'Формат результата', type: 'text' },
          ] as const).map(field => (
            <div key={field.key}>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={editing[field.key] as string | number}
                onChange={e => setEditing({ ...editing, [field.key]: field.type === 'number' ? +e.target.value : e.target.value })}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/30"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Категория</label>
              <select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value as ProductCategory })}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 focus:outline-none">
                {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Настроение</label>
              <select value={editing.mood} onChange={e => setEditing({ ...editing, mood: e.target.value as ProductMood })}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 focus:outline-none">
                {Object.entries(moodLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Тип</label>
              <select value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value as 'song' | 'service' })}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 focus:outline-none">
                <option value="service">Услуга</option>
                <option value="song">Песня</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Полное описание</label>
            <textarea value={editing.fullDescription} onChange={e => setEditing({ ...editing, fullDescription: e.target.value })}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none resize-none" rows={4} />
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Что входит (каждый пункт с новой строки)</label>
            <textarea value={includesText} onChange={e => setIncludesText(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none resize-none" rows={4} />
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Целевая аудитория</label>
            <textarea value={editing.targetAudience} onChange={e => setEditing({ ...editing, targetAudience: e.target.value })}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none resize-none" rows={2} />
          </div>

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
          <h1 className="font-display text-2xl font-bold text-white">Товары и услуги</h1>
          <p className="text-sm text-white/40 mt-1">Управление каталогом</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 rounded-xl bg-primary/15 border border-primary/20 px-4 py-2.5 text-sm text-primary hover:bg-primary/25 transition-colors">
          <Plus className="h-4 w-4" /> Добавить
        </button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <Package className="mx-auto h-10 w-10 text-white/15 mb-3" />
          <p className="text-white/40">Товаров нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${p.coverGradient} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{p.title}</p>
                <p className="text-xs text-white/40">{categoryLabels[p.category]} · {p.price.toLocaleString('ru-RU')} ₽</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(p)} className="text-white/30 hover:text-white transition-colors"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(p.id)} className="text-white/30 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
