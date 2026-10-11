'use client';

import { useState } from 'react';
import ResultCard from '@/components/calculators/ResultCard';
import { useMoney } from './useMoney';

type Item = { key: string; en: string; zh: string; value: number };

function NumberRow({ label, value, onChange, symbol }: { label: string; value: number; onChange: (v: number) => void; symbol: string }) {
  return (
    <label className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-gray-700">{label}</span>
      <span className="flex h-10 w-40 shrink-0 items-center rounded-lg border bg-white shadow-input transition-[border-color,box-shadow] duration-quick ease-out focus-within:border-primary-600 focus-within:shadow-input-focus">
        <span className="pl-3 text-sm text-muted-foreground">{symbol}</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="h-full w-full min-w-0 bg-transparent px-3 text-right font-semibold tabular-nums text-gray-900 outline-none"
        />
      </span>
    </label>
  );
}

export default function NetWorthCalculator() {
  const { money, tr, symbol, zh } = useMoney();
  const [assets, setAssets] = useState<Item[]>([
    { key: 'cash', en: 'Cash & savings', zh: '现金与存款', value: 15000 },
    { key: 'invest', en: 'Brokerage investments', zh: '投资账户', value: 20000 },
    { key: 'retire', en: 'Retirement accounts', zh: '退休账户', value: 60000 },
    { key: 'home', en: 'Home value', zh: '房产价值', value: 350000 },
    { key: 'vehicle', en: 'Vehicles', zh: '车辆', value: 18000 },
    { key: 'other', en: 'Other assets', zh: '其他资产', value: 0 },
  ]);
  const [debts, setDebts] = useState<Item[]>([
    { key: 'mortgage', en: 'Mortgage', zh: '房贷', value: 260000 },
    { key: 'auto', en: 'Auto loans', zh: '车贷', value: 12000 },
    { key: 'student', en: 'Student loans', zh: '学生贷款', value: 20000 },
    { key: 'card', en: 'Credit cards', zh: '信用卡', value: 3000 },
    { key: 'other', en: 'Other debts', zh: '其他负债', value: 0 },
  ]);

  const update = (list: Item[], set: (l: Item[]) => void, key: string, v: number) =>
    set(list.map((i) => (i.key === key ? { ...i, value: v } : i)));
  const totalAssets = assets.reduce((s, i) => s + i.value, 0);
  const totalDebts = debts.reduce((s, i) => s + i.value, 0);
  const netWorth = totalAssets - totalDebts;
  const liquid = (assets.find((a) => a.key === 'cash')?.value ?? 0) + (assets.find((a) => a.key === 'invest')?.value ?? 0);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        {[
          { title: tr('Assets', '资产'), list: assets, set: setAssets, total: totalAssets },
          { title: tr('Liabilities', '负债'), list: debts, set: setDebts, total: totalDebts },
        ].map((g) => (
          <div key={g.title} className="rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-2 flex items-baseline justify-between">
              <h2 className="font-semibold text-gray-900">{g.title}</h2>
              <span className="text-sm font-semibold tabular-nums text-gray-900">{money(g.total)}</span>
            </div>
            <div className="divide-y">
              {g.list.map((i) => (
                <NumberRow key={i.key} label={zh ? i.zh : i.en} value={i.value} symbol={symbol} onChange={(v) => update(g.list, g.set, i.key, v)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <ResultCard
          highlight
          title={tr('Your net worth', '你的净资产')}
          value={`${netWorth < 0 ? '−' : ''}${money(Math.abs(netWorth))}`}
          subtitle={tr(`Assets ${money(totalAssets)} − liabilities ${money(totalDebts)}`, `资产 ${money(totalAssets)} − 负债 ${money(totalDebts)}`)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard
            title={tr('Debt-to-asset ratio', '资产负债率')}
            value={totalAssets > 0 ? `${((totalDebts / totalAssets) * 100).toFixed(0)}%` : '–'}
            subtitle={tr('Lower is stronger', '越低越稳健')}
          />
          <ResultCard
            title={tr('Net worth excluding home', '不含房产的净资产')}
            value={(() => {
              const home = assets.find((a) => a.key === 'home')?.value ?? 0;
              const mortgage = debts.find((d) => d.key === 'mortgage')?.value ?? 0;
              const v = netWorth - home + mortgage;
              return `${v < 0 ? '−' : ''}${money(Math.abs(v))}`;
            })()}
            subtitle={tr('Home equity removed', '扣除房屋净值')}
          />
        </div>
        <ResultCard title={tr('Liquid assets', '流动资产')} value={money(liquid)} subtitle={tr('Cash plus brokerage investments', '现金加投资账户')} />
        <p className="text-sm text-muted-foreground">
          {tr(
            'Use current market values, not purchase prices. Track it once or twice a year — the trend matters more than any single number.',
            '请按当前市值填写，而不是买入价。每年记录一两次即可，趋势比某一个数字更重要。'
          )}
        </p>
      </div>
    </div>
  );
}
