'use client';

import { useLocale } from 'next-intl';

/** Locale-aware helpers shared by the everyday-money calculators. */
export function useMoney() {
  const locale = useLocale();
  const zh = locale === 'zh';
  const symbol = zh ? '¥' : '$';
  const money = (v: number) =>
    `${symbol}${Math.round(v).toLocaleString(zh ? 'zh-CN' : 'en-US')}`;
  const pct = (v: number, digits = 2) => `${v.toFixed(digits)}%`;
  return { zh, symbol, money, pct, tr: (en: string, cn: string) => (zh ? cn : en) };
}
