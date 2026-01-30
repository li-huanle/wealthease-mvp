'use client';

import { useState, useEffect, useMemo } from 'react';
import ResultCard from './ResultCard';
import { Info } from 'lucide-react';

interface CreditScoreCalculatorProps {
  onCalculate?: (result: any) => void;
}

export default function CreditScoreCalculator({ onCalculate }: CreditScoreCalculatorProps) {
  const [paymentHistory, setPaymentHistory] = useState(95);
  const [creditUtilization, setCreditUtilization] = useState(30);
  const [creditHistoryLength, setCreditHistoryLength] = useState(5);
  const [creditMix, setCreditMix] = useState(3);
  const [newCredit, setNewCredit] = useState(2);

  const [showResults, setShowResults] = useState(false);

  const scoreRange = useMemo(() => {
    // 信用评分估算公式（基于FICO评分因素权重）
    let score = 0;

    // 付款历史占35%
    score += (paymentHistory / 100) * 350;

    // 信用利用率占30%
    if (creditUtilization <= 30) {
      score += 300 * (1 - creditUtilization / 60);
    } else {
      score += Math.max(0, 300 * (1 - creditUtilization / 100) * 0.5);
    }

    // 信用历史长度占15%
    score += (Math.min(creditHistoryLength, 15) / 15) * 150;

    // 信用组合占10%
    score += (Math.min(creditMix, 5) / 5) * 100;

    // 新信用占10%
    score += (Math.max(0, 5 - newCredit) / 5) * 100;

    // 添加一些随机波动使结果更真实
    const baseScore = Math.round(score);
    const minScore = Math.max(300, baseScore - 30);
    const maxScore = Math.min(850, baseScore + 30);

    return { minScore, maxScore, baseScore };
  }, [paymentHistory, creditUtilization, creditHistoryLength, creditMix, newCredit]);

  const getScoreGrade = (score: number) => {
    if (score >= 800) return { label: locale === 'zh' ? '优秀' : 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 740) return { label: locale === 'zh' ? '良好' : 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 670) return { label: locale === 'zh' ? '一般' : 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score >= 580) return { label: locale === 'zh' ? '较差' : 'Poor', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { label: locale === 'zh' ? '很差' : 'Very Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getFactorAdvice = () => {
    const factors = [];

    if (paymentHistory < 95) {
      factors.push({
        title: locale === 'zh' ? '付款历史' : 'Payment History',
        tip: locale === 'zh'
          ? '按时还款是提高信用分的最重要因素。设置自动还款避免逾期。'
          : 'On-time payments are the most important factor. Set up autopay.',
        impact: 'high'
      });
    }

    if (creditUtilization > 30) {
      factors.push({
        title: locale === 'zh' ? '信用利用率' : 'Credit Utilization',
        tip: locale === 'zh'
          ? '将利用率控制在30%以下，每降低10%都可能帮助提升分数。'
          : 'Keep utilization below 30%. Lower is better for your score.',
        impact: 'high'
      });
    }

    if (creditHistoryLength < 3) {
      factors.push({
        title: locale === 'zh' ? '信用历史长度' : 'Credit History Length',
        tip: locale === 'zh'
          ? '保持老账户长期活跃，不要轻易关闭旧信用卡。'
          : 'Keep old accounts open and active. Age matters.',
        impact: 'medium'
      });
    }

    if (creditMix < 3) {
      factors.push({
        title: locale === 'zh' ? '信用组合' : 'Credit Mix',
        tip: locale === 'zh'
          ? '多样化的信用类型（信用卡、分期贷款、房贷）有助于提升分数。'
          : 'Having diverse credit types can improve your score.',
        impact: 'medium'
      });
    }

    if (newCredit > 2) {
      factors.push({
        title: locale === 'zh' ? '新信用查询' : 'New Credit',
        tip: locale === 'zh'
          ? '近期过多的信用查询会降低分数。避免频繁申请新信用卡。'
          : 'Too many recent inquiries hurt your score. Apply sparingly.',
        impact: 'low'
      });
    }

    return factors;
  };

  const handleCalculate = () => {
    setShowResults(true);
    const result = {
      score: scoreRange.baseScore,
      range: `${scoreRange.minScore}-${scoreRange.maxScore}`,
      grade: getScoreGrade(scoreRange.baseScore).label,
      factors: getFactorAdvice()
    };
    onCalculate?.(result);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'zh' ? '输入您的信用信息' : 'Enter Your Credit Information'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment History */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '付款记录（按时还款比例）' : 'Payment History (% on-time)'}
              <span className="ml-2 text-xs text-gray-500">35%</span>
            </label>
            <input
              type="range"
              min="50"
              max="100"
              step="1"
              value={paymentHistory}
              onChange={(e) => setPaymentHistory(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>50%</span>
              <span className="font-semibold text-primary-600">{paymentHistory}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Credit Utilization */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '信用利用率（已用/总额）' : 'Credit Utilization (%)'}
              <span className="ml-2 text-xs text-gray-500">30%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={creditUtilization}
              onChange={(e) => setCreditUtilization(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0%</span>
              <span className={`font-semibold ${creditUtilization > 30 ? 'text-red-600' : 'text-green-600'}`}>
                {creditUtilization}%
              </span>
              <span>100%</span>
            </div>
          </div>

          {/* Credit History Length */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '信用历史长度（年）' : 'Credit History Length (years)'}
              <span className="ml-2 text-xs text-gray-500">15%</span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={creditHistoryLength}
              onChange={(e) => setCreditHistoryLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0年</span>
              <span className="font-semibold text-primary-600">{creditHistoryLength} {locale === 'zh' ? '年' : 'years'}</span>
              <span>20年</span>
            </div>
          </div>

          {/* Credit Mix */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '信用账户类型数量' : 'Number of Credit Types'}
              <span className="ml-2 text-xs text-gray-500">10%</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={creditMix}
              onChange={(e) => setCreditMix(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1</span>
              <span className="font-semibold text-primary-600">{creditMix}</span>
              <span>5+</span>
            </div>
          </div>

          {/* New Credit */}
          <div className="space-y-3 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'zh' ? '近期新信用查询次数（过去2年）' : 'Recent Credit Inquiries (past 2 years)'}
              <span className="ml-2 text-xs text-gray-500">10%</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={newCredit}
              onChange={(e) => setNewCredit(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0</span>
              <span className={`font-semibold ${newCredit > 3 ? 'text-red-600' : 'text-green-600'}`}>
                {newCredit} {locale === 'zh' ? '次' : 'times'}
              </span>
              <span>10</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCalculate}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {locale === 'zh' ? '估算我的信用分' : 'Estimate My Credit Score'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Score Display */}
          <ResultCard>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                {locale === 'zh' ? '预估信用分范围' : 'Estimated Credit Score Range'}
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-5xl font-bold text-gray-400 line-through">
                  {scoreRange.minScore}
                </div>
                <div className="text-6xl font-bold text-primary-600">
                  {scoreRange.baseScore}
                </div>
                <div className="text-5xl font-bold text-gray-400 line-through">
                  {scoreRange.maxScore}
                </div>
              </div>
              <div className={`mt-4 inline-block px-4 py-2 rounded-full text-lg font-semibold ${getScoreGrade(scoreRange.baseScore).bg} ${getScoreGrade(scoreRange.baseScore).color}`}>
                {getScoreGrade(scoreRange.baseScore).label}
              </div>
            </div>
          </ResultCard>

          {/* Improvement Factors */}
          <ResultCard title={locale === 'zh' ? '提升信用的建议' : 'Tips to Improve Your Score'}>
            <div className="space-y-4">
              {getFactorAdvice().map((factor, index) => (
                <div key={index} className={`p-4 rounded-lg ${factor.impact === 'high' ? 'bg-red-50 border border-red-100' : 'bg-gray-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${factor.impact === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <p className="font-semibold text-gray-900">{factor.title}</p>
                      <p className="text-gray-600 text-sm mt-1">{factor.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ResultCard>

          {/* Info Note */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              {locale === 'zh'
                ? '此估算基于FICO评分模型，仅供参考。实际信用分由三大信用局（Equifax、Experian、TransUnion）根据更多因素计算。定期检查您的信用报告，确保信息准确。'
                : 'This estimate is based on the FICO model for reference only. Actual scores vary. Check your credit report regularly for accuracy.'
            }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
