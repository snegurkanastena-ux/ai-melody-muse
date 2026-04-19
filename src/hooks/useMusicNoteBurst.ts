import { useCallback } from 'react';

const MOBILE_MQ = '(max-width: 767px)';
const REDUCE_MQ = '(prefers-reduced-motion: reduce)';
const GLYPHS = ['♪', '♫', '♬', '♩'];
/** Макс. длительность анимации + запас на завершение */
const REMOVE_MS = 1450;

function spawnBurst(clientX: number, clientY: number) {
  const count = 4 + Math.floor(Math.random() * 3);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'music-note-burst-particle';
    el.setAttribute('aria-hidden', 'true');
    el.textContent = GLYPHS[i % GLYPHS.length];

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.75;
    const dist = 52 + Math.random() * 58;
    const tx = `${Math.cos(angle) * dist}px`;
    const ty = `${Math.sin(angle) * dist}px`;

    const rot0 = (Math.random() - 0.5) * 40;
    const rotExtra = 55 + Math.random() * 95;
    const dir = i % 2 === 0 ? 1 : -1;
    const rot1 = rot0 + dir * rotExtra;

    const durationMs = 900 + Math.floor(Math.random() * 501);

    el.style.left = `${clientX}px`;
    el.style.top = `${clientY}px`;
    el.style.setProperty('--tx', tx);
    el.style.setProperty('--ty', ty);
    el.style.setProperty('--rot0', `${rot0}deg`);
    el.style.setProperty('--rot1', `${rot1}deg`);
    el.style.animationDuration = `${durationMs}ms`;

    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), REMOVE_MS);
  }
}

/**
 * Всплеск нот у курсора. Отключён на мобильных и при prefers-reduced-motion.
 * Не вызывайте preventDefault — ссылки и кнопки работают как обычно.
 */
export function useMusicNoteBurst() {
  return useCallback((e: React.MouseEvent | React.PointerEvent) => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia(REDUCE_MQ).matches) return;
    if (window.matchMedia(MOBILE_MQ).matches) return;

    spawnBurst(e.clientX, e.clientY);
  }, []);
}
