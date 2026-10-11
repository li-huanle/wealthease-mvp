'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Line, Doughnut} from 'react-chartjs-2';
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
import {Umbrella, Calculator, TrendingUp, Shield, Building, PiggyBank, Info} from 'lucide-react';

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
  retirementSavings: number;
  employeeContributions: number;
  employerMatch: number;
  totalContributions: number;
  totalEarnings: number;
  yearsInRetirement: number;
  monthlyRetirementIncome: number;
  shortfall: number;
  isSufficient: boolean;
  recommendedMonthlySavings: number;
  savingsData: number[];
  employerMatchData: number[];
  years: number[];
}

// 2025/2026 401(k) and IRA contribution limits
const CONTRIBUTION_LIMITS_2025 = {
  '401k': 23500,
  '401kCatchUp': 31000,
  'ira': 7000,
  'iraCatchUp': 8000,
};

const CONTRIBUTION_LIMITS_2026 = {
  '401k': 24500,
  '401kCatchUp': 32500,
  'ira': 7500,
  'iraCatchUp': 8500,
};

export default function RetirementCalculator() {
  const t = useTranslations('calculator.retirement');
  const currency = useTranslations('common.currency');
  const isUS = currency('code') === 'USD';

  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [annualSavings, setAnnualSavings] = useState<number>(12000);
  const [monthlySavingsState, setMonthlySavingsState] = useState<number>(1000);
  const [retirementMonthlyExpenseState, setRetirementMonthlyExpenseState] = useState<number>(5000);

  // US-specific: 401(k) features
  const [has401k, setHas401k] = useState<boolean>(true);
  const [employerMatchPercent, setEmployerMatchPercent] = useState<number>(4); // Match 4% of salary
  const [employerMatchLimit, setEmployerMatchLimit] = useState<number>(50); // Match up to 50% of contribution
  const [salary, setSalary] = useState<number>(100000);
  const [contributeLimit, setContributeLimit] = useState<boolean>(true);

  // Compound frequency
  const [compoundFrequency, setCompoundFrequency] = useState<'monthly' | 'daily' | 'annually'>('monthly');

  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [retirementAnnualExpense, setRetirementAnnualExpense] = useState<number>(60000);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const monthlyRate = annualReturn / 100 / 12;
    const retirementMonthlyExpense = retirementMonthlyExpenseState;

    if (yearsToRetirement <= 0 || yearsInRetirement <= 0) return;

    let savings = currentSavings;
    const savingsData: number[] = [currentSavings];
    const years: number[] = [currentAge];

    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        savings = savings * (1 + monthlyRate) + monthlySavingsState;
      }
      savingsData.push(savings);
      years.push(currentAge + year);
    }

    const retirementSavings = savings;
    const totalRetirementNeeds = retirementAnnualExpense * 12 * yearsInRetirement;
    const monthlyRetirementIncome = (retirementSavings * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -yearsInRetirement * 12));

    let remainingSavings = retirementSavings;
    for (let year = 1; year <= yearsInRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        remainingSavings = remainingSavings * (1 + monthlyRate) - retirementAnnualExpense / 12;
        if (remainingSavings < 0) remainingSavings = 0;
      }
      savingsData.push(remainingSavings);
      years.push(retirementAge + year);
    }

    const shortfall = totalRetirementNeeds - retirementSavings;
    const isSufficient = retirementSavings >= totalRetirementNeeds;

    let recommendedMonthlySavings = monthlySavingsState;
    if (!isSufficient) {
      const fv = totalRetirementNeeds;
      const n = yearsToRetirement * 12;
      recommendedMonthlySavings = (fv - currentSavings * Math.pow(1 + monthlyRate, n)) * monthlyRate / (Math.pow(1 + monthlyRate, n) - 1);
    }

    setResult({
      retirementSavings,
      employeeContributions: annualSavings * yearsToRetirement,
      employerMatch: 0,
      totalContributions: annualSavings * yearsToRetirement,
      totalEarnings: retirementSavings - currentSavings - annualSavings * yearsToRetirement,
      yearsInRetirement,
      monthlyRetirementIncome,
      shortfall,
      isSufficient,
      recommendedMonthlySavings,
      savingsData,
      employerMatchData: new Array(yearsToRetirement).fill(0),
      years,
    });
  };

  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(65);
    setCurrentSavings(50000);
    setAnnualSavings(12000);
    setMonthlySavingsState(1000);
    setAnnualReturn(7);
    setRetirementAnnualExpense(60000);
    setRetirementMonthlyExpenseState(5000);
    setLifeExpectancy(85);
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
    labels: result.years,
    datasets: [
      {
        label: t('results.savingsOverTime'),
        data: result.savingsData,
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
      title: currency('code') === 'CNY' ? '尽早开始' : 'Start Early',
      content: currency('code') === 'CNY'
        ? '越早开始为退休储蓄，复利效应越显著。即使每月只储蓄少量资金，长期积累也能产生巨大收益。'
        : 'The earlier you start saving for retirement, the more powerful compound interest becomes. Even small monthly contributions can grow significantly over time.'
    },
    {
      icon: 'trending' as const,
      title: currency('code') === 'CNY' ? '多元化投资' : 'Diversify Investments',
      content: currency('code') === 'CNY'
        ? '分散投资可以降低风险。考虑将资金分配到股票、债券、现金等不同资产类别中。'
        : 'Diversification helps reduce risk. Consider allocating your investments across stocks, bonds, and cash for balanced growth.'
    },
    {
      icon: 'calculator' as const,
      title: currency('code') === 'CNY' ? '定期审查' : 'Regular Review',
      content: currency('code') === 'CNY'
        ? '每年审查一次您的退休计划，根据生活变化、收入增长和通货膨胀调整储蓄目标。'
        : 'Review your retirement plan annually and adjust your savings goals based on life changes, income growth, and inflation.'
    },
    {
      icon: 'shield' as const,
      title: currency('code') === 'CNY' ? '应急基金' : 'Emergency Fund',
      content: currency('code') === 'CNY'
        ? '在退休储蓄之前，先建立3-6个月生活费的应急基金，以应对意外支出。'
        : 'Before focusing on retirement savings, build an emergency fund covering 3-6 months of expenses to handle unexpected costs.'
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
              <div className="grid md:grid-cols-2 gap-6">
                <CalculatorInput
                  label={t('form.currentAge')}
                  value={currentAge}
                  onChange={setCurrentAge}
                  min={18}
                  max={100}
                  step={1}
                  tooltip={currency('code') === 'CNY'
                    ? '您当前的年龄，用于计算到退休还有多少年'
                    : 'Your current age, used to calculate years until retirement'}
                />

                <CalculatorInput
                  label={t('form.retirementAge')}
                  value={retirementAge}
                  onChange={setRetirementAge}
                  min={50}
                  max={100}
                  step={1}
                  tooltip={currency('code') === 'CNY'
                    ? '计划退休的年龄，通常为60-70岁'
                    : 'Planned retirement age, typically between 60-70'}
                />
              </div>

              <CalculatorInput
                label={t('form.currentSavings')}
                value={currentSavings}
                onChange={setCurrentSavings}
                min={0}
                max={10000000}
                step={1000}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '目前已为退休准备的储蓄总额'
                  : 'Total amount you have already saved for retirement'}
              />

              <CalculatorInput
                label={t('form.monthlySavings')}
                value={monthlySavingsState}
                onChange={setMonthlySavingsState}
                min={0}
                max={50000}
                step={100}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '每月计划为退休储蓄的金额'
                  : 'Amount you plan to save monthly for retirement'}
              />

              <CalculatorInput
                label={t('form.annualReturn')}
                value={annualReturn}
                onChange={setAnnualReturn}
                min={0}
                max={20}
                step={0.1}
                suffix="%"
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '投资组合的预期年化收益率'
                  : 'Expected annual return on your investment portfolio'}
              />

              <CalculatorInput
                label={t('form.retirementMonthlyExpense')}
                value={retirementMonthlyExpenseState}
                onChange={setRetirementMonthlyExpenseState}
                min={0}
                max={50000}
                step={100}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '退休后每月预计的生活支出'
                  : 'Estimated monthly living expenses during retirement'}
              />

              <CalculatorInput
                label={t('form.lifeExpectancy')}
                value={lifeExpectancy}
                onChange={setLifeExpectancy}
                min={60}
                max={120}
                step={1}
                tooltip={currency('code') === 'CNY'
                  ? '预期寿命，用于计算退休后需要多少年的资金'
                  : 'Life expectancy, used to calculate how many years of retirement income you need'}
              />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateRetirement}
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
              {/* Status Banner */}
              <div className={`rounded-2xl p-6 shadow-card ${
                result.isSufficient ? 'bg-success-50 border-2 border-success-200' : 'bg-warning-50 border-2 border-warning-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {result.isSufficient ? '✅' : '⚠️'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {result.isSufficient ? t('results.sufficient') : t('results.insufficient')}
                    </h3>
                    <p className="text-gray-700">
                      {result.isSufficient
                        ? t('results.sufficientMessage')
                        : t('results.insufficientMessage')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <ResultCard
                  title={t('results.retirementSavings')}
                  value={formatCurrency(result.retirementSavings)}
                  highlight
                  tooltip={currency('code') === 'CNY' ? '退休时可积累的总储蓄' : 'Total savings accumulated by retirement'}
                />
                <ResultCard
                  title={t('results.monthlyRetirementIncome')}
                  value={formatCurrency(result.monthlyRetirementIncome)}
                  tooltip={currency('code') === 'CNY' ? '每月可提取的退休收入' : 'Monthly withdrawal amount during retirement'}
                />
                <ResultCard
                  title={t('results.yearsInRetirement')}
                  value={`${result.yearsInRetirement} ${t('results.years')}`}
                  tooltip={currency('code') === 'CNY' ? '退休后需要资金支持的年数' : 'Number of years you need retirement income'}
                />
              </div>

              {/* Recommendation */}
              {!result.isSufficient && (
                <div className="bg-accent-50 rounded-2xl p-6 border-2 border-accent-200 shadow-card">
                  <h3 className="text-lg font-bold text-accent-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    {t('results.recommendation')}
                  </h3>
                  <p className="text-accent-800 mb-4">
                    {t('results.recommendationMessage')}
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-accent-200">
                    <div className="text-sm text-accent-900 mb-1">
                      {t('results.recommendedMonthlySavings')}
                    </div>
                    <div className="text-2xl font-bold text-accent-600">
                      {formatCurrency(result.recommendedMonthlySavings)}
                    </div>
                    <div className="text-sm text-accent-700 mt-2">
                      ({t('results.increase')}: {formatCurrency(result.recommendedMonthlySavings - monthlySavingsState)}/month)
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

        {/* Practical Tips Sidebar */}
        <div className="lg:col-span-1">
          <ExpertTips tips={expertTips} locale={currency('locale')} />
        </div>
      </div>

      {/* Empty State */}
      {!result && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">🏖️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {currency('code') === 'CNY' ? '规划您的退休生活' : 'Plan Your Retirement'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {currency('code') === 'CNY'
              ? '输入您的信息并点击计算按钮，查看您的退休储蓄计划'
              : 'Enter your information and click calculate to see your retirement savings plan'}
          </p>
        </div>
      )}
    </div>
  );
}
