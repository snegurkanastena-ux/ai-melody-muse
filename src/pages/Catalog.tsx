import React from 'react';
import { motion } from 'framer-motion';
import { useMusicNoteBurst } from '@/hooks/useMusicNoteBurst';
import {
  catalogMelanoNew,
  catalogPrevious,
  catalogPreviousSingles,
  catalogClientWorks,
} from '@/data/catalogMusic';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

/** Синглы и клиентские работы — прежняя логика высоты и cover */
const coverFrameClass = 'relative h-64 w-full shrink-0 overflow-hidden sm:h-72 md:h-80';

function CatalogCover({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={coverFrameClass}>
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
    </div>
  );
}

/** Альбомы: квадрат 1:1, без грубого кропа, тёмный фон под letterbox */
function AlbumCoverSquare({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-square w-full bg-zinc-950/90">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain p-3 sm:p-4"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

const Catalog: React.FC = () => {
  const musicBurst = useMusicNoteBurst();

  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto w-full max-w-6xl">
          {/* Блоки 1+2: заголовки и оба альбома в одном ряду на desktop */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-24"
            onClick={musicBurst}
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 lg:items-start">
              {/* Колонка: MELANØ + альбом «Без свидетелей» */}
              <div className="min-w-0">
                <h1 className="font-display text-4xl font-bold tracking-[0.12em] md:text-5xl">{catalogMelanoNew.heading}</h1>
                <p className="mt-3 text-muted-foreground md:text-lg">{catalogMelanoNew.subtitle}</p>

                <article className="interactive-card mt-6 w-full max-w-full overflow-hidden p-0 lg:mt-8">
                  <AlbumCoverSquare src={catalogMelanoNew.album.coverSrc} alt={catalogMelanoNew.album.title} />
                  <div className="border-t border-border/25 bg-card/90 px-4 py-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h2 className="font-display text-xl font-bold leading-tight md:text-2xl">{catalogMelanoNew.album.title}</h2>
                      <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {catalogMelanoNew.album.status}
                      </span>
                    </div>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Треклист</p>
                    <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm leading-snug text-muted-foreground">
                      {catalogMelanoNew.album.tracks.map(t => (
                        <li key={t}>{t}</li>
                      ))}
                    </ol>
                  </div>
                </article>
              </div>

              {/* Колонка: Ранее выпущено + альбом «Весна между строк» */}
              <div className="min-w-0">
                <h2 className="font-display text-3xl font-bold md:text-4xl">{catalogPrevious.heading}</h2>
                <p className="mt-3 text-muted-foreground md:text-lg">{catalogPrevious.subtitle}</p>

                <article className="interactive-card mt-6 w-full max-w-full overflow-hidden p-0 lg:mt-8">
                  <AlbumCoverSquare src={catalogPrevious.album.coverSrc} alt={catalogPrevious.album.title} />
                  <div className="border-t border-border/25 bg-card/90 px-4 py-5">
                    <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">{catalogPrevious.album.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Альбом</p>
                  </div>
                </article>
              </div>
            </div>

            {/* Синглы — без изменений логики сетки */}
            <div className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
              {catalogPreviousSingles.map((single, i) => (
                <motion.article
                  key={single.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="interactive-card w-full overflow-hidden p-0"
                  onClick={musicBurst}
                >
                  <CatalogCover src={single.coverSrc} alt={single.title} />
                  <div className="border-t border-border/20 bg-card/80 px-5 py-5 md:px-6 md:py-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Сингл</p>
                    <h4 className="mt-1 font-display text-lg font-semibold md:text-xl">{single.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{single.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Блок 3 — Песни на заказ */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Песни на заказ / клиентские работы</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground md:text-lg">
              Примеры выполненных песен для клиентов
            </p>

            <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
              {catalogClientWorks.map((work, i) => (
                <motion.article
                  key={work.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="interactive-card w-full overflow-hidden p-0"
                  onClick={musicBurst}
                >
                  <CatalogCover src={work.coverSrc} alt={work.title} />
                  <div className="border-t border-border/20 bg-card/80 px-5 py-5 md:px-6 md:py-6">
                    <h3 className="font-display text-xl font-semibold">{work.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{work.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
