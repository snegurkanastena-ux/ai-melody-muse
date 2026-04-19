import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products, type Product } from '@/data/products';
import { resolveProductCoverSrc } from '@/data/serviceCoverImages';
import { useMusicNoteBurst } from '@/hooks/useMusicNoteBurst';
import { CoverImageWithFallback } from '@/components/CoverImageWithFallback';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55 } }),
};

/** Заголовки карточек на странице услуг (порядок отображения — по возрастанию `product.price` в `items`) */
const SERVICES_PAGE: { id: string; cardTitle: string }[] = [
  { id: 'song-text', cardTitle: 'Текст песни' },
  { id: 'consultation-idea', cardTitle: 'Консультация / разбор идеи' },
  { id: 'music-arrangement', cardTitle: 'Музыка и аранжировка' },
  { id: 'jingle', cardTitle: 'Джингл' },
  { id: 'ai-song-full', cardTitle: 'Песня под ключ' },
  { id: 'artist-concept', cardTitle: 'Разработка музыкального концепта для артиста' },
];

/** При одинаковой цене: «Текст песни» раньше «Консультации», если обе 3000 ₽ */
const SERVICES_TIE_BREAK_ORDER = [
  'song-text',
  'consultation-idea',
  'music-arrangement',
  'jingle',
  'ai-song-full',
  'artist-concept',
] as const;

const Services: React.FC = () => {
  const musicBurst = useMusicNoteBurst();

  const items = useMemo(() => {
    const rows = SERVICES_PAGE.map(({ id, cardTitle }) => {
      const product = products.find(p => p.id === id);
      return product ? { product, cardTitle } : null;
    }).filter((x): x is { product: Product; cardTitle: string } => x !== null);

    rows.sort((a, b) => {
      const d = a.product.price - b.product.price;
      if (d !== 0) return d;
      return (
        SERVICES_TIE_BREAK_ORDER.indexOf(a.product.id as (typeof SERVICES_TIE_BREAK_ORDER)[number]) -
        SERVICES_TIE_BREAK_ORDER.indexOf(b.product.id as (typeof SERVICES_TIE_BREAK_ORDER)[number])
      );
    });

    return rows;
  }, []);

  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Услуги</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
            Выберите формат музыкальной работы под вашу задачу
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map(({ product: p, cardTitle }, i) => (
            <motion.article
              key={p.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="group interactive-card flex flex-col overflow-hidden p-0 shadow-[0_20px_50px_-28px_hsl(340_60%_55%/0.18)]"
              onClick={musicBurst}
            >
              <div className="relative h-56 shrink-0 overflow-hidden sm:h-60">
                <CoverImageWithFallback
                  src={resolveProductCoverSrc(p.id, p.coverImage)}
                  gradientClass={p.coverGradient}
                  imgClassName="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 pt-12">
                  <h2 className="font-display text-xl font-bold leading-snug text-foreground md:text-[1.35rem]">
                    {cardTitle}
                  </h2>
                </div>
              </div>

              <div className="flex flex-1 flex-col border-t border-border/20 bg-card/80 px-6 py-6 md:px-7 md:py-7">
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <p className="mt-5 font-display text-xl font-bold text-primary">
                  от {p.price.toLocaleString('ru-RU')} ₽
                </p>
                <Link
                  to={`/product/${p.id}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-5 py-3 text-sm font-medium text-primary transition-colors hover:border-primary/60 hover:bg-primary/15"
                >
                  Подробнее <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
