'use client';

import { useState } from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className={`relative h-2 bg-gray-200 rounded-full ${className}`}>
      {/* Progress bar */}
      <div
        className="absolute h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-150 ease-out"
        style={{ width: `${percentage}%` }}
      />
      {/* Slider input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ cursor: 'grab' }}
        onMouseDown={(e) => (e.currentTarget.style.cursor = 'grabbing')}
        onMouseUp={(e) => (e.currentTarget.style.cursor = 'grab')}
      />
      {/* Thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary-500 rounded-full shadow-md pointer-events-none transition-transform duration-150 ease-out hover:scale-110"
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
    </div>
  );
}
