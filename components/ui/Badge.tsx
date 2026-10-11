import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Small pill label (shadcn "outline"/"secondary" badge). */
export default function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm', className)}>
      {children}
    </span>
  );
}
