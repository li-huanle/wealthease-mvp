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

interface Debt {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

interface FormData {
  debts: Debt[];
  extraPayment: number;
  method: 'avalanche' | 'snowball';
}

interface Results {
  totalBalance: number;
  totalInterest: number;
  payoffTime: number;
  payoffYears: number;
  payoffMonths: number;
  debtFreeDate: string;
  totalPaid: number;
  paymentSchedule: {
    month: number;
    balance: number;
    payment: number;
    interest: number;
    principal: number;
  }[];
}

export default function DebtPayoffCalculator() {
  const t = useTranslations('calculator.debtPayoff');
  const currency = useTranslations('common.currency');

  const [formData, setFormData] = useState<FormData>({
    debts: [
      { name: t('form.debt1'), balance: 5000, interestRate: 18, minimumPayment: 150 },
      { name: t('form.debt2'), balance: 10000, interestRate: 15, minimumPayment: 200 },
    ],
    extraPayment: 200,
    method: 'avalanche',
  });

  const [results, setResults] = useState<Results | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const addDebt = () => {
    setFormData((prev) => ({
      ...prev,
      debts: [
        ...prev.debts,
        {
          name: `${t('form.debt')} ${prev.debts.length + 1}`,
          balance: 0,
          interestRate: 10,
          minimumPayment: 0,
        },
      ],
    }));
  };

  const removeDebt = (index: number) => {
    if (formData.debts.length > 1) {
      setFormData((prev) => ({
        ...prev,
        debts: prev.debts.filter((_, i) => i !== index),
      }));
    }
  };

  const updateDebt = (index: number, field: keyof Debt, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      debts: prev.debts.map((debt, i) =>
        i === index ? { ...debt, [field]: value } : debt
      ),
    }));
  };

  const calculatePayoff = () => {
    let debts = formData.debts.map((d) => ({
      ...d,
      balance: d.balance,
      originalBalance: d.balance,
    }));

    const extraPayment = formData.extraPayment;
    const monthlyRate = (debt: Debt) => debt.interestRate / 100 / 12;

    let totalPaid = 0;
    let totalInterest = 0;
    let month = 0;
    const schedule: any[] = [];

    // Sort debts based on method
    if (formData.method === 'avalanche') {
      debts.sort((a, b) => b.interestRate - a.interestRate);
    } else {
      debts.sort((a, b) => a.balance - b.balance);
    }

    while (debts.some((d) => d.balance > 0)) {
      month++;
      let totalPaymentThisMonth = 0;

      // Pay minimums on all debts
      for (const debt of debts) {
        if (debt.balance <= 0) continue;

        const interest = debt.balance * monthlyRate(debt);
        const principal = Math.min(debt.balance, debt.minimumPayment - interest);
        debt.balance -= principal;

        totalPaymentThisMonth += debt.minimumPayment;
        totalInterest += interest;
      }

      // Apply extra payment to first debt with balance > 0
      let remainingExtra = extraPayment;
      for (const debt of debts) {
        if (remainingExtra <= 0 || debt.balance <= 0) continue;

        const payment = Math.min(debt.balance, remainingExtra);
        debt.balance -= payment;
        totalPaymentThisMonth += payment;
        remainingExtra -= payment;
      }

      totalPaid += totalPaymentThisMonth;

      if (month % 12 === 0 || month === 1) {
        const totalBalance = debts.reduce((sum, d) => sum + Math.max(0, d.balance), 0);
        schedule.push({
          month,
          balance: totalBalance,
          payment: totalPaymentThisMonth,
        });
      }

      if (month > 600) break; // Safety limit: 50 years
    }

    const payoffTime = month;
    const originalBalance = formData.debts.reduce((sum, d) => sum + d.balance, 0);

    setResults({
      totalBalance: originalBalance,
      totalInterest,
      payoffTime,
      payoffYears: Math.floor(month / 12),
      payoffMonths: month % 12,
      debtFreeDate: new Date(
        Date.now() + month * 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(currency('locale'), {
        year: 'numeric',
        month: 'long',
      }),
      totalPaid,
      paymentSchedule: schedule,
    });

    // Prepare chart data
    setChartData({
      labels: schedule.map((s) => (s.month === 1 ? '1月' : `${s.month / 12}年`)),
      datasets: [
        {
          label: t('results.remainingBalance'),
          data: schedule.map((s) => s.balance),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    });
  };

  const handleReset = () => {
    setFormData({
      debts: [
        { name: t('form.debt1'), balance: 5000, interestRate: 18, minimumPayment: 150 },
        { name: t('form.debt2'), balance: 10000, interestRate: 15, minimumPayment: 200 },
      ],
      extraPayment: 200,
      method: 'avalanche',
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

  const totalCurrentBalance = formData.debts.reduce((sum, d) => sum + d.balance, 0);

  return (
    <div className="space-y-8">
      {/* Calculator Form */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>

        {/* Debt List */}
        <div className="space-y-4 mb-6">
          {formData.debts.map((debt, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={debt.name}
                  onChange={(e) => updateDebt(index, 'name', e.target.value)}
                  className="font-semibold text-gray-900 bg-transparent border-none focus:ring-0 p-0"
                />
                {formData.debts.length > 1 && (
                  <button
                    onClick={() => removeDebt(index)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    {t('form.remove')}
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.balance')}
                  </label>
                  <input
                    type="number"
                    value={debt.balance}
                    onChange={(e) => updateDebt(index, 'balance', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.interestRate')} (%)
                  </label>
                  <input
                    type="number"
                    value={debt.interestRate}
                    onChange={(e) => updateDebt(index, 'interestRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.minimumPayment')}
                  </label>
                  <input
                    type="number"
                    value={debt.minimumPayment}
                    onChange={(e) => updateDebt(index, 'minimumPayment', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addDebt}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors mb-6"
        >
          + {t('form.addDebt')}
        </button>

        {/* Extra Payment & Method */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.extraPayment')}
            </label>
            <input
              type="number"
              value={formData.extraPayment}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, extraPayment: parseFloat(e.target.value) || 0 }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.method')}
            </label>
            <select
              value={formData.method}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, method: e.target.value as 'avalanche' | 'snowball' }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="avalanche">{t('form.avalanche')}</option>
              <option value="snowball">{t('form.snowball')}</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              {formData.method === 'avalanche' ? t('form.avalancheDesc') : t('form.snowballDesc')}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={calculatePayoff} className="btn-primary flex-1">
            {t('form.calculate')}
          </button>
          <button onClick={handleReset} className="btn-secondary">
            {t('form.reset')}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Success Banner */}
          <div className="card bg-green-50 border-green-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎉</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('results.debtFree')}
                </h3>
                <p className="text-gray-700">
                  {t('results.debtFreeMessage')} {results.payoffYears} {t('results.years')}{' '}
                  {results.payoffMonths > 0 && `${results.payoffMonths} ${t('results.months')}`}{' '}
                  ({results.debtFreeDate})
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-blue-50 border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-1">
                {t('results.totalBalance')}
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(results.totalBalance)}
              </div>
            </div>

            <div className="card bg-red-50 border-red-200">
              <div className="text-sm font-medium text-red-900 mb-1">
                {t('results.totalInterest')}
              </div>
              <div className="text-3xl font-bold text-red-600">
                {formatCurrency(results.totalInterest)}
              </div>
            </div>

            <div className="card bg-green-50 border-green-200">
              <div className="text-sm font-medium text-green-900 mb-1">
                {t('results.totalPaid')}
              </div>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(results.totalPaid)}
              </div>
            </div>
          </div>

          {/* Savings with Extra Payment */}
          {formData.extraPayment > 0 && (
            <div className="card bg-purple-50 border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-3">
                💰 {t('results.savingsTitle')}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-purple-900 mb-1">
                    {t('results.monthlyPayment')}
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(
                      formData.debts.reduce((sum, d) => sum + d.minimumPayment, 0) + formData.extraPayment
                    )}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-purple-900 mb-1">
                    {t('results.timeSaved')}
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {results.payoffYears} {t('results.years')}
                  </div>
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
                            return `${t('results.balance')}: ${formatCurrency(context.parsed.y ?? 0)}`;
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
