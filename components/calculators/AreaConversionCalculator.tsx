'use client';

import { useMemo, useState } from 'react';
import { AREA_UNITS, AreaUnit, convertArea } from '@/lib/finance';
import { useMoney } from './useMoney';

const QUICK: AreaUnit[] = ['sqm', 'sqft', 'sqyd', 'acre', 'hectare', 'sqkm', 'sqmi'];

function fmt(n: number): string {
  if (!Number.isFinite(n)) return '–';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1e9 || abs < 1e-4) return n.toExponential(4);
  return n.toLocaleString('en-US', { maximumFractionDigits: abs >= 100 ? 2 : abs >= 1 ? 4 : 6 });
}

export default function AreaConversionCalculator() {
  const { zh, tr } = useMoney();
  const [value, setValue] = useState('1000');
  const [from, setFrom] = useState<AreaUnit>('sqft');

  // Mu and ping are mainly used in Chinese-speaking markets.
  const units = (Object.keys(AREA_UNITS) as AreaUnit[]).filter((u) => zh || (u !== 'mu' && u !== 'ping'));
  const n = parseFloat(value);
  const valid = Number.isFinite(n) && n >= 0;

  const rows = useMemo(
    () => units.filter((u) => u !== from).map((u) => ({ unit: u, out: valid ? convertArea(n, from, u) : NaN })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, from, valid, zh]
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">{tr('Area', '面积')}</label>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg mb-6 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <label className="block text-sm font-semibold text-gray-700 mb-2">{tr('From unit', '原单位')}</label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value as AreaUnit)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 bg-white"
        >
          {units.map((u) => (
            <option key={u} value={u}>{zh ? AREA_UNITS[u].zh : AREA_UNITS[u].en}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {QUICK.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setFrom(u)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${from === u ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'}`}
            >
              {zh ? AREA_UNITS[u].zh.split(' ')[0] : AREA_UNITS[u].en.split(' (')[0]}
            </button>
          ))}
        </div>
        {!valid && value !== '' && (
          <p className="mt-4 text-sm text-red-600">{tr('Enter a number of zero or more.', '请输入不小于 0 的数字。')}</p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((r) => (
              <tr key={r.unit} className="border-b last:border-0">
                <td className="px-5 py-3 text-gray-600">{zh ? AREA_UNITS[r.unit].zh : AREA_UNITS[r.unit].en}</td>
                <td className="px-5 py-3 text-right font-semibold text-gray-900 tabular-nums">{fmt(r.out)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
