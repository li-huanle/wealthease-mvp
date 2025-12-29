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
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

interface Results {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  paymentSchedule: {
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

export default function LoanCalculator() {
  const t = useTranslations('calculator.loan');

  const [formData, setFormData] = useState<FormData>({
    loanAmount: 200000,
    interestRate: 5,
    loanTerm: 30,
  });

  const [results, setResults] = useState<Results | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const calculateLoan = () => {
    const { loanAmount, interestRate, loanTerm } = formData;

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly payment using loan amortization formula
    const monthlyPayment = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Generate payment schedule
    let balance = loanAmount;
    const paymentSchedule: Results['paymentSchedule'] = [];
    const balanceData: number[] = [loanAmount];
    const months: number[] = [0];

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      paymentSchedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        balance,
      });

      // Store data for chart (every 12 months or last month)
      if (month % 12 === 0 || month === numberOfPayments) {
        balanceData.push(balance);
        months.push(month);
      }
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      paymentSchedule,
    });

    // Prepare chart data
    setChartData({
      labels: months,
      datasets: [
        {
          label: t('results.remainingBalance'),
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
      loanAmount: 200000,
      interestRate: 5,
      loanTerm: 30,
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

  return (
    <div className="space-y-8">
      {/* Calculator Form */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.loanAmount')}
            </label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="1000"
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
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={calculateLoan}
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
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-blue-50 border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-1">
                {t('results.monthlyPayment')}
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(results.monthlyPayment)}
              </div>
            </div>

            <div className="card bg-purple-50 border-purple-200">
              <div className="text-sm font-medium text-purple-900 mb-1">
                {t('results.totalPayment')}
              </div>
              <div className="text-3xl font-bold text-purple-600">
                {formatCurrency(results.totalPayment)}
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

          {/* Summary */}
          <div className="card bg-green-50 border-green-200">
            <h3 className="text-lg font-bold text-green-900 mb-3">
              📊 {t('results.summary')}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-green-800">
              <div>
                <span className="font-medium">{t('results.loanAmount')}:</span>{' '}
                {formatCurrency(formData.loanAmount)}
              </div>
              <div>
                <span className="font-medium">{t('results.interestRate')}:</span>{' '}
                {formData.interestRate}%
              </div>
              <div>
                <span className="font-medium">{t('results.loanTerm')}:</span>{' '}
                {formData.loanTerm} {t('results.years')}
              </div>
              <div>
                <span className="font-medium">{t('results.totalPayments')}:</span>{' '}
                {formData.loanTerm * 12} {t('results.months')}
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
                          text: t('results.month'),
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
