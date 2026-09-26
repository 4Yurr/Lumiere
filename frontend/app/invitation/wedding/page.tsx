'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Template } from '@/types';
import { templateService } from '@/services/template.service';
import { Container, Badge } from '@/components/ui/card';
import { TemplateCard } from '@/components/invitation/template-card';
import { LoadingSpinner, EmptyState } from '@/components/ui/modal';
import { Heart, ArrowLeft } from 'lucide-react';

export default function UndanganWeddingPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    templateService
      .getAll()
      .then((data) => {
        const filtered = data.filter((t) =>
          t.category?.name?.toLowerCase().includes('pernikahan')
        );
        setTemplates(filtered);
      })
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Navigation back */}
        <Link
          href="/invitation"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Pilihan Kategori</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-8 border-b border-stone-200/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold">Kategori Khusus</Badge>
              <div className="flex items-center text-xs text-[#9A7730] font-semibold gap-1">
                <Heart className="w-4 h-4" />
                <span>Wedding & Romantic Nuptials</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-slate-900">
              Undangan Pernikahan Eksklusif
            </h1>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl">
              Kurasi desain bernuansa elegan, botanical floral, royal gold nusantara, dan modern editorial untuk menyempurnakan hari bahagia Anda.
            </p>
          </div>
          <div className="text-xs text-stone-400">
            Menampilkan <strong className="text-stone-800">{templates.length}</strong> template
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner text="Memuat template pernikahan..." />
        ) : templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((tmpl) => (
              <TemplateCard key={tmpl.id} template={tmpl} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Belum Ada Template Pernikahan"
            description="Template untuk kategori pernikahan sedang dalam proses penyiapan."
          />
        )}
      </Container>
    </div>
  );
}
