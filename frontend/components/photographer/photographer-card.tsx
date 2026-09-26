import React from 'react';
import Link from 'next/link';
import { Photographer } from '@/types';
import { Card, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { formatRupiah, getAdminWhatsAppUrl } from '@/lib/utils';
import { MapPin, MessageCircle, ArrowRight } from 'lucide-react';

export function PhotographerCard({ photographer }: { photographer: Photographer }) {
  const isWedding = photographer.category?.name?.toLowerCase().includes('pernikahan');
  const waMessage = `Halo Admin Lumiere, saya tertarik untuk booking fotografer ${photographer.name} (${photographer.location || 'Indonesia'}). Mohon info ketersediaan jadwal.`;

  return (
    <Card className="flex flex-col h-full group border border-stone-200/80 hover:border-[#C5A059]/50 transition-all duration-300">
      {/* Profile / Cover Image */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[4/3]">
        <PlaceholderImage
          src={photographer.profileImage}
          alt={photographer.name}
          aspectRatio="auto"
          category={isWedding ? 'wedding' : 'graduation'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={isWedding ? 'gold' : 'info'}>
            {photographer.category?.name || 'Fotografer'}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-serif-luxury font-bold text-stone-900 group-hover:text-[#9A7730] transition-colors line-clamp-1">
            {photographer.name}
          </h3>
          <div className="flex items-center text-xs text-stone-500 mt-1">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#C5A059] shrink-0" />
            <span className="truncate">{photographer.location || 'Indonesia'}</span>
          </div>
          <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
            {photographer.description || 'Layanan dokumentasi foto profesional dengan hasil beresolusi tinggi dan tone warna berkelas.'}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Mulai dari</span>
            <span className="text-sm font-bold text-stone-900">{formatRupiah(photographer.startingPrice)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/photographer/${photographer.slug}`}>
              <Button variant="outline" size="sm" className="text-xs px-3">
                Detail
              </Button>
            </Link>
            <a
              href={getAdminWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="gold" size="sm" className="text-xs flex items-center gap-1">
                <MessageCircle className="w-3 h-3 text-white" />
                <span>Hubungi</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
