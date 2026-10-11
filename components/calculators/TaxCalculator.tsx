'use client';

import { useState } from 'react';
import { useLocale as useSiteLocale } from 'next-intl';
import { FilingStatus, SS_WAGE_BASE, STANDARD_DEDUCTION, federalIncomeTax } from '@/lib/finance';

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
  const standardDeduction = STANDARD_DEDUCTION[status];
  const [state, setState] = useState('CA');
  const [age, setAge] = useState(30);
  const [isBlind, setIsBlind] = useState(false);
  const [dependentCount, setDependentCount] = useState(0);
  const [k401Contribution, setk401Contribution] = useState(0);
  const [hsaContribution, setHsaContribution] = useState(0);
  const [hasTraditionalIRA, setHasTraditionalIRA] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<TaxResult | null>(null);

  const calculateTax = () => {
    // 2026 federal brackets and standard deduction by filing status (see lib/finance.ts)

    // Above-the-line deductions
    const deductions = k401Contribution + hsaContribution + (hasTraditionalIRA ? Math.min(7500, income * 0.1) : 0);
    const taxableIncome = Math.max(0, income - standardDeduction - deductions);

    const { tax: federalTax, marginalRate } = federalIncomeTax(taxableIncome, status);

    // 州税（简化）
    const stateTaxRates: Record<string, number> = {
      'CA': 0.093, 'NY': 0.085, 'TX': 0, 'FL': 0, 'WA': 0,
      'IL': 0.0495, 'PA': 0.0307, 'OH': 0.0399, 'MI': 0.0425,
    };
    const stateRate = stateTaxRates[state] || 0.05;
    const stateTax = taxableIncome * stateRate;

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
              <option value="CA">{locale === 'zh' ? '加利福尼亚' : 'California'} (9.3%)</option>
              <option value="NY">{locale === 'zh' ? '纽约' : 'New York'} (8.5%)</option>
              <option value="TX">{locale === 'zh' ? '德克萨斯' : 'Texas'} (0%)</option>
              <option value="FL">{locale === 'zh' ? '佛罗里达' : 'Florida'} (0%)</option>
              <option value="WA">{locale === 'zh' ? '华盛顿' : 'Washington'} (0%)</option>
              <option value="IL">{locale === 'zh' ? '伊利诺伊' : 'Illinois'} (4.95%)</option>
              <option value="PA">{locale === 'zh' ? '宾夕法尼亚' : 'Pennsylvania'} (3.07%)</option>
              <option value="OH">{locale === 'zh' ? '俄亥俄' : 'Ohio'} (3.99%)</option>
              <option value="MI">{locale === 'zh' ? '密歇根' : 'Michigan'} (4.25%)</option>
            </select>
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
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTraditionalIRA}
                  onChange={(e) => setHasTraditionalIRA(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">
                  {locale === 'zh' ? '有传统IRA缴费（可抵税）' : 'Traditional IRA contribution (tax-deductible)'}
                </span>
              </label>
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
                  {locale === 'zh' ? '盲人或视障人士（额外扣除）' : 'Blind or visually impaired (additional deduction)'}
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
