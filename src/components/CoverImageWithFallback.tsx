import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CoverImageWithFallbackProps {
  src?: string;
  /** Tailwind gradient classes, e.g. from-graphite/40 to-secondary/60 */
  gradientClass: string;
  /** Optional wrapper when showing gradient fallback */
  fallbackClassName?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}

/**
 * Обложка с переходом на градиент при отсутствии src или ошибке загрузки (без битой иконки).
 */
export const CoverImageWithFallback: React.FC<CoverImageWithFallbackProps> = ({
  src,
  gradientClass,
  fallbackClassName,
  imgClassName,
  children,
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-gradient-to-br',
          gradientClass,
          fallbackClassName,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={imgClassName}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
};
