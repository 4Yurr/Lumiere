'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Template, Photographer } from '@/types';
import { templateService } from '@/services/template.service';
import { photographerService } from '@/services/photographer.service';
import { Container, Section, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TemplateCard } from '@/components/invitation/template-card';
import { PhotographerCard } from '@/components/photographer/photographer-card';
import { LoadingSpinner } from '@/components/ui/modal';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Heart,
  Camera,
  Layers,
  ShieldCheck,
  Palette,
  CheckCircle2,
} from 'lucide-react';

const partnerLogos = [
  { name: 'Logo partner 1', src: '/partners/1.svg' },
  { name: 'Logo partner 2', src: '/partners/2.svg' },
  { name: 'Logo partner 3', src: '/partners/3.svg' },
];

export default function HomePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [tmpls, phots] = await Promise.all([
          templateService.getAll().catch(() => []),
          photographerService.getAll().catch(() => []),
        ]);
        setTemplates(tmpls.slice(0, 4));
        setPhotographers(phots.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-0 md:pt-20 md:pb-0 bg-gradient-to-b from-[#FAF8F5] via-[#F4ECE1]/40 to-[#FAF8F5]">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Decorative blur aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EA] border border-[#EBDCB8] text-[#9A7730] text-xs font-semibold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Momen & Visual Storytelling</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-luxury font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Rayakan Momen Terbaik dengan{' '}
            <span className="gold-gradient-text italic font-normal">Keanggunan Abadi</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed mb-10">
            Lumière memadukan keindahan <strong>Undangan Digital Interaktif</strong> dengan kurasi <strong>Fotografer Profesional</strong> untuk wisuda sarjana dan resepsi pernikahan impian Anda.
          </p>

          {/* Dual Main CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link href="/invitation" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full shadow-lg shadow-[#C5A059]/20 flex items-center justify-center gap-2">
                <span>BUAT UNDANGAN</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/photographer" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                <span>CARI FOTOGRAFER</span>
                <Camera className="w-4 h-4 text-[#C5A059]" />
              </Button>
            </Link>
          </div>

          {/* Partner Logo Marquee */}
          <div className="relative left-1/2 mt-12 w-screen max-w-none -translate-x-1/2 overflow-hidden border-y border-[#E8E2D8] bg-[#F4ECE1]/80 py-5 shadow-sm sm:mt-14">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 sm:text-xs">
              Bersama kreator dan partner pilihan
            </p>
            <div className="group relative flex overflow-hidden" aria-label="Logo partner Lumière">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#FAF9F6] to-transparent sm:w-20" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#FAF9F6] to-transparent sm:w-20" />
              <div className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex shrink-0 items-center gap-10 px-5 sm:gap-16 sm:px-8"
                    aria-hidden={copy === 1}
                  >
                    {partnerLogos.map((partner) => (
                      <div key={partner.src} className="flex h-12 w-32 shrink-0 items-center justify-center sm:w-40">
                        <Image
                          src={partner.src}
                          alt={partner.name}
                          width={160}
                          height={48}
                          className="h-12 w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* 2. Pilihan Layanan Utama */}
      <Section className="bg-white border-y border-stone-200/60">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" className="mb-3">Dua Pilar Layanan</Badge>
            <h2 className="text-3xl font-serif-luxury font-bold text-slate-900">
              Solusi Terpadu Untuk Setiap Langkah Momen Bahagia
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              Pilih layanan yang Anda butuhkan untuk merancang dan mendokumentasikan momen penting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Layanan 1: Undangan Digital */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAF7F2] to-[#F4ECE1] border border-[#EBDCB8] p-8 sm:p-10 flex flex-col justify-between shadow-elegant shadow-hover">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#9A7730] shadow-sm">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9A7730]">Layanan 01</span>
                  <h3 className="text-2xl font-serif-luxury font-bold text-slate-900 mt-1">Undangan Digital</h3>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Undangan interaktif dengan desain berkelas, fitur peta navigasi, galeri foto, RSVP WhatsApp, buku tamu digital, dan amplop digital. Siap disebar dalam hitungan menit.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Tersedia untuk Wisuda & Perayaan Kampus</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Tema Resepsi Pernikahan Eksklusif & Mewah</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link href="/invitation">
                  <Button variant="gold" size="md" className="w-full sm:w-auto flex items-center gap-2">
                    <span>Eksplorasi Undangan</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card Layanan 2: Fotografer */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#F8FAFC] to-[#EDF2F7] border border-slate-200 p-8 sm:p-10 flex flex-col justify-between shadow-elegant shadow-hover">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-[#C5A059] shadow-sm">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Layanan 02</span>
                  <h3 className="text-2xl font-serif-luxury font-bold text-slate-900 mt-1">Layanan Fotografer</h3>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Hubungkan momen Anda dengan fotografer terverifikasi tim Lumière. Mulai dari sesi studio wisuda, outdoor graduation, pre-wedding romantis, hingga dokumentasi akad dan resepsi.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-slate-900" />
                    <span>Portofolio Asli & Standar Kualitas Terjaga</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-slate-900" />
                    <span>Reservasi Mudah melalui Admin Resmi Lumière</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link href="/photographer">
                  <Button variant="primary" size="md" className="w-full sm:w-auto flex items-center gap-2">
                    <span>Lihat Direktori Fotografer</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Pilihan Kategori Undangan (Mahasiswa vs Pernikahan) */}
      <Section className="bg-[#FAF8F5]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="default" className="mb-2">Katalog Undangan</Badge>
            <h2 className="text-3xl font-serif-luxury font-bold text-slate-900">
              Pilihan Kategori Undangan
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              Dua kategori utama yang disesuaikan khusus dengan nuansa dan kebutuhan acara Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kategori Mahasiswa */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-elegant flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif-luxury font-bold text-slate-900">
                  Undangan Mahasiswa
                </h3>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  Didesain modern untuk syukuran wisuda sarjana, perayaan kelulusan sidang skripsi/tesis, yudisium, dan temu alumni kampus.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/invitation/mahasiswa">
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5">
                    <span>Lihat Undangan Mahasiswa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Kategori Pernikahan */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-elegant flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif-luxury font-bold text-slate-900">
                  Undangan Pernikahan
                </h3>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  Sentuhan magis bertema botanical floral, royal classic gold, hingga modern editorial untuk akad nikah dan pesta resepsi.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/invitation/wedding">
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5">
                    <span>Lihat Undangan Pernikahan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Template Unggulan (Data dari API) */}
      <Section className="bg-white border-y border-stone-200/60">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="gold" className="mb-2">Koleksi Pilihan</Badge>
              <h2 className="text-3xl font-serif-luxury font-bold text-slate-900">
                Template Unggulan Lumière
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Karya kurasi terbaik yang siap dipersonalisasi sesuai cerita Anda.
              </p>
            </div>
            <Link href="/invitation">
              <Button variant="ghost" size="sm" className="text-xs font-semibold flex items-center gap-1 text-[#9A7730]">
                <span>Semua Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="Memuat koleksi template..." />
          ) : templates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((tmpl) => (
                <TemplateCard key={tmpl.id} template={tmpl} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-stone-500 py-12">Belum ada template yang tersedia.</p>
          )}
        </Container>
      </Section>

      {/* 5. Fotografer Pilihan (Data dari API) */}
      <Section className="bg-[#FAF8F5]">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="default" className="mb-2">Talenta Terbaik</Badge>
              <h2 className="text-3xl font-serif-luxury font-bold text-slate-900">
                Fotografer Pilihan Lumière
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Para kreator visual teruji untuk mengabadikan momen berharga Anda.
              </p>
            </div>
            <Link href="/photographer">
              <Button variant="ghost" size="sm" className="text-xs font-semibold flex items-center gap-1 text-slate-900">
                <span>Direktori Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="Memuat data fotografer..." />
          ) : photographers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {photographers.map((phot) => (
                <PhotographerCard key={phot.id} photographer={phot} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-stone-500 py-12">Belum ada data fotografer.</p>
          )}
        </Container>
      </Section>

      {/* 6. Section Alasan Memilih Lumière */}
      <Section className="bg-white border-t border-stone-200/60">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" className="mb-2">Keunggulan Kami</Badge>
            <h2 className="text-3xl font-serif-luxury font-bold text-slate-900">
              Mengapa Mempercayakan Momen Anda Pada Lumière?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9A7730] mb-4 shadow-sm">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif-luxury font-bold text-slate-900">Desain Editorial Eksklusif</h4>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Tipografi mewah, layout proporsional, dan sentuhan visual berkelas tanpa kesan template murah.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9A7730] mb-4 shadow-sm">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif-luxury font-bold text-slate-900">Dua Layanan Bersinergi</h4>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Satu platform untuk undangan digital interaktif sekaligus pencarian fotografer wisuda & pernikahan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9A7730] mb-4 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif-luxury font-bold text-slate-900">Jaminan Kualitas & Verifikasi</h4>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Seluruh fotografer dikurasi langsung oleh tim Lumière demi menjamin kepuasan dan ketepatan waktu Anda.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9A7730] mb-4 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif-luxury font-bold text-slate-900">Mudah Digunakan & Cepat</h4>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Formulir pembuatan undangan yang intuitif dan proses checkout terintegrasi yang seamless.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]" />
        <Container className="relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold mb-4">
            Siap Mengabadikan Momen Istimewa Anda?
          </h2>
          <p className="text-sm text-stone-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Buat undangan digital unik Anda sekarang atau temukan fotografer berpengalaman untuk mendokumentasikan setiap senyum dan air mata bahagia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/invitation" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full shadow-lg">
                Mulai Buat Undangan
              </Button>
            </Link>
            <Link href="/photographer" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full text-white border-stone-600 hover:bg-slate-800">
                Jelajahi Fotografer
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
