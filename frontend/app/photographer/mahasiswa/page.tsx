'use client';

import { useEffect, useState } from 'react';
import { Photographer } from '@/types';
import { photographerService } from '@/services/photographer.service';
import { Container, Badge } from '@/components/ui/card';
import { PhotographerCard } from '@/components/photographer/photographer-card';
import { LoadingSpinner, EmptyState } from '@/components/ui/modal';

export default function StudentPhotographersPage() { const [items, setItems] = useState<Photographer[]>([]); const [loading, setLoading] = useState(true); useEffect(() => { photographerService.getAll({ category: 'Mahasiswa' }).then(setItems).catch(() => setItems([])).finally(() => setLoading(false)); }, []); return <Container className="py-12 md:py-20"><Badge variant="info">Wisuda & event kampus</Badge><h1 className="mt-3 text-4xl font-serif-luxury font-bold text-slate-900">Fotografer mahasiswa</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">Pilih fotografer untuk graduation, birthday, organisasi, dan gathering dengan pendekatan yang lebih dekat dan spontan.</p>{loading ? <LoadingSpinner text="Memuat fotografer mahasiswa..." /> : items.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <PhotographerCard key={item.id} photographer={item} />)}</div> : <EmptyState title="Belum ada fotografer mahasiswa" description="Coba kembali beberapa saat lagi." />}</Container>; }
