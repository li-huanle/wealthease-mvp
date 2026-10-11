'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { FilingStatus, STANDARD_DEDUCTION, US_TAX_YEAR, bracketBreakdown, federalIncomeTax } from '@/lib/finance';
import { useMoney } from './useMoney';

const STATUSES: { id: FilingStatus; en: string; zh: string }[] = [
  { id: 'single', en: 'Single', zh: '单身' },
  { id: 'married', en: 'Married filing jointly', zh: '已婚联合报税' },
  { id: 'head', en: 'Head of household', zh: '户主' },
];

export default function TaxBracketCalculator() {
  const { tr } = useMoney();
  const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;

  const [income, setIncome] = useState(95000);
  const [status, setStatus] = useState<FilingStatus>('single');
  const [extra, setExtra] = useState(0);

  const std = STANDARD_DEDUCTION[status];
  const taxable = Math.max(0, income - std - extra);

  const { rows, tax, marginal, effective, nextRoom } = useMemo(() => {
    const rows = bracketBreakdown(taxable, status);
    const { tax, marginalRate } = federalIncomeTax(taxable, status);
    const current = rows.find((r) => taxable > r.from && taxable <= r.to) ?? rows[0];
    return {
      rows,
      tax,
      marginal: marginalRate,
      effective: income > 0 ? (tax / income) * 100 : 0,
      nextRoom: Number.isFinite(current.to) ? current.to - taxable : null,
    };
  }, [taxable, status, income]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
        <CalculatorInput label={tr('Gross annual income', '税前年收入')} value={income} onChange={setIncome} min={0} max={1000000} step={1000} prefix="$" />
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
          label={tr('Other deductions (401(k), HSA, etc.)', '其他扣除（401(k)、HSA 等）')}
          value={extra}
          onChange={setExtra}
          min={0}
          max={200000}
          step={500}
          prefix="$"
          tooltip={tr('Pre-tax contributions and other above-the-line deductions, on top of the standard deduction.', '标准扣除额之外的税前缴款和其他扣除项。')}
        />
        <p className="text-sm text-gray-500">
          {tr(`Standard deduction (${US_TAX_YEAR}): ${usd(std)}`, `标准扣除额（${US_TAX_YEAR}）：${usd(std)}`)}
        </p>
      </div>

      <div className="space-y-4">
        <ResultCard
          highlight
          title={tr('Your federal marginal rate', '你的联邦边际税率')}
          value={`${(marginal * 100).toFixed(0)}%`}
          subtitle={
            nextRoom === null
              ? tr('You are in the top bracket', '你已处于最高税档')
              : tr(`${usd(nextRoom)} of room before the next bracket`, `距离下一税档还有 ${usd(nextRoom)}`)
          }
        />
        <div className="grid sm:grid-cols-3 gap-4">
          <ResultCard title={tr('Taxable income', '应税收入')} value={usd(taxable)} />
          <ResultCard title={tr('Federal income tax', '联邦所得税')} value={usd(tax)} />
          <ResultCard title={tr('Effective rate', '有效税率')} value={`${effective.toFixed(1)}%`} subtitle={tr('of gross income', '占税前收入')} />
        </div>

        <div className="bg-white rounded-xl shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">{tr('Rate', '税率')}</th>
                <th className="px-4 py-3">{tr('Bracket', '收入区间')}</th>
                <th className="px-4 py-3 text-right">{tr('Income taxed', '适用收入')}</th>
                <th className="px-4 py-3 text-right">{tr('Tax', '税额')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.rate} className={`border-t ${r.incomeInBracket > 0 ? 'bg-primary-50/40 font-medium' : 'text-gray-400'}`}>
                  <td className="px-4 py-2">{(r.rate * 100).toFixed(0)}%</td>
                  <td className="px-4 py-2">
                    {usd(r.from)} – {Number.isFinite(r.to) ? usd(r.to) : tr('and up', '以上')}
                  </td>
                  <td className="px-4 py-2 text-right">{usd(r.incomeInBracket)}</td>
                  <td className="px-4 py-2 text-right">{usd(r.taxInBracket)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          {tr(
            `Brackets apply only to the slice of income inside each range — moving into a higher bracket never reduces your take-home pay on the income below it. ${US_TAX_YEAR} federal brackets (IRS Rev. Proc. 2025-32); excludes FICA, state tax and credits.`,
            `税率只适用于落在各区间内的那部分收入——进入更高税档不会让较低区间的收入多交税。采用 ${US_TAX_YEAR} 年联邦税率档位（IRS Rev. Proc. 2025-32）；不含 FICA、州税和税收抵免。`
          )}
        </p>
      </div>
    </div>
  );
}
