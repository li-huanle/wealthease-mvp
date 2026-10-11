'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { creditCardPayoff, pmt } from '@/lib/finance';
import { useMoney } from './useMoney';

export default function CreditCardPayoffCalculator() {
  const { money, tr, symbol } = useMoney();
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(22);
  const [payment, setPayment] = useState(200);
  const [targetMonths, setTargetMonths] = useState(24);

  const r = useMemo(() => creditCardPayoff(balance, apr, payment), [balance, apr, payment]);
  const neededPayment = pmt(balance, apr, targetMonths);
  const target = useMemo(() => creditCardPayoff(balance, apr, neededPayment), [balance, apr, neededPayment]);

  const duration = (m: number) =>
    m < 12
      ? tr(`${m} months`, `${m} 个月`)
      : tr(`${m} months (${Math.floor(m / 12)} yr ${m % 12} mo)`, `${m} 个月（${Math.floor(m / 12)} 年 ${m % 12} 个月）`);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
        <CalculatorInput label={tr('Card balance', '信用卡欠款')} value={balance} onChange={setBalance} min={100} max={50000} step={100} prefix={symbol} />
        <CalculatorInput label={tr('Interest rate (APR)', '年利率（APR）')} value={apr} onChange={setApr} min={0} max={36} step={0.25} suffix="%" />
        <CalculatorInput label={tr('Monthly payment', '每月还款')} value={payment} onChange={setPayment} min={10} max={5000} step={10} prefix={symbol} />
        <div className="mt-2 border-t pt-6">
          <CalculatorInput
            label={tr('Or: debt-free in how many months?', '或者：想在几个月内还清？')}
            value={targetMonths}
            onChange={setTargetMonths}
            min={3}
            max={120}
            step={1}
          />
        </div>
      </div>

      <div className="space-y-4">
        {r.months === null ? (
          <ResultCard
            highlight
            title={tr('This payment never pays it off', '按这个金额永远还不清')}
            value={money(r.firstMonthInterest)}
            subtitle={tr('is charged in interest each month — pay more than this to make progress', '是每月产生的利息，还款必须高于这个数才能减少欠款')}
          />
        ) : (
          <ResultCard
            highlight
            title={tr('Debt-free in', '还清所需时间')}
            value={duration(r.months)}
            subtitle={tr(`Total interest ${money(r.totalInterest)} · total paid ${money(r.totalPaid)}`, `总利息 ${money(r.totalInterest)} · 合计还款 ${money(r.totalPaid)}`)}
          />
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard
            title={tr(`Payment to be debt-free in ${targetMonths} months`, `${targetMonths} 个月还清需每月还`)}
            value={money(neededPayment)}
            subtitle={tr(`Total interest ${money(target.totalInterest)}`, `总利息 ${money(target.totalInterest)}`)}
          />
          <ResultCard title={tr('Interest in the first month', '第一个月利息')} value={money(r.firstMonthInterest)} />
        </div>
        <p className="text-sm text-muted-foreground">
          {tr(
            'Assumes no new purchases, a fixed APR and interest compounded monthly. Card issuers calculate interest on the average daily balance, so your statement may differ slightly.',
            '假设不再新增消费、年利率固定、按月计息。发卡行通常按日均余额计息，账单金额可能略有差异。'
          )}
        </p>
      </div>
    </div>
  );
}
