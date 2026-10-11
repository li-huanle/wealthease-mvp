'use client';

import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
  icon?: React.ReactNode;
  tooltip?: string;
}

export default function ResultCard({
  title,
  value,
  subtitle,
  trend,
  highlight = false,
  icon,
  tooltip,
}: ResultCardProps) {
  return (
    <div
      className={cn(
        'animate-fade-in-up relative rounded-xl p-5 transition-shadow duration-base ease-out',
        highlight
          ? 'overflow-hidden bg-gray-950 text-white shadow-card-hover'
          : 'bg-white shadow-card hover:shadow-card-hover'
      )}
    >
      {highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-500/25 blur-3xl"
        />
      )}
      <div className="relative mb-1.5 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className={cn('text-sm font-medium', highlight ? 'text-gray-300' : 'text-muted-foreground')}>{title}</p>
          {icon && <div className="mt-2">{icon}</div>}
        </div>
        {tooltip && (
          <div className="group relative flex-shrink-0">
            <Info
              tabIndex={0}
              aria-label={tooltip}
              className={cn('h-4 w-4 cursor-help', highlight ? 'text-gray-400' : 'text-gray-400')}
            />
            <div
              role="tooltip"
              className={cn(
                'invisible absolute bottom-full right-0 z-50 mb-2 w-56 rounded-lg p-3 text-xs opacity-0 shadow-lg transition-opacity duration-quick ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100',
                highlight ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'
              )}
            >
              {tooltip}
            </div>
          </div>
        )}
      </div>

      <p
        className={cn(
          'relative text-2xl font-semibold tabular-nums tracking-tight md:text-3xl',
          highlight ? 'text-primary-300' : 'text-gray-900'
        )}
      >
        {value}
      </p>

      {subtitle && (
        <p className={cn('relative mt-1.5 text-sm', highlight ? 'text-gray-400' : 'text-muted-foreground')}>{subtitle}</p>
      )}

      {trend && (
        <p
          className={cn(
            'relative mt-3 text-sm font-semibold',
            trend.isPositive
              ? highlight
                ? 'text-primary-300'
                : 'text-success-600'
              : highlight
                ? 'text-red-300'
                : 'text-danger-600'
          )}
        >
          {trend.isPositive ? '↑' : '↓'} {trend.value}
        </p>
      )}
    </div>
  );
}
