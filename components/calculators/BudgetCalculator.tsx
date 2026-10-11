'use client';

import { useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { cn } from '@/lib/cn';
import { useMoney } from './useMoney';

export default function BudgetCalculator() {
  const { money, tr, symbol } = useMoney();
  const [income, setIncome] = useState(5000);
  const [needs, setNeeds] = useState(2800);
  const [wants, setWants] = useState(1400);
  const [savings, setSavings] = useState(800);

  const buckets = [
    {
      key: 'needs',
      label: tr('Needs', '必要支出'),
      hint: tr('Housing, utilities, groceries, insurance, minimum debt payments', '住房、水电、日常饮食、保险、最低还款'),
      target: 0.5,
      actual: needs,
      set: setNeeds,
      color: 'bg-primary-600',
      overIsBad: true,
    },
    {
      key: 'wants',
      label: tr('Wants', '想要的支出'),
      hint: tr('Dining out, subscriptions, travel, shopping', '外出就餐、订阅、旅行、购物'),
      target: 0.3,
      actual: wants,
      set: setWants,
      color: 'bg-sky-500',
      overIsBad: true,
    },
    {
      key: 'savings',
      label: tr('Savings & extra debt payoff', '储蓄与额外还债'),
      hint: tr('Emergency fund, retirement, investing, paying debt beyond the minimum', '应急金、退休、投资、超出最低额的还款'),
      target: 0.2,
      actual: savings,
      set: setSavings,
      color: 'bg-amber-500',
      overIsBad: false,
    },
  ];
  const spent = needs + wants + savings;
  const left = income - spent;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
        <CalculatorInput label={tr('Monthly take-home pay', '每月到手收入')} value={income} onChange={setIncome} min={500} max={50000} step={100} prefix={symbol} />
        <p className="mb-4 text-sm font-medium text-gray-700">{tr('What you actually spend each month (optional)', '你每月的实际支出（可选）')}</p>
        {buckets.map((b) => (
          <CalculatorInput key={b.key} label={b.label} tooltip={b.hint} value={b.actual} onChange={b.set} min={0} max={Math.max(income, 1000)} step={50} prefix={symbol} />
        ))}
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {buckets.map((b) => (
            <ResultCard key={b.key} title={`${b.label} · ${b.target * 100}%`} value={money(income * b.target)} subtitle={tr('target', '目标')} />
          ))}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-card">
          <p className="mb-4 text-sm font-medium text-gray-700">{tr('Your spending vs. the 50/30/20 targets', '实际支出与 50/30/20 目标对比')}</p>
          <div className="space-y-4">
            {buckets.map((b) => {
              const share = income > 0 ? b.actual / income : 0;
              const diff = b.actual - income * b.target;
              const good = b.overIsBad ? diff <= 0 : diff >= 0;
              return (
                <div key={b.key}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-gray-700">{b.label}</span>
                    <span className="tabular-nums text-gray-900">
                      {(share * 100).toFixed(0)}% <span className="text-muted-foreground">/ {b.target * 100}%</span>
                    </span>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                    <div className={cn('absolute inset-y-0 left-0 rounded-full', b.color)} style={{ width: `${Math.min(100, share * 100)}%` }} />
                    <div className="absolute inset-y-0 w-0.5 bg-gray-900" style={{ left: `${b.target * 100}%` }} aria-hidden />
                  </div>
                  <p className={cn('mt-1 text-xs', good ? 'text-primary-700' : 'text-amber-700')}>
                    {diff === 0
                      ? tr('On target', '正好达标')
                      : diff > 0
                        ? tr(`${money(diff)} above target`, `比目标多 ${money(diff)}`)
                        : tr(`${money(-diff)} below target`, `比目标少 ${money(-diff)}`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <ResultCard
          title={left >= 0 ? tr('Unassigned each month', '每月未分配') : tr('Over budget each month', '每月超支')}
          value={money(Math.abs(left))}
          subtitle={left >= 0 ? tr('Consider moving this into savings', '可以考虑把这部分转入储蓄') : tr('Spending is higher than take-home pay', '支出高于到手收入')}
        />
        <p className="text-sm text-muted-foreground">
          {tr(
            '50/30/20 is a rule of thumb, not a requirement. In high-cost areas needs often exceed 50%; aim to keep the savings share as high as you can.',
            '50/30/20 只是经验法则，不是硬性要求。在生活成本高的城市，必要支出常常超过 50%；尽量把储蓄比例保持得高一些。'
          )}
        </p>
      </div>
    </div>
  );
}
