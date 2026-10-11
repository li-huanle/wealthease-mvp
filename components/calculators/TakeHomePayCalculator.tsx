'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { FilingStatus, LIMIT_401K, US_TAX_YEAR, usTakeHome } from '@/lib/finance';
import { useMoney } from './useMoney';

const STATUSES: { id: FilingStatus; en: string; zh: string }[] = [
  { id: 'single', en: 'Single', zh: '单身' },
  { id: 'married', en: 'Married filing jointly', zh: '已婚联合报税' },
  { id: 'head', en: 'Head of household', zh: '户主' },
];

export default function TakeHomePayCalculator() {
  const { tr } = useMoney();
  // This calculator is US-focused, so amounts are always shown in dollars.
  const usd = (v: number, digits = 0) =>
    `$${v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

  const [salary, setSalary] = useState(75000);
  const [status, setStatus] = useState<FilingStatus>('single');
  const [k401, setK401] = useState(5);
  const [health, setHealth] = useState(2400);
  const [stateRate, setStateRate] = useState(4);

  const r = useMemo(
    () => usTakeHome({ grossSalary: salary, status, contribution401kPct: k401, pretaxHealth: health, stateRatePct: stateRate }),
    [salary, status, k401, health, stateRate]
  );

  const periods = [
    { label: tr('Per year', '每年'), div: 1 },
    { label: tr('Per month', '每月'), div: 12 },
    { label: tr('Biweekly', '每两周'), div: 26 },
    { label: tr('Weekly', '每周'), div: 52 },
    { label: tr('Hourly (2,080 h/yr)', '每小时（2,080 小时/年）'), div: 2080 },
  ];

  const rows = [
    { label: tr('Federal income tax', '联邦所得税'), value: r.federalTax, color: 'bg-blue-500' },
    { label: tr('Social Security (6.2%)', '社会保障税（6.2%）'), value: r.socialSecurity, color: 'bg-indigo-500' },
    { label: tr('Medicare (1.45%+)', 'Medicare 医疗税（1.45% 起）'), value: r.medicare, color: 'bg-violet-500' },
    { label: tr('State income tax (estimate)', '州所得税（估算）'), value: r.stateTax, color: 'bg-amber-500' },
    { label: tr('401(k) contribution', '401(k) 缴款'), value: r.contribution401k, color: 'bg-emerald-500' },
    { label: tr('Pre-tax health premiums', '税前医保保费'), value: r.pretaxHealth, color: 'bg-teal-500' },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
        <CalculatorInput label={tr('Annual gross salary', '税前年薪')} value={salary} onChange={setSalary} min={10000} max={500000} step={1000} prefix="$" />

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{tr('Filing status', '报税身份')}</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {STATUSES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStatus(s.id)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${status === s.id ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'}`}
              >
                {tr(s.en, s.zh)}
              </button>
            ))}
          </div>
        </div>

        <CalculatorInput
          label={tr('Traditional 401(k) contribution', '传统 401(k) 缴款比例')}
          value={k401}
          onChange={setK401}
          min={0}
          max={50}
          step={1}
          suffix="%"
          tooltip={tr(`Reduces federal and state income tax but not Social Security/Medicare. Capped at $${LIMIT_401K.toLocaleString('en-US')} for ${US_TAX_YEAR}.`, `可减少联邦和州所得税，但不减少社保/医疗税。${US_TAX_YEAR} 年上限 $${LIMIT_401K.toLocaleString('en-US')}。`)}
        />
        <CalculatorInput
          label={tr('Pre-tax health premiums (per year)', '税前医保保费（每年）')}
          value={health}
          onChange={setHealth}
          min={0}
          max={30000}
          step={100}
          prefix="$"
          tooltip={tr('Health, dental and vision premiums paid through your employer reduce income tax and FICA.', '通过雇主缴纳的医疗、牙科、视力保险保费可同时减少所得税和 FICA。')}
        />
        <div>
          <CalculatorInput
            label={tr('State income tax rate (estimate)', '州所得税率（估算）')}
            value={stateRate}
            onChange={setStateRate}
            min={0}
            max={13}
            step={0.1}
            suffix="%"
            tooltip={tr('Use your state\'s effective rate. Applied as a flat rate to pay after 401(k) and health deductions.', '填你所在州的实际税负率。按扣除 401(k) 和医保后的收入以统一比例计算。')}
          />
          <button type="button" onClick={() => setStateRate(0)} className="-mt-3 mb-2 text-sm text-primary-600 hover:text-primary-700 underline">
            {tr('No state income tax (AK, FL, NV, NH, SD, TN, TX, WA, WY)', '无州所得税的州（AK、FL、NV、NH、SD、TN、TX、WA、WY）')}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <ResultCard
          highlight
          title={tr('Estimated take-home pay (per year)', '预计税后收入（每年）')}
          value={usd(r.netAnnual)}
          subtitle={tr(
            `Total taxes ${usd(r.totalTax)} · effective rate ${r.effectiveTaxRatePct.toFixed(1)}% · federal marginal ${(r.marginalRate * 100).toFixed(0)}%`,
            `税款合计 ${usd(r.totalTax)} · 综合税率 ${r.effectiveTaxRatePct.toFixed(1)}% · 联邦边际税率 ${(r.marginalRate * 100).toFixed(0)}%`
          )}
        />

        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {periods.map((p) => (
                <tr key={p.label} className="border-b last:border-0">
                  <td className="px-4 py-3 text-gray-600">{p.label}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">{usd(r.netAnnual / p.div, p.div >= 52 ? 2 : 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-card p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">{tr('Where your paycheck goes', '你的工资去哪了')}</p>
          <div className="flex h-4 rounded-full overflow-hidden mb-4 bg-gray-100">
            <div className="bg-gray-800" style={{ width: `${r.gross > 0 ? (r.netAnnual / r.gross) * 100 : 0}%` }} title={tr('Take-home', '税后')} />
            {rows.map((row) => (
              <div key={row.label} className={row.color} style={{ width: `${r.gross > 0 ? (row.value / r.gross) * 100 : 0}%` }} title={row.label} />
            ))}
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-gray-800" />{tr('Take-home pay', '税后收入')}</span><span className="font-medium">{usd(r.netAnnual)}</span></li>
            {rows.map((row) => (
              <li key={row.label} className="flex justify-between">
                <span className="flex items-center gap-2"><span className={`w-3 h-3 rounded-sm ${row.color}`} />{row.label}</span>
                <span className="font-medium">{usd(row.value)}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-gray-500">
          {tr(
            `Estimate based on ${US_TAX_YEAR} federal brackets and the standard deduction. Does not include tax credits, itemized deductions, local taxes, other pre-tax benefits or state-specific rules. Not tax advice.`,
            `按 ${US_TAX_YEAR} 年联邦税率档位和标准扣除额估算，未计入税收抵免、分项扣除、地方税、其他税前福利和各州具体规则。不构成税务建议。`
          )}
        </p>
      </div>
    </div>
  );
}
