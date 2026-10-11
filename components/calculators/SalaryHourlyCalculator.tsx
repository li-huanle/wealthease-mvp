'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { payBreakdown } from '@/lib/finance';
import { cn } from '@/lib/cn';
import { useMoney } from './useMoney';

type Mode = 'hourly' | 'annual';

export default function SalaryHourlyCalculator() {
  const { tr, symbol } = useMoney();
  const fmt = (v: number, d = 0) => `${symbol}${v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`;

  const [mode, setMode] = useState<Mode>('hourly');
  const [hourly, setHourly] = useState(25);
  const [annual, setAnnual] = useState(52000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [unpaidWeeks, setUnpaidWeeks] = useState(0);

  const weeks = 52 - unpaidWeeks;
  const annualPay = mode === 'hourly' ? hourly * hoursPerWeek * weeks : annual;
  const r = useMemo(() => payBreakdown(annualPay, hoursPerWeek, weeks), [annualPay, hoursPerWeek, weeks]);

  const rows = [
    [tr('Hourly', '时薪'), fmt(r.hourly, 2)],
    [tr('Daily (5-day week)', '日薪（每周 5 天）'), fmt(r.daily, 2)],
    [tr('Weekly', '周薪'), fmt(r.weekly, 2)],
    [tr('Biweekly', '双周薪'), fmt(r.biweekly)],
    [tr('Monthly', '月薪'), fmt(r.monthly)],
    [tr('Annual', '年薪'), fmt(r.annual)],
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1" role="tablist">
          {(['hourly', 'annual'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-quick ease-out',
                mode === m ? 'bg-white text-gray-900 shadow-sm' : 'text-muted-foreground hover:text-gray-900'
              )}
            >
              {m === 'hourly' ? tr('Hourly → salary', '时薪 → 年薪') : tr('Salary → hourly', '年薪 → 时薪')}
            </button>
          ))}
        </div>
        {mode === 'hourly' ? (
          <CalculatorInput label={tr('Hourly rate', '时薪')} value={hourly} onChange={setHourly} min={5} max={200} step={0.5} prefix={symbol} />
        ) : (
          <CalculatorInput label={tr('Annual salary', '年薪')} value={annual} onChange={setAnnual} min={10000} max={500000} step={1000} prefix={symbol} />
        )}
        <CalculatorInput label={tr('Hours per week', '每周工时')} value={hoursPerWeek} onChange={setHoursPerWeek} min={1} max={80} step={1} />
        <CalculatorInput
          label={tr('Unpaid weeks off per year', '每年无薪休假周数')}
          value={unpaidWeeks}
          onChange={setUnpaidWeeks}
          min={0}
          max={20}
          step={1}
          tooltip={tr('Paid vacation and holidays count as worked weeks. Only enter time off that is unpaid.', '带薪休假和节假日按工作周计算，这里只填无薪休假。')}
        />
      </div>

      <div className="space-y-4">
        <ResultCard
          highlight
          title={mode === 'hourly' ? tr('Annual salary', '年薪') : tr('Equivalent hourly rate', '折合时薪')}
          value={mode === 'hourly' ? fmt(r.annual) : fmt(r.hourly, 2)}
          subtitle={tr(`${hoursPerWeek} h/week × ${weeks} weeks = ${(hoursPerWeek * weeks).toLocaleString()} hours/year`, `每周 ${hoursPerWeek} 小时 × ${weeks} 周 = 每年 ${(hoursPerWeek * weeks).toLocaleString()} 小时`)}
        />
        <div className="overflow-hidden rounded-xl bg-white shadow-card">
          <table className="w-full text-sm">
            <tbody>
              {rows.map(([label, v]) => (
                <tr key={label} className="border-b last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">{label}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-gray-900">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          {tr('Gross pay before taxes. For take-home pay after federal, state and FICA taxes, use the take-home pay calculator.', '以上为税前收入。如需扣除联邦税、州税和 FICA 后的到手收入，请使用税后工资计算器。')}
        </p>
      </div>
    </div>
  );
}
