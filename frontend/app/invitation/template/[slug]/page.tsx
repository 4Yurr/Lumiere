'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Template } from '@/types';
import { templateService } from '@/services/template.service';
import { Container, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { LoadingSpinner, EmptyState } from '@/components/ui/modal';
import { formatRupiah } from '@/lib/utils';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Smartphone,
  MapPin,
  Music,
  Share2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    templateService
      .getBySlug(slug)
      .then(setTemplate)
      .catch(() => setTemplate(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24">
        <LoadingSpinner text="Memuat detail template..." />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="py-24">
        <EmptyState
          title="Template Tidak Ditemukan"
          description="Template yang Anda cari mungkin telah dinonaktifkan atau tautan salah."
          actionLabel="Kembali ke Katalog"
          onAction={() => router.push('/invitation')}
        />
      </div>
    );
  }

  const isWedding = template.category?.name?.toLowerCase().includes('pernikahan');
  const templateFeatures = [
    'Tampilan Responsif Mobile & Tablet Ultra-smooth',
    'Integrasi Navigasi Langsung Google Maps & Waze',
    'Buku Tamu Digital & Konfirmasi Kehadiran (RSVP)',
    'Amplop Digital & Rekening Transfer Hadiah',
    'Galeri Foto Interaktif & Kisah Momen (Story)',
    'Background Musik Eksklusif & Countdown Timer Acara',
  ];

  return (
    <div className="py-10 md:py-16">
      <Container>
        {/* Back Link */}
        <Link
          href="/invitation"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Katalog Template</span>
        </Link>

        {/* Editorial Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Large Preview Showcase */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-stone-200/80 bg-stone-100 shadow-xl aspect-[4/3] relative">
              <PlaceholderImage
                src={template.thumbnail}
                alt={template.name}
                aspectRatio="auto"
                category={isWedding ? 'wedding' : 'graduation'}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant={isWedding ? 'gold' : 'info'}>
                  {template.category?.name || 'Undangan Digital'}
                </Badge>
              </div>
            </div>

            {/* Feature Icons Strip */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-stone-200/80 text-center">
              <div className="flex flex-col items-center">
                <Smartphone className="w-5 h-5 text-[#C5A059] mb-1" />
                <span className="text-[11px] font-medium text-stone-700">Mobile First</span>
              </div>
              <div className="flex flex-col items-center border-x border-stone-100">
                <Music className="w-5 h-5 text-[#C5A059] mb-1" />
                <span className="text-[11px] font-medium text-stone-700">Backsound Musik</span>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-5 h-5 text-[#C5A059] mb-1" />
                <span className="text-[11px] font-medium text-stone-700">Peta Digital</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Details & Purchasing */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-elegant space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9A7730] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Koleksi Eksklusif Lumière</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 leading-tight">
                {template.name}
              </h1>
              <p className="text-xs text-stone-400 mt-1">Slug ID: {template.slug}</p>
            </div>

            {/* Pricing Tag */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-400 block">
                  Biaya Pembuatan
                </span>
                <span className="text-2xl font-bold text-slate-900">
                  {formatRupiah(template.price)}
                </span>
              </div>
              <Badge variant="gold">Masa Aktif 1 Tahun</Badge>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2">
                Deskripsi Template
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {template.description ||
                  'Template ini dirancang dengan standar estetika tertinggi, mengedepankan keterbacaan, keindahan tata letak, dan kompatibilitas di seluruh layar smartphone modern.'}
              </p>
            </div>

            {/* Features list */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                Fitur Unggulan Yang Termasuk:
              </h3>
              <ul className="space-y-2.5">
                {templateFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <Link href={`/invitation/create?template=${template.slug}`} className="block">
                <Button variant="gold" size="lg" className="w-full flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/20 font-bold">
                  <span>GUNAKAN TEMPLATE INI</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Privasi data terjaga & pembayaran otomatis terverifikasi</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
