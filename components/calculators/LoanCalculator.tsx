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
import {Calculator} from 'lucide-react';

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
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  balanceData: number[];
  labels: number[];
}

export default function LoanCalculator() {
  const t = useTranslations('calculator.loan');
  const currency = useTranslations('common.currency');
  const yearsSuffix = useLocale() === 'zh' ? ' 年' : ' yrs';

  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    let balance = loanAmount;
    const balanceData: number[] = [loanAmount];
    const labels: number[] = [0];

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      if (month % 12 === 0 || month === numberOfPayments) {
        balanceData.push(balance);
        labels.push(month);
      }
    }

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      balanceData,
      labels,
    });
  };

  const handleReset = () => {
    setLoanAmount(200000);
    setInterestRate(5);
    setLoanTerm(30);
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
        borderColor: '#486581',
        backgroundColor: 'rgba(72, 101, 129, 0.1)',
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

  const expertTips = [
    {
      icon: 'lightbulb' as const,
      title: currency('code') === 'CNY' ? '比较利率' : 'Compare Rates',
      content: currency('code') === 'CNY'
        ? '不同贷款机构的利率差异很大。在申请贷款前，比较多个金融机构的利率以获得最佳交易。'
        : 'Interest rates vary significantly between lenders. Compare rates from multiple financial institutions before committing to a loan.'
    },
    {
      icon: 'trending' as const,
      title: currency('code') === 'CNY' ? '缩短贷款期限' : 'Shorter Loan Terms',
      content: currency('code') === 'CNY'
        ? '较短的贷款期限意味着更高的月供，但可以节省大量利息支出。'
        : 'Shorter loan terms mean higher monthly payments but can save you thousands in interest over the life of the loan.'
    },
    {
      icon: 'calculator' as const,
      title: currency('code') === 'CNY' ? '考虑额外还款' : 'Make Extra Payments',
      content: currency('code') === 'CNY'
        ? '如果可能，支付超过最低还款额可以更快减少本金并节省利息。'
        : 'When possible, paying more than the minimum payment reduces principal faster and saves on interest costs.'
    },
    {
      icon: 'shield' as const,
      title: currency('code') === 'CNY' ? '检查信用评分' : 'Check Your Credit',
      content: currency('code') === 'CNY'
        ? '更高的信用评分通常可以获得更低的利率。在申请贷款前改善您的信用状况。'
        : 'A higher credit score typically qualifies you for lower interest rates. Work on improving your credit before applying.'
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
                label={t('form.loanAmount')}
                value={loanAmount}
                onChange={setLoanAmount}
                min={0}
                max={50000000}
                step={1000}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '您计划借入的总金额'
                  : 'The total amount you plan to borrow'}
              />

              <CalculatorInput
                label={t('form.interestRate')}
                value={interestRate}
                onChange={setInterestRate}
                min={0}
                max={30}
                step={0.1}
                suffix="%"
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '贷款的年利率'
                  : 'Annual interest rate for the loan'}
              />

              <CalculatorInput
                label={t('form.loanTerm')}
                value={loanTerm}
                onChange={setLoanTerm}
                min={1}
                max={40}
                step={1}
                suffix={yearsSuffix}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '贷款期限（年）'
                  : 'Loan term in years'}
              />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateLoan}
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
              {/* Result Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <ResultCard
                  title={t('results.monthlyPayment')}
                  value={formatCurrency(result.monthlyPayment)}
                  highlight
                  tooltip={currency('code') === 'CNY' ? '每月需偿还的金额' : 'Amount to pay each month'}
                />
                <ResultCard
                  title={t('results.totalPayment')}
                  value={formatCurrency(result.totalPayment)}
                  tooltip={currency('code') === 'CNY' ? '整个贷款期间的总还款额' : 'Total amount paid over the loan term'}
                />
                <ResultCard
                  title={t('results.totalInterest')}
                  value={formatCurrency(result.totalInterest)}
                  subtitle={currency('code') === 'CNY' ? '总利息' : 'Total Interest'}
                  tooltip={currency('code') === 'CNY' ? '贷款期间支付的利息总额' : 'Total interest paid over the loan term'}
                />
              </div>

              {/* Summary */}
              <div className="bg-success-50 rounded-2xl p-6 border-2 border-success-200 shadow-card">
                <h3 className="text-lg font-bold text-success-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  {t('results.summary')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-success-800">
                  <div>
                    <span className="font-medium">{t('results.loanAmount')}:</span>{' '}
                    {formatCurrency(loanAmount)}
                  </div>
                  <div>
                    <span className="font-medium">{t('results.interestRate')}:</span>{' '}
                    {interestRate}%
                  </div>
                  <div>
                    <span className="font-medium">{t('results.loanTerm')}:</span>{' '}
                    {loanTerm} {t('results.years')}
                  </div>
                  <div>
                    <span className="font-medium">{t('results.totalPayments')}:</span>{' '}
                    {loanTerm * 12} {t('results.months')}
                  </div>
                </div>
              </div>

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
          <div className="text-6xl mb-4">💰</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {currency('code') === 'CNY' ? '计算您的贷款' : 'Calculate Your Loan'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {currency('code') === 'CNY'
              ? '输入贷款详情并点击计算按钮，查看您的月供和总利息'
              : 'Enter your loan details and click calculate to see your monthly payment and total interest'}
          </p>
        </div>
      )}
    </div>
  );
}
