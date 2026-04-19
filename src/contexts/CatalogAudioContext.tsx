import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

type CatalogAudioContextValue = {
  activeId: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  formatTime: typeof formatTime;
  toggle: (id: string, src: string) => void;
  seekFromProgressClick: (clientX: number, rect: DOMRect) => void;
};

const CatalogAudioContext = createContext<CatalogAudioContextValue | null>(null);

export function CatalogAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => setDuration(Number.isFinite(a.duration) ? a.duration : 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setActiveId(null);
    };

    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('durationchange', onMeta);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);

    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('durationchange', onMeta);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
    };
  }, []);

  const toggle = useCallback((id: string, src: string) => {
    const a = audioRef.current;
    if (!a) return;

    if (activeId === id) {
      if (a.paused) void a.play();
      else a.pause();
      return;
    }

    a.src = src;
    setActiveId(id);
    setCurrentTime(0);
    void a.play().catch(() => {
      setActiveId(null);
      setIsPlaying(false);
    });
  }, [activeId]);

  const seekFromProgressClick = useCallback((clientX: number, rect: DOMRect) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    a.currentTime = ratio * duration;
  }, [duration]);

  const value = useMemo(
    () => ({
      activeId,
      isPlaying,
      currentTime,
      duration,
      formatTime,
      toggle,
      seekFromProgressClick,
    }),
    [activeId, isPlaying, currentTime, duration, toggle, seekFromProgressClick],
  );

  return (
    <CatalogAudioContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" className="hidden" aria-hidden />
      {children}
    </CatalogAudioContext.Provider>
  );
}

export function useCatalogAudio() {
  const ctx = useContext(CatalogAudioContext);
  if (!ctx) throw new Error('useCatalogAudio must be used within CatalogAudioProvider');
  return ctx;
}
