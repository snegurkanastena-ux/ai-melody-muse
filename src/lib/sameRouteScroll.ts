import type { MouseEvent } from 'react';

/** Если ссылка ведёт на текущий путь — не перезагружаем маршрут, плавно поднимаем страницу к шапке. */
export function samePathScrollToTop(
  e: MouseEvent<HTMLAnchorElement>,
  pathname: string,
  to: string,
) {
  if (pathname === to) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
