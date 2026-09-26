'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Template } from '@/types';
import { templateService } from '@/services/template.service';
import { Container, Badge } from '@/components/ui/card';
import { TemplateCard } from '@/components/invitation/template-card';
import { LoadingSpinner, EmptyState } from '@/components/ui/modal';
import { GraduationCap, ArrowLeft } from 'lucide-react';

export default function UndanganMahasiswaPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    templateService
      .getAll()
      .then((data) => {
        const filtered = data.filter((t) =>
          t.category?.name?.toLowerCase().includes('mahasiswa')
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
              <Badge variant="info">Kategori Khusus</Badge>
              <div className="flex items-center text-xs text-blue-600 font-semibold gap-1">
                <GraduationCap className="w-4 h-4" />
                <span>Graduation & Academic Events</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-slate-900">
              Undangan Digital Mahasiswa
            </h1>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl">
              Template elegan khusus untuk syukuran wisuda sarjana, yudisium, kelulusan sidang skripsi, seminar, dan gathering kampus.
            </p>
          </div>
          <div className="text-xs text-stone-400">
            Menampilkan <strong className="text-stone-800">{templates.length}</strong> template
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner text="Memuat template mahasiswa..." />
        ) : templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((tmpl) => (
              <TemplateCard key={tmpl.id} template={tmpl} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Belum Ada Template Mahasiswa"
            description="Template untuk kategori mahasiswa sedang dalam proses penyiapan."
          />
        )}
      </Container>
    </div>
  );
}
