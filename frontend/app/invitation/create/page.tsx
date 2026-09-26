'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/modal';
import { InvitationForm } from '@/components/invitation/invitation-form';
import { templateService } from '@/services/template.service';
import { invitationService } from '@/services/invitation.service';
import { useAuth } from '@/hooks/use-auth';
import { Template, Invitation, InvitationData } from '@/types';
import { slugify } from '@/lib/utils';

function CreateInvitationContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const [template, setTemplate] = useState<Template | null>(null);
  const [existingInvitation, setExistingInvitation] = useState<Invitation | null>(null);
  const [existingLoading, setExistingLoading] = useState(() => Boolean(params.get('invitation')));
  const [loading, setLoading] = useState(() => Boolean(params.get('template')));

  useEffect(() => {
    const slug = params.get('template');
    if (!slug) return;
    templateService.getBySlug(slug).then(setTemplate).catch(() => setTemplate(null)).finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    const invitationId = params.get('invitation');
    if (!user || !invitationId) return;
    invitationService.getMyInvitations().then((items) => {
      const match = items.find((item) => item.id === Number(invitationId));
      if (match) {
        setExistingInvitation(match);
        if (match.template) setTemplate(match.template);
      }
    }).finally(() => setExistingLoading(false));
  }, [params, user]);

  if (authLoading || loading || existingLoading) return <LoadingSpinner text="Menyiapkan editor undangan..." />;
  if (!user) { router.replace(`/login?next=${encodeURIComponent(`/invitation/create?template=${params.get('template') || ''}`)}`); return null; }
  if (!template) return <Container className="py-20"><p className="text-center text-stone-500">Template tidak ditemukan.</p></Container>;

  const isWedding = template.category?.name?.toLowerCase().includes('pernikahan') ?? false;
  const submit = async (data: InvitationData) => {
    const invitation = existingInvitation
      ? await invitationService.update(existingInvitation.id, { data })
      : await invitationService.create({ templateId: template.id, slug: `${slugify(data.title || template.name)}-${Date.now().toString(36)}`, data });
    sessionStorage.setItem('lumiere_invitation', JSON.stringify({ ...existingInvitation, ...invitation, template }));
    router.push('/invitation/preview');
  };

  return <Container className="py-10 md:py-16"><div className="mx-auto max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7730]">{existingInvitation ? 'Edit undangan' : 'Editor undangan'}</p><h1 className="mt-2 text-4xl font-serif-luxury font-bold text-slate-900">{existingInvitation ? 'Perbarui' : 'Bangun'} {template.name}</h1><p className="mt-3 text-sm text-stone-600">Lengkapi informasi inti terlebih dahulu. Anda dapat menyempurnakannya kembali sebelum pembayaran.</p><div className="mt-10 rounded-3xl border border-stone-200 bg-white p-5 shadow-elegant sm:p-8"><InvitationForm initialData={existingInvitation?.data} isWedding={isWedding} submitLabel="Lihat preview undangan" onSubmit={submit} /></div></div></Container>;
}

export default function CreateInvitationPage() {
  return <Suspense fallback={<LoadingSpinner text="Menyiapkan editor undangan..." />}><CreateInvitationContent /></Suspense>;
}
