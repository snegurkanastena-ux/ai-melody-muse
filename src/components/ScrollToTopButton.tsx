import { useCallback, useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const SHOW_AFTER = 400;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={goUp}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/90 text-primary shadow-lg backdrop-blur-md transition-colors hover:border-primary hover:bg-primary/10 md:bottom-8 md:right-8"
      aria-label="Наверх"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
