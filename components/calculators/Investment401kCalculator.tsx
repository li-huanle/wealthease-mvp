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
import type { ChartTooltipContext, ChartTickValue } from '@/types/chart';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import ExpertTips from '@/components/calculators/ExpertTips';
import {Building, Calculator, TrendingUp, Shield, PiggyBank, Info} from 'lucide-react';

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
  recommendedAnnualSavings: number;
  savingsData: number[];
  employerMatchData: number[];
  years: number[];
}

// 2025/2026 401(k) and IRA contribution limits
const CONTRIBUTION_LIMITS = {
  '401k': 23500,
  '401kCatchUp': 31000,
  'ira': 7000,
  'iraCatchUp': 8000,
};

export default function Investment401kCalculator() {
  const t = useTranslations('calculator.investment401k');
  const currency = useTranslations('common.currency');

  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [annualSavings, setAnnualSavings] = useState<number>(12000);

  // 401(k) features
  const [has401k, setHas401k] = useState<boolean>(true);
  const [employerMatchPercent, setEmployerMatchPercent] = useState<number>(4);
  const [employerMatchLimit, setEmployerMatchLimit] = useState<number>(50);
  const [salary, setSalary] = useState<number>(100000);
  const [isCatchUp, setIsCatchUp] = useState<boolean>(false);

  // Compound frequency
  const [compoundFrequency, setCompoundFrequency] = useState<'monthly' | 'daily' | 'annually'>('monthly');

  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [retirementAnnualExpense, setRetirementAnnualExpense] = useState<number>(60000);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    if (yearsToRetirement <= 0 || yearsInRetirement <= 0) return;

    // Calculate contribution limit
    const contributionLimit = isCatchUp ? CONTRIBUTION_LIMITS['401kCatchUp'] : CONTRIBUTION_LIMITS['401k'];
    let employeeContribution = annualSavings;

    // Warn if over limit
    if (has401k && employeeContribution > contributionLimit) {
      employeeContribution = contributionLimit;
    }

    // Calculate employer match
    let employerMatch = 0;
    if (has401k) {
      const matchCap = salary * (employerMatchPercent / 100);
      const maxMatch = (employeeContribution * employerMatchLimit) / 100;
      employerMatch = Math.min(matchCap, maxMatch);
    }

    const totalAnnualContribution = employeeContribution + employerMatch;

    // Calculate compound rate based on frequency
    let periodsPerYear = 12;
    if (compoundFrequency === 'daily') periodsPerYear = 365;
    if (compoundFrequency === 'annually') periodsPerYear = 1;

    const ratePerPeriod = annualReturn / 100 / periodsPerYear;
    const totalPeriods = yearsToRetirement * periodsPerYear;

    let savings = currentSavings;
    let totalEmployeeContrib = 0;
    let totalEmployerMatch = 0;

    const savingsData: number[] = [currentSavings];
    const employerMatchData: number[] = [0];
    const years: number[] = [currentAge];

    // Year-by-year tracking
    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let period = 1; period <= periodsPerYear; period++) {
        const contribution = totalAnnualContribution / periodsPerYear;
        const employerContribution = employerMatch / periodsPerYear;

        savings = savings * (1 + ratePerPeriod) + contribution;
        totalEmployeeContrib += employeeContribution / periodsPerYear;
        totalEmployerMatch += employerContribution / periodsPerYear;
      }

      savingsData.push(savings);
      employerMatchData.push(totalEmployerMatch);
      years.push(currentAge + year);
    }

    const retirementSavings = savings;
    const employeeContributions = totalEmployeeContrib;
    const totalMatch = totalEmployerMatch;
    const totalContributions = employeeContributions + totalMatch;
    const totalEarnings = retirementSavings - currentSavings - totalContributions;

    // Calculate retirement income
    const monthlyRate = annualReturn / 100 / 12;
    const totalRetirementNeeds = retirementAnnualExpense * yearsInRetirement;
    const monthlyRetirementIncome = (retirementSavings * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -yearsInRetirement * 12));

    const shortfall = totalRetirementNeeds - retirementSavings;
    const isSufficient = retirementSavings >= totalRetirementNeeds;

    let recommendedAnnualSavings = annualSavings;
    if (!isSufficient) {
      const fv = totalRetirementNeeds;
      const n = yearsToRetirement;
      recommendedAnnualSavings = ((fv - currentSavings * Math.pow(1 + annualReturn / 100, n)) * (annualReturn / 100)) /
                               (Math.pow(1 + annualReturn / 100, n) - 1);
    }

    setResult({
      retirementSavings,
      employeeContributions,
      employerMatch: totalMatch,
      totalContributions,
      totalEarnings,
      yearsInRetirement,
      monthlyRetirementIncome,
      shortfall,
      isSufficient,
      recommendedAnnualSavings,
      savingsData,
      employerMatchData,
      years,
    });
  };

  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(65);
    setCurrentSavings(50000);
    setAnnualSavings(12000);
    setHas401k(true);
    setEmployerMatchPercent(4);
    setEmployerMatchLimit(50);
    setSalary(100000);
    setIsCatchUp(false);
    setCompoundFrequency('monthly');
    setAnnualReturn(7);
    setRetirementAnnualExpense(60000);
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
        label: t('results.totalAtRetirement'),
        data: result.savingsData,
        borderColor: '#486581',
        backgroundColor: 'rgba(72, 101, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  } : null;

  const pieChartData = result ? {
    labels: [t('results.yourContributions'), t('results.employerMatch'), t('results.investmentEarnings'), 'Starting Balance'],
    datasets: [
      {
        data: [
          result.employeeContributions,
          result.employerMatch,
          result.totalEarnings,
          currentSavings,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(168, 85, 247)',
          'rgb(251, 191, 36)',
          'rgb(107, 114, 128)',
        ],
        borderWidth: 2,
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
        text: t('results.savingsGrowth'),
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: function(context: ChartTooltipContext) {
            return 'Savings: ' + formatCurrency(context.parsed.y ?? 0);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: ChartTickValue) {
            return currency('symbol') + (Number(value) / 1000).toFixed(0) + 'k';
          }
        }
      }
    }
  };

  const expertTips = [
    {
      icon: 'lightbulb' as const,
      title: t('form.tips.maximizeMatch.title'),
      content: t('form.tips.maximizeMatch.content'),
    },
    {
      icon: 'trending' as const,
      title: t('form.tips.catchUp.title'),
      content: t('form.tips.catchUp.content'),
    },
    {
      icon: 'calculator' as const,
      title: t('form.tips.diversify.title'),
      content: t('form.tips.diversify.content'),
    },
    {
      icon: 'shield' as const,
      title: t('form.tips.review.title'),
      content: t('form.tips.review.content'),
    }
  ];

  const contributionLimit = isCatchUp ? CONTRIBUTION_LIMITS['401kCatchUp'] : CONTRIBUTION_LIMITS['401k'];
  const isOverLimit = annualSavings > contributionLimit;

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-gray-100">
            <div className="space-y-6">
              {/* 401(k) Toggle */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">{t('form.has401k')}</span>
                  </div>
                  <button
                    onClick={() => setHas401k(!has401k)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      has401k ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        has401k ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <CalculatorInput
                  label={t('form.currentAge')}
                  value={currentAge}
                  onChange={setCurrentAge}
                  min={18}
                  max={80}
                  step={1}
                  tooltip="Your current age"
                />

                <CalculatorInput
                  label={t('form.retirementAge')}
                  value={retirementAge}
                  onChange={setRetirementAge}
                  min={50}
                  max={80}
                  step={1}
                  tooltip="Planned retirement age (typically 65-67 for Social Security)"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <CalculatorInput
                  label={t('form.currentSavings')}
                  value={currentSavings}
                  onChange={setCurrentSavings}
                  min={0}
                  max={10000000}
                  step={1000}
                  prefix={currency('symbol')}
                  showSlider
                  tooltip="Total amount already saved in retirement accounts"
                />

                <CalculatorInput
                  label={t('form.annualSalary')}
                  value={salary}
                  onChange={setSalary}
                  min={0}
                  max={1000000}
                  step={5000}
                  prefix={currency('symbol')}
                  showSlider
                  tooltip="Your current annual salary (for employer match calculation)"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <CalculatorInput
                    label="Annual Contribution"
                    value={annualSavings}
                    onChange={setAnnualSavings}
                    min={0}
                    max={has401k ? contributionLimit : 100000}
                    step={500}
                    prefix="$"
                    showSlider
                    tooltip="Amount you plan to contribute annually"
                  />
                  {has401k && (
                    <div className="mt-2 flex items-start gap-2 text-sm">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-gray-600">
                        2025 limit: <span className="font-semibold">{formatCurrency(contributionLimit)}</span>
                        {isCatchUp && ' (Catch-Up)'}
                        {isOverLimit && <span className="text-red-600 font-semibold"> - Exceeds limit!</span>}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={isCatchUp}
                      onChange={(e) => setIsCatchUp(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Catch-Up Contribution (Age 50+)
                    </span>
                  </label>
                  <div className="text-xs text-gray-500">
                    Additional contribution if you're 50 or older
                  </div>
                </div>
              </div>

              {/* Employer Match Section */}
              {has401k && (
                <div className="bg-blue-50 rounded-xl p-4 space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <PiggyBank className="w-4 h-4" />
                    Employer Match Details
                  </h4>

                  <div className="grid md:grid-cols-2 gap-4">
                    <CalculatorInput
                      label="Employer Match %"
                      value={employerMatchPercent}
                      onChange={setEmployerMatchPercent}
                      min={0}
                      max={10}
                      step={0.5}
                      suffix="%"
                      tooltip="Percentage of salary employer matches (e.g., 4%)"
                    />

                    <CalculatorInput
                      label="Match Limit"
                      value={employerMatchLimit}
                      onChange={setEmployerMatchLimit}
                      min={0}
                      max={100}
                      step={5}
                      suffix="%"
                      tooltip="Employer matches up to this % of your contribution"
                    />
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="text-sm text-gray-700">
                      <strong>Estimated Employer Match:</strong> {formatCurrency((salary * employerMatchPercent / 100))}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <CalculatorInput
                  label="Expected Annual Return"
                  value={annualReturn}
                  onChange={setAnnualReturn}
                  min={0}
                  max={15}
                  step={0.1}
                  suffix="%"
                  showSlider
                  tooltip="Expected annual return on your investments"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compound Frequency
                  </label>
                  <select
                    value={compoundFrequency}
                    onChange={(e) => setCompoundFrequency(e.target.value as 'monthly' | 'daily' | 'annually')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="daily">Daily</option>
                    <option value="annually">Annually</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">How often investment returns compound</p>
                </div>
              </div>

              <CalculatorInput
                label="Annual Retirement Expenses"
                value={retirementAnnualExpense}
                onChange={setRetirementAnnualExpense}
                min={0}
                max={200000}
                step={1000}
                prefix="$"
                showSlider
                tooltip="Expected annual expenses during retirement"
              />

              <CalculatorInput
                label="Life Expectancy"
                value={lifeExpectancy}
                onChange={setLifeExpectancy}
                min={70}
                max={100}
                step={1}
                tooltip="Expected age to estimate retirement duration"
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
              <div className={`rounded-2xl p-6 shadow-card border-2 ${
                result.isSufficient ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {result.isSufficient ? '✅' : '⚠️'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {result.isSufficient ? t('results.onTrack') : t('results.actionNeeded')}
                    </h3>
                    <p className="text-gray-700">
                      {result.isSufficient
                        ? t('results.onTrackMessage', { years: result.yearsInRetirement })
                        : t('results.actionNeededMessage', { amount: formatCurrency(result.shortfall) })
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Result Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <ResultCard
                  title={t('results.totalAtRetirement')}
                  value={formatCurrency(result.retirementSavings)}
                  highlight
                  tooltip="Total savings accumulated by retirement"
                />
                <ResultCard
                  title={t('results.monthlyRetirementIncome')}
                  value={formatCurrency(result.monthlyRetirementIncome)}
                  tooltip="Monthly withdrawal amount during retirement"
                />
              </div>

              {/* Contribution Breakdown */}
              <div className="grid md:grid-cols-3 gap-4">
                <ResultCard
                  title={t('results.yourContributions')}
                  value={formatCurrency(result.employeeContributions)}
                  tooltip="Total amount you contributed"
                />
                <ResultCard
                  title={t('results.employerMatch')}
                  value={formatCurrency(result.employerMatch)}
                  tooltip="Free money from your employer"
                />
                <ResultCard
                  title={t('results.investmentEarnings')}
                  value={formatCurrency(result.totalEarnings)}
                  tooltip="Total investment gains"
                />
              </div>

              {/* Pie Chart */}
              {pieChartData && (
                <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t('results.portfolioComposition')}</h3>
                  <div className="h-64 flex items-center justify-center">
                    <Doughnut
                      data={pieChartData}
                      options={{
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
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Growth Chart */}
              <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('results.savingsGrowth')}</h3>
                <div style={{ height: '400px' }}>
                  {chartData && <Line data={chartData} options={chartOptions} />}
                </div>
              </div>

              {/* Recommendation */}
              {!result.isSufficient && (
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 shadow-card">
                  <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    {t('results.recommendation')}
                  </h3>
                  <p className="text-blue-800 mb-4">
                    {t('results.recommendationMessage')}
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <div className="text-sm text-blue-900 mb-1">{t('results.recommendedAnnualSavings')}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(result.recommendedAnnualSavings)}
                    </div>
                    <div className="text-sm text-blue-700 mt-2">
                      ({t('results.increase')}: {formatCurrency(result.recommendedAnnualSavings - annualSavings)}/year)
                    </div>
                  </div>
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
          <div className="text-6xl mb-4">🏖️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {t('form.title')}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Enter your information and click calculate to see your 401(k) retirement projection
          </p>
        </div>
      )}
    </div>
  );
}
