'use client';

import { useEffect, useState } from 'react';
import { Photographer } from '@/types';
import { photographerService } from '@/services/photographer.service';
import { Container, Badge } from '@/components/ui/card';
import { PhotographerCard } from '@/components/photographer/photographer-card';
import { LoadingSpinner, EmptyState } from '@/components/ui/modal';

export default function WeddingPhotographersPage() { const [items, setItems] = useState<Photographer[]>([]); const [loading, setLoading] = useState(true); useEffect(() => { photographerService.getAll({ category: 'Pernikahan' }).then(setItems).catch(() => setItems([])).finally(() => setLoading(false)); }, []); return <Container className="py-12 md:py-20"><Badge variant="gold">Wedding & pre-wedding</Badge><h1 className="mt-3 text-4xl font-serif-luxury font-bold text-slate-900">Fotografer pernikahan</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">Karya editorial untuk akad, resepsi, engagement, dan detail kecil yang membuat hari Anda terasa utuh.</p>{loading ? <LoadingSpinner text="Memuat fotografer wedding..." /> : items.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <PhotographerCard key={item.id} photographer={item} />)}</div> : <EmptyState title="Belum ada fotografer wedding" description="Coba kembali beberapa saat lagi." />}</Container>; }
