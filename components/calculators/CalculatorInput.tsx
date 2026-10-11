'use client';

import { useId } from 'react';
import Slider from '@/components/ui/Slider';
import { Info } from 'lucide-react';

interface CalculatorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  tooltip?: string;
  showSlider?: boolean;
}

export default function CalculatorInput({
  label,
  value,
  onChange,
  min = 0,
  max = 1000000,
  step = 1,
  suffix = '',
  prefix = '',
  tooltip,
  showSlider = true,
}: CalculatorInputProps) {
  const id = useId();
  const formatValue = (val: number) => `${prefix}${val.toLocaleString()}${suffix}`;

  return (
    <div className="mb-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <label htmlFor={id} className="relative flex min-w-0 items-center gap-1.5 text-sm font-medium text-gray-700">
          {label}
          {tooltip && (
            <span className="group inline-flex">
              <Info tabIndex={0} aria-label={tooltip} className="h-3.5 w-3.5 cursor-help text-gray-400" />
              <span
                role="tooltip"
                className="invisible absolute bottom-full left-0 z-50 mb-2 w-64 max-w-[calc(100vw-3rem)] rounded-lg bg-gray-900 p-3 text-xs font-normal text-white opacity-0 shadow-lg transition-opacity duration-quick ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
              >
                {tooltip}
              </span>
            </span>
          )}
        </label>
        <div className="flex h-10 w-full max-w-[11rem] items-center rounded-lg border bg-white shadow-input transition-[border-color,box-shadow] duration-quick ease-out focus-within:border-primary-600 focus-within:shadow-input-focus sm:w-44">
          {prefix && <span className="pl-3 text-sm text-muted-foreground">{prefix}</span>}
          <input
            id={id}
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="h-full w-full min-w-0 bg-transparent px-3 text-right text-base font-semibold tabular-nums text-gray-900 outline-none"
          />
          {suffix && <span className="pr-3 text-sm text-muted-foreground">{suffix.trim()}</span>}
        </div>
      </div>

      {showSlider && (
        <div className="mt-3">
          <Slider value={value} onChange={onChange} min={min} max={max} step={step} className="w-full" ariaLabel={label} />
          <div className="mt-1.5 flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
