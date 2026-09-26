'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

const resources = [['templates', 'Templates', 'Atur katalog desain undangan.'], ['invitations', 'Invitations', 'Pantau status undangan pelanggan.'], ['orders', 'Orders', 'Lihat transaksi yang masuk.'], ['payments', 'Payments', 'Periksa status pembayaran.'], ['photographers', 'Photographers', 'Kelola direktori fotografer.'], ['portfolios', 'Portfolios', 'Kelola karya portofolio.'], ['users', 'Users', 'Kelola akses dan status pengguna.']];
export default function AdminPage() { return <Container className="py-10 lg:py-14"><h1 className="text-4xl font-serif-luxury font-bold">Overview</h1><p className="mt-2 text-sm text-slate-400">Pilih area yang ingin Anda kelola.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{resources.map(([slug, title, description]) => <Link key={slug} href={`/admin/${slug}`} className="group rounded-2xl border border-white/10 bg-white/[.04] p-6 transition hover:-translate-y-1 hover:border-[#C5A059]/50"><div className="flex items-start justify-between"><h2 className="font-serif-luxury text-xl font-bold">{title}</h2><ArrowUpRight className="h-4 w-4 text-[#C5A059] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div><p className="mt-3 text-sm text-slate-400">{description}</p></Link>)}</div></Container>; }
