import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMusicNoteBurst } from '@/hooks/useMusicNoteBurst';
import { motion } from 'framer-motion';
import { Music, ShoppingCart, Send, Clock, FileText, Users, CheckCircle2, ArrowLeft } from 'lucide-react';
import { products, moodLabels, categoryLabels } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const musicBurst = useMusicNoteBurst();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Товар не найден</p>
          <Link to="/catalog" className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
            <ArrowLeft className="h-4 w-4" /> Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const similar = products.filter(p => p.id !== product.id && (p.category === product.category || p.mood === product.mood)).slice(0, 3);

  return (
    <section className="py-24">
      <div className="container">
        <Link to="/catalog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Каталог
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Cover */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br ${product.coverGradient} border border-border/30`}>
            <Music className="h-24 w-24 text-primary/30" />
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {product.type === 'song' ? 'Песня' : 'Услуга'}
              </span>
              <span className="rounded-full border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                {categoryLabels[product.category]}
              </span>
              <span className="rounded-full border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                {moodLabels[product.mood]}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">{product.title}</h1>
            <p className="mt-4 text-lg font-display font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.fullDescription}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="interactive-card flex items-start gap-3 !rounded-xl p-4">
                <Clock className="mt-0.5 h-5 w-5 text-primary/60" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Сроки</p>
                  <p className="mt-1 text-sm">{product.timeline}</p>
                </div>
              </div>
              <div className="interactive-card flex items-start gap-3 !rounded-xl p-4">
                <FileText className="mt-0.5 h-5 w-5 text-primary/60" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Формат</p>
                  <p className="mt-1 text-sm">{product.format}</p>
                </div>
              </div>
              <div className="interactive-card flex items-start gap-3 !rounded-xl p-4">
                <Users className="mt-0.5 h-5 w-5 text-primary/60" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Настроение</p>
                  <p className="mt-1 text-sm">{moodLabels[product.mood]}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold">Что входит</h3>
              <ul className="mt-3 space-y-2">
                {product.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary/60" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="interactive-card mt-6 !rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Кому подходит</p>
              <p className="mt-2 text-sm leading-relaxed text-secondary-foreground">{product.targetAudience}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => addItem(product)}
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:box-glow"
              >
                <ShoppingCart className="h-4 w-4" /> Добавить в корзину
              </button>
              <Link
                to="/checkout"
                className="flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3 font-medium text-primary transition-all hover:bg-primary/10"
              >
                <Send className="h-4 w-4" /> Оставить заявку
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-8 font-display text-2xl font-bold">Похожие</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="interactive-card group overflow-hidden" onClick={musicBurst}>
                  <div className={`h-36 bg-gradient-to-br ${p.coverGradient} flex items-center justify-center`}>
                    <Music className="h-8 w-8 text-primary/30" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{p.description}</p>
                    <p className="mt-2 font-display font-bold text-primary">{p.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
