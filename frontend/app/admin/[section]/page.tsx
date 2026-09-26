'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/card';
import { LoadingSpinner, EmptyState } from '@/components/ui/modal';
import { adminService } from '@/services/admin.service';

const labels: Record<string, string> = { templates: 'Templates', invitations: 'Invitations', orders: 'Orders', payments: 'Payments', photographers: 'Photographers', portfolios: 'Portfolios', users: 'Users' };
const loaders: Record<string, () => Promise<unknown[]>> = { templates: adminService.getTemplates, invitations: adminService.getInvitations, orders: adminService.getOrders, payments: adminService.getPayments, photographers: adminService.getPhotographers, users: adminService.getUsers };

export default function AdminResourcePage() {
  const { section } = useParams<{ section: string }>();
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(() => Boolean(loaders[section]));
  const [error, setError] = useState('');

  useEffect(() => {
    const loader = loaders[section];
    if (!loader) return;
    loader().then((data) => setRows(data as Record<string, unknown>[])).catch((err) => setError(err instanceof Error ? err.message : 'Data tidak dapat dimuat.')).finally(() => setLoading(false));
  }, [section]);

  const keys = rows.length ? Object.keys(rows[0]).filter((key) => !['templateData', 'data', 'rawResponse', 'passwordHash'].includes(key)).slice(0, 6) : [];
  return <Container className="py-10 lg:py-14"><p className="text-xs uppercase tracking-[0.18em] text-[#C5A059]">Admin resource</p><h1 className="mt-2 text-4xl font-serif-luxury font-bold">{labels[section] || section}</h1>{loading ? <LoadingSpinner text="Memuat data admin..." /> : error ? <p className="mt-8 rounded-xl bg-rose-900/40 p-4 text-sm text-rose-200">{error}</p> : rows.length ? <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10"><table className="min-w-full text-left text-sm"><thead className="bg-white/[.06] text-xs uppercase tracking-wider text-slate-400"><tr>{keys.map((key) => <th key={key} className="px-4 py-3">{key}</th>)}</tr></thead><tbody className="divide-y divide-white/10">{rows.map((row, index) => <tr key={String(row.id ?? index)} className="text-slate-300">{keys.map((key) => <td key={key} className="max-w-xs truncate px-4 py-3">{typeof row[key] === 'object' ? JSON.stringify(row[key]) : String(row[key] ?? '-')}</td>)}</tr>)}</tbody></table></div> : <EmptyState title="Belum ada data" description="Belum ada record untuk resource ini." />}</Container>;
}
