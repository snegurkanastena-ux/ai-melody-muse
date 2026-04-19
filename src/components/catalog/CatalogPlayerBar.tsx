import React, { useCallback } from 'react';
import { Pause, Play } from 'lucide-react';
import { useCatalogAudio } from '@/contexts/CatalogAudioContext';

type Props = {
  id: string;
  audioSrc: string;
  className?: string;
};

export const CatalogPlayerBar: React.FC<Props> = ({ id, audioSrc, className }) => {
  const { activeId, isPlaying, currentTime, duration, formatTime, toggle, seekFromProgressClick } = useCatalogAudio();
  const isActive = activeId === id;
  const pct = isActive && duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const onBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!isActive) return;
      seekFromProgressClick(e.clientX, e.currentTarget.getBoundingClientRect());
    },
    [isActive, seekFromProgressClick],
  );

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(id, audioSrc);
  };

  const showDur = isActive && duration > 0;
  const timeEnd = showDur ? formatTime(duration) : '—:—';

  return (
    <div className={className} onClick={e => e.stopPropagation()}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
          aria-label={isActive && isPlaying ? 'Пауза' : 'Воспроизвести'}
        >
          {isActive && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        <div className="min-w-0 flex-1">
          <div
            className={`h-1 w-full rounded-full bg-muted ${isActive ? 'cursor-pointer' : 'cursor-default opacity-70'}`}
            onClick={onBarClick}
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-150 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[10px] tabular-nums text-muted-foreground">
            <span>{formatTime(isActive ? currentTime : 0)}</span>
            <span>{timeEnd}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
