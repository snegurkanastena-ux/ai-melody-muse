import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Package, Eye, EyeOff } from 'lucide-react';
import { Product, ProductCategory, ProductMood, categoryLabels, moodLabels } from '@/data/products';
import { motion } from 'framer-motion';

const defaultProduct: Omit<Product, 'id'> = {
  title: '', description: '', fullDescription: '', price: 0,
  category: 'custom', mood: 'romantic', coverGradient: 'from-primary/20 to-plum/20',
  includes: [], timeline: '', format: '', targetAudience: '', type: 'service',
};

const gradientOptions = [
  'from-primary/20 to-plum/20',
  'from-blue-500/20 to-cyan-500/10',
  'from-amber-500/20 to-orange-500/10',
  'from-emerald-500/20 to-teal-500/10',
  'from-purple-500/20 to-pink-500/10',
  'from-rose-500/20 to-red-500/10',
];

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

  const save = (list: Product[]) => { setProducts(list); localStorage.setItem('melano_products', JSON.stringify(list)); };
  const openNew = () => { setEditing({ ...defaultProduct, id: `product-${Date.now()}` } as Product); setIsNew(true); setIncludesText(''); };
  const openEdit = (p: Product) => { setEditing({ ...p }); setIsNew(false); setIncludesText(p.includes.join('\n')); };
  const handleSave = () => {
    if (!editing) return;
    const updated = { ...editing, includes: includesText.split('\n').filter(Boolean) };
    save(isNew ? [...products, updated] : products.map(p => p.id === updated.id ? updated : p));
    setEditing(null);
  };
  const handleDelete = (id: string) => { if (confirm('Удалить товар?')) save(products.filter(p => p.id !== id)); };

  const InputField = ({ label, value, onChange, type = 'text' }: { label: string; value: string | number; onChange: (v: string) => void; type?: string }) => (
    <div>
      <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/20 transition-colors duration-300" />
    </div>
  );

  if (editing) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-primary/50 uppercase tracking-[0.3em] font-medium mb-2">{isNew ? 'Создание' : 'Редактирование'}</p>
            <h1 className="font-display text-2xl font-bold text-white">{isNew ? 'Новый продукт' : editing.title || 'Без названия'}</h1>
          </div>
          <button onClick={() => setEditing(null)} className="text-white/20 hover:text-white/50 transition-colors p-2 rounded-xl hover:bg-white/[0.03]"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">Основное</p>
            <InputField label="Название" value={editing.title} onChange={v => setEditing({ ...editing, title: v })} />
            <InputField label="Краткое описание" value={editing.description} onChange={v => setEditing({ ...editing, description: v })} />
            <InputField label="Цена (₽)" value={editing.price} onChange={v => setEditing({ ...editing, price: +v })} type="number" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Сроки" value={editing.timeline} onChange={v => setEditing({ ...editing, timeline: v })} />
              <InputField label="Формат" value={editing.format} onChange={v => setEditing({ ...editing, format: v })} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">Классификация</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Категория</label>
                <select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value as ProductCategory })}
                  className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm text-white/60 focus:outline-none cursor-pointer">
                  {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Настроение</label>
                <select value={editing.mood} onChange={e => setEditing({ ...editing, mood: e.target.value as ProductMood })}
                  className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm text-white/60 focus:outline-none cursor-pointer">
                  {Object.entries(moodLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Тип</label>
                <select value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value as 'song' | 'service' })}
                  className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm text-white/60 focus:outline-none cursor-pointer">
                  <option value="service">Услуга</option>
                  <option value="song">Песня</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-3">Обложка</label>
              <div className="flex gap-2">
                {gradientOptions.map(g => (
                  <button key={g} onClick={() => setEditing({ ...editing, coverGradient: g })}
                    className={`h-10 w-10 rounded-xl bg-gradient-to-br ${g} border-2 transition-all duration-200 ${editing.coverGradient === g ? 'border-primary scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">Детали</p>
            <div>
              <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Полное описание</label>
              <textarea value={editing.fullDescription} onChange={e => setEditing({ ...editing, fullDescription: e.target.value })}
                className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white/60 focus:outline-none focus:border-primary/20 resize-none transition-colors duration-300" rows={4} />
            </div>
            <div>
              <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Что входит (каждый пункт с новой строки)</label>
              <textarea value={includesText} onChange={e => setIncludesText(e.target.value)}
                className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white/60 focus:outline-none focus:border-primary/20 resize-none transition-colors duration-300" rows={4} />
            </div>
            <div>
              <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Целевая аудитория</label>
              <textarea value={editing.targetAudience} onChange={e => setEditing({ ...editing, targetAudience: e.target.value })}
                className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white/60 focus:outline-none focus:border-primary/20 resize-none transition-colors duration-300" rows={2} />
            </div>
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
          <p className="text-xs text-primary/50 uppercase tracking-[0.3em] font-medium mb-2">Каталог</p>
          <h1 className="font-display text-3xl font-bold text-white">Продукты и услуги</h1>
          <p className="text-sm text-white/25 mt-1">Управление вашим ассортиментом</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/10 px-5 py-3 text-sm text-primary/90 hover:from-primary/20 hover:shadow-[0_0_20px_-5px_hsl(340_60%_55%/0.2)] transition-all duration-300">
          <Plus className="h-4 w-4" /> Добавить
        </button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01] p-16 text-center">
          <Package className="mx-auto h-10 w-10 text-white/8 mb-4" />
          <p className="text-white/25 text-sm">Товаров нет</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {products.map(p => (
            <motion.div key={p.id} whileHover={{ y: -2 }}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.03] p-5 flex items-start gap-4 transition-all duration-300 group relative">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${p.coverGradient} shrink-0 flex items-center justify-center`}>
                <Package className="h-6 w-6 text-white/30" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90 truncate">{p.title}</p>
                <p className="text-xs text-white/30 mt-0.5">{categoryLabels[p.category]}</p>
                <p className="text-sm font-semibold text-primary/70 mt-2">{p.price.toLocaleString('ru-RU')} ₽</p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => openEdit(p)} className="p-2 rounded-xl bg-white/[0.04] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-xl bg-white/[0.04] text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
