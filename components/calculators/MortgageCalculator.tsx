'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FormData {
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
}

interface Results {
  loanAmount: number;
  downPayment: number;
  monthlyPI: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export default function MortgageCalculator() {
  const t = useTranslations('calculator.mortgage');

  const [formData, setFormData] = useState<FormData>({
    homePrice: 400000,
    downPaymentPercent: 20,
    interestRate: 6.5,
    loanTerm: 30,
    propertyTax: 3600,
    homeInsurance: 1200,
    hoaFees: 0,
  });

  const [results, setResults] = useState<Results | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [balanceChartData, setBalanceChartData] = useState<any>(null);

  const calculateMortgage = () => {
    const {
      homePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      propertyTax,
      homeInsurance,
      hoaFees,
    } = formData;

    const downPayment = (homePrice * downPaymentPercent) / 100;
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly principal & interest
    const monthlyPI = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate PMI (if down payment < 20%)
    const monthlyPMI = downPaymentPercent < 20 ? (loanAmount * 0.005) / 12 : 0;

    // Monthly taxes and insurance
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHOA = hoaFees;

    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
    const totalPayment = (monthlyPI * numberOfPayments) + (monthlyPropertyTax * numberOfPayments) +
                        (monthlyInsurance * numberOfPayments) + (monthlyPMI * numberOfPayments) +
                        (monthlyHOA * numberOfPayments);
    const totalInterest = (monthlyPI * numberOfPayments) - loanAmount;

    setResults({
      loanAmount,
      downPayment,
      monthlyPI,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyPMI,
      monthlyHOA,
      totalMonthlyPayment,
      totalPayment,
      totalInterest,
    });

    // Prepare pie chart data for payment breakdown
    const breakdownData = [
      monthlyPI,
      monthlyPropertyTax,
      monthlyInsurance,
    ];
    const breakdownLabels = [
      t('results.principalInterest'),
      t('results.propertyTax'),
      t('results.homeInsurance'),
    ];

    if (monthlyPMI > 0) {
      breakdownData.push(monthlyPMI);
      breakdownLabels.push(t('results.pmi'));
    }

    if (monthlyHOA > 0) {
      breakdownData.push(monthlyHOA);
      breakdownLabels.push(t('results.hoaFees'));
    }

    setChartData({
      labels: breakdownLabels,
      datasets: [
        {
          data: breakdownData,
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)',
            'rgb(239, 68, 68)',
            'rgb(139, 92, 246)',
          ],
          borderWidth: 2,
        },
      ],
    });

    // Generate balance over time data
    let balance = loanAmount;
    const balanceData: number[] = [loanAmount];
    const years: number[] = [0];

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      // Store data for chart (every 12 months or last month)
      if (month % 12 === 0 || month === numberOfPayments) {
        balanceData.push(balance);
        years.push(month / 12);
      }
    }

    setBalanceChartData({
      labels: years,
      datasets: [
        {
          label: t('results.loanBalance'),
          data: balanceData,
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
      homePrice: 400000,
      downPaymentPercent: 20,
      interestRate: 6.5,
      loanTerm: 30,
      propertyTax: 3600,
      homeInsurance: 1200,
      hoaFees: 0,
    });
    setResults(null);
    setChartData(null);
    setBalanceChartData(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
              {t('form.homePrice')}
            </label>
            <input
              type="number"
              name="homePrice"
              value={formData.homePrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.downPaymentPercent')}
            </label>
            <input
              type="number"
              name="downPaymentPercent"
              value={formData.downPaymentPercent}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              max="100"
              step="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.interestRate')}
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              max="30"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.loanTerm')}
            </label>
            <input
              type="number"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
              max="40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.propertyTax')}
            </label>
            <input
              type="number"
              name="propertyTax"
              value={formData.propertyTax}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.homeInsurance')}
            </label>
            <input
              type="number"
              name="homeInsurance"
              value={formData.homeInsurance}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.hoaFees')}
            </label>
            <input
              type="number"
              name="hoaFees"
              value={formData.hoaFees}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="50"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={calculateMortgage}
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
          {/* Main Monthly Payment */}
          <div className="card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-900 mb-2">
                {t('results.totalMonthlyPayment')}
              </div>
              <div className="text-5xl font-bold text-blue-600">
                {formatCurrency(results.totalMonthlyPayment)}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-green-50 border-green-200">
              <div className="text-sm font-medium text-green-900 mb-1">
                {t('results.loanAmount')}
              </div>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(results.loanAmount)}
              </div>
            </div>

            <div className="card bg-purple-50 border-purple-200">
              <div className="text-sm font-medium text-purple-900 mb-1">
                {t('results.downPayment')}
              </div>
              <div className="text-3xl font-bold text-purple-600">
                {formatCurrency(results.downPayment)}
              </div>
            </div>

            <div className="card bg-orange-50 border-orange-200">
              <div className="text-sm font-medium text-orange-900 mb-1">
                {t('results.totalInterest')}
              </div>
              <div className="text-3xl font-bold text-orange-600">
                {formatCurrency(results.totalInterest)}
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {t('results.monthlyBreakdown')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-700">{t('results.principalInterest')}</span>
                  <span className="font-semibold">{formatCurrency(results.monthlyPI)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-700">{t('results.propertyTax')}</span>
                  <span className="font-semibold">{formatCurrency(results.monthlyPropertyTax)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-700">{t('results.homeInsurance')}</span>
                  <span className="font-semibold">{formatCurrency(results.monthlyInsurance)}</span>
                </div>
                {results.monthlyPMI > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-700">{t('results.pmi')}</span>
                    <span className="font-semibold">{formatCurrency(results.monthlyPMI)}</span>
                  </div>
                )}
                {results.monthlyHOA > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-700">{t('results.hoaFees')}</span>
                    <span className="font-semibold">{formatCurrency(results.monthlyHOA)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pie Chart */}
            {chartData && (
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t('results.paymentDistribution')}
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              return `${context.label}: ${formatCurrency(context.parsed as number)}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Balance Over Time Chart */}
          {balanceChartData && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t('results.balanceOverTime')}
              </h3>
              <div className="h-80">
                <Line
                  data={balanceChartData}
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
                          text: t('results.year'),
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}

          {/* PMI Warning */}
          {results.monthlyPMI > 0 && (
            <div className="card bg-yellow-50 border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">
                ℹ️ {t('results.pmiNotice')}
              </h3>
              <p className="text-yellow-800">
                {t('results.pmiNoticeMessage')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
