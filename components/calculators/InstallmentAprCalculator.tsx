'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { installmentApr } from '@/lib/finance';
import { useMoney } from './useMoney';

export default function InstallmentAprCalculator() {
  const { money, pct, tr, symbol } = useMoney();
  const [principal, setPrincipal] = useState(12000);
  const [months, setMonths] = useState(12);
  const [feePct, setFeePct] = useState(0.6);
  const [upfront, setUpfront] = useState(0);

  const r = useMemo(
    () => installmentApr({ principal, months, monthlyFeePct: feePct, upfrontFee: upfront }),
    [principal, months, feePct, upfront]
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
        <CalculatorInput label={tr('Amount borrowed', '分期本金')} value={principal} onChange={setPrincipal} min={500} max={500000} step={500} prefix={symbol} />
        <CalculatorInput label={tr('Number of installments (months)', '分期期数（月）')} value={months} onChange={setMonths} min={2} max={60} step={1} />
        <CalculatorInput
          label={tr('Monthly fee rate', '每月手续费率')}
          value={feePct}
          onChange={setFeePct}
          min={0}
          max={3}
          step={0.05}
          suffix="%"
          tooltip={tr('The fee is charged every month on the ORIGINAL amount, even though you repay principal monthly.', '手续费每月都按最初的本金收，尽管你每月在还本金。')}
        />
        <CalculatorInput label={tr('One-off up-front fee', '一次性手续费')} value={upfront} onChange={setUpfront} min={0} max={20000} step={50} prefix={symbol} />
      </div>

      <div className="space-y-4">
        {r && (
          <>
            <ResultCard
              highlight
              title={tr('Real annual rate (compounded)', '真实年化利率（复利）')}
              value={pct(r.effectiveAnnualPct)}
              subtitle={tr(`Not the ${pct(r.naiveAnnualPct, 1)} you get by multiplying the monthly fee by 12`, `不是把月费率乘以 12 得到的 ${pct(r.naiveAnnualPct, 1)}`)}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <ResultCard title={tr('Nominal APR (monthly IRR × 12)', '名义年化（月内部收益率 × 12）')} value={pct(r.aprPct)} />
              <ResultCard title={tr('Monthly payment', '每月还款')} value={money(r.monthlyPayment)} />
              <ResultCard title={tr('Total cost of borrowing', '总借款成本')} value={money(r.totalCost)} />
              <ResultCard title={tr('Total repaid', '合计还款')} value={money(r.monthlyPayment * Math.floor(months) + 0)} />
            </div>
            <p className="text-sm text-gray-500">
              {tr(
                'The rate is the internal rate of return of your payment schedule. Ask lenders for the compounded annual rate when comparing offers.',
                '年化利率按你的还款现金流计算（内部收益率）。比较不同贷款时，请对方给出按复利计算的年化利率。'
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
