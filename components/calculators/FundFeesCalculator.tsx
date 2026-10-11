'use client';

import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { fundFees } from '@/lib/finance';
import { useMoney } from './useMoney';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function FundFeesCalculator() {
  const { money, pct, tr, symbol } = useMoney();
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [ret, setRet] = useState(7);
  const [years, setYears] = useState(20);
  const [feeA, setFeeA] = useState(0.2);
  const [feeB, setFeeB] = useState(1.5);

  const r = useMemo(
    () => fundFees({ initial, monthly, annualReturnPct: ret, years, feeAPct: feeA, feeBPct: feeB }),
    [initial, monthly, ret, years, feeA, feeB]
  );

  const aLower = feeA <= feeB;
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
        <CalculatorInput label={tr('Starting amount', '初始投入')} value={initial} onChange={setInitial} max={1000000} step={1000} prefix={symbol} />
        <CalculatorInput label={tr('Monthly contribution', '每月定投')} value={monthly} onChange={setMonthly} max={20000} step={50} prefix={symbol} />
        <CalculatorInput label={tr('Return before fees (per year)', '扣费前年收益率')} value={ret} onChange={setRet} min={0} max={15} step={0.5} suffix="%" />
        <CalculatorInput label={tr('Years', '投资年限')} value={years} onChange={setYears} min={1} max={50} step={1} />
        <CalculatorInput
          label={tr('Fund A annual fee', '基金 A 年费率')}
          value={feeA}
          onChange={setFeeA}
          min={0}
          max={3}
          step={0.05}
          suffix="%"
          tooltip={tr('Management + custody + sales service fee, per year.', '管理费 + 托管费 + 销售服务费，按年。')}
        />
        <CalculatorInput label={tr('Fund B annual fee', '基金 B 年费率')} value={feeB} onChange={setFeeB} min={0} max={3} step={0.05} suffix="%" />
      </div>

      <div className="space-y-4">
        <ResultCard
          highlight
          title={tr('What the higher fee costs you', '高费率让你少拿')}
          value={money(r.difference)}
          subtitle={tr(`${pct(r.differencePct, 1)} less after ${years} years`, `${years} 年后少 ${pct(r.differencePct, 1)}`)}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <ResultCard title={tr('Fund A final value', '基金 A 期末资产')} value={money(r.valueA)} subtitle={aLower ? tr('lower fee', '费率较低') : undefined} />
          <ResultCard title={tr('Fund B final value', '基金 B 期末资产')} value={money(r.valueB)} subtitle={!aLower ? tr('lower fee', '费率较低') : undefined} />
        </div>
        <ResultCard title={tr('Total you put in', '累计投入本金')} value={money(r.contributed)} />
        <div className="bg-white rounded-xl shadow-card p-4">
          <Line
            data={{
              labels: r.series.map((s) => String(s.year)),
              datasets: [
                { label: tr('Fund A', '基金 A'), data: r.series.map((s) => Math.round(s.a)), borderColor: '#2563eb', backgroundColor: '#2563eb', tension: 0.2, pointRadius: 0 },
                { label: tr('Fund B', '基金 B'), data: r.series.map((s) => Math.round(s.b)), borderColor: '#f97316', backgroundColor: '#f97316', tension: 0.2, pointRadius: 0 },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'bottom' } },
              scales: { x: { title: { display: true, text: tr('Years', '年') } } },
            }}
          />
        </div>
        <p className="text-sm text-gray-500">
          {tr(
            'Assumes both funds earn the same return before fees. Purchase/redemption fees and taxes are not included. Illustration only, not investment advice.',
            '假设两只基金扣费前收益相同；未计入申购赎回费和税。仅为演示，不构成投资建议。'
          )}
        </p>
      </div>
    </div>
  );
}
