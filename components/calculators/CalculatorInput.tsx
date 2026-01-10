'use client';

import { Slider } from '@/components/ui/Slider';
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
  const formatValue = (val: number) => {
    return `${prefix}${val.toLocaleString()}${suffix}`;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-gray-700 flex items-center">
          {label}
          {tooltip && (
            <div className="group relative ml-2">
              <Info className="w-4 h-4 text-primary-500 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-50">
                {tooltip}
                <div className="absolute left-4 top-full w-2 h-2 bg-gray-900 transform rotate-45 -mt-1"></div>
              </div>
            </div>
          )}
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="w-40 px-3 py-2 text-right font-mono font-bold text-lg bg-white border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
          />
          <span className="ml-2 text-sm text-gray-500 font-medium">{suffix}</span>
        </div>
      </div>

      {showSlider && (
        <div className="mt-3">
          <Slider
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            className="w-full"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
