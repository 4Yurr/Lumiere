import React from 'react';

export function Card({
  children,
  className = '',
  hoverEffect = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hoverEffect?: boolean }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-elegant ${
        hoverEffect ? 'shadow-hover' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'success' | 'warning' | 'info' | 'outline';
  className?: string;
}) {
  const variantStyles = {
    default: 'bg-stone-100 text-stone-700 border-stone-200',
    gold: 'bg-[#FAF5EA] text-[#9A7730] border-[#EBDCB8]',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    outline: 'bg-transparent text-stone-600 border-stone-300',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}
