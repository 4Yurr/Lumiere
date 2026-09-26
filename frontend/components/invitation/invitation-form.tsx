'use client';

import { useState } from 'react';
import { InvitationData } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface InvitationFormProps {
  initialData?: InvitationData;
  isWedding: boolean;
  submitLabel: string;
  onSubmit: (data: InvitationData) => Promise<void>;
}

export function InvitationForm({ initialData = {}, isWedding, submitLabel, onSubmit }: InvitationFormProps) {
  const [data, setData] = useState<InvitationData>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const update = (key: keyof InvitationData, value: unknown) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const updateNested = (section: 'groom' | 'bride' | 'event' | 'graduate', key: string, value: string) => {
    setData((current) => ({
      ...current,
      [section]: { ...(current[section] as object | undefined), [key]: value },
    }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit(data);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Data belum dapat disimpan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7730]">01 / Identitas</p>
          <h2 className="mt-1 text-2xl font-serif-luxury font-bold text-slate-900">Informasi utama</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Judul undangan" value={data.title || ''} onChange={(event) => update('title', event.target.value)} required />
          <Input label="Subjudul" value={data.subtitle || ''} onChange={(event) => update('subtitle', event.target.value)} placeholder="Sebuah perayaan kecil yang berarti" />
        </div>
      </section>

      {isWedding ? (
        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7730]">02 / Pasangan</p>
            <h2 className="mt-1 text-2xl font-serif-luxury font-bold text-slate-900">Cerita dua nama</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-stone-200 bg-stone-50/70 p-5">
              <h3 className="font-semibold text-slate-900">Mempelai pria</h3>
              <Input label="Nama" value={data.groom?.name || ''} onChange={(event) => updateNested('groom', 'name', event.target.value)} required />
              <Input label="Nama orang tua" value={data.groom?.parents || ''} onChange={(event) => updateNested('groom', 'parents', event.target.value)} />
            </div>
            <div className="space-y-3 rounded-2xl border border-stone-200 bg-stone-50/70 p-5">
              <h3 className="font-semibold text-slate-900">Mempelai wanita</h3>
              <Input label="Nama" value={data.bride?.name || ''} onChange={(event) => updateNested('bride', 'name', event.target.value)} required />
              <Input label="Nama orang tua" value={data.bride?.parents || ''} onChange={(event) => updateNested('bride', 'parents', event.target.value)} />
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7730]">02 / Perayaan</p>
            <h2 className="mt-1 text-2xl font-serif-luxury font-bold text-slate-900">Profil mahasiswa</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Nama lengkap" value={data.graduate?.name || ''} onChange={(event) => updateNested('graduate', 'name', event.target.value)} required />
            <Input label="Universitas" value={data.graduate?.university || ''} onChange={(event) => updateNested('graduate', 'university', event.target.value)} required />
            <Input label="Fakultas" value={data.graduate?.faculty || ''} onChange={(event) => updateNested('graduate', 'faculty', event.target.value)} />
            <Input label="Gelar" value={data.graduate?.degree || ''} onChange={(event) => updateNested('graduate', 'degree', event.target.value)} />
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7730]">03 / Acara</p>
          <h2 className="mt-1 text-2xl font-serif-luxury font-bold text-slate-900">Waktu dan tempat</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Tanggal" type="date" value={data.event?.date || ''} onChange={(event) => updateNested('event', 'date', event.target.value)} required />
          <Input label="Waktu" type="time" value={data.event?.time || ''} onChange={(event) => updateNested('event', 'time', event.target.value)} required />
          <Input label="Nama lokasi" value={data.event?.venue || ''} onChange={(event) => updateNested('event', 'venue', event.target.value)} required />
          <Input label="Alamat" value={data.event?.address || ''} onChange={(event) => updateNested('event', 'address', event.target.value)} />
          <Input label="Google Maps" value={data.mapsUrl || ''} onChange={(event) => update('mapsUrl', event.target.value)} placeholder="https://maps.google.com/..." />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7730]">04 / Narasi</p>
          <h2 className="mt-1 text-2xl font-serif-luxury font-bold text-slate-900">Kata yang ingin dibagikan</h2>
        </div>
        <textarea className="min-h-36 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20" value={data.story || ''} onChange={(event) => update('story', event.target.value)} placeholder="Tuliskan cerita atau pesan untuk para tamu..." />
      </section>

      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      <Button type="submit" variant="gold" size="lg" disabled={saving} className="w-full sm:w-auto">
        {saving ? 'Menyimpan...' : submitLabel}
      </Button>
    </form>
  );
}
