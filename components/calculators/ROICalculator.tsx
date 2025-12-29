'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FormData {
  initialInvestment: number;
  finalValue: number;
  additionalInvestment: number;
  investmentPeriodYears: number;
  investmentPeriodMonths: number;
}

interface Results {
  totalInvestment: number;
  totalReturn: number;
  netProfit: number;
  roi: number;
  annualizedROI: number;
  totalPeriodYears: number;
}

export default function ROICalculator() {
  const t = useTranslations('calculator.roi');

  const [formData, setFormData] = useState<FormData>({
    initialInvestment: 10000,
    finalValue: 15000,
    additionalInvestment: 0,
    investmentPeriodYears: 3,
    investmentPeriodMonths: 0,
  });

  const [results, setResults] = useState<Results | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const calculateROI = () => {
    const {
      initialInvestment,
      finalValue,
      additionalInvestment,
      investmentPeriodYears,
      investmentPeriodMonths,
    } = formData;

    const totalInvestment = initialInvestment + additionalInvestment;
    const totalReturn = finalValue;
    const netProfit = finalValue - totalInvestment;
    const roi = ((finalValue - totalInvestment) / totalInvestment) * 100;

    // Calculate total period in years
    const totalPeriodYears = investmentPeriodYears + (investmentPeriodMonths / 12);

    // Calculate annualized ROI using CAGR formula
    // CAGR = (Ending Value / Beginning Value)^(1/years) - 1
    const annualizedROI = totalPeriodYears > 0
      ? (Math.pow(finalValue / totalInvestment, 1 / totalPeriodYears) - 1) * 100
      : roi;

    setResults({
      totalInvestment,
      totalReturn,
      netProfit,
      roi,
      annualizedROI,
      totalPeriodYears,
    });

    // Prepare chart data
    setChartData({
      labels: [t('results.invested'), t('results.currentValue'), t('results.profit')],
      datasets: [
        {
          label: t('results.amount'),
          data: [totalInvestment, finalValue, netProfit],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            netProfit >= 0 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            netProfit >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
          ],
          borderWidth: 2,
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
      initialInvestment: 10000,
      finalValue: 15000,
      additionalInvestment: 0,
      investmentPeriodYears: 3,
      investmentPeriodMonths: 0,
    });
    setResults(null);
    setChartData(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(2) + '%';
  };

  return (
    <div className="space-y-8">
      {/* Calculator Form */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.initialInvestment')}
            </label>
            <input
              type="number"
              name="initialInvestment"
              value={formData.initialInvestment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.finalValue')}
            </label>
            <input
              type="number"
              name="finalValue"
              value={formData.finalValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.additionalInvestment')}
            </label>
            <input
              type="number"
              name="additionalInvestment"
              value={formData.additionalInvestment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.years')}
              </label>
              <input
                type="number"
                name="investmentPeriodYears"
                value={formData.investmentPeriodYears}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                max="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.months')}
              </label>
              <input
                type="number"
                name="investmentPeriodMonths"
                value={formData.investmentPeriodMonths}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                max="11"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={calculateROI}
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
          <div className={`card ${results.roi >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {results.roi >= 0 ? '📈' : '📉'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {results.roi >= 0 ? t('results.profit') : t('results.loss')}
                </h3>
                <p className={results.roi >= 0 ? 'text-green-700' : 'text-red-700'}>
                  {results.roi >= 0
                    ? t('results.profitMessage')
                    : t('results.lossMessage')}
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-blue-50 border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-1">
                {t('results.roi')}
              </div>
              <div className="text-4xl font-bold text-blue-600">
                {formatPercent(results.roi)}
              </div>
              <div className="text-sm text-blue-700 mt-2">
                {t('results.totalReturn')}: {formatCurrency(results.netProfit)}
              </div>
            </div>

            <div className="card bg-purple-50 border-purple-200">
              <div className="text-sm font-medium text-purple-900 mb-1">
                {t('results.annualizedROI')}
              </div>
              <div className="text-4xl font-bold text-purple-600">
                {formatPercent(results.annualizedROI)}
              </div>
              <div className="text-sm text-purple-700 mt-2">
                {t('results.period')}: {results.totalPeriodYears.toFixed(1)} {t('results.years')}
              </div>
            </div>
          </div>

          {/* Investment Summary */}
          <div className="card bg-gray-50 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              📊 {t('results.summary')}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  {t('results.totalInvested')}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(results.totalInvestment)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  {t('results.currentValue')}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(results.totalReturn)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  {t('results.netProfit')}
                </div>
                <div className={`text-2xl font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(results.netProfit)}
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          {chartData && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t('results.chartTitle')}
              </h3>
              <div className="h-80">
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
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
                    },
                  }}
                />
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
              💡 {t('results.understanding')}
            </h3>
            <div className="space-y-2 text-blue-800">
              <p>
                <strong>{t('results.roiLabel')}:</strong> {t('results.roiExplanation')}
              </p>
              <p>
                <strong>{t('results.annualizedLabel')}:</strong> {t('results.annualizedExplanation')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
