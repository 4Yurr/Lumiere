'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User as UserIcon, LogOut, Shield } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [invitationDropdown, setInvitationDropdown] = useState(false);
  const [photographerDropdown, setPhotographerDropdown] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Do not render default navbar in admin section
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-[60px] h-[60px] overflow-hidden rounded-full bg-slate-900 shadow-sm group-hover:scale-105 transition-transform">
              <Image src="/global/logo.svg" alt="Lumière" fill className="object-contain p-0.5" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif-luxury font-bold tracking-widest text-slate-900">
                LUMIÈRE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#9A7730] -mt-1 font-medium">
                Memories & Moments
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-[#9A7730] font-semibold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Beranda
            </Link>

            {/* Dropdown Undangan Digital */}
            <div
              className="relative"
              onMouseEnter={() => setInvitationDropdown(true)}
              onMouseLeave={() => setInvitationDropdown(false)}
            >
              <Link
                href="/invitation"
                className={`flex items-center text-sm font-medium transition-colors ${
                  pathname?.startsWith('/invitation') ? 'text-[#9A7730] font-semibold' : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Undangan Digital <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
              </Link>
              {invitationDropdown && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-2 text-sm">
                    <Link
                      href="/invitation"
                      className="block px-3 py-2 rounded-xl text-stone-800 hover:bg-stone-50 font-medium"
                    >
                      Semua Kategori
                    </Link>
                    <Link
                      href="/invitation/mahasiswa"
                      className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50"
                    >
                      🎓 Undangan Mahasiswa
                    </Link>
                    <Link
                      href="/invitation/wedding"
                      className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50"
                    >
                      💍 Undangan Pernikahan
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Fotografer */}
            <div
              className="relative"
              onMouseEnter={() => setPhotographerDropdown(true)}
              onMouseLeave={() => setPhotographerDropdown(false)}
            >
              <Link
                href="/photographer"
                className={`flex items-center text-sm font-medium transition-colors ${
                  pathname?.startsWith('/photographer') ? 'text-[#9A7730] font-semibold' : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Fotografer <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
              </Link>
              {photographerDropdown && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-2 text-sm">
                    <Link
                      href="/photographer"
                      className="block px-3 py-2 rounded-xl text-stone-800 hover:bg-stone-50 font-medium"
                    >
                      Semua Fotografer
                    </Link>
                    <Link
                      href="/photographer/mahasiswa"
                      className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50"
                    >
                      📸 Wisuda & Kampus
                    </Link>
                    <Link
                      href="/photographer/wedding"
                      className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50"
                    >
                      ✨ Wedding & Pre-wedding
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 border-amber-300 text-amber-900 bg-amber-50">
                      <Shield className="w-3.5 h-3.5 text-amber-600" /> Admin
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>{user.name.split(' ')[0]}</span>
                  </Button>
                </Link>
                <button
                  onClick={() => logout()}
                  title="Keluar"
                  className="text-stone-400 hover:text-rose-600 p-2 rounded-full hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="gold" size="sm">
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700 hover:text-stone-900 p-2"
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && createPortal(
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-slate-950/40"
          />
          <nav
            id="mobile-navigation"
            aria-label="Navigasi mobile"
            className="fixed inset-y-0 right-0 z-[101] w-1/2 min-w-0 overflow-y-auto border-l border-[#E8E2D8] bg-[#FAF8F5] px-4 pt-6 pb-8 shadow-2xl animate-mobile-drawer-in sm:px-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-serif-luxury text-lg font-bold tracking-wide text-slate-900">Menu</p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup menu"
                className="rounded-full p-2 text-stone-700 hover:bg-stone-200/70"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-stone-800"
            >
              Beranda
            </Link>
            <div className="border-t border-stone-200/60 pt-3 mt-2">
              <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">Undangan Digital</p>
            <Link
              href="/invitation"
              onClick={() => setIsOpen(false)}
              className="block py-1.5 text-sm text-stone-700 pl-2"
            >
              Semua Undangan
            </Link>
            <Link
              href="/invitation/mahasiswa"
              onClick={() => setIsOpen(false)}
              className="block py-1.5 text-sm text-stone-700 pl-2"
            >
              🎓 Undangan Mahasiswa
            </Link>
            <Link
              href="/invitation/wedding"
              onClick={() => setIsOpen(false)}
              className="block py-1.5 text-sm text-stone-700 pl-2"
            >
              💍 Undangan Pernikahan
            </Link>
            </div>
            <div className="border-t border-stone-200/60 pt-3 mt-2">
              <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">Fotografer</p>
            <Link
              href="/photographer"
              onClick={() => setIsOpen(false)}
              className="block py-1.5 text-sm text-stone-700 pl-2"
            >
              Semua Fotografer
            </Link>
            <Link
              href="/photographer/mahasiswa"
              onClick={() => setIsOpen(false)}
              className="block py-1.5 text-sm text-stone-700 pl-2"
            >
              📸 Wisuda & Kampus
            </Link>
            <Link
              href="/photographer/wedding"
              onClick={() => setIsOpen(false)}
              className="block py-1.5 text-sm text-stone-700 pl-2"
            >
              ✨ Wedding & Pre-wedding
            </Link>
            </div>
            <div className="border-t border-stone-200/60 pt-4 mt-2 flex flex-col gap-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Admin Backoffice
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">
                      Dashboard ({user.name})
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => { logout(); setIsOpen(false); }} className="w-full text-rose-600">
                    Keluar
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="gold" size="sm" className="w-full">
                      Daftar Sekarang
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </nav>
  );
}
