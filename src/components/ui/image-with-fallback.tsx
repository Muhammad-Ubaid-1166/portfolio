'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ImageWithFallback({ src, alt, className, containerClassName }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const gradientColors = [
    'from-blue-600/20 to-blue-400/20',
    'from-cyan-500/20 to-blue-500/20',
    'from-amber-500/20 to-orange-500/20',
    'from-emerald-500/20 to-teal-500/20',
  ];
  const colorIndex = alt.length % gradientColors.length;

  return (
    <div className={cn('relative w-full h-full flex items-center justify-center', containerClassName)}>
      {error ? (
        <div className={cn('w-full h-full flex items-center justify-center bg-gradient-to-br rounded-lg', gradientColors[colorIndex])}>
          <ImageIcon className="w-8 h-8" style={{ color: 'rgba(167, 139, 250, 0.3)' }} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
