'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Doughnut, Line} from 'react-chartjs-2';
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
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import ExpertTips from '@/components/calculators/ExpertTips';
import {Calculator} from 'lucide-react';

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

interface CalculationResult {
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
  balanceData: number[];
  years: number[];
  breakdownData: number[];
  breakdownLabels: string[];
}

export default function MortgageCalculator() {
  const t = useTranslations('calculator.mortgage');
  const currency = useTranslations('common.currency');

  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [propertyTax, setPropertyTax] = useState<number>(3600);
  const [homeInsurance, setHomeInsurance] = useState<number>(1200);
  const [hoaFees, setHoaFees] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateMortgage = () => {
    const downPayment = (homePrice * downPaymentPercent) / 100;
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPI = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const monthlyPMI = downPaymentPercent < 20 ? (loanAmount * 0.005) / 12 : 0;
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHOA = hoaFees;

    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
    const totalPayment = (monthlyPI * numberOfPayments) + (monthlyPropertyTax * numberOfPayments) +
                        (monthlyInsurance * numberOfPayments) + (monthlyPMI * numberOfPayments) +
                        (monthlyHOA * numberOfPayments);
    const totalInterest = (monthlyPI * numberOfPayments) - loanAmount;

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

    let balance = loanAmount;
    const balanceData: number[] = [loanAmount];
    const years: number[] = [0];

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      if (month % 12 === 0 || month === numberOfPayments) {
        balanceData.push(balance);
        years.push(month / 12);
      }
    }

    setResult({
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
      balanceData,
      years,
      breakdownData,
      breakdownLabels,
    });
  };

  const handleReset = () => {
    setHomePrice(400000);
    setDownPaymentPercent(20);
    setInterestRate(6.5);
    setLoanTerm(30);
    setPropertyTax(3600);
    setHomeInsurance(1200);
    setHoaFees(0);
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
    labels: result.breakdownLabels,
    datasets: [
      {
        data: result.breakdownData,
        backgroundColor: [
          'rgba(72, 101, 129, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgb(72, 101, 129)',
          'rgb(34, 197, 94)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 2,
      },
    ],
  } : null;

  const balanceChartData = result ? {
    labels: result.years,
    datasets: [
      {
        label: t('results.loanBalance'),
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
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.label + ': ' + formatCurrency(context.parsed);
          }
        }
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('results.balanceOverTime'),
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
      icon: 'shield' as const,
      title: currency('code') === 'CNY' ? '提高首付比例' : 'Increase Down Payment',
      content: currency('code') === 'CNY'
        ? '支付20%或更高的首付可以避免私人抵押保险(PMI)费用，并减少每月还款额。'
        : 'Putting 20% or more down helps you avoid Private Mortgage Insurance (PMI) and reduces your monthly payment.'
    },
    {
      icon: 'trending' as const,
      title: currency('code') === 'CNY' ? '比较贷款方案' : 'Compare Loan Options',
      content: currency('code') === 'CNY'
        ? '不同的贷款机构和贷款类型有不同的利率和费用。货比三家可以获得更好的交易。'
        : 'Different lenders and loan types offer varying rates and fees. Shop around to get the best deal.'
    },
    {
      icon: 'calculator' as const,
      title: currency('code') === 'CNY' ? '考虑贷款期限' : 'Consider Loan Term',
      content: currency('code') === 'CNY'
        ? '15年房贷的月供较高，但总利息远低于30年房贷。根据您的财务状况做出选择。'
        : 'A 15-year mortgage has higher monthly payments but significantly less total interest than a 30-year loan.'
    },
    {
      icon: 'lightbulb' as const,
      title: currency('code') === 'CNY' ? '预留应急资金' : 'Keep Emergency Fund',
      content: currency('code') === 'CNY'
        ? '在购房后保留3-6个月的生活费作为应急资金，不要将所有积蓄用于首付。'
        : 'Keep 3-6 months of expenses as an emergency fund after buying. Don\'t deplete all savings for the down payment.'
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
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <CalculatorInput
                  label={t('form.homePrice')}
                  value={homePrice}
                  onChange={setHomePrice}
                  min={0}
                  max={50000000}
                  step={10000}
                  prefix={currency('symbol')}
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '房屋的购买价格'
                    : 'Purchase price of the home'}
                />

                <CalculatorInput
                  label={t('form.downPaymentPercent')}
                  value={downPaymentPercent}
                  onChange={setDownPaymentPercent}
                  min={0}
                  max={100}
                  step={1}
                  suffix="%"
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '首付占房价的比例'
                    : 'Down payment as percentage of home price'}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                    ? '抵押贷款的年利率'
                    : 'Annual interest rate for the mortgage'}
                />

                <CalculatorInput
                  label={t('form.loanTerm')}
                  value={loanTerm}
                  onChange={setLoanTerm}
                  min={1}
                  max={40}
                  step={1}
                  suffix=" 年"
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '贷款期限（年）'
                    : 'Loan term in years'}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <CalculatorInput
                  label={t('form.propertyTax')}
                  value={propertyTax}
                  onChange={setPropertyTax}
                  min={0}
                  max={100000}
                  step={100}
                  prefix={currency('symbol')}
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '年度房产税'
                    : 'Annual property tax'}
                />

                <CalculatorInput
                  label={t('form.homeInsurance')}
                  value={homeInsurance}
                  onChange={setHomeInsurance}
                  min={0}
                  max={50000}
                  step={100}
                  prefix={currency('symbol')}
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '年度房屋保险费'
                    : 'Annual home insurance premium'}
                />

                <CalculatorInput
                  label={t('form.hoaFees')}
                  value={hoaFees}
                  onChange={setHoaFees}
                  min={0}
                  max={20000}
                  step={50}
                  prefix={currency('symbol')}
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '月度业主协会费'
                    : 'Monthly HOA fees'}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateMortgage}
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
              {/* Main Monthly Payment */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 border-2 border-primary-200 shadow-card">
                <div className="text-center">
                  <div className="text-sm font-medium text-primary-900 mb-2">
                    {t('results.totalMonthlyPayment')}
                  </div>
                  <div className="text-5xl font-bold text-primary-600">
                    {formatCurrency(result.totalMonthlyPayment)}
                  </div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <ResultCard
                  title={t('results.loanAmount')}
                  value={formatCurrency(result.loanAmount)}
                  tooltip={currency('code') === 'CNY' ? '贷款金额' : 'Amount borrowed'}
                />
                <ResultCard
                  title={t('results.downPayment')}
                  value={formatCurrency(result.downPayment)}
                  tooltip={currency('code') === 'CNY' ? '首付金额' : 'Down payment amount'}
                />
                <ResultCard
                  title={t('results.totalInterest')}
                  value={formatCurrency(result.totalInterest)}
                  tooltip={currency('code') === 'CNY' ? '贷款期间的总利息' : 'Total interest over loan term'}
                />
              </div>

              {/* Payment Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {t('results.monthlyBreakdown')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">{t('results.principalInterest')}</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyPI)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">{t('results.propertyTax')}</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyPropertyTax)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">{t('results.homeInsurance')}</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyInsurance)}</span>
                    </div>
                    {result.monthlyPMI > 0 && (
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-700">{t('results.pmi')}</span>
                        <span className="font-semibold">{formatCurrency(result.monthlyPMI)}</span>
                      </div>
                    )}
                    {result.monthlyHOA > 0 && (
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-700">{t('results.hoaFees')}</span>
                        <span className="font-semibold">{formatCurrency(result.monthlyHOA)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pie Chart */}
                {chartData && (
                  <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {t('results.paymentDistribution')}
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <Doughnut data={chartData} options={chartOptions} />
                    </div>
                  </div>
                )}
              </div>

              {/* Balance Over Time Chart */}
              {balanceChartData && (
                <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t('results.balanceOverTime')}</h3>
                  <div style={{ height: '400px' }}>
                    <Line data={balanceChartData} options={lineChartOptions} />
                  </div>
                </div>
              )}

              {/* PMI Warning */}
              {result.monthlyPMI > 0 && (
                <div className="bg-warning-50 rounded-2xl p-6 border-2 border-warning-200 shadow-card">
                  <h3 className="text-lg font-bold text-warning-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">ℹ️</span>
                    {t('results.pmiNotice')}
                  </h3>
                  <p className="text-warning-800">
                    {t('results.pmiNoticeMessage')}
                  </p>
                </div>
              )}
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
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {currency('code') === 'CNY' ? '计算您的房贷' : 'Calculate Your Mortgage'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {currency('code') === 'CNY'
              ? '输入房屋详情并点击计算按钮，查看您的月供和还款计划'
              : 'Enter your home details and click calculate to see your monthly payment and payment plan'}
          </p>
        </div>
      )}
    </div>
  );
}
