'use client';

import { useState } from 'react';
import ResultCard from './ResultCard';

interface SocialSecurityCalculatorProps {
  onCalculate?: (result: any) => void;
}

export default function SocialSecurityCalculator({ onCalculate }: SocialSecurityCalculatorProps) {
  const [locale, setLocale] = useState<'en' | 'zh'>('zh');

  const [currentAge, setCurrentAge] = useState(30);
  const [birthYear, setBirthYear] = useState(1994);
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [retirementAge, setRetirementAge] = useState(67);
  const [spouseAge, setSpouseAge] = useState(0);
  const [spouseBenefit, setSpouseBenefit] = useState(0);

  const [showResults, setShowResults] = useState(false);

  const calculateSocialSecurity = () => {
    // SSA 公式简化计算（基于2024年数据）
    const pia = calculatePIA(annualIncome, birthYear);

    // 根据领取年龄调整
    const adjustment = getBenefitAdjustment(retirementAge, 67);
    const monthlyBenefit = Math.round(pia * adjustment);

    // 终身总收益（假设活到90岁）
    const yearsCollecting = 90 - retirementAge;
    const lifetimeBenefit = monthlyBenefit * 12 * yearsCollecting;

    // 配偶福利
    let spouseMonthly = 0;
    if (spouseAge > 0 && spouseBenefit > 0) {
      const spousePIA = calculatePIA(spouseBenefit, birthYear);
      const spouseAdjustment = getBenefitAdjustment(Math.min(spouseAge, 67), 67);
      spouseMonthly = Math.round(Math.min(spousePIA * spouseAdjustment * 0.5, pia * adjustment * 0.5));
    }

    const result = {
      pia: Math.round(pia),
      monthlyBenefit,
      annualBenefit: monthlyBenefit * 12,
      lifetimeBenefit,
      retirementAge,
      fullRetirementAge: 67,
      spouseMonthly,
    };

    onCalculate?.(result);
    setShowResults(true);
  };

  const calculatePIA = (income: number, birthYear: number) => {
    // AIME 计算（简化的指数化收入）
    const indexingFactor = 1.0;
    const aime = Math.min(income * indexingFactor, 16800); // 2024上限

    // PIA 计算（基于三个阶梯）
    let pia = 0;

    if (aime <= 1174) {
      pia += aime * 0.90;
    } else if (aime <= 7078) {
      pia += 1174 * 0.90 + (aime - 1174) * 0.32;
    } else {
      pia += 1174 * 0.90 + (7078 - 1174) * 0.32 + (aime - 7078) * 0.15;
    }

    return Math.round(pia);
  };

  const getBenefitAdjustment = (claimAge: number, fra: number) => {
    if (claimAge >= fra) return 1.0;

    // 提前领取的减少比例
    const monthsEarly = (fra - claimAge) * 12;
    const reduction = monthsEarly * 0.0047; // 每提前1月减少约0.47%

    return Math.max(0.7, 1 - reduction);
  };

  const getEarlyAndLateFilingInfo = () => {
    return {
      earlyAge: 62,
      earlyReduction: 0.7,
      fullAge: 67,
      lateAge: 70,
      lateIncrease: 1.24, // 70岁领取增加24%
    };
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
          {locale === 'zh' ? '输入您的信息' : 'Enter Your Information'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Birth Year */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '出生年份' : 'Birth Year'}
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '1960年后出生满67岁才可全额退休' : 'Full retirement age is 67 for those born after 1960'}
            </p>
          </div>

          {/* Annual Income */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '当前年收入' : 'Current Annual Income'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Retirement Age */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '计划退休年龄' : 'Planned Retirement Age'}
            </label>
            <input
              type="number"
              min="62"
              max="70"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500">
              {locale === 'zh' ? '最早62岁，最晚70岁' : 'Earliest: 62, Latest: 70'}
            </p>
          </div>

          {/* Spouse Info */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '配偶福利（如有）' : 'Spouse Benefit (optional)'}
            </label>
            <input
              type="number"
              placeholder={locale === 'zh' ? '配偶月收入' : "Spouse's monthly benefit"}
              value={spouseBenefit || ''}
              onChange={(e) => setSpouseBenefit(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={calculateSocialSecurity}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {locale === 'zh' ? '计算社保金' : 'Calculate Social Security'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-8 space-y-6">
          {/* Main Result */}
          <ResultCard title={locale === 'zh' ? '社保金估算' : 'Social Security Estimate'}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600 mb-1">{locale === 'zh' ? '月收入' : 'Monthly Benefit'}</p>
                <p className="text-3xl font-bold text-blue-600">
                  ${Math.round(annualIncome * 0.35).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-green-600 mb-1">{locale === 'zh' ? '年收入' : 'Annual Benefit'}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${Math.round(annualIncome * 0.35 * 12).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <p className="text-sm text-amber-600 mb-1">{locale === 'zh' ? '90岁总领取' : 'Total by Age 90'}</p>
                <p className="text-2xl font-bold text-amber-600">
                  ${Math.round(annualIncome * 0.35 * 12 * (90 - retirementAge)).toLocaleString()}
                </p>
              </div>
            </div>
          </ResultCard>

          {/* Filing Age Impact */}
          <ResultCard title={locale === 'zh' ? '领取年龄影响' : 'Impact of Filing Age'}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '领取年龄' : 'Filing Age'}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '月收入' : 'Monthly'}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{locale === 'zh' ? '调整比例' : 'Adjustment'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-red-50">
                    <td className="px-4 py-3">62 {locale === 'zh' ? '岁（最早）' : '(Earliest)'}</td>
                    <td className="px-4 py-3 text-red-600">${Math.round(annualIncome * 0.35 * 0.7).toLocaleString()}</td>
                    <td className="px-4 py-3 text-red-600">-30%</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="px-4 py-3">65 {locale === 'zh' ? '岁' : ''}</td>
                    <td className="px-4 py-3 text-yellow-600">${Math.round(annualIncome * 0.35 * 0.86).toLocaleString()}</td>
                    <td className="px-4 py-3 text-yellow-600">-14%</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-4 py-3">67 {locale === 'zh' ? '岁（全额）' : '(Full Retirement)'}</td>
                    <td className="px-4 py-3 text-green-600">${Math.round(annualIncome * 0.35).toLocaleString()}</td>
                    <td className="px-4 py-3 text-green-600">100%</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="px-4 py-3">70 {locale === 'zh' ? '岁（最晚）' : '(Maximum)'}</td>
                    <td className="px-4 py-3 text-purple-600">${Math.round(annualIncome * 0.35 * 1.24).toLocaleString()}</td>
                    <td className="px-4 py-3 text-purple-600">+24%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ResultCard>

          {/* Tips */}
          <ResultCard title={locale === 'zh' ? '社保金小贴士' : 'Social Security Tips'}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <p className="font-semibold text-amber-800 mb-1">{locale === 'zh' ? '最大化策略' : 'Maximize Strategy'}</p>
                <p className="text-sm text-amber-700">
                  {locale === 'zh'
                    ? '延迟领取到70岁可使月收入增加24%，终身收益更高。'
                    : 'Delaying to 70 increases monthly benefit by 24% for life.'
                  }
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-semibold text-blue-800 mb-1">{locale === 'zh' ? '配偶福利' : 'Spousal Benefits'}</p>
                <p className="text-sm text-blue-700">
                  {locale === 'zh'
                    ? '配偶可领取您福利的50%，需年满62岁且您已申领。'
                    : 'Spouse may receive 50% of your benefit at age 62.'
                  }
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="font-semibold text-green-800 mb-1">{locale === 'zh' ? '离婚配偶' : 'Divorced Spouses'}</p>
                <p className="text-sm text-green-700">
                  {locale === 'zh'
                    ? '婚姻满10年可领取前任福利的50%，不影响对方福利。'
                    : '10+ year marriage may qualify for 50% of ex-spouse benefits.'
                  }
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="font-semibold text-purple-800 mb-1">{locale === 'zh' ? '收入测试' : 'Earnings Test'}</p>
                <p className="text-sm text-purple-700">
                  {locale === 'zh'
                    ? '2024年：未满全额退休年龄且年收入超过$22,320，每超$2扣$1社保金。'
                    : 'If working before full retirement, some benefits may be withheld.'
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
