'use client';

import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import ExpertTips from '@/components/calculators/ExpertTips';
import {Target, Calculator, TrendingUp, Shield} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CalculationResult {
  totalMonths: number;
  totalYears: number;
  totalContributions: number;
  totalInterest: number;
  endBalance: number;
  reachedGoal: boolean;
  shortfall: number;
  recommendedMonthly: number;
  balanceData: number[];
  labels: string[];
}

export default function SavingsGoalCalculator() {
  const t = useTranslations('calculator.savingsGoal');
  const currency = useTranslations('common.currency');
  const yearsSuffix = useLocale() === 'zh' ? ' 年' : ' yrs';

  const [goalAmount, setGoalAmount] = useState<number>(50000);
  const [currentSavings, setCurrentSavings] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [timeline, setTimeline] = useState<number>(5);
  const [annualReturn, setAnnualReturn] = useState<number>(5);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateGoal = () => {
    const monthlyRate = annualReturn / 100 / 12;
    const targetMonths = timeline * 12;

    let balance = currentSavings;
    const balanceData: number[] = [currentSavings];
    const labels: string[] = ['0'];

    let monthsToReach = 0;
    let reached = false;

    for (let month = 1; month <= targetMonths; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      balanceData.push(balance);

      if (month % 12 === 0) {
        labels.push(`${month / 12}年`);
      } else {
        labels.push(`${month}月`);
      }

      if (!reached && balance >= goalAmount) {
        monthsToReach = month;
        reached = true;
      }
    }

    const totalContributions = monthlyContribution * targetMonths;
    const totalInterest = balance - currentSavings - totalContributions;
    const endBalance = balance;

    let recommendedMonthly = monthlyContribution;
    if (!reached) {
      const n = targetMonths;
      const fv = goalAmount;
      const pv = currentSavings;
      recommendedMonthly = (fv - pv * Math.pow(1 + monthlyRate, n)) / ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
    }

    setResult({
      totalMonths: monthsToReach || targetMonths,
      totalYears: (monthsToReach || targetMonths) / 12,
      totalContributions,
      totalInterest,
      endBalance,
      reachedGoal: reached,
      shortfall: Math.max(0, goalAmount - endBalance),
      recommendedMonthly,
      balanceData,
      labels,
    });
  };

  const handleReset = () => {
    setGoalAmount(50000);
    setCurrentSavings(10000);
    setMonthlyContribution(500);
    setTimeline(5);
    setAnnualReturn(5);
    setResult(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(currency('locale'), {
      style: 'currency',
      currency: currency('code'),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = result ? {
    labels: result.labels,
    datasets: [
      {
        label: t('results.savingsGrowth'),
        data: result.balanceData,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: t('results.goal'),
        data: Array(result.balanceData.length).fill(goalAmount),
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('results.chartTitle'),
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  const expertTips = [
    {
      icon: 'calculator' as const,
      title: currency('code') === 'CNY' ? '设定明确目标' : 'Set Clear Goals',
      content: currency('code') === 'CNY'
        ? '明确的目标金额和时间表有助于保持储蓄动力。将大目标分解为小里程碑，更容易实现。'
        : 'Clear goals and timelines help maintain savings motivation. Break big goals into smaller milestones for easier achievement.'
    },
    {
      icon: 'trending' as const,
      title: currency('code') === 'CNY' ? '自动转账' : 'Automatic Transfers',
      content: currency('code') === 'CNY'
        ? '设置自动从工资转入储蓄账户，确保储蓄成为优先事项而非剩余选项。'
        : 'Set up automatic transfers from your paycheck to ensure saving is a priority, not an afterthought.'
    },
    {
      icon: 'calculator' as const,
      title: currency('code') === 'CNY' ? '逐步增加' : 'Gradual Increases',
      content: currency('code') === 'CNY'
        ? '随着收入增长，逐步增加每月储蓄额。每次加薪或奖金时，考虑提高储蓄比例。'
        : 'As your income grows, gradually increase your monthly savings. Consider raising your savings rate with each raise or bonus.'
    },
    {
      icon: 'shield' as const,
      title: currency('code') === 'CNY' ? '选择合适账户' : 'Choose Right Account',
      content: currency('code') === 'CNY'
        ? '选择高收益储蓄账户或低风险投资产品，让您的储蓄获得更好的回报。'
        : 'Choose high-yield savings accounts or low-risk investment products to help your savings grow faster.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-gray-100">
            <div className="space-y-6">
              <CalculatorInput
                label={t('form.goalAmount')}
                value={goalAmount}
                onChange={setGoalAmount}
                min={0}
                max={50000000}
                step={1000}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '您希望达到的储蓄目标金额'
                  : 'The total amount you want to save'}
              />

              <CalculatorInput
                label={t('form.currentSavings')}
                value={currentSavings}
                onChange={setCurrentSavings}
                min={0}
                max={1000000}
                step={1000}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '目前已经储蓄的金额'
                  : 'Amount you have already saved'}
              />

              <CalculatorInput
                label={t('form.monthlyContribution')}
                value={monthlyContribution}
                onChange={setMonthlyContribution}
                min={0}
                max={50000}
                step={50}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '每月计划存入的金额'
                  : 'Amount you plan to save each month'}
              />

              <CalculatorInput
                label={t('form.timeline')}
                value={timeline}
                onChange={setTimeline}
                min={1}
                max={50}
                step={1}
                suffix={yearsSuffix}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '希望达到目标的时间长度（年）'
                  : 'Time frame to reach your goal (in years)'}
              />

              <CalculatorInput
                label={t('form.annualReturn')}
                value={annualReturn}
                onChange={setAnnualReturn}
                min={0}
                max={20}
                step={0.1}
                suffix="%"
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '储蓄账户或投资的预期年化收益率'
                  : 'Expected annual return on your savings or investments'}
              />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateGoal}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-lg group"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  {t('form.calculate')}
                </button>
                <button
                  onClick={handleReset}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-200 flex items-center justify-center text-lg"
                >
                  {t('form.reset')}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* Status Banner */}
              <div className={`rounded-2xl p-6 shadow-card ${
                result.reachedGoal ? 'bg-success-50 border-2 border-success-200' : 'bg-warning-50 border-2 border-warning-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {result.reachedGoal ? '🎉' : '📈'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {result.reachedGoal ? t('results.goalReached') : t('results.goalNotReached')}
                    </h3>
                    <p className="text-gray-700">
                      {result.reachedGoal
                        ? `${t('results.reachedIn')} ${result.totalYears.toFixed(1)} ${t('results.years')}`
                        : `${t('results.shortfall')}: ${formatCurrency(result.shortfall)}`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <ResultCard
                  title={t('results.endBalance')}
                  value={formatCurrency(result.endBalance)}
                  highlight
                  tooltip={currency('code') === 'CNY' ? '期末累计金额' : 'Total amount at the end'}
                />
                <ResultCard
                  title={t('results.totalInterest')}
                  value={formatCurrency(result.totalInterest)}
                  tooltip={currency('code') === 'CNY' ? '投资产生的收益' : 'Earnings from interest'}
                />
                <ResultCard
                  title={t('results.totalContributions')}
                  value={formatCurrency(result.totalContributions)}
                  tooltip={currency('code') === 'CNY' ? '您投入的总金额' : 'Total amount you contributed'}
                />
              </div>

              {/* Recommendation */}
              {!result.reachedGoal && result.recommendedMonthly > monthlyContribution && (
                <div className="bg-accent-50 rounded-2xl p-6 border-2 border-accent-200 shadow-card">
                  <h3 className="text-lg font-bold text-accent-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    {t('results.recommendation')}
                  </h3>
                  <p className="text-accent-800 mb-4">
                    {t('results.recommendationMessage')}
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-accent-200">
                    <div className="text-sm text-accent-900 mb-1">
                      {t('results.recommendedMonthly')}
                    </div>
                    <div className="text-2xl font-bold text-accent-600">
                      {formatCurrency(result.recommendedMonthly)}
                    </div>
                    <div className="text-sm text-accent-700 mt-2">
                      ({t('results.increase')}: {formatCurrency(result.recommendedMonthly - monthlyContribution)}/{t('results.month')})
                    </div>
                  </div>
                </div>
              )}

              {/* Chart */}
              <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('results.chartTitle')}</h3>
                <div style={{ height: '400px' }}>
                  {chartData && <Line data={chartData} options={chartOptions} />}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expert Tips Sidebar */}
        <div className="lg:col-span-1">
          <ExpertTips tips={expertTips} locale={currency('locale')} />
        </div>
      </div>

      {/* Empty State */}
      {!result && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {currency('code') === 'CNY' ? '设定您的储蓄目标' : 'Set Your Savings Goal'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {currency('code') === 'CNY'
              ? '输入您的目标金额和储蓄计划，查看如何实现您的财务目标'
              : 'Enter your goal amount and savings plan to see how to achieve your financial goals'}
          </p>
        </div>
      )}
    </div>
  );
}
