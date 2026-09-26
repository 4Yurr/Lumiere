import React from 'react';

interface PlaceholderImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  category?: 'wedding' | 'graduation' | 'photographer' | 'abstract';
}

export function PlaceholderImage({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  category = 'abstract',
}: PlaceholderImageProps) {
  const [hasError, setHasError] = React.useState(false);

  const aspectStyles = {
    video: 'aspect-[16/9]',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    auto: '',
  };

  const gradients = {
    wedding: 'from-[#FBF8F3] via-[#F4ECE1] to-[#EBDCCB]',
    graduation: 'from-[#F1F5F9] via-[#E2E8F0] to-[#CBD5E1]',
    photographer: 'from-[#FAF7F2] via-[#EFE8DC] to-[#DFD3BF]',
    abstract: 'from-[#FAF8F5] via-[#F3EDE2] to-[#E5DACE]',
  };

  if (src && !hasError) {
    return (
      <div className={`relative overflow-hidden bg-stone-100 ${aspectStyles[aspectRatio]} ${className}`}>
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  // Fallback elegant abstract styled placeholder
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br ${gradients[category]} border border-stone-200/60 p-6 text-center select-none ${aspectStyles[aspectRatio]} ${className}`}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Abstract geometric ring decoration */}
      <div className="w-12 h-12 rounded-full border border-[#C5A059]/40 flex items-center justify-center mb-2 z-10">
        <div className="w-6 h-6 rounded-full bg-[#C5A059]/20" />
      </div>

      <p className="text-xs font-medium text-stone-700 max-w-[80%] truncate z-10">{alt}</p>
      <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5 z-10">Lumiere Visual</span>
    </div>
  );
}
