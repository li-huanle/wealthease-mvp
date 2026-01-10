'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Line } from 'react-chartjs-2';
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

interface FormData {
  goalAmount: number;
  currentSavings: number;
  monthlyContribution: number;
  timeline: number;
  annualReturn: number;
}

interface Results {
  totalMonths: number;
  totalYears: number;
  totalContributions: number;
  totalInterest: number;
  endBalance: number;
  reachedGoal: boolean;
  shortfall: number;
  recommendedMonthly: number;
}

export default function SavingsGoalCalculator() {
  const t = useTranslations('calculator.savingsGoal');
  const currency = useTranslations('common.currency');

  const [formData, setFormData] = useState<FormData>({
    goalAmount: 50000,
    currentSavings: 10000,
    monthlyContribution: 500,
    timeline: 5,
    annualReturn: 5,
  });

  const [results, setResults] = useState<Results | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const calculateGoal = () => {
    const {
      goalAmount,
      currentSavings,
      monthlyContribution,
      annualReturn,
    } = formData;

    const monthlyRate = annualReturn / 100 / 12;
    const targetMonths = formData.timeline * 12;

    let balance = currentSavings;
    const balanceData: number[] = [currentSavings];
    const labels: string[] = ['0'];

    // Calculate month by month
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

    setResults({
      totalMonths: monthsToReach || targetMonths,
      totalYears: (monthsToReach || targetMonths) / 12,
      totalContributions,
      totalInterest,
      endBalance,
      reachedGoal: reached,
      shortfall: goalAmount - endBalance,
      recommendedMonthly: reached ? monthlyContribution : 0,
    });

    // Calculate recommended monthly if not reached
    let recommendedMonthly = monthlyContribution;
    if (!reached) {
      // Use future value formula: FV = PV(1+r)^n + PMT * [(1+r)^n - 1]/r
      const n = targetMonths;
      const fv = goalAmount;
      const pv = currentSavings;
      recommendedMonthly = (fv - pv * Math.pow(1 + monthlyRate, n)) / ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
    }

    setResults({
      totalMonths: monthsToReach || targetMonths,
      totalYears: (monthsToReach || targetMonths) / 12,
      totalContributions,
      totalInterest,
      endBalance,
      reachedGoal: reached,
      shortfall: Math.max(0, goalAmount - endBalance),
      recommendedMonthly,
    });

    // Prepare chart data
    setChartData({
      labels,
      datasets: [
        {
          label: t('results.savingsGrowth'),
          data: balanceData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: t('results.goal'),
          data: Array(balanceData.length).fill(goalAmount),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          pointRadius: 0,
        },
      ],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleReset = () => {
    setFormData({
      goalAmount: 50000,
      currentSavings: 10000,
      monthlyContribution: 500,
      timeline: 5,
      annualReturn: 5,
    });
    setResults(null);
    setChartData(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(currency('locale'), {
      style: 'currency',
      currency: currency('code'),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Calculator Form */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.goalAmount')}
            </label>
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.currentSavings')}
            </label>
            <input
              type="number"
              name="currentSavings"
              value={formData.currentSavings}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.monthlyContribution')}
            </label>
            <input
              type="number"
              name="monthlyContribution"
              value={formData.monthlyContribution}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.timeline')}
            </label>
            <input
              type="number"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.annualReturn')}
            </label>
            <input
              type="number"
              name="annualReturn"
              value={formData.annualReturn}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              max="20"
              step="0.1"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={calculateGoal}
            className="btn-primary flex-1"
          >
            {t('form.calculate')}
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary"
          >
            {t('form.reset')}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Status Banner */}
          <div className={`card ${results.reachedGoal ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {results.reachedGoal ? '🎉' : '📈'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {results.reachedGoal ? t('results.goalReached') : t('results.goalNotReached')}
                </h3>
                <p className="text-gray-700">
                  {results.reachedGoal
                    ? `${t('results.reachedIn')} ${results.totalYears.toFixed(1)} ${t('results.years')}`
                    : `${t('results.shortfall')}: ${formatCurrency(results.shortfall)}`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-blue-50 border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-1">
                {t('results.endBalance')}
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(results.endBalance)}
              </div>
            </div>

            <div className="card bg-green-50 border-green-200">
              <div className="text-sm font-medium text-green-900 mb-1">
                {t('results.totalInterest')}
              </div>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(results.totalInterest)}
              </div>
            </div>

            <div className="card bg-purple-50 border-purple-200">
              <div className="text-sm font-medium text-purple-900 mb-1">
                {t('results.totalContributions')}
              </div>
              <div className="text-3xl font-bold text-purple-600">
                {formatCurrency(results.totalContributions)}
              </div>
            </div>
          </div>

          {/* Recommendation */}
          {!results.reachedGoal && results.recommendedMonthly > formData.monthlyContribution && (
            <div className="card bg-orange-50 border-orange-200">
              <h3 className="text-lg font-bold text-orange-900 mb-3">
                💡 {t('results.recommendation')}
              </h3>
              <p className="text-orange-800 mb-4">
                {t('results.recommendationMessage')}
              </p>
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="text-sm text-orange-900 mb-1">
                  {t('results.recommendedMonthly')}
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(results.recommendedMonthly)}
                </div>
                <div className="text-sm text-orange-700 mt-2">
                  ({t('results.increase')}: {formatCurrency(results.recommendedMonthly - formData.monthlyContribution)}/{t('results.month')})
                </div>
              </div>
            </div>
          )}

          {/* Chart */}
          {chartData && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t('results.chartTitle')}
              </h3>
              <div className="h-80">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            return `${context.dataset.label}: ${formatCurrency(context.parsed.y ?? 0)}`;
                          },
                        },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => formatCurrency(value as number),
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: t('results.timeline'),
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
