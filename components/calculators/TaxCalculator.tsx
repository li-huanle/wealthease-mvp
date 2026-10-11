'use client';

import { useState } from 'react';
import { useLocale as useSiteLocale } from 'next-intl';
import { FilingStatus, LIMIT_IRA, LIMIT_IRA_CATCH_UP, SS_WAGE_BASE, STANDARD_DEDUCTION, extraStandardDeductions, federalIncomeTax } from '@/lib/finance';

// No wage income tax (AK, FL, NV, NH, SD, TN, TX, WA, WY) or long-standing flat rates.
const FLAT_STATE_RATES: Record<string, number> = {
  AK: 0, FL: 0, NV: 0, NH: 0, SD: 0, TN: 0, TX: 0, WA: 0, WY: 0,
  IL: 0.0495, PA: 0.0307,
};

const STATE_NAMES: Record<string, { en: string; zh: string }> = {
  TX: { en: 'Texas', zh: '德克萨斯' },
  FL: { en: 'Florida', zh: '佛罗里达' },
  WA: { en: 'Washington', zh: '华盛顿' },
  NV: { en: 'Nevada', zh: '内华达' },
  TN: { en: 'Tennessee', zh: '田纳西' },
  AK: { en: 'Alaska', zh: '阿拉斯加' },
  NH: { en: 'New Hampshire', zh: '新罕布什尔' },
  SD: { en: 'South Dakota', zh: '南达科他' },
  WY: { en: 'Wyoming', zh: '怀俄明' },
  IL: { en: 'Illinois', zh: '伊利诺伊' },
  PA: { en: 'Pennsylvania', zh: '宾夕法尼亚' },
};

interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  standardDeduction: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalTax: number;
  effectiveRate: string;
  marginalRate: string;
  takeHome: number;
  perMonth: number;
  perWeek: number;
}

interface TaxCalculatorProps {
  onCalculate?: (result: any) => void;
}

export default function TaxCalculator({ onCalculate }: TaxCalculatorProps) {
  const locale: 'en' | 'zh' = useSiteLocale() === 'zh' ? 'zh' : 'en';

  const [income, setIncome] = useState(100000);
  const [filingStatus, setFilingStatus] = useState('single');
  const status: FilingStatus = filingStatus === 'married' || filingStatus === 'head' ? filingStatus : 'single';
  const [state, setState] = useState('TX');
  const [customStateRate, setCustomStateRate] = useState(5);
  const [age, setAge] = useState(30);
  const [isBlind, setIsBlind] = useState(false);
  const [dependentCount, setDependentCount] = useState(0);
  const [k401Contribution, setk401Contribution] = useState(0);
  const [hsaContribution, setHsaContribution] = useState(0);
  const [iraContribution, setIraContribution] = useState(0);
  const iraLimit = LIMIT_IRA + (age >= 50 ? LIMIT_IRA_CATCH_UP : 0);
  const adjustedIncome = Math.max(0, income - k401Contribution - hsaContribution - Math.min(iraContribution, iraLimit));
  const extra = extraStandardDeductions(status, age, isBlind, adjustedIncome);
  const standardDeduction = STANDARD_DEDUCTION[status] + extra.additional + extra.senior;

  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<TaxResult | null>(null);

  const calculateTax = () => {
    // 2026 federal brackets and standard deduction by filing status (see lib/finance.ts)

    // Above-the-line deductions
    const taxableIncome = Math.max(0, adjustedIncome - standardDeduction);

    const { tax: federalTax, marginalRate } = federalIncomeTax(taxableIncome, status);

    // 州税（简化）
    // Only flat-rate and no-income-tax states are modelled exactly; other states use the rate the user enters.
    const stateRate = state in FLAT_STATE_RATES ? FLAT_STATE_RATES[state] : customStateRate / 100;
    const stateTax = adjustedIncome * stateRate;

    // FICA（社保+医保）
    const socialSecurityTax = Math.min(income, SS_WAGE_BASE) * 0.062;
    const medicareTax = income * 0.0145 + Math.max(0, income - (status === 'married' ? 250000 : 200000)) * 0.009;
    const ficaTax = socialSecurityTax + medicareTax;

    const totalTax = federalTax + stateTax + ficaTax;
    const effectiveRate = (totalTax / income) * 100;

    const result = {
      grossIncome: income,
      taxableIncome: Math.round(taxableIncome),
      standardDeduction,
      federalTax: Math.round(federalTax),
      stateTax: Math.round(stateTax),
      ficaTax: Math.round(ficaTax),
      totalTax: Math.round(totalTax),
      effectiveRate: effectiveRate.toFixed(1),
      marginalRate: (marginalRate * 100).toFixed(0),
      takeHome: Math.round(income - totalTax),
      perMonth: Math.round((income - totalTax) / 12),
      perWeek: Math.round((income - totalTax) / 52),
    };

    onCalculate?.(result);
    setResult(result);
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'zh' ? '输入您的收入信息' : 'Enter Your Income Information'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Annual Income */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '年收入' : 'Annual Income'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Filing Status */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '报税身份' : 'Filing Status'}
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="single">{locale === 'zh' ? '单身' : 'Single'}</option>
              <option value="married">{locale === 'zh' ? '已婚联合申报' : 'Married Filing Jointly'}</option>
              <option value="head">{locale === 'zh' ? '户主' : 'Head of Household'}</option>
            </select>
          </div>

          {/* State */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '居住州（美国）' : 'State (US)'}
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Object.entries(STATE_NAMES).map(([code, name]) => (
                <option key={code} value={code}>
                  {locale === 'zh' ? name.zh : name.en} ({(FLAT_STATE_RATES[code] * 100).toFixed(2).replace(/\.?0+$/, '')}%)
                </option>
              ))}
              <option value="OTHER">{locale === 'zh' ? '其他州（自填税率）' : 'Other state (enter rate)'}</option>
            </select>
            {state === 'OTHER' && (
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={15}
                  step={0.1}
                  value={customStateRate}
                  onChange={(e) => setCustomStateRate(Number(e.target.value))}
                  className="w-full pr-10 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  aria-label={locale === 'zh' ? '州有效税率' : 'State effective tax rate'}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            )}
            <p className="text-xs text-gray-500">
              {locale === 'zh'
                ? '累进税率的州（如加州、纽约）请选「其他州」并填写你的实际税负率。'
                : 'For states with graduated rates (e.g. California, New York), choose "Other state" and enter your effective rate.'}
            </p>
          </div>

          {/* Age */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '年龄' : 'Age'}
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* 401k Contribution */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '401k 缴费金额' : '401(k) Contribution'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={k401Contribution}
                onChange={(e) => setk401Contribution(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '2026年上限：$24,500（50岁以上可多缴$8,000）' : '2026 limit: $24,500 (+$8,000 catch-up if 50+)'}
            </p>
          </div>

          {/* HSA Contribution */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? 'HSA 缴费金额' : 'HSA Contribution'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={hsaContribution}
                onChange={(e) => setHsaContribution(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '2026年上限：个人$4,400，家庭$8,750' : '2026 limit: $4,400 (individual), $8,750 (family)'}
            </p>
          </div>

          {/* Additional Options */}
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-3 md:max-w-md">
              <label className="block text-sm font-medium text-gray-700">
                {locale === 'zh' ? '可抵税的传统 IRA 缴款' : 'Deductible traditional IRA contribution'}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  min={0}
                  max={iraLimit}
                  value={iraContribution}
                  onChange={(e) => setIraContribution(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <p className="text-xs text-gray-500">
                {locale === 'zh'
                  ? `2026年上限 $${iraLimit.toLocaleString()}（50岁以上含 $${LIMIT_IRA_CATCH_UP.toLocaleString()} 追加额）。若你有雇主退休计划，抵扣额会随收入递减，请只填可抵扣的部分。`
                  : `2026 limit $${iraLimit.toLocaleString()} (includes $${LIMIT_IRA_CATCH_UP.toLocaleString()} catch-up if 50+). If you are covered by a workplace plan the deduction phases out with income — enter only the deductible part.`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBlind}
                  onChange={(e) => setIsBlind(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">
                  {locale === 'zh' ? '盲人或视障人士（额外标准扣除）' : 'Blind or visually impaired (additional standard deduction)'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={calculateTax}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {locale === 'zh' ? '计算应缴税款' : 'Calculate My Tax'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && result && (
        <div className="mt-8 space-y-6">
          {/* Income Summary */}
          <div className="rounded-xl p-6 shadow-card bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{locale === 'zh' ? '收入摘要' : 'Income Summary'}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">{locale === 'zh' ? '总收入' : 'Gross Income'}</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${result.grossIncome.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">{locale === 'zh' ? '应税收入' : 'Taxable Income'}</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${result.taxableIncome.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">{locale === 'zh' ? '标准扣除' : 'Standard Deduction'}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${result.standardDeduction.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Tax Breakdown */}
          <div className="rounded-xl p-6 shadow-card bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{locale === 'zh' ? '税款明细' : 'Tax Breakdown'}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{locale === 'zh' ? '联邦所得税' : 'Federal Income Tax'}</span>
                <span className="font-semibold text-gray-900">
                  ${result.federalTax.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{locale === 'zh' ? '州所得税' : 'State Income Tax'}</span>
                <span className="font-semibold text-gray-900">
                  ${result.stateTax.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{locale === 'zh' ? 'FICA（社保税 + 医疗税）' : 'FICA (Social Security + Medicare)'}</span>
                <span className="font-semibold text-gray-900">
                  ${result.ficaTax.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                <span className="font-semibold text-red-800">{locale === 'zh' ? '总税款' : 'Total Tax'}</span>
                <span className="font-bold text-red-600">
                  ${result.totalTax.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Take Home Pay */}
          <div className="rounded-xl p-6 shadow-card bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{locale === 'zh' ? '实际到手收入' : 'Take-Home Pay'}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '每周' : 'Per Week'}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${result.perWeek.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '每月' : 'Per Month'}</p>
                <p className="text-3xl font-bold text-green-600">
                  ${result.perMonth.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '每年' : 'Per Year'}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${result.takeHome.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm text-amber-800">
                {locale === 'zh'
                  ? `有效税率约 ${result.effectiveRate}%，联邦边际税率 ${result.marginalRate}%。实际税率因个人情况而异。`
                  : `Effective rate ${result.effectiveRate}%, federal marginal rate ${result.marginalRate}%. Actual rates vary based on individual circumstances.`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
