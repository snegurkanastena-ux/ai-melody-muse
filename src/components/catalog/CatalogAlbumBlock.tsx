import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { CatalogPlayerBar } from '@/components/catalog/CatalogPlayerBar';
import { useCatalogAudio } from '@/contexts/CatalogAudioContext';
import type { CatalogPlayableTrack } from '@/data/catalogMusic';

type Props = {
  coverSrc: string;
  albumTitle: string;
  tracks: CatalogPlayableTrack[];
  statusLabel?: string;
  albumKindLabel?: string;
};

const SWIPE_PX = 56;

export const CatalogAlbumBlock: React.FC<Props> = ({
  coverSrc,
  albumTitle,
  tracks,
  statusLabel,
  albumKindLabel,
}) => {
  const { activeId, isPlaying, toggle } = useCatalogAudio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const trackIds = useMemo(() => new Set(tracks.map(t => t.id)), [tracks]);

  useEffect(() => {
    if (!activeId || !trackIds.has(activeId)) return;
    const idx = tracks.findIndex(t => t.id === activeId);
    if (idx >= 0) setCurrentIndex(idx);
  }, [activeId, trackIds, tracks]);

  const currentTrack = tracks[currentIndex];
  const activeInAlbum = activeId != null && trackIds.has(activeId);
  /** Полоса прогресса только если загружен именно отображаемый трек */
  const showProgressBar = activeInAlbum && activeId === currentTrack?.id;
  const playingThisTrack = activeId === currentTrack?.id && isPlaying;

  const goDelta = useCallback(
    (delta: number) => {
      const len = tracks.length;
      if (len === 0) return;
      const newIndex = (currentIndex + delta + len) % len;
      const t = tracks[newIndex];
      setCurrentIndex(newIndex);
      if (activeId && trackIds.has(activeId) && isPlaying) {
        toggle(t.id, t.audioSrc);
      }
    },
    [currentIndex, tracks, activeId, trackIds, isPlaying, toggle],
  );

  const goPrev = useCallback(() => goDelta(-1), [goDelta]);
  const goNext = useCallback(() => goDelta(1), [goDelta]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const x = e.changedTouches[0].clientX;
    const d = x - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(d) < SWIPE_PX) return;
    if (d < 0) goNext();
    else goPrev();
  };

  const onPlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentTrack) return;
    toggle(currentTrack.id, currentTrack.audioSrc);
  };

  if (tracks.length === 0) return null;

  return (
    <div
      className="interactive-card overflow-hidden border-border/40 bg-card/40 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.65)]"
      onClick={e => e.stopPropagation()}
    >
      <div
        className="flex touch-pan-y flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="mx-auto w-full max-w-[240px] shrink-0 sm:mx-0 sm:w-[42%] sm:max-w-[220px] md:max-w-[240px]">
          <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-white/5">
            <img
              src={coverSrc}
              alt=""
              className="h-full w-full object-contain object-center p-2.5"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-foreground md:text-xl">
                {albumTitle}
              </h3>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {statusLabel ? (
                  <span className="rounded-full border border-primary/35 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {statusLabel}
                  </span>
                ) : null}
                {albumKindLabel ? (
                  <span className="text-[11px] text-muted-foreground">{albumKindLabel}</span>
                ) : null}
              </div>
            </div>

            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Текущий трек
            </p>
            <p className="mt-1 text-[11px] tabular-nums text-muted-foreground/90">
              {currentIndex + 1}/{tracks.length}
            </p>
            <p className="mt-2 font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
              {currentTrack.title}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6">
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                goPrev();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/60 text-foreground transition-colors hover:border-primary/40 hover:bg-muted/50"
              aria-label="Предыдущий трек"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onPlayPause}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/45 bg-primary/15 text-primary shadow-[0_0_24px_-8px_hsl(340_60%_55%/0.5)] transition-colors hover:bg-primary/25"
              aria-label={playingThisTrack ? 'Пауза' : 'Воспроизвести'}
            >
              {playingThisTrack ? <Pause className="h-7 w-7" /> : <Play className="ml-1 h-7 w-7" />}
            </button>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                goNext();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/60 text-foreground transition-colors hover:border-primary/40 hover:bg-muted/50"
              aria-label="Следующий трек"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-3 text-center text-[10px] text-muted-foreground/55 sm:hidden">
            Свайпните влево или вправо для переключения треков
          </p>

          {showProgressBar && activeId ? (
            <div className="mt-4 border-t border-border/25 pt-4">
              <CatalogPlayerBar id={activeId} audioSrc={tracks.find(t => t.id === activeId)!.audioSrc} />
            </div>
          ) : (
            <p className="mt-4 border-t border-border/25 pt-3 text-center text-[11px] text-muted-foreground/55">
              Нажмите play для воспроизведения
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
