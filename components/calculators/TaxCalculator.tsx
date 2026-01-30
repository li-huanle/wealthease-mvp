'use client';

import { useState } from 'react';
import ResultCard from './ResultCard';

interface TaxCalculatorProps {
  onCalculate?: (result: any) => void;
}

export default function TaxCalculator({ onCalculate }: TaxCalculatorProps) {
  const [locale, setLocale] = useState<'en' | 'zh'>('zh');

  const [income, setIncome] = useState(100000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [state, setState] = useState('CA');
  const [age, setAge] = useState(30);
  const [isBlind, setIsBlind] = useState(false);
  const [dependentCount, setDependentCount] = useState(0);
  const [401kContribution, set401kContribution] = useState(0);
  const [hsaContribution, setHsaContribution] = useState(0);
  const [hasTraditionalIRA, setHasTraditionalIRA] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const calculateTax = () => {
    // 2024 联邦税级（单身）
    const federalBrackets = [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ];

    // 标准扣除额 2024
    const standardDeduction = filingStatus === 'single' ? 14600 :
                              filingStatus === 'married' ? 29200 :
                              filingStatus === 'head' ? 21900 : 14600;

    // 调整后收入
    const deductions = 401kContribution + hsaContribution + (hasTraditionalIRA ? Math.min(7000, income * 0.1) : 0);
    const taxableIncome = Math.max(0, income - standardDeduction - deductions);

    // 计算联邦税
    let federalTax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of federalBrackets) {
      if (remainingIncome <= 0) break;
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      federalTax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    // 州税（简化）
    const stateTaxRates: Record<string, number> = {
      'CA': 0.093, 'NY': 0.085, 'TX': 0, 'FL': 0, 'WA': 0,
      'IL': 0.0495, 'PA': 0.0307, 'OH': 0.0399, 'MI': 0.0425,
    };
    const stateRate = stateTaxRates[state] || 0.05;
    const stateTax = taxableIncome * stateRate;

    // FICA（社保+医保）
    const socialSecurityTax = Math.min(income * 0.062, 168600 * 0.062);
    const medicareTax = income * 0.0145;
    const ficaTax = socialSecurityTax + medicareTax;

    const totalTax = federalTax + stateTax + ficaTax;
    const effectiveRate = (totalTax / income) * 100;
    const marginalRate = federalBrackets.find(b => taxableIncome > b.min && taxableIncome <= b.max)?.rate || 0.10;

    const result = {
      grossIncome: income,
      taxableIncome,
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
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLocale('zh')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${locale === 'zh' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
          >
            人民币 (¥)
          </button>
          <button
            onClick={() => setLocale('en')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${locale === 'en' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
          >
            美元 ($)
          </button>
        </div>
      </div>

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
                {locale === 'zh' ? '¥' : '$'}
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
                {locale === 'zh' ? '¥' : '$'}
              </span>
              <input
                type="number"
                value={401kContribution}
                onChange={(e) => set401kContribution(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '2024年上限：$23,000（50+可多缴$7,500）' : '2024 limit: $23,000 (+$7,500 catch-up if 50+)'}
            </p>
          </div>

          {/* HSA Contribution */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? 'HSA 缴费金额' : 'HSA Contribution'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {locale === 'zh' ? '¥' : '$'}
              </span>
              <input
                type="number"
                value={hsaContribution}
                onChange={(e) => setHsaContribution(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '2024年上限：个人$4,150，家庭$8,300' : '2024 limit: $4,150 (individual), $8,300 (family)'}
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
      {showResults && (
        <div className="mt-8 space-y-6">
          {/* Income Summary */}
          <ResultCard title={locale === 'zh' ? '收入摘要' : 'Income Summary'}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">{locale === 'zh' ? '总收入' : 'Gross Income'}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {locale === 'zh' ? '¥' : '$'}{income.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">{locale === 'zh' ? '应税收入' : 'Taxable Income'}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {locale === 'zh' ? '¥' : '$'}{(income - 401kContribution - hsaContribution - 14600).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">{locale === 'zh' ? '标准扣除' : 'Standard Deduction'}</p>
                <p className="text-2xl font-bold text-green-600">
                  {locale === 'zh' ? '¥' : '$'}14,600
                </p>
              </div>
            </div>
          </ResultCard>

          {/* Tax Breakdown */}
          <ResultCard title={locale === 'zh' ? '税款明细' : 'Tax Breakdown'}>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{locale === 'zh' ? '联邦所得税' : 'Federal Income Tax'}</span>
                <span className="font-semibold text-gray-900">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(income * 0.18).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{locale === 'zh' ? '州所得税' : 'State Income Tax'}</span>
                <span className="font-semibold text-gray-900">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(income * 0.05).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">FICA (社保+医保)</span>
                <span className="font-semibold text-gray-900">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(income * 0.0765).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                <span className="font-semibold text-red-800">{locale === 'zh' ? '总税款' : 'Total Tax'}</span>
                <span className="font-bold text-red-600">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(income * 0.30).toLocaleString()}
                </span>
              </div>
            </div>
          </ResultCard>

          {/* Take Home Pay */}
          <ResultCard title={locale === 'zh' ? '实际到手收入' : 'Take-Home Pay'}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '每周' : 'Per Week'}</p>
                <p className="text-2xl font-bold text-green-600">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(income * 0.70 / 52).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '每月' : 'Per Month'}</p>
                <p className="text-3xl font-bold text-green-600">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(income * 0.70 / 12).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '每年' : 'Per Year'}</p>
                <p className="text-2xl font-bold text-green-600">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(income * 0.70).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm text-amber-800">
                {locale === 'zh'
                  ? `有效税率约 ${(30).toFixed(1)}%，边际税率约 ${22}%。实际税率因个人情况而异。`
                  : `Effective rate ~${30}%, marginal rate ~${22}%. Actual rates vary based on individual circumstances.`
                }
              </p>
            </div>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
