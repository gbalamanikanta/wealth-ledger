'use client';

import { Transaction } from '@/lib/fakerData';

interface StatusBadgeProps {
  status: Transaction['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'Settled')
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-tertiary-fixed-variant">
        <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container inline-block"></span> Settled
      </span>
    );
  if (status === 'Pending')
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span> Pending
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary">
      <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span> Processing
    </span>
  );
}
