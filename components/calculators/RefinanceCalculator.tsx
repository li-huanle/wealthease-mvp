'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { refinance } from '@/lib/finance';
import { useMoney } from './useMoney';

export default function RefinanceCalculator() {
  const { tr } = useMoney();
  const usd = (v: number) => `${v < 0 ? '−' : ''}$${Math.abs(Math.round(v)).toLocaleString('en-US')}`;

  const [balance, setBalance] = useState(300000);
  const [currentRate, setCurrentRate] = useState(7);
  const [remaining, setRemaining] = useState(28);
  const [newRate, setNewRate] = useState(6);
  const [newTerm, setNewTerm] = useState(30);
  const [costs, setCosts] = useState(6000);

  const r = useMemo(
    () => refinance({ balance, currentRatePct: currentRate, remainingYears: remaining, newRatePct: newRate, newTermYears: newTerm, closingCosts: costs }),
    [balance, currentRate, remaining, newRate, newTerm, costs]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
        <CalculatorInput label={tr('Current loan balance', '当前贷款余额')} value={balance} onChange={setBalance} min={10000} max={2000000} step={5000} prefix="$" />
        <div className="grid gap-x-6 sm:grid-cols-2">
          <CalculatorInput label={tr('Current rate', '当前利率')} value={currentRate} onChange={setCurrentRate} min={1} max={12} step={0.05} suffix="%" />
          <CalculatorInput label={tr('Years remaining', '剩余年限')} value={remaining} onChange={setRemaining} min={1} max={30} step={1} suffix={tr(' yrs', ' 年')} />
          <CalculatorInput label={tr('New rate', '新利率')} value={newRate} onChange={setNewRate} min={1} max={12} step={0.05} suffix="%" />
          <CalculatorInput label={tr('New loan term', '新贷款年限')} value={newTerm} onChange={setNewTerm} min={10} max={30} step={5} suffix={tr(' yrs', ' 年')} />
        </div>
        <CalculatorInput
          label={tr('Closing costs', '再融资手续费')}
          value={costs}
          onChange={setCosts}
          min={0}
          max={30000}
          step={250}
          prefix="$"
          tooltip={tr('Lender, appraisal, title and other fees, typically about 2–6% of the loan.', '贷款机构、评估、产权等费用，通常约为贷款额的 2–6%。')}
        />
      </div>

      <div className="space-y-4">
        <ResultCard
          highlight
          title={tr('Break-even point', '回本时间')}
          value={r.breakEvenMonths === null ? tr('No savings', '没有节省') : tr(`${r.breakEvenMonths} months`, `${r.breakEvenMonths} 个月`)}
          subtitle={
            r.breakEvenMonths === null
              ? tr('The new monthly payment is not lower', '新月供并没有更低')
              : tr(`Closing costs are recovered after about ${(r.breakEvenMonths / 12).toFixed(1)} years of lower payments`, `月供降低后约 ${(r.breakEvenMonths / 12).toFixed(1)} 年收回手续费`)
          }
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard title={tr('Current payment', '当前月供')} value={usd(r.currentPayment)} />
          <ResultCard title={tr('New payment', '新月供')} value={usd(r.newPayment)} subtitle={tr(`Saves ${usd(r.monthlySavings)}/month`, `每月节省 ${usd(r.monthlySavings)}`)} />
          <ResultCard title={tr('Interest left on current loan', '原贷款剩余利息')} value={usd(r.currentRemainingInterest)} />
          <ResultCard title={tr('Interest on new loan', '新贷款总利息')} value={usd(r.newTotalInterest)} />
        </div>
        <ResultCard
          title={tr('Lifetime savings after closing costs', '扣除手续费后的总节省')}
          value={usd(r.lifetimeSavings)}
          subtitle={tr(
            r.lifetimeSavings >= 0 ? 'Refinancing costs less over the life of the loans' : 'Lower payment, but more total interest — usually from restarting a long term',
            r.lifetimeSavings >= 0 ? '在整个还款期内，再融资总成本更低' : '月供降低了，但总利息更多——通常是因为重新开始了较长的贷款期限'
          )}
        />
        <p className="text-sm text-muted-foreground">
          {tr(
            'Compares principal and interest only; taxes and insurance stay the same either way. Refinancing makes the most sense if you expect to keep the home longer than the break-even period.',
            '只比较本金和利息，房产税和保险两种情况相同。如果你打算持有房子的时间超过回本期，再融资通常更划算。'
          )}
        </p>
      </div>
    </div>
  );
}
