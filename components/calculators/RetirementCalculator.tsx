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
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlySavings: number;
  annualReturn: number;
  retirementMonthlyExpense: number;
  lifeExpectancy: number;
}

interface Results {
  retirementSavings: number;
  yearsInRetirement: number;
  monthlyRetirementIncome: number;
  shortfall: number;
  isSufficient: boolean;
  recommendedMonthlySavings: number;
}

export default function RetirementCalculator() {
  const t = useTranslations('calculator.retirement');
  const currency = useTranslations('common.currency');

  const [formData, setFormData] = useState<FormData>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlySavings: 1000,
    annualReturn: 7,
    retirementMonthlyExpense: 5000,
    lifeExpectancy: 85,
  });

  const [results, setResults] = useState<Results | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const calculateRetirement = () => {
    const {
      currentAge,
      retirementAge,
      currentSavings,
      monthlySavings,
      annualReturn,
      retirementMonthlyExpense,
      lifeExpectancy,
    } = formData;

    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const monthlyRate = annualReturn / 100 / 12;

    // Calculate retirement savings using compound interest formula
    let savings = currentSavings;
    const savingsData: number[] = [currentSavings];
    const years: number[] = [currentAge];

    // Accumulation phase
    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        savings = savings * (1 + monthlyRate) + monthlySavings;
      }
      savingsData.push(savings);
      years.push(currentAge + year);
    }

    const retirementSavings = savings;

    // Calculate how long the savings will last in retirement
    const totalRetirementNeeds = retirementMonthlyExpense * 12 * yearsInRetirement;
    const monthlyRetirementIncome = (retirementSavings * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -yearsInRetirement * 12));

    // Drawdown phase
    let remainingSavings = retirementSavings;
    for (let year = 1; year <= yearsInRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        remainingSavings = remainingSavings * (1 + monthlyRate) - retirementMonthlyExpense;
        if (remainingSavings < 0) remainingSavings = 0;
      }
      savingsData.push(remainingSavings);
      years.push(retirementAge + year);
    }

    const shortfall = totalRetirementNeeds - retirementSavings;
    const isSufficient = retirementSavings >= totalRetirementNeeds;

    // Calculate recommended monthly savings if current plan is insufficient
    let recommendedMonthlySavings = monthlySavings;
    if (!isSufficient) {
      // Use future value of annuity formula to calculate required monthly payment
      const fv = totalRetirementNeeds;
      const n = yearsToRetirement * 12;
      recommendedMonthlySavings = (fv - currentSavings * Math.pow(1 + monthlyRate, n)) * monthlyRate / (Math.pow(1 + monthlyRate, n) - 1);
    }

    setResults({
      retirementSavings,
      yearsInRetirement,
      monthlyRetirementIncome,
      shortfall,
      isSufficient,
      recommendedMonthlySavings,
    });

    // Prepare chart data
    setChartData({
      labels: years,
      datasets: [
        {
          label: t('results.savingsOverTime'),
          data: savingsData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
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
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlySavings: 1000,
      annualReturn: 7,
      retirementMonthlyExpense: 5000,
      lifeExpectancy: 85,
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
              {t('form.currentAge')}
            </label>
            <input
              type="number"
              name="currentAge"
              value={formData.currentAge}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="18"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.retirementAge')}
            </label>
            <input
              type="number"
              name="retirementAge"
              value={formData.retirementAge}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="50"
              max="100"
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
              {t('form.monthlySavings')}
            </label>
            <input
              type="number"
              name="monthlySavings"
              value={formData.monthlySavings}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="100"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.retirementMonthlyExpense')}
            </label>
            <input
              type="number"
              name="retirementMonthlyExpense"
              value={formData.retirementMonthlyExpense}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.lifeExpectancy')}
            </label>
            <input
              type="number"
              name="lifeExpectancy"
              value={formData.lifeExpectancy}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="60"
              max="120"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={calculateRetirement}
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
          <div className={`card ${results.isSufficient ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {results.isSufficient ? '✅' : '⚠️'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {results.isSufficient ? t('results.sufficient') : t('results.insufficient')}
                </h3>
                <p className="text-gray-700">
                  {results.isSufficient
                    ? t('results.sufficientMessage')
                    : t('results.insufficientMessage')}
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-blue-50 border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-1">
                {t('results.retirementSavings')}
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(results.retirementSavings)}
              </div>
            </div>

            <div className="card bg-purple-50 border-purple-200">
              <div className="text-sm font-medium text-purple-900 mb-1">
                {t('results.monthlyRetirementIncome')}
              </div>
              <div className="text-3xl font-bold text-purple-600">
                {formatCurrency(results.monthlyRetirementIncome)}
              </div>
            </div>

            <div className="card bg-green-50 border-green-200">
              <div className="text-sm font-medium text-green-900 mb-1">
                {t('results.yearsInRetirement')}
              </div>
              <div className="text-3xl font-bold text-green-600">
                {results.yearsInRetirement} {t('results.years')}
              </div>
            </div>
          </div>

          {/* Recommendation */}
          {!results.isSufficient && (
            <div className="card bg-orange-50 border-orange-200">
              <h3 className="text-lg font-bold text-orange-900 mb-3">
                💡 {t('results.recommendation')}
              </h3>
              <p className="text-orange-800 mb-4">
                {t('results.recommendationMessage')}
              </p>
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="text-sm text-orange-900 mb-1">
                  {t('results.recommendedMonthlySavings')}
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(results.recommendedMonthlySavings)}
                </div>
                <div className="text-sm text-orange-700 mt-2">
                  ({t('results.increase')}: {formatCurrency(results.recommendedMonthlySavings - formData.monthlySavings)}/month)
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
                          text: t('results.age'),
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
