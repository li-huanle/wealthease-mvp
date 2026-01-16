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
import type { ChartTooltipContext, ChartTickValue } from '@/types/chart';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import ExpertTips from '@/components/calculators/ExpertTips';
import {Calculator, TrendingUp, Home, DollarSign, Calendar, Shield, ChevronDown, ChevronUp} from 'lucide-react';

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

interface AmortizationEntry {
  year: number;
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

interface CalculationResult {
  loanAmount: number;
  downPayment: number;
  downPaymentPercent: number;
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
  amortizationSchedule: AmortizationEntry[];
  pmiCancelYear?: number;
}

export default function MortgageCalculator() {
  const t = useTranslations('calculator.mortgage');
  const currency = useTranslations('common.currency');
  const isUS = currency('code') === 'USD';

  // Form state
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(80000);
  const [downPaymentMode, setDownPaymentMode] = useState<'percent' | 'amount'>('percent');
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [propertyTax, setPropertyTax] = useState<number>(3600);
  const [homeInsurance, setHomeInsurance] = useState<number>(1200);
  const [hoaFees, setHoaFees] = useState<number>(0);
  const [pmiRate, setPmiRate] = useState<number>(0.5);
  const [pmiAutoCancel, setPmiAutoCancel] = useState<boolean>(true);

  // Refinance mode
  const [isRefinance, setIsRefinance] = useState<boolean>(false);
  const [currentLoanBalance, setCurrentLoanBalance] = useState<number>(300000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(7.5);
  const [cashOut, setCashOut] = useState<number>(0);

  // Display options
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [amortizationView, setAmortizationView] = useState<'yearly' | 'monthly'>('yearly');

  const [result, setResult] = useState<CalculationResult | null>(null);

  // Sync down payment values
  const handleDownPaymentPercentChange = (value: number) => {
    setDownPaymentPercent(value);
    setDownPaymentAmount((homePrice * value) / 100);
  };

  const handleDownPaymentAmountChange = (value: number) => {
    setDownPaymentAmount(value);
    setDownPaymentPercent((value / homePrice) * 100);
  };

  const calculateMortgage = () => {
    // Handle down payment mode
    const finalDownPayment = downPaymentMode === 'percent'
      ? (homePrice * downPaymentPercent) / 100
      : downPaymentAmount;

    const finalDownPaymentPercent = (finalDownPayment / homePrice) * 100;
    let loanAmount = homePrice - finalDownPayment;

    // Handle refinance mode
    if (isRefinance) {
      loanAmount = currentLoanBalance + cashOut;
    }

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPI = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Enhanced PMI calculation with auto-cancel
    let monthlyPMI = 0;
    let pmiCancelYear: number | undefined;

    if (finalDownPaymentPercent < 20 && !isRefinance) {
      const annualPMI = (loanAmount * pmiRate) / 100;
      monthlyPMI = annualPMI / 12;

      // Calculate when PMI will be canceled (when LTV reaches 78%)
      if (pmiAutoCancel) {
        let balance = loanAmount;
        for (let month = 1; month <= numberOfPayments; month++) {
          const interestPayment = balance * monthlyRate;
          const principalPayment = monthlyPI - interestPayment;
          balance -= principalPayment;

          // Check if balance is 78% of original home price
          if (balance <= homePrice * 0.78) {
            pmiCancelYear = Math.ceil(month / 12);
            break;
          }
        }
      }
    }

    const monthlyPropertyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHOA = hoaFees;

    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;

    // Calculate total payments with PMI consideration
    let totalPMI = 0;
    if (monthlyPMI > 0 && pmiCancelYear) {
      totalPMI = monthlyPMI * pmiCancelYear * 12;
    } else if (monthlyPMI > 0) {
      totalPMI = monthlyPMI * numberOfPayments;
    }

    const totalPayment = (monthlyPI * numberOfPayments) +
                        (monthlyPropertyTax * numberOfPayments) +
                        (monthlyInsurance * numberOfPayments) +
                        totalPMI +
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

    // Generate detailed amortization schedule
    const amortizationSchedule: AmortizationEntry[] = [];
    let balance = loanAmount;
    let cumulativeInterest = 0;
    const balanceData: number[] = [loanAmount];
    const years: number[] = [0];

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      balance -= principalPayment;
      cumulativeInterest += interestPayment;

      if (balance < 0) balance = 0;

      // Add to amortization schedule
      amortizationSchedule.push({
        year: Math.ceil(month / 12),
        month,
        payment: monthlyPI,
        principal: principalPayment,
        interest: interestPayment,
        balance,
        cumulativeInterest,
      });

      if (month % 12 === 0 || month === numberOfPayments) {
        balanceData.push(balance);
        years.push(month / 12);
      }
    }

    setResult({
      loanAmount,
      downPayment: finalDownPayment,
      downPaymentPercent: finalDownPaymentPercent,
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
      amortizationSchedule,
      pmiCancelYear,
    });
  };

  const handleReset = () => {
    setHomePrice(400000);
    setDownPaymentPercent(20);
    setDownPaymentAmount(80000);
    setDownPaymentMode('percent');
    setInterestRate(6.5);
    setLoanTerm(30);
    setPropertyTax(3600);
    setHomeInsurance(1200);
    setHoaFees(0);
    setPmiRate(0.5);
    setPmiAutoCancel(true);
    setIsRefinance(false);
    setCurrentLoanBalance(300000);
    setCurrentInterestRate(7.5);
    setCashOut(0);
    setShowAmortization(false);
    setResult(null);
  };

  // US-style currency formatting
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format date in US style (MM/DD/YYYY)
  const formatUSDate = (date: Date) => {
    return date.toLocaleDateString('en-US');
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
          label: function(context: ChartTooltipContext) {
            const value = typeof context.parsed === 'number' ? context.parsed : 0;
            return context.label + ': ' + formatCurrency(value);
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
          label: function(context: ChartTooltipContext) {
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y ?? 0);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: ChartTickValue) {
            return formatCurrency(Number(value));
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
      {/* Refinance Mode Toggle (US only) */}
      {isUS && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">
                {isRefinance ? 'Refinance Mode' : 'Purchase Mode'}
              </span>
            </div>
            <button
              onClick={() => setIsRefinance(!isRefinance)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isRefinance ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isRefinance ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {isRefinance && (
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Loan Balance
                </label>
                <input
                  type="number"
                  value={currentLoanBalance}
                  onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="$300,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={currentInterestRate}
                  onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="7.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cash Out Amount (Optional)
                </label>
                <input
                  type="number"
                  value={cashOut}
                  onChange={(e) => setCashOut(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="$0"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-gray-100">
            <div className="space-y-6">
              {!isRefinance && (
                <CalculatorInput
                  label={t('form.homePrice')}
                  value={homePrice}
                  onChange={setHomePrice}
                  min={0}
                  max={50000000}
                  step={10000}
                  prefix="$"
                  showSlider
                  tooltip="Purchase price of the home"
                />
              )}

              {/* Down Payment with Mode Toggle */}
              {!isRefinance && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Down Payment
                    </label>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setDownPaymentMode('percent')}
                        className={`px-3 py-1 rounded text-sm font-medium transition ${
                          downPaymentMode === 'percent'
                            ? 'bg-white text-gray-900 shadow'
                            : 'text-gray-600'
                        }`}
                      >
                        %
                      </button>
                      <button
                        onClick={() => setDownPaymentMode('amount')}
                        className={`px-3 py-1 rounded text-sm font-medium transition ${
                          downPaymentMode === 'amount'
                            ? 'bg-white text-gray-900 shadow'
                            : 'text-gray-600'
                        }`}
                      >
                        $
                      </button>
                    </div>
                  </div>
                  {downPaymentMode === 'percent' ? (
                    <CalculatorInput
                      label=""
                      value={downPaymentPercent}
                      onChange={handleDownPaymentPercentChange}
                      min={0}
                      max={100}
                      step={1}
                      suffix="%"
                      showSlider
                      tooltip="Down payment as percentage of home price"
                    />
                  ) : (
                    <CalculatorInput
                      label=""
                      value={downPaymentAmount}
                      onChange={handleDownPaymentAmountChange}
                      min={0}
                      max={homePrice}
                      step={1000}
                      prefix="$"
                      showSlider
                      tooltip="Down payment amount"
                    />
                  )}
                  <div className="text-sm text-gray-500 mt-1">
                    {downPaymentMode === 'percent'
                      ? `Amount: ${formatCurrency(downPaymentAmount)}`
                      : `Percent: ${downPaymentPercent.toFixed(1)}%`}
                  </div>
                </div>
              )}

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
                  prefix="$"
                  showSlider
                  tooltip="Annual property tax"
                />

                <CalculatorInput
                  label={t('form.homeInsurance')}
                  value={homeInsurance}
                  onChange={setHomeInsurance}
                  min={0}
                  max={50000}
                  step={100}
                  prefix="$"
                  showSlider
                  tooltip="Annual home insurance premium"
                />

                <CalculatorInput
                  label={t('form.hoaFees')}
                  value={hoaFees}
                  onChange={setHoaFees}
                  min={0}
                  max={20000}
                  step={50}
                  prefix="$"
                  showSlider
                  tooltip="Monthly HOA fees"
                />
              </div>

              {/* PMI Settings (US only) */}
              {isUS && !isRefinance && (
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">
                        PMI Settings
                      </span>
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={pmiAutoCancel}
                        onChange={(e) => setPmiAutoCancel(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-gray-700">Auto-cancel at 78% LTV</span>
                    </label>
                  </div>
                  <CalculatorInput
                    label="PMI Rate (%)"
                    value={pmiRate}
                    onChange={setPmiRate}
                    min={0}
                    max={2}
                    step={0.05}
                    suffix="%"
                    tooltip="Annual PMI rate (typically 0.3-1.5%)"
                  />
                </div>
              )}

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

              {/* PMI Warning with Cancel Year */}
              {result.monthlyPMI > 0 && (
                <div className="bg-warning-50 rounded-2xl p-6 border-2 border-warning-200 shadow-card">
                  <h3 className="text-lg font-bold text-warning-900 mb-3 flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    PMI Notice
                  </h3>
                  <p className="text-warning-800 mb-3">
                    Your down payment is less than 20%, so PMI is required.
                    {result.pmiCancelYear && (
                      <span className="font-semibold">
                        {' '}Based on your payments, PMI will be automatically canceled after approximately{' '}
                        <span className="font-bold">{result.pmiCancelYear} years</span>.
                      </span>
                    )}
                  </p>
                  {!result.pmiCancelYear && (
                    <p className="text-warning-700 text-sm">
                      Consider increasing your down payment to 20% to avoid PMI and save {formatCurrency(result.monthlyPMI * 12 * loanTerm)} over the life of the loan.
                    </p>
                  )}
                </div>
              )}

              {/* Amortization Schedule Toggle */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-gray-900">
                      Amortization Schedule
                    </span>
                  </div>
                  {showAmortization ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {showAmortization && (
                  <div className="border-t border-gray-200">
                    {/* View Toggle */}
                    <div className="px-6 py-3 bg-gray-50 flex items-center justify-between border-b">
                      <span className="text-sm text-gray-700">View by:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAmortizationView('yearly')}
                          className={`px-3 py-1 rounded text-sm font-medium transition ${
                            amortizationView === 'yearly'
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300'
                          }`}
                        >
                          Yearly
                        </button>
                        <button
                          onClick={() => setAmortizationView('monthly')}
                          className={`px-3 py-1 rounded text-sm font-medium transition ${
                            amortizationView === 'monthly'
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300'
                          }`}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>

                    {/* Schedule Table */}
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900">
                              {amortizationView === 'yearly' ? 'Year' : 'Month'}
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-900">Payment</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-900">Principal</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-900">Interest</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-900">Balance</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-900">Total Interest</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {result.amortizationSchedule
                            .filter((entry, index, arr) => {
                              if (amortizationView === 'monthly') return true;
                              // Show yearly data (first month of each year or last payment)
                              return entry.month === 1 || index === arr.length - 1 || (result.amortizationSchedule[index + 1] && result.amortizationSchedule[index + 1].year !== entry.year);
                            })
                            .map((entry, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-900">
                                  {amortizationView === 'yearly' ? entry.year : entry.month}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-900">
                                  {formatCurrency(entry.payment)}
                                </td>
                                <td className="px-4 py-3 text-right text-green-700">
                                  {formatCurrency(entry.principal)}
                                </td>
                                <td className="px-4 py-3 text-right text-red-700">
                                  {formatCurrency(entry.interest)}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-900">
                                  {formatCurrency(entry.balance)}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-600">
                                  {formatCurrency(entry.cumulativeInterest)}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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
