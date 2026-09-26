'use client';

import { useState } from 'react';
import { Container, Badge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Invitation, Order, Payment } from '@/types';
import { orderService } from '@/services/order.service';
import { paymentService } from '@/services/payment.service';
import { formatRupiah } from '@/lib/utils';

export default function InvitationPaymentPage() {
  const [invitation] = useState<Invitation | null>(() => {
    if (typeof window === 'undefined') return null;
    const raw = sessionStorage.getItem('lumiere_invitation');
    return raw ? JSON.parse(raw) : null;
  }); const [order, setOrder] = useState<Order | null>(null); const [provider, setProvider] = useState('MIDTRANS'); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  if (!invitation) return <Container className="py-20"><p className="text-center text-stone-500">Data undangan belum tersedia.</p></Container>;
  const amount = order?.amount ?? invitation.template?.price ?? 0;
  const pay = async () => { setBusy(true); setError(''); try { const createdOrder = order || await orderService.create(invitation.id); setOrder(createdOrder); const payment: Payment = await paymentService.create({ orderId: createdOrder.id, provider }); sessionStorage.setItem('lumiere_payment', JSON.stringify(payment)); } catch (err) { setError(err instanceof Error ? err.message : 'Pembayaran belum dapat dimulai.'); } finally { setBusy(false); } };
  return <Container className="py-10 md:py-16"><div className="mx-auto max-w-3xl"><Badge variant="gold">Checkout undangan</Badge><h1 className="mt-2 text-4xl font-serif-luxury font-bold text-slate-900">Selesaikan pesanan Anda</h1><div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_.8fr]"><section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elegant"><h2 className="text-lg font-semibold text-slate-900">Ringkasan</h2><div className="mt-5 border-t border-stone-100 pt-5"><p className="font-serif-luxury text-2xl font-bold text-slate-900">{invitation.template?.name}</p><p className="mt-2 text-sm text-stone-500">{invitation.data?.title || 'Undangan digital Lumiere'}</p><div className="mt-6 flex justify-between border-t border-stone-100 pt-4 text-sm"><span>Total</span><strong>{formatRupiah(amount)}</strong></div></div></section><section className="rounded-3xl border border-stone-200 bg-[#FAF7F2] p-6"><h2 className="text-lg font-semibold text-slate-900">Metode pembayaran</h2><select value={provider} onChange={(event) => setProvider(event.target.value)} className="mt-5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm"><option value="MIDTRANS">Midtrans</option><option value="XENDIT">Xendit</option></select><p className="mt-3 text-xs leading-5 text-stone-500">Status pembayaran mengikuti konfirmasi backend dan payment gateway.</p>{error && <p className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}<Button variant="gold" size="lg" className="mt-6 w-full" onClick={pay} disabled={busy}>{busy ? 'Memproses...' : order ? 'Buat ulang pembayaran' : 'Buat pesanan & bayar'}</Button>{order && <p className="mt-4 text-center text-xs text-amber-700">Order dibuat dengan status {order.status}. Selesaikan pembayaran melalui gateway.</p>}</section></div></div></Container>;
}
