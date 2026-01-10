'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
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
import {Shield, Calculator, TrendingUp, Lightbulb} from 'lucide-react';

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

interface CalculationResult {
  totalBalance: number;
  totalInterest: number;
  payoffTime: number;
  payoffYears: number;
  payoffMonths: number;
  debtFreeDate: string;
  totalPaid: number;
  balanceData: number[];
  labels: string[];
}

export default function DebtPayoffCalculator() {
  const t = useTranslations('calculator.debtPayoff');
  const currency = useTranslations('common.currency');

  const [debts, setDebts] = useState<Debt[]>([
    { name: t('form.debt1'), balance: 5000, interestRate: 18, minimumPayment: 150 },
    { name: t('form.debt2'), balance: 10000, interestRate: 15, minimumPayment: 200 },
  ]);
  const [extraPayment, setExtraPayment] = useState<number>(200);
  const [method, setMethod] = useState<'avalanche' | 'snowball'>('avalanche');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const addDebt = () => {
    setDebts((prev) => [
      ...prev,
      {
        name: `${t('form.debt')} ${prev.length + 1}`,
        balance: 0,
        interestRate: 10,
        minimumPayment: 0,
      },
    ]);
  };

  const removeDebt = (index: number) => {
    if (debts.length > 1) {
      setDebts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateDebt = (index: number, field: keyof Debt, value: string | number) => {
    setDebts((prev) =>
      prev.map((debt, i) => (i === index ? { ...debt, [field]: value } : debt))
    );
  };

  const calculatePayoff = () => {
    let debtList = debts.map((d) => ({
      ...d,
      balance: d.balance,
      originalBalance: d.balance,
    }));

    const monthlyRate = (debt: Debt) => debt.interestRate / 100 / 12;

    let totalPaid = 0;
    let totalInterest = 0;
    let month = 0;
    const schedule: any[] = [];

    if (method === 'avalanche') {
      debtList.sort((a, b) => b.interestRate - a.interestRate);
    } else {
      debtList.sort((a, b) => a.balance - b.balance);
    }

    while (debtList.some((d) => d.balance > 0)) {
      month++;
      let totalPaymentThisMonth = 0;

      for (const debt of debtList) {
        if (debt.balance <= 0) continue;

        const interest = debt.balance * monthlyRate(debt);
        const principal = Math.min(debt.balance, debt.minimumPayment - interest);
        debt.balance -= principal;

        totalPaymentThisMonth += debt.minimumPayment;
        totalInterest += interest;
      }

      let remainingExtra = extraPayment;
      for (const debt of debtList) {
        if (remainingExtra <= 0 || debt.balance <= 0) continue;

        const payment = Math.min(debt.balance, remainingExtra);
        debt.balance -= payment;
        totalPaymentThisMonth += payment;
        remainingExtra -= payment;
      }

      totalPaid += totalPaymentThisMonth;

      if (month % 12 === 0 || month === 1) {
        const totalBalance = debtList.reduce((sum, d) => sum + Math.max(0, d.balance), 0);
        schedule.push({
          month,
          balance: totalBalance,
        });
      }

      if (month > 600) break;
    }

    const payoffTime = month;
    const originalBalance = debts.reduce((sum, d) => sum + d.balance, 0);

    setResult({
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
      balanceData: schedule.map((s) => s.balance),
      labels: schedule.map((s) => (s.month === 1 ? '1月' : `${s.month / 12}年`)),
    });
  };

  const handleReset = () => {
    setDebts([
      { name: t('form.debt1'), balance: 5000, interestRate: 18, minimumPayment: 150 },
      { name: t('form.debt2'), balance: 10000, interestRate: 15, minimumPayment: 200 },
    ]);
    setExtraPayment(200);
    setMethod('avalanche');
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
        label: t('results.remainingBalance'),
        data: result.balanceData,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
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

  const totalCurrentBalance = debts.reduce((sum, d) => sum + d.balance, 0);

  const expertTips = [
    {
      icon: 'shield' as const,
      title: currency('code') === 'CNY' ? '雪球法 vs 雪崩法' : 'Snowball vs Avalanche',
      content: currency('code') === 'CNY'
        ? '雪球法先还最小的债务以获得动力，雪崩法先还最高利率的债务以节省利息。'
        : 'Snowball method pays smallest debts first for motivation. Avalanche pays highest interest rates first to save money.'
    },
    {
      icon: 'trending' as const,
      title: currency('code') === 'CNY' ? '增加额外还款' : 'Increase Extra Payments',
      content: currency('code') === 'CNY'
        ? '即使小额的额外还款也能显著加快还债速度并节省大量利息。'
        : 'Even small extra payments can significantly accelerate debt payoff and save thousands in interest.'
    },
    {
      icon: 'calculator' as const,
      title: currency('code') === 'CNY' ? '考虑债务整合' : 'Consider Debt Consolidation',
      content: currency('code') === 'CNY'
        ? '将高息债务整合为一个低息贷款可以降低月供和总利息。'
        : 'Consolidating high-interest debt into a single lower-rate loan can reduce monthly payments and total interest.'
    },
    {
      icon: 'lightbulb' as const,
      title: currency('code') === 'CNY' ? '避免新债务' : 'Avoid New Debt',
      content: currency('code') === 'CNY'
        ? '在还清现有债务期间，避免产生新债务是成功的关键。'
        : 'Avoiding new debt while paying off existing debt is key to becoming debt-free.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 rounded-lg p-2 mr-3">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('form.title')}</h2>
            </div>

            {/* Debt List */}
            <div className="space-y-4 mb-6">
              {debts.map((debt, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      value={debt.name}
                      onChange={(e) => updateDebt(index, 'name', e.target.value)}
                      className="font-semibold text-gray-900 bg-transparent border-none focus:ring-0 p-0"
                    />
                    {debts.length > 1 && (
                      <button
                        onClick={() => removeDebt(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        {t('form.remove')}
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
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
              <CalculatorInput
                label={t('form.extraPayment')}
                value={extraPayment}
                onChange={setExtraPayment}
                min={0}
                max={10000}
                step={50}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '每月额外还款金额'
                  : 'Extra payment to apply each month'}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.method')}
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as 'avalanche' | 'snowball')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="avalanche">{t('form.avalanche')}</option>
                  <option value="snowball">{t('form.snowball')}</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  {method === 'avalanche' ? t('form.avalancheDesc') : t('form.snowballDesc')}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={calculatePayoff}
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

          {/* Results Section */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* Success Banner */}
              <div className="bg-success-50 rounded-2xl p-6 border-2 border-success-200 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎉</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t('results.debtFree')}
                    </h3>
                    <p className="text-gray-700">
                      {t('results.debtFreeMessage')} {result.payoffYears} {t('results.years')}{' '}
                      {result.payoffMonths > 0 && `${result.payoffMonths} ${t('results.months')}`}{' '}
                      ({result.debtFreeDate})
                    </p>
                  </div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <ResultCard
                  title={t('results.totalBalance')}
                  value={formatCurrency(result.totalBalance)}
                  tooltip={currency('code') === 'CNY' ? '当前债务总额' : 'Total current debt balance'}
                />
                <ResultCard
                  title={t('results.totalInterest')}
                  value={formatCurrency(result.totalInterest)}
                  tooltip={currency('code') === 'CNY' ? '还款期间的总利息' : 'Total interest paid over payoff period'}
                />
                <ResultCard
                  title={t('results.totalPaid')}
                  value={formatCurrency(result.totalPaid)}
                  tooltip={currency('code') === 'CNY' ? '还款期间支付的总金额' : 'Total amount paid over payoff period'}
                />
              </div>

              {/* Savings with Extra Payment */}
              {extraPayment > 0 && (
                <div className="bg-accent-50 rounded-2xl p-6 border-2 border-accent-200 shadow-card">
                  <h3 className="text-lg font-bold text-accent-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">💰</span>
                    {t('results.savingsTitle')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-accent-200">
                      <div className="text-sm text-accent-900 mb-1">
                        {t('results.monthlyPayment')}
                      </div>
                      <div className="text-2xl font-bold text-accent-600">
                        {formatCurrency(
                          debts.reduce((sum, d) => sum + d.minimumPayment, 0) + extraPayment
                        )}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-accent-200">
                      <div className="text-sm text-accent-900 mb-1">
                        {t('results.timeSaved')}
                      </div>
                      <div className="text-2xl font-bold text-accent-600">
                        {result.payoffYears} {t('results.years')}
                      </div>
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
          <div className="text-6xl mb-4">💳</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {currency('code') === 'CNY' ? '规划您的还债计划' : 'Plan Your Debt Payoff'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {currency('code') === 'CNY'
              ? '输入您的债务信息并点击计算按钮，查看还债计划和时间表'
              : 'Enter your debt information and click calculate to see your payoff plan and timeline'}
          </p>
        </div>
      )}
    </div>
  );
}
