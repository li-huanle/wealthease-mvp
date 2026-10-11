'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { homeAffordability } from '@/lib/finance';
import { useMoney } from './useMoney';

export default function HomeAffordabilityCalculator() {
  const { tr } = useMoney();
  const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;

  const [income, setIncome] = useState(100000);
  const [debts, setDebts] = useState(500);
  const [down, setDown] = useState(60000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [taxPct, setTaxPct] = useState(1.1);
  const [insurance, setInsurance] = useState(1500);
  const [hoa, setHoa] = useState(0);

  const r = useMemo(
    () =>
      homeAffordability({
        annualIncome: income,
        monthlyDebts: debts,
        downPayment: down,
        ratePct: rate,
        termYears: term,
        propertyTaxPct: taxPct,
        insuranceAnnual: insurance,
        hoaMonthly: hoa,
      }),
    [income, debts, down, rate, term, taxPct, insurance, hoa]
  );
  const downPct = r.maxPrice > 0 ? (down / r.maxPrice) * 100 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
        <CalculatorInput label={tr('Annual gross income', '税前年收入')} value={income} onChange={setIncome} min={20000} max={500000} step={1000} prefix="$" />
        <CalculatorInput
          label={tr('Monthly debt payments', '每月其他债务还款')}
          value={debts}
          onChange={setDebts}
          min={0}
          max={10000}
          step={50}
          prefix="$"
          tooltip={tr('Car loans, student loans, minimum credit card payments, child support. Not rent.', '车贷、学贷、信用卡最低还款、抚养费等，不含房租。')}
        />
        <CalculatorInput label={tr('Down payment', '首付')} value={down} onChange={setDown} min={0} max={1000000} step={5000} prefix="$" />
        <div className="grid gap-x-6 sm:grid-cols-2">
          <CalculatorInput label={tr('Mortgage rate', '房贷利率')} value={rate} onChange={setRate} min={1} max={12} step={0.05} suffix="%" />
          <CalculatorInput label={tr('Loan term', '贷款年限')} value={term} onChange={setTerm} min={10} max={30} step={5} suffix={tr(' yrs', ' 年')} />
          <CalculatorInput label={tr('Property tax rate', '房产税率')} value={taxPct} onChange={setTaxPct} min={0} max={3} step={0.05} suffix="%" />
          <CalculatorInput label={tr('Home insurance (per year)', '房屋保险（每年）')} value={insurance} onChange={setInsurance} min={0} max={10000} step={100} prefix="$" />
        </div>
        <CalculatorInput label={tr('HOA fees (per month)', '物业/HOA 费（每月）')} value={hoa} onChange={setHoa} min={0} max={2000} step={25} prefix="$" />
      </div>

      <div className="space-y-4">
        <ResultCard
          highlight
          title={tr('You can afford a home up to', '你可负担的房价上限')}
          value={usd(r.maxPrice)}
          subtitle={tr(`Loan ${usd(r.loanAmount)} · down payment ${downPct.toFixed(0)}%`, `贷款 ${usd(r.loanAmount)} · 首付 ${downPct.toFixed(0)}%`)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard title={tr('Max monthly housing payment', '每月住房支出上限')} value={usd(r.maxHousingPayment)} />
          <ResultCard
            title={tr('Limited by', '受限于')}
            value={r.limitedBy === 'front' ? tr('28% rule', '28% 规则') : tr('36% rule', '36% 规则')}
            subtitle={
              r.limitedBy === 'front'
                ? tr('Housing costs ≤ 28% of gross income', '住房支出 ≤ 税前收入的 28%')
                : tr('All debts ≤ 36% of gross income', '全部债务 ≤ 税前收入的 36%')
            }
          />
        </div>
        <div className="overflow-hidden rounded-xl bg-white shadow-card">
          <table className="w-full text-sm">
            <tbody>
              {[
                [tr('Principal & interest', '本金和利息'), r.principalInterest],
                [tr('Property tax', '房产税'), r.propertyTax],
                [tr('Home insurance', '房屋保险'), r.insurance],
                [tr('HOA', '物业/HOA'), r.hoa],
              ].map(([label, v]) => (
                <tr key={label as string} className="border-b last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">{label}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-gray-900">{usd(v as number)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {downPct < 20 && r.maxPrice > 0 && (
          <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            {tr(
              'With less than 20% down, lenders usually add private mortgage insurance (PMI), which lowers the price you can afford.',
              '首付低于 20% 时，贷款机构通常会要求私人房贷保险（PMI），实际可负担的房价会更低。'
            )}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {tr(
            'Uses the common 28/36 guideline: housing costs up to 28% of gross monthly income and all debt payments up to 36%. Lenders may approve more or less. Not a loan offer.',
            '采用常见的 28/36 规则：住房支出不超过税前月收入的 28%，全部债务还款不超过 36%。实际贷款机构的标准可能更宽或更严，结果不代表贷款承诺。'
          )}
        </p>
      </div>
    </div>
  );
}
