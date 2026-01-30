'use client';

import { useState } from 'react';
import ResultCard from './ResultCard';

interface AnnuityCalculatorProps {
  onCalculate?: (result: any) => void;
}

export default function AnnuityCalculator({ onCalculate }: AnnuityCalculatorProps) {
  const [locale, setLocale] = useState<'en' | 'zh'>('zh');

  const [purchasePrice, setPurchasePrice] = useState(100000);
  const [currentAge, setCurrentAge] = useState(50);
  const [retirementAge, setRetirementAge] = useState(65);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [returnRate, setReturnRate] = useState(5);
  const [annuityType, setAnnuityType] = useState('immediate');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');

  const [showResults, setShowResults] = useState(false);

  const calculateAnnuity = () => {
    const yearsToPayout = retirementAge - currentAge;
    const payoutYears = lifeExpectancy - retirementAge;

    // 年金类型
    // immediate: 立即开始支付
    // deferred: 延期年金，从退休开始支付

    let monthlyPayment = 0;
    let totalPayout = 0;
    let totalContributions = purchasePrice;

    if (annuityType === 'immediate') {
      // 立即年金（简化计算）
      const rate = returnRate / 100 / 12;
      const months = payoutYears * 12;
      monthlyPayment = purchasePrice * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      totalPayout = monthlyPayment * months;
    } else {
      // 延期年金：先累积，后支付
      const accumulationRate = returnRate / 100;
      const payoutRate = 0.04; // 假设年金化利率

      // 累积阶段
      const futureValue = purchasePrice * Math.pow(1 + accumulationRate, yearsToPayout);

      // 支付阶段
      const rate = payoutRate / 12;
      const months = payoutYears * 12;
      monthlyPayment = futureValue * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      totalPayout = monthlyPayment * months;
    }

    const totalReturn = totalPayout - purchasePrice;
    const roi = (totalReturn / purchasePrice) * 100;

    const result = {
      purchasePrice,
      monthlyPayment: Math.round(monthlyPayment),
      totalPayout: Math.round(totalPayout),
      totalReturn: Math.round(totalReturn),
      roi: roi.toFixed(1),
      yearsToPayout,
      payoutYears,
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
          {locale === 'zh' ? '输入年金信息' : 'Enter Annuity Information'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Purchase Price */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '购买金额/一次性缴费' : 'Purchase Price / Single Premium'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {locale === 'zh' ? '¥' : '$'}
              </span>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Annuity Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '年金类型' : 'Annuity Type'}
            </label>
            <select
              value={annuityType}
              onChange={(e) => setAnnuityType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="immediate">{locale === 'zh' ? '立即年金' : 'Immediate Annuity'}</option>
              <option value="deferred">{locale === 'zh' ? '延期年金' : 'Deferred Annuity'}</option>
            </select>
          </div>

          {/* Current Age */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '当前年龄' : 'Current Age'}
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Retirement Age */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '开始领取年龄' : 'Start Payout Age'}
            </label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Life Expectancy */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '预期寿命' : 'Life Expectancy'}
            </label>
            <input
              type="number"
              value={lifeExpectancy}
              onChange={(e) => setLifeExpectancy(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Return Rate */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '预期年化收益率' : 'Expected Annual Return'}
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full pr-8 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={calculateAnnuity}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {locale === 'zh' ? '计算年金收入' : 'Calculate Annuity Income'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-8 space-y-6">
          {/* Main Result */}
          <ResultCard title={locale === 'zh' ? '年金收入估算' : 'Annuity Income Estimate'}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600 mb-1">{locale === 'zh' ? '月收入' : 'Monthly Income'}</p>
                <p className="text-3xl font-bold text-blue-600">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(purchasePrice / 120).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '总投入' : 'Total Investment'}</p>
                <p className="text-2xl font-bold text-green-600">
                  {locale === 'zh' ? '¥' : '$'}{purchasePrice.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <p className="text-sm text-amber-600 mb-1">{locale === 'zh' ? '预期总回报' : 'Expected Total Return'}</p>
                <p className="text-2xl font-bold text-amber-600">
                  +{locale === 'zh' ? '¥' : '$'}{Math.round(purchasePrice * 0.5).toLocaleString()}
                </p>
              </div>
            </div>
          </ResultCard>

          {/* Payout Timeline */}
          <ResultCard title={locale === 'zh' ? '领取时间表' : 'Payout Timeline'}>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-500">{locale === 'zh' ? '当前' : 'Now'}</div>
                <div className="flex-1 h-8 bg-gray-200 rounded flex items-center px-3">
                  <span className="text-sm font-medium">{locale === 'zh' ? '已投入' : 'Invested'}: {locale === 'zh' ? '¥' : '$'}{purchasePrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-500">{retirementAge}{locale === 'zh' ? '岁' : ''}</div>
                <div className="flex-1 h-8 bg-primary-200 rounded flex items-center px-3">
                  <span className="text-sm font-medium text-primary-800">
                    {locale === 'zh' ? '开始每月领取' : 'Start monthly payments'}: {locale === 'zh' ? '¥' : '$'}{Math.round(purchasePrice / 120).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-500">{lifeExpectancy}{locale === 'zh' ? '岁' : ''}</div>
                <div className="flex-1 h-8 bg-green-200 rounded flex items-center px-3">
                  <span className="text-sm font-medium text-green-800">
                    {locale === 'zh' ? '总领取' : 'Total received'}: {locale === 'zh' ? '¥' : '$'}{Math.round(purchasePrice * 1.5).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </ResultCard>

          {/* Types Explanation */}
          <ResultCard title={locale === 'zh' ? '年金类型说明' : 'Annuity Types Explained'}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-semibold text-blue-800 mb-2">{locale === 'zh' ? '立即年金' : 'Immediate Annuity'}</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {locale === 'zh' ? '缴费后立即开始领取' : 'Payments start immediately after purchase'}</li>
                  <li>• {locale === 'zh' ? '适合已退休人员' : 'Ideal for those already retired'}</li>
                  <li>• {locale === 'zh' ? '固定月收入保障' : 'Fixed monthly income guarantee'}</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="font-semibold text-green-800 mb-2">{locale === 'zh' ? '延期年金' : 'Deferred Annuity'}</p>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• {locale === 'zh' ? '退休后开始领取' : 'Payments start at retirement'}</li>
                  <li>• {locale === 'zh' ? '可享受税收优惠' : 'Tax-deferred growth'}</li>
                  <li>• {locale === 'zh' ? '适合储蓄阶段' : 'Good for accumulation phase'}</li>
                </ul>
              </div>
            </div>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
