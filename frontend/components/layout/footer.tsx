'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, MessageCircle, Heart } from 'lucide-react';
import { getAdminWhatsAppUrl } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-[#E8E2D8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[#C5A059]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-serif-luxury font-bold tracking-widest text-slate-900">
                LUMIÈRE
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Platform visual storytelling untuk momen berharga Anda. Menyediakan undangan digital eksklusif serta jaringan fotografer profesional terpercaya.
            </p>
            <div className="pt-2">
              <a
                href={getAdminWhatsAppUrl('Halo Admin Lumiere, saya butuh informasi lebih lanjut mengenai layanan.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A7730] hover:text-[#7A5B1E] bg-[#FAF5EA] px-3.5 py-2 rounded-full transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Undangan Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Undangan Digital</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/invitation" className="hover:text-stone-950 transition-colors">
                  Semua Template
                </Link>
              </li>
              <li>
                <Link href="/invitation/mahasiswa" className="hover:text-stone-950 transition-colors">
                  Undangan Wisuda & Kampus
                </Link>
              </li>
              <li>
                <Link href="/invitation/wedding" className="hover:text-stone-950 transition-colors">
                  Undangan Pernikahan (Wedding)
                </Link>
              </li>
            </ul>
          </div>

          {/* Fotografer Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Layanan Fotografer</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/photographer" className="hover:text-stone-950 transition-colors">
                  Direktori Fotografer
                </Link>
              </li>
              <li>
                <Link href="/photographer/mahasiswa" className="hover:text-stone-950 transition-colors">
                  Dokumentasi Wisuda Mahasiswa
                </Link>
              </li>
              <li>
                <Link href="/photographer/wedding" className="hover:text-stone-950 transition-colors">
                  Pernikahan & Pre-Wedding
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Bantuan & Akun</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/login" className="hover:text-stone-950 transition-colors">
                  Masuk Akun
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-stone-950 transition-colors">
                  Daftar Pengguna Baru
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-stone-950 transition-colors">
                  Undangan Saya
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-200/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Lumière Indonesia. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1">
            <span>Didesain dengan cinta untuk momen abadi</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
