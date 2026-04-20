import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Сброс скролла при смене страницы (React Router сам по умолчанию этого не делает).
 * Если в URL есть hash и на странице есть элемент с таким id — прокрутка к якорю.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
