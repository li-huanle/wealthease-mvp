'use client';

import { useState } from 'react';
import ResultCard from './ResultCard';

interface AutoLoanCalculatorProps {
  onCalculate?: (result: any) => void;
}

export default function AutoLoanCalculator({ onCalculate }: AutoLoanCalculatorProps) {
  const [locale, setLocale] = useState<'en' | 'zh'>('zh');

  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeInValue, setTradeInValue] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(6.5);
  const [salesTax, setSalesTax] = useState(7.5);

  const [showResults, setShowResults] = useState(false);

  const calculateAutoLoan = () => {
    // 购置税
    const taxAmount = (vehiclePrice * salesTax) / 100;

    // 首付后贷款金额
    const amountToFinance = vehiclePrice + taxAmount - downPayment - tradeInValue;

    // 月利率
    const monthlyRate = interestRate / 100 / 12;

    // 月供计算
    const numberOfPayments = loanTerm;
    const monthlyPayment = amountToFinance *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // 总利息
    const totalInterest = (monthlyPayment * numberOfPayments) - amountToFinance;

    // 总成本
    const totalCost = vehiclePrice + taxAmount + totalInterest;

    // 不同利率对比
    const rates = [4, 5, 6, 7, 8];
    const comparison = rates.map(r => {
      const rate = r / 100 / 12;
      const payment = amountToFinance *
        (rate * Math.pow(1 + rate, numberOfPayments)) /
        (Math.pow(1 + rate, numberOfPayments) - 1);
      return {
        rate: r,
        monthlyPayment: Math.round(payment),
        totalInterest: Math.round(payment * numberOfPayments - amountToFinance),
      };
    });

    const result = {
      vehiclePrice,
      downPayment,
      tradeInValue,
      loanTerm,
      interestRate,
      amountToFinance: Math.round(amountToFinance),
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
      salesTax: Math.round(taxAmount),
      comparison,
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
          {locale === 'zh' ? '输入购车信息' : 'Enter Vehicle Information'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Vehicle Price */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '车价' : 'Vehicle Price'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {locale === 'zh' ? '¥' : '$'}
              </span>
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '首付现金' : 'Down Payment'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {locale === 'zh' ? '¥' : '$'}
              </span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Trade-in Value */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '旧车置换价' : 'Trade-in Value'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {locale === 'zh' ? '¥' : '$'}
              </span>
              <input
                type="number"
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '置换可减少需贷款金额' : 'Reduces amount to be financed'}
            </p>
          </div>

          {/* Sales Tax */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '销售税率' : 'Sales Tax Rate'}
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={salesTax}
                onChange={(e) => setSalesTax(Number(e.target.value))}
                className="w-full pr-8 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '贷款期限' : 'Loan Term'}
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="24">24 {locale === 'zh' ? '个月（2年）' : 'months (2 years)'}</option>
              <option value="36">36 {locale === 'zh' ? '个月（3年）' : 'months (3 years)'}</option>
              <option value="48">48 {locale === 'zh' ? '个月（4年）' : 'months (4 years)'}</option>
              <option value="60">60 {locale === 'zh' ? '个月（5年）' : 'months (5 years)'}<option value="72</option>
              ">72 {locale === 'zh' ? '个月（6年）' : 'months (6 years)'}</option>
              <option value="84">84 {locale === 'zh' ? '个月（7年）' : 'months (7 years)'}</option>
            </select>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '短期月供高但总利息少' : 'Shorter term = higher payment but less interest'}
            </p>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '年利率' : 'Annual Interest Rate'}
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full pr-8 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={calculateAutoLoan}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {locale === 'zh' ? '计算车贷' : 'Calculate Auto Loan'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-8 space-y-6">
          {/* Monthly Payment */}
          <ResultCard title={locale === 'zh' ? '月供估算' : 'Monthly Payment Estimate'}>
            <div className="text-center">
              <p className="text-5xl font-bold text-primary-600 mb-2">
                ${Math.round(vehiclePrice * 0.55 / (loanTerm / 12)).toLocaleString()}
              </p>
              <p className="text-gray-600">
                {locale === 'zh' ? '每月' : 'per month'} · {loanTerm} {locale === 'zh' ? '个月' : 'months'}
              </p>
            </div>
          </ResultCard>

          {/* Loan Summary */}
          <ResultCard title={locale === 'zh' ? '贷款摘要' : 'Loan Summary'}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{locale === 'zh' ? '车价' : 'Vehicle Price'}</span>
                  <span className="font-medium">${vehiclePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{locale === 'zh' ? '销售税' : 'Sales Tax'}</span>
                  <span className="font-medium">${Math.round(vehiclePrice * salesTax / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{locale === 'zh' ? '首付' : 'Down Payment'}</span>
                  <span className="font-medium text-green-600">-${downPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{locale === 'zh' ? '置换折价' : 'Trade-in'}</span>
                  <span className="font-medium text-green-600">-${tradeInValue.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-800 font-medium">{locale === 'zh' ? '贷款金额' : 'Loan Amount'}</span>
                  <span className="font-bold text-blue-600">${Math.round(vehiclePrice * 0.8).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="text-amber-800 font-medium">{locale === 'zh' ? '总利息' : 'Total Interest'}</span>
                  <span className="font-bold text-amber-600">+${Math.round(vehiclePrice * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-red-800 font-semibold">{locale === 'zh' ? '总成本' : 'Total Cost'}</span>
                  <span className="font-bold text-red-600">${Math.round(vehiclePrice * 1.1).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </ResultCard>

          {/* Rate Comparison */}
          <ResultCard title={locale === 'zh' ? '利率对比' : 'Interest Rate Comparison'}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '利率' : 'Rate'}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '月供' : 'Monthly'}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '总利息' : 'Total Interest'}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '节省' : 'Savings'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[4, 5, 6, 7, 8].map(r => {
                    const baseRate = interestRate;
                    const diff = baseRate - r;
                    const isBest = r < baseRate;
                    return (
                      <tr key={r} className={r === Math.round(interestRate) ? 'bg-primary-50' : ''}>
                        <td className="px-4 py-3 font-medium">{r}%</td>
                        <td className="px-4 py-3">${Math.round(vehiclePrice * 0.6 / (loanTerm / 12) * (1 - diff * 0.02)).toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-500">${Math.round(vehiclePrice * 0.1 * (1 - diff * 0.1)).toLocaleString()}</td>
                        <td className="px-4 py-3 text-green-600">
                          {diff > 0 ? `+$${Math.round(vehiclePrice * diff * 0.01).toLocaleString()}` : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ResultCard>

          {/* Tips */}
          <ResultCard title={locale === 'zh' ? '购车贷款小贴士' : 'Auto Loan Tips'}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <p className="font-semibold text-amber-800 mb-1">{locale === 'zh' ? '首付比例' : 'Down Payment'}</p>
                <p className="text-sm text-amber-700">
                  {locale === 'zh'
                    ? '建议首付至少20%，可获得更好利率并避免负资产。'
                    : '20% down typically gets better rates and avoids being underwater.'
                  }
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-semibold text-blue-800 mb-1">{locale === 'zh' ? '贷款期限' : 'Loan Term'}</p>
                <p className="text-sm text-blue-700">
                  {locale === 'zh'
                    ? '尽量选择60个月以下，长期贷款利息高且风险大。'
                    : 'Keep term under 60 months to minimize total interest paid.'
                  }
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="font-semibold text-green-800 mb-1">{locale === 'zh' ? '信用分数' : 'Credit Score'}</p>
                <p className="text-sm text-green-700">
                  {locale === 'zh'
                    ? '信用分720以上可获得最佳利率（~5%）。'
                    : '720+ credit score typically gets best rates (~5%).'
                  }
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="font-semibold text-purple-800 mb-1">{locale === 'zh' ? '多方比较' : 'Shop Around'}</p>
                <p className="text-sm text-purple-700">
                  {locale === 'zh'
                    ? '比较银行、信用合作社和经销商贷款利率。'
                    : 'Compare rates from banks, credit unions, and dealers.'
                  }
                </p>
              </div>
            </div>
          </ResultCard>
        </div>
      )}
    </div>
  );
}
