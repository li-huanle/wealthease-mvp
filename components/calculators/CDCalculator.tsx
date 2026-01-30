'use client';

import { useState } from 'react';
import ResultCard from './ResultCard';

interface CDCalculatorProps {
  onCalculate?: (result: any) => void;
}

export default function CDCalculator({ onCalculate }: CDCalculatorProps) {
  const [locale, setLocale] = useState<'en' | 'zh'>('zh');

  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(12);
  const [compounding, setCompounding] = useState('monthly');

  const [showResults, setShowResults] = useState(false);

  const calculateCD = () => {
    // 年利率
    const annualRate = rate / 100;

    // 计算复利次数
    const compoundFrequency = compounding === 'daily' ? 365 :
                              compounding === 'monthly' ? 12 :
                              compounding === 'quarterly' ? 4 : 1;

    // 复利公式: A = P(1 + r/n)^(nt)
    const years = term / 12;
    const amount = principal * Math.pow(1 + annualRate / compoundFrequency, compoundFrequency * years);
    const interest = amount - principal;
    const apy = (Math.pow(1 + annualRate / compoundFrequency, compoundFrequency) - 1) * 100;

    // 计算每月收益（如果是每月派息）
    const monthlyInterest = compounding === 'monthly' ? interest / term : 0;

    // 计算不同存期的收益对比
    const terms = [3, 6, 12, 24, 36, 60];
    const comparison = terms.map(m => {
      const y = m / 12;
      const a = principal * Math.pow(1 + annualRate / compoundFrequency, compoundFrequency * y);
      return {
        term: m,
        amount: Math.round(a),
        interest: Math.round(a - principal)
      };
    });

    const result = {
      principal,
      rate,
      term,
      amount: Math.round(amount),
      interest: Math.round(interest),
      apy: apy.toFixed(2),
      monthlyInterest: Math.round(monthlyInterest),
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
          {locale === 'zh' ? '输入定期存款信息' : 'Enter CD Investment Information'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Principal */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '本金' : 'Principal'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {locale === 'zh' ? '¥' : '$'}
              </span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '最低存款要求通常为$500-$1,000' : 'Minimum deposit typically $500-$1,000'
            }
            </p>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '年利率 (APY)' : 'Annual Interest Rate (APY)'}
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full pr-8 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '当前市场利率约3-5%' : 'Current market rates ~3-5%'
            }
            </p>
          </div>

          {/* Term */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '存款期限（月）' : 'Term (months)'}
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="1">1 {locale === 'zh' ? '个月' : 'month'}</option>
              <option value="3">3 {locale === 'zh' ? '个月' : 'months'}</option>
              <option value="6">6 {locale === 'zh' ? '个月' : 'months'}</option>
              <option value="9">9 {locale === 'zh' ? '个月' : 'months'}</option>
              <option value="12">12 {locale === 'zh' ? '个月（1年）' : 'month (1 year)'}</option>
              <option value="18">18 {locale === 'zh' ? '个月' : 'months'}</option>
              <option value="24">24 {locale === 'zh' ? '个月（2年）' : 'months (2 years)'}</option>
              <option value="36">36 {locale === 'zh' ? '个月（3年）' : 'months (3 years)'}</option>
              <option value="48">48 {locale === 'zh' ? '个月（4年）' : 'months (4 years)'}</option>
              <option value="60">60 {locale === 'zh' ? '个月（5年）' : 'months (5 years)'}</option>
            </select>
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '长期存款通常利率更高' : 'Longer terms typically offer higher rates'
            }
            </p>
          </div>

          {/* Compounding */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '复利方式' : 'Compounding Frequency'}
            </label>
            <select
              value={compounding}
              onChange={(e) => setCompounding(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="daily">{locale === 'zh' ? '每日复利' : 'Daily'}</option>
              <option value="monthly">{locale === 'zh' ? '每月复利' : 'Monthly'}</option>
              <option value="quarterly">{locale === 'zh' ? '每季度复利' : 'Quarterly'}</option>
              <option value="annually">{locale === 'zh' ? '每年复利' : 'Annually'}</option>
            </select>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={calculateCD}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {locale === 'zh' ? '计算定期存款收益' : 'Calculate CD Returns'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-8 space-y-6">
          {/* Main Result */}
          <ResultCard title={locale === 'zh' ? '存款收益' : 'Investment Returns'}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600 mb-1">{locale === 'zh' ? '到期本息' : 'Maturity Amount'}</p>
                <p className="text-3xl font-bold text-blue-600">
                  {locale === 'zh' ? '¥' : '$'}{Math.round(principal * 1.12).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '利息收入' : 'Interest Earned'}</p>
                <p className="text-2xl font-bold text-green-600">
                  +{locale === 'zh' ? '¥' : '$'}{Math.round(principal * 0.12).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <p className="text-sm text-amber-600 mb-1">APY</p>
                <p className="text-2xl font-bold text-amber-600">{(rate + 0.5).toFixed(2)}%</p>
              </div>
            </div>
          </ResultCard>

          {/* Comparison Table */}
          <ResultCard title={locale === 'zh' ? '不同存期收益对比' : 'Returns by Term Comparison'}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '存期' : 'Term'}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '到期本息' : 'Maturity'}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '利息收入' : 'Interest'}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">APY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[3, 6, 12, 24, 36, 60].map(m => {
                    const y = m / 12;
                    const apy = rate + (m >= 24 ? 0.5 : m >= 12 ? 0.25 : 0);
                    const amount = Math.round(principal * (1 + apy / 100 * y));
                    const interest = amount - principal;
                    const isSelected = m === term;
                    return (
                      <tr key={m} className={isSelected ? 'bg-primary-50' : ''}>
                        <td className="px-4 py-3">
                          {m >= 12 ? `${m/12}${locale === 'zh' ? '年' : 'yr'}` : `${m}${locale === 'zh' ? '个月' : 'mo'}`}
                          {isSelected && <span className="ml-2 text-primary-600">✓</span>}
                        </td>
                        <td className="px-4 py-3 font-medium">{locale === 'zh' ? '¥' : '$'}{amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-green-600">+{locale === 'zh' ? '¥' : '$'}{interest.toLocaleString()}</td>
                        <td className="px-4 py-3">{apy.toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ResultCard>

          {/* Tips */}
          <ResultCard title={locale === 'zh' ? '定期存款小贴士' : 'CD Investment Tips'}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <p className="font-semibold text-amber-800 mb-1">{locale === 'zh' ? '阶梯存款法' : 'Laddering Strategy'}</p>
                <p className="text-sm text-amber-700">
                  {locale === 'zh'
                    ? '将资金分成几份，分别存不同期限。既有高收益，又保持流动性。'
                    : 'Split funds across different terms. Higher returns + better liquidity.'
                  }
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-semibold text-blue-800 mb-1">{locale === 'zh' ? '联邦存款保险' : 'FDIC Insurance'}</p>
                <p className="text-sm text-blue-700">
                  {locale === 'zh'
                    ? '每个银行最高$250,000受FDIC保障。选择有FDIC标志的银行。'
                    : 'Up to $250,000 per bank is FDIC insured. Choose FDIC-member banks.'
                  }
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="font-semibold text-green-800 mb-1">{locale === 'zh' ? '提前支取惩罚' : 'Early Withdrawal Penalty'}</p>
                <p className="text-sm text-green-700">
                  {locale === 'zh'
                    ? '提前取出通常损失部分利息。注意最低持有期限要求。'
                    : 'Early withdrawal typically loses interest. Check the minimum hold period.'
                  }
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="font-semibold text-purple-800 mb-1">{locale === 'zh' ? '利率走势' : 'Rate Outlook'}</p>
                <p className="text-sm text-purple-700">
                  {locale === 'zh'
                    ? '利率下降期可选长期锁定。利率上升期可选短期滚动。'
                    : 'Lock long terms in falling rate environments. Roll short in rising rates.'
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
