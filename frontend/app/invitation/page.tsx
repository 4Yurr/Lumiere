'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Template } from '@/types';
import { templateService } from '@/services/template.service';
import { Container, Section, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TemplateCard } from '@/components/invitation/template-card';
import { LoadingSpinner } from '@/components/ui/modal';
import { GraduationCap, Heart, ArrowRight } from 'lucide-react';

export default function InvitationIndexPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    templateService
      .getAll()
      .then(setTemplates)
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  const mahasiswaTemplates = templates.filter((t) =>
    t.category?.name?.toLowerCase().includes('mahasiswa')
  );
  const weddingTemplates = templates.filter((t) =>
    t.category?.name?.toLowerCase().includes('pernikahan')
  );

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" className="mb-3">Undangan Digital Eksklusif</Badge>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-slate-900 leading-tight">
            Desain Undangan Modern untuk Momen Bersejarah Anda
          </h1>
          <p className="text-base text-stone-600 mt-4 leading-relaxed">
            Pilih kategori perayaan Anda. Setiap template dilengkapi fitur interaktif: peta lokasi, galeri foto, RSVP langsung, ucapan & doa, dan amplop digital.
          </p>
        </div>

        {/* 2 Main Choice Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mahasiswa Banner */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] border border-blue-200/80 shadow-elegant flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif-luxury font-bold text-slate-900">
                Undangan Mahasiswa
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Rayakan kelulusan wisuda sarjana, pascasarjana, syukuran sidang skripsi, dan temu alumni dengan undangan digital yang bersih, modern, dan penuh kebanggaan.
              </p>
            </div>
            <div className="pt-8">
              <Link href="/invitation/mahasiswa">
                <Button variant="primary" size="md" className="w-full sm:w-auto flex items-center gap-2">
                  <span>Lihat Undangan Mahasiswa</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Wedding Banner */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#FAF7F2] to-[#FFF1F2] border border-rose-200/80 shadow-elegant flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059] text-white flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif-luxury font-bold text-slate-900">
                Undangan Pernikahan
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Bagikan kisah cinta Anda dalam balutan desain bernuansa floral botanical, adat nusantara mewah, atau modern minimalis yang menyentuh hati para tamu undangan.
              </p>
            </div>
            <div className="pt-8">
              <Link href="/invitation/wedding">
                <Button variant="gold" size="md" className="w-full sm:w-auto flex items-center gap-2">
                  <span>Lihat Undangan Pernikahan</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Mahasiswa Templates */}
        {loading ? (
          <LoadingSpinner text="Memuat koleksi undangan..." />
        ) : (
          <>
            {mahasiswaTemplates.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-serif-luxury font-bold text-slate-900">
                      🎓 Undangan Mahasiswa & Wisuda
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">Template terpopuler untuk wisuda dan sidang kelulusan.</p>
                  </div>
                  <Link href="/invitation/mahasiswa">
                    <Button variant="ghost" size="sm" className="text-xs font-semibold text-[#9A7730]">
                      Lihat Semua Mahasiswa →
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mahasiswaTemplates.map((t) => (
                    <TemplateCard key={t.id} template={t} />
                  ))}
                </div>
              </div>
            )}

            {weddingTemplates.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-serif-luxury font-bold text-slate-900">
                      💍 Undangan Pernikahan (Wedding)
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">Nuansa romantis, floral, dan adat istiadat nusantara.</p>
                  </div>
                  <Link href="/invitation/wedding">
                    <Button variant="ghost" size="sm" className="text-xs font-semibold text-[#9A7730]">
                      Lihat Semua Wedding →
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {weddingTemplates.map((t) => (
                    <TemplateCard key={t.id} template={t} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
