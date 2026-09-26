import React from 'react';
import Link from 'next/link';
import { Template } from '@/types';
import { Card, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { formatRupiah } from '@/lib/utils';
import { Eye, ArrowRight } from 'lucide-react';

export function TemplateCard({ template }: { template: Template }) {
  const isWedding = template.category?.name?.toLowerCase().includes('pernikahan');

  return (
    <Card className="flex flex-col h-full group border border-stone-200/80 hover:border-[#C5A059]/50 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[4/3]">
        <PlaceholderImage
          src={template.thumbnail}
          alt={template.name}
          aspectRatio="auto"
          category={isWedding ? 'wedding' : 'graduation'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={isWedding ? 'gold' : 'info'}>
            {template.category?.name || 'Undangan Digital'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-serif-luxury font-bold text-stone-900 group-hover:text-[#9A7730] transition-colors line-clamp-1">
            {template.name}
          </h3>
          <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
            {template.description || 'Template undangan digital elegan dengan fitur interaktif lengkap.'}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Harga</span>
            <span className="text-sm font-bold text-stone-900">{formatRupiah(template.price)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/invitation/template/${template.slug}`}>
              <Button variant="outline" size="sm" className="px-3" title="Lihat Template">
                <Eye className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link href={`/invitation/create?template=${template.slug}`}>
              <Button variant="gold" size="sm" className="text-xs flex items-center gap-1">
                <span>Pilih</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
