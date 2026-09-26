import React, { useState } from 'react';
import { PhotographerPortfolio } from '@/types';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { Modal } from '@/components/ui/modal';

export function PortfolioGrid({ portfolios }: { portfolios: PhotographerPortfolio[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotographerPortfolio | null>(null);

  if (!portfolios || portfolios.length === 0) {
    return (
      <div className="bg-stone-50 rounded-2xl p-8 text-center text-sm text-stone-500 border border-stone-200/60">
        Belum ada portofolio yang diunggah untuk fotografer ini.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {portfolios.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-stone-200/80 bg-stone-100 shadow-sm aspect-[4/5] hover:shadow-md transition-all"
          >
            <PlaceholderImage
              src={item.imageUrl}
              alt={item.title || 'Portofolio Foto'}
              aspectRatio="auto"
              category="photographer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-xs font-medium text-white line-clamp-1">{item.title || 'Lihat Foto'}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        title={selectedPhoto?.title || 'Preview Portofolio'}
      >
        {selectedPhoto && (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-xl bg-stone-100 max-h-[70vh] flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title || 'Portofolio'}
                className="w-full h-auto object-contain max-h-[65vh]"
              />
            </div>
            {selectedPhoto.title && (
              <p className="text-sm text-stone-600 font-medium text-center">{selectedPhoto.title}</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
