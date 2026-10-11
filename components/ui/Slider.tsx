'use client';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  ariaLabel?: string;
}

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
  ariaLabel,
}: SliderProps) {
  const clamped = Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
  const percentage = max > min ? ((clamped - min) / (max - min)) * 100 : 0;

  return (
    <div className={`group relative flex h-5 items-center ${className}`}>
      {/* Track */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 rounded-full bg-primary-600" style={{ width: `${percentage}%` }} />
      </div>
      {/* Native range input for accessibility and keyboard support */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamped}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      {/* Thumb */}
      <div
        className="pointer-events-none absolute h-4 w-4 rounded-full border-2 border-primary-600 bg-white shadow-sm transition-[transform,box-shadow] duration-quick ease-out group-hover:scale-110 peer-focus-visible:shadow-input-focus peer-active:scale-110"
        style={{ left: `calc(${percentage}% - 8px)` }}
      />
    </div>
  );
}
