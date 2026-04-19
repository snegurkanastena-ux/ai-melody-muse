import React from 'react';
import { motion } from 'framer-motion';
import { useMusicNoteBurst } from '@/hooks/useMusicNoteBurst';
import { CatalogAudioProvider } from '@/contexts/CatalogAudioContext';
import { CatalogAlbumBlock } from '@/components/catalog/CatalogAlbumBlock';
import { CatalogPlayerBar } from '@/components/catalog/CatalogPlayerBar';
import {
  catalogMelanoNew,
  catalogPrevious,
  catalogPreviousSingles,
  catalogClientWorks,
  melanoAlbumTracks,
  vesnaAlbumTracks,
} from '@/data/catalogMusic';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

/** Компактная обложка для синглов / клиентских карточек (не на всю ширину) */
function CatalogCompactCover({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-[5.25rem] w-[5.25rem] shrink-0 self-start overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-white/5 sm:h-28 sm:w-28">
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
    </div>
  );
}

function CatalogInner() {
  const musicBurst = useMusicNoteBurst();

  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-24"
            onClick={musicBurst}
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-6">
                <div className="min-w-0">
                  <h1 className="font-display text-4xl font-bold tracking-[0.12em] md:text-5xl">{catalogMelanoNew.heading}</h1>
                  <p className="mt-3 text-muted-foreground md:text-lg">{catalogMelanoNew.subtitle}</p>

                  <div className="mt-5 lg:mt-6">
                    <CatalogAlbumBlock
                      coverSrc={catalogMelanoNew.album.coverSrc}
                      albumTitle={catalogMelanoNew.album.title}
                      tracks={melanoAlbumTracks}
                      statusLabel={catalogMelanoNew.album.status}
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <h2 className="font-display text-3xl font-bold md:text-4xl">{catalogPrevious.heading}</h2>
                  <p className="mt-3 text-muted-foreground md:text-lg">{catalogPrevious.subtitle}</p>

                  <div className="mt-5 lg:mt-6">
                    <CatalogAlbumBlock
                      coverSrc={catalogPrevious.album.coverSrc}
                      albumTitle={catalogPrevious.album.title}
                      tracks={vesnaAlbumTracks}
                      albumKindLabel="Альбом"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-4">
              {catalogPreviousSingles.map((single, i) => (
                <motion.article
                  key={single.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="interactive-card flex h-full min-h-0 w-full flex-row gap-3 overflow-hidden border-border/40 bg-card/40 p-3 sm:gap-4 sm:p-4"
                  onClick={musicBurst}
                >
                  <CatalogCompactCover src={single.coverSrc} alt={single.title} />
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col border-l border-border/20 pl-3 sm:pl-4">
                    <div className="flex min-h-0 flex-1 flex-col">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Сингл</p>
                      <h4 className="mt-0.5 line-clamp-2 font-display text-base font-bold leading-tight text-foreground md:text-lg">
                        {single.title}
                      </h4>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-muted-foreground sm:text-sm">{single.description}</p>
                    </div>
                    <div className="mt-auto shrink-0 border-t border-border/20 pt-2.5">
                      <CatalogPlayerBar id={single.id} audioSrc={single.audioSrc} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Песни на заказ / клиентские работы</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground md:text-lg">
              Примеры выполненных песен для клиентов
            </p>

            <div className="mt-10 grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-4">
              {catalogClientWorks.map((work, i) => (
                <motion.article
                  key={work.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="interactive-card flex h-full min-h-0 w-full flex-row gap-3 overflow-hidden border-border/40 bg-card/40 p-3 sm:gap-4 sm:p-4"
                  onClick={musicBurst}
                >
                  <CatalogCompactCover src={work.coverSrc} alt={work.title} />
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col border-l border-border/20 pl-3 sm:pl-4">
                    <div className="flex min-h-0 flex-1 flex-col">
                      <h3 className="line-clamp-2 font-display text-base font-bold leading-tight text-foreground md:text-lg">{work.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-muted-foreground sm:text-sm">{work.description}</p>
                    </div>
                    <div className="mt-auto shrink-0 border-t border-border/20 pt-2.5">
                      <CatalogPlayerBar id={work.id} audioSrc={work.audioSrc} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Catalog: React.FC = () => (
  <CatalogAudioProvider>
    <CatalogInner />
  </CatalogAudioProvider>
);

export default Catalog;
