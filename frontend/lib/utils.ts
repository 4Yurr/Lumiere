export function formatRupiah(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getAdminWhatsAppUrl(message?: string): string {
  const phone = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '628123456789';
  const cleanPhone = phone.replace(/\D/g, '');
  const text = message ? encodeURIComponent(message) : encodeURIComponent('Halo Admin Lumiere, saya ingin bertanya tentang layanan...');
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
