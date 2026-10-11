'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { emergencyFund } from '@/lib/finance';
import { useMoney } from './useMoney';

export default function EmergencyFundCalculator() {
  const { money, tr, symbol } = useMoney();
  const [expenses, setExpenses] = useState(3000);
  const [targetMonths, setTargetMonths] = useState(6);
  const [current, setCurrent] = useState(3000);
  const [saving, setSaving] = useState(500);
  const [rate, setRate] = useState(2);

  const r = useMemo(
    () => emergencyFund({ monthlyExpenses: expenses, targetMonths, currentSavings: current, monthlySaving: saving, annualRatePct: rate }),
    [expenses, targetMonths, current, saving, rate]
  );

  const eta =
    r.monthsToGoal === null
      ? tr('Not reachable — increase monthly saving', '无法达成，请提高每月储蓄')
      : r.monthsToGoal === 0
        ? tr('Goal reached', '已达标')
        : tr(
            `${r.monthsToGoal} months (${(r.monthsToGoal / 12).toFixed(1)} years)`,
            `${r.monthsToGoal} 个月（约 ${(r.monthsToGoal / 12).toFixed(1)} 年）`
          );

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
        <CalculatorInput
          label={tr('Monthly essential expenses', '每月固定支出')}
          value={expenses}
          onChange={setExpenses}
          min={500}
          max={30000}
          step={100}
          prefix={symbol}
          tooltip={tr('Rent/mortgage, food, utilities, insurance, minimum debt payments — base it on spending, not income.', '房租/房贷、吃饭、水电、保险、最低还款——按支出算，不按收入算。')}
        />
        <CalculatorInput label={tr('Months of expenses to cover', '想覆盖的月数')} value={targetMonths} onChange={setTargetMonths} min={1} max={12} step={1} tooltip={tr('3 to 6 months is the common rule of thumb.', '3 到 6 个月是常见经验值。')} />
        <CalculatorInput label={tr('Already saved', '目前已有应急金')} value={current} onChange={setCurrent} max={500000} step={500} prefix={symbol} />
        <CalculatorInput label={tr('Saved each month', '每月存入')} value={saving} onChange={setSaving} max={20000} step={50} prefix={symbol} />
        <CalculatorInput label={tr('Interest rate on this money', '这笔钱的年利率')} value={rate} onChange={setRate} min={0} max={8} step={0.1} suffix="%" />
      </div>

      <div className="space-y-4">
        <ResultCard highlight title={tr('Emergency fund target', '应急金目标')} value={money(r.target)} subtitle={tr(`${targetMonths} months of expenses`, `${targetMonths} 个月支出`)} />
        <div className="grid sm:grid-cols-2 gap-4">
          <ResultCard title={tr('Still to save', '还差')} value={money(r.gap)} />
          <ResultCard title={tr('Covered today', '目前可覆盖')} value={tr(`${r.coveredMonths.toFixed(1)} months`, `${r.coveredMonths.toFixed(1)} 个月`)} />
        </div>
        <ResultCard title={tr('Time to reach the goal', '达成目标所需时间')} value={eta} />
        <p className="text-sm text-gray-500">
          {tr(
            'Keep the money somewhere you can withdraw at any time. The 3–6 month figure is a rule of thumb, not an official standard.',
            '放在随时能取出的地方。3 到 6 个月只是经验值，不是官方标准。'
          )}
        </p>
      </div>
    </div>
  );
}
