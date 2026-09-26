'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Invitation } from '@/types';
import { Container, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { invitationService } from '@/services/invitation.service';

export default function InvitationPreviewPage() {
  const router = useRouter();
  const [invitation] = useState<Invitation | null>(() => {
    if (typeof window === 'undefined') return null;
    const raw = sessionStorage.getItem('lumiere_invitation');
    return raw ? JSON.parse(raw) : null;
  });
  if (!invitation) return <Container className="py-20 text-center"><h1 className="text-2xl font-serif-luxury font-bold text-slate-900">Preview belum tersedia</h1><p className="mt-2 text-sm text-stone-500">Buat undangan dari template pilihan Anda terlebih dahulu.</p><Link href="/invitation"><Button className="mt-6" variant="gold">Pilih template</Button></Link></Container>;
  const data = invitation.data || {};
  const title = data.title || invitation.template?.name || 'Undangan Lumiere';
  const edit = async () => { await invitationService.update(invitation.id, { data }); router.push('/dashboard'); };
  return <Container className="py-10 md:py-16"><div className="mx-auto max-w-4xl"><div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between"><div><Badge variant="gold">Preview pribadi</Badge><h1 className="mt-2 text-4xl font-serif-luxury font-bold text-slate-900">{title}</h1><p className="mt-2 text-sm text-stone-500">Periksa tampilan dan detail sebelum melanjutkan pembayaran.</p></div><div className="flex gap-2"><Button variant="outline" onClick={edit}>Simpan draft</Button><Button variant="gold" onClick={() => router.push(`/invitation/payment?invitation=${invitation.id}`)}>Lanjut pembayaran</Button></div></div><article className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[2rem] border border-[#EBDCB8] bg-[#FAF7F2] shadow-xl"><PlaceholderImage src={invitation.template?.thumbnail} alt={title} aspectRatio="wide" category={data.groom || data.bride ? 'wedding' : 'graduation'} className="w-full" /><div className="space-y-8 p-8 text-center sm:p-12"><p className="text-xs uppercase tracking-[0.3em] text-[#9A7730]">Dengan penuh kebahagiaan</p><h2 className="text-4xl font-serif-luxury font-bold text-slate-900">{data.groom?.name && data.bride?.name ? `${data.groom.name} & ${data.bride.name}` : data.graduate?.name || title}</h2>{data.story && <p className="mx-auto max-w-lg text-sm leading-7 text-stone-600">{data.story}</p>}<div className="border-y border-[#EBDCB8] py-6"><p className="font-semibold text-slate-900">{data.event?.date || 'Tanggal acara'}</p><p className="mt-1 text-sm text-stone-600">{data.event?.time || 'Waktu'} · {data.event?.venue || 'Lokasi acara'}</p><p className="mt-1 text-xs text-stone-500">{data.event?.address}</p></div></div></article></div></Container>;
}
