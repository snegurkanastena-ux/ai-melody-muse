import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Filter } from 'lucide-react';
import { products, categoryLabels, moodLabels, type ProductCategory, type ProductMood } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useMusicNoteBurst } from '@/hooks/useMusicNoteBurst';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

const Catalog: React.FC = () => {
  const { addItem } = useCart();
  const musicBurst = useMusicNoteBurst();

  const songs = useMemo(() => products.filter(p => p.type === 'song'), []);

  const categoriesInSongs = useMemo(() => {
    const s = new Set(songs.map(p => p.category));
    return (Array.from(s) as ProductCategory[]).sort();
  }, [songs]);

  const moodsInSongs = useMemo(() => {
    const s = new Set(songs.map(p => p.mood).filter((m): m is ProductMood => m != null));
    return (Array.from(s) as ProductMood[]).sort();
  }, [songs]);

  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [moodFilter, setMoodFilter] = useState<ProductMood | 'all'>('all');

  const filtered = useMemo(() => {
    return songs.filter(p => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (moodFilter !== 'all' && p.mood !== moodFilter) return false;
      return true;
    });
  }, [songs, categoryFilter, moodFilter]);

  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Мои песни</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Слушайте мои релизы и выбирайте любимые композиции
          </p>
        </div>

        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Жанр:</span>
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${categoryFilter === 'all' ? 'bg-primary text-primary-foreground' : 'border border-border/50 text-muted-foreground hover:border-primary hover:text-primary'}`}
            >
              Все
            </button>
            {categoriesInSongs.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCategoryFilter(c)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${categoryFilter === c ? 'bg-primary text-primary-foreground' : 'border border-border/50 text-muted-foreground hover:border-primary hover:text-primary'}`}
              >
                {categoryLabels[c]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 ml-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Настроение:</span>
            <button
              type="button"
              onClick={() => setMoodFilter('all')}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${moodFilter === 'all' ? 'bg-primary text-primary-foreground' : 'border border-border/50 text-muted-foreground hover:border-primary hover:text-primary'}`}
            >
              Все
            </button>
            {moodsInSongs.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMoodFilter(m)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${moodFilter === m ? 'bg-primary text-primary-foreground' : 'border border-border/50 text-muted-foreground hover:border-primary hover:text-primary'}`}
              >
                {moodLabels[m]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="group interactive-card relative overflow-hidden"
              onClick={musicBurst}
            >
              <div className="relative h-52 overflow-hidden sm:h-56">
                {p.coverImage ? (
                  <img src={p.coverImage} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${p.coverGradient}`}>
                    <Music className="h-12 w-12 text-primary/35" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-90" />
              </div>
              <div className="p-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Песня
                  </span>
                  {p.mood != null && (
                    <span className="rounded-full border border-border/50 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {moodLabels[p.mood]}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  {p.price > 0 ? (
                    <span className="font-display text-xl font-bold text-primary">{p.price.toLocaleString('ru-RU')} ₽</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Слушать</span>
                  )}
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${p.id}`}
                      className="rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      Подробнее
                    </Link>
                    {p.price > 0 && (
                      <button
                        type="button"
                        onClick={() => addItem(p)}
                        className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        В корзину
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <Music className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p>Ничего не найдено. Попробуйте изменить фильтры.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
