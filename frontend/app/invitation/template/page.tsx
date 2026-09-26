'use client';

import React, { useEffect, useState } from 'react';
import { Template } from '@/types';
import { templateService } from '@/services/template.service';
import { Container, Badge } from '@/components/ui/card';
import { TemplateCard } from '@/components/invitation/template-card';
import { LoadingSpinner, EmptyState } from '@/components/ui/modal';

export default function AllTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'MAHASISWA' | 'WEDDING'>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    templateService
      .getAll()
      .then(setTemplates)
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = templates.filter((t) => {
    if (filter === 'MAHASISWA') return t.category?.name?.toLowerCase().includes('mahasiswa');
    if (filter === 'WEDDING') return t.category?.name?.toLowerCase().includes('pernikahan');
    return true;
  });

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="gold" className="mb-2">Koleksi Lengkap</Badge>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-slate-900">
            Seluruh Template Undangan Lumière
          </h1>
          <p className="text-sm text-stone-500 mt-2">
            Pilih desain yang paling mencerminkan kepribadian dan tema acara istimewa Anda.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Semua Template ({templates.length})
          </button>
          <button
            onClick={() => setFilter('MAHASISWA')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'MAHASISWA'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            🎓 Mahasiswa
          </button>
          <button
            onClick={() => setFilter('WEDDING')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'WEDDING'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            💍 Pernikahan
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <LoadingSpinner text="Memuat koleksi template..." />
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((tmpl) => (
              <TemplateCard key={tmpl.id} template={tmpl} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Tidak Ada Template"
            description="Belum ada template pada filter yang dipilih."
          />
        )}
      </Container>
    </div>
  );
}
