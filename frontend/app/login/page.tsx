'use client';

import { FormEvent, Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

function LoginContent() { const router = useRouter(); const params = useSearchParams(); const { login } = useAuth(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false); const submit = async (event: FormEvent) => { event.preventDefault(); setBusy(true); setError(''); try { await login(email, password); router.push(params.get('next') || '/dashboard'); } catch (err) { setError(err instanceof Error ? err.message : 'Email atau password tidak valid.'); } finally { setBusy(false); } }; return <Container className="flex flex-1 items-center justify-center py-12"><div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-7 shadow-elegant sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7730]">Selamat datang kembali</p><h1 className="mt-2 text-4xl font-serif-luxury font-bold text-slate-900">Masuk ke Lumiere</h1><p className="mt-3 text-sm text-stone-500">Kelola undangan dan simpan cerita penting Anda.</p><form onSubmit={submit} className="mt-8 space-y-4"><Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />{error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}<Button type="submit" variant="gold" size="lg" className="w-full" disabled={busy}>{busy ? 'Memeriksa...' : 'Masuk'}</Button></form><p className="mt-6 text-center text-sm text-stone-500">Belum punya akun? <Link className="font-semibold text-[#9A7730]" href="/register">Daftar sekarang</Link></p></div></Container>; }

export default function LoginPage() {
	return <Suspense fallback={null}><LoginContent /></Suspense>;
}
