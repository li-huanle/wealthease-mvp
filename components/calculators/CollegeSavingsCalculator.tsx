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
import {GraduationCap, TrendingUp, DollarSign, Calculator, PiggyBank} from 'lucide-react';

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
  totalSavings: number;
  totalCollegeCost: number;
  surplus: number;
  isSufficient: boolean;
  totalContributions: number;
  investmentEarnings: number;
  recommendedMonthlyContribution: number;
  savingsData: number[];
  collegeCostData: number[];
  years: number[];
}

export default function CollegeSavingsCalculator() {
  const t = useTranslations('calculator.collegeSavings');
  const currency = useTranslations('common.currency');

  // Input states
  const [childAge, setChildAge] = useState<number>(5);
  const [collegeAge, setCollegeAge] = useState<number>(18);
  const [currentSavings, setCurrentSavings] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(300);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [annualCollegeCost, setAnnualCollegeCost] = useState<number>(30000);
  const [collegeCostInflation, setCollegeCostInflation] = useState<number>(5);
  const [yearsInCollege, setYearsInCollege] = useState<number>(4);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateCollegeSavings = () => {
    const yearsUntilCollege = collegeAge - childAge;

    if (yearsUntilCollege <= 0) {
      return;
    }

    // Calculate savings growth until college
    let savings = currentSavings;
    let totalContributions = currentSavings;
    const monthlyReturn = expectedReturn / 100 / 12;

    const savingsData: number[] = [currentSavings];
    const collegeCostData: number[] = [];
    const years: number[] = [0];

    // Grow savings until college starts
    for (let year = 1; year <= yearsUntilCollege; year++) {
      for (let month = 1; month <= 12; month++) {
        savings = savings * (1 + monthlyReturn) + monthlyContribution;
        totalContributions += monthlyContribution;
      }
      savingsData.push(savings);
      years.push(year);
    }

    // Calculate total college costs
    let totalCollegeCost = 0;
    let currentYearCost = annualCollegeCost;

    // Project cost to start of college
    for (let year = 0; year < yearsUntilCollege; year++) {
      currentYearCost *= (1 + collegeCostInflation / 100);
    }

    // Calculate costs during college years
    for (let year = 0; year < yearsInCollege; year++) {
      totalCollegeCost += currentYearCost;
      collegeCostData.push(currentYearCost);
      currentYearCost *= (1 + collegeCostInflation / 100);
    }

    const totalSavings = savings;
    const surplus = totalSavings - totalCollegeCost;
    const investmentEarnings = totalSavings - totalContributions;

    // Calculate recommended monthly contribution if there's a shortfall
    let recommendedMonthlyContribution = monthlyContribution;
    if (surplus < 0) {
      // Use future value of annuity formula to calculate required monthly payment
      // FV = P * [((1 + r)^n - 1) / r]
      // We need to solve for P given FV = totalCollegeCost
      const n = yearsUntilCollege * 12;
      const futureValueFactor = (Math.pow(1 + monthlyReturn, n) - 1) / monthlyReturn;
      const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + monthlyReturn, n);
      const remainingNeeded = totalCollegeCost - futureValueOfCurrentSavings;
      recommendedMonthlyContribution = remainingNeeded / futureValueFactor;
    }

    setResult({
      totalSavings,
      totalCollegeCost,
      surplus,
      isSufficient: surplus >= 0,
      totalContributions,
      investmentEarnings,
      recommendedMonthlyContribution,
      savingsData,
      collegeCostData,
      years,
    });
  };

  const savingsChartData = result ? {
    labels: result.years.map(y => childAge + y),
    datasets: [
      {
        label: t('chart.savingsGrowth'),
        data: result.savingsData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  } : null;

  const compositionChartData = result ? {
    labels: [t('results.contributions'), t('results.earnings')],
    datasets: [
      {
        data: [result.totalContributions, result.investmentEarnings],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
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
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += currency('format', {value: Math.round(context.parsed.y)});
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + (value / 1000).toFixed(0) + 'k';
          }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <GraduationCap className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Child & Savings Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-primary-600" />
              {t('form.childInfo')}
            </h3>

            <CalculatorInput
              label={t('form.childAge')}
              value={childAge}
              onChange={setChildAge}
              min={0}
              max={17}
              step={1}
              suffix={t('form.years')}
              tooltip={t('form.childAgeTooltip')}
            />

            <CalculatorInput
              label={t('form.collegeAge')}
              value={collegeAge}
              onChange={setCollegeAge}
              min={childAge + 1}
              max={25}
              step={1}
              suffix={t('form.years')}
              tooltip={t('form.collegeAgeTooltip')}
            />

            <CalculatorInput
              label={t('form.currentSavings')}
              value={currentSavings}
              onChange={setCurrentSavings}
              min={0}
              max={500000}
              step={1000}
              prefix={currency('symbol')}
              tooltip={t('form.currentSavingsTooltip')}
            />

            <CalculatorInput
              label={t('form.monthlyContribution')}
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              min={0}
              max={5000}
              step={50}
              prefix={currency('symbol')}
              suffix={t('form.perMonth')}
              tooltip={t('form.monthlyContributionTooltip')}
            />

            <CalculatorInput
              label={t('form.expectedReturn')}
              value={expectedReturn}
              onChange={setExpectedReturn}
              min={0}
              max={15}
              step={0.5}
              suffix="%"
              tooltip={t('form.expectedReturnTooltip')}
            />
          </div>

          {/* College Cost Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
              {t('form.collegeCostInfo')}
            </h3>

            <CalculatorInput
              label={t('form.annualCollegeCost')}
              value={annualCollegeCost}
              onChange={setAnnualCollegeCost}
              min={5000}
              max={100000}
              step={1000}
              prefix={currency('symbol')}
              suffix={t('form.perYear')}
              tooltip={t('form.annualCollegeCostTooltip')}
            />

            <CalculatorInput
              label={t('form.collegeCostInflation')}
              value={collegeCostInflation}
              onChange={setCollegeCostInflation}
              min={0}
              max={10}
              step={0.5}
              suffix="%"
              tooltip={t('form.collegeCostInflationTooltip')}
            />

            <CalculatorInput
              label={t('form.yearsInCollege')}
              value={yearsInCollege}
              onChange={setYearsInCollege}
              min={1}
              max={8}
              step={1}
              suffix={t('form.years')}
              tooltip={t('form.yearsInCollegeTooltip')}
            />
          </div>
        </div>

        <button
          onClick={calculateCollegeSavings}
          className="w-full mt-8 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
        >
          <Calculator className="w-6 h-6 mr-2" />
          {t('form.calculate')}
        </button>
      </div>

      {result && (
        <div className="space-y-8">
          {/* Results Summary */}
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('results.title')}</h3>

            {/* Status Banner */}
            <div className={`rounded-xl p-6 mb-6 ${
              result.isSufficient
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : 'bg-gradient-to-r from-orange-500 to-orange-600'
            } text-white`}>
              <h4 className="text-xl font-bold mb-2">
                {result.isSufficient ? t('results.onTrack') : t('results.actionNeeded')}
              </h4>
              <p className="text-green-100">
                {result.isSufficient
                  ? t('results.onTrackMessage', {amount: currency('format', {value: Math.abs(result.surplus)})})
                  : t('results.shortfallMessage', {amount: currency('format', {value: Math.abs(result.surplus)})})}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ResultCard
                title={t('results.totalSavings')}
                value={currency('format', {value: Math.round(result.totalSavings)})}
                icon={<PiggyBank className="w-6 h-6 text-green-600" />}
                tooltip={t('results.totalSavingsTooltip')}
              />

              <ResultCard
                title={t('results.totalCollegeCost')}
                value={currency('format', {value: Math.round(result.totalCollegeCost)})}
                icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
                tooltip={t('results.totalCollegeCostTooltip')}
              />

              <ResultCard
                title={result.isSufficient ? t('results.surplus') : t('results.shortfall')}
                value={currency('format', {value: Math.abs(Math.round(result.surplus))})}
                icon={<TrendingUp className={`w-6 h-6 ${result.isSufficient ? 'text-green-600' : 'text-orange-600'}`} />}
                highlight={!result.isSufficient}
                tooltip={result.isSufficient ? t('results.surplusTooltip') : t('results.shortfallTooltip')}
              />

              <ResultCard
                title={t('results.investmentEarnings')}
                value={currency('format', {value: Math.round(result.investmentEarnings)})}
                icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
                tooltip={t('results.investmentEarningsTooltip')}
              />
            </div>

            {/* Recommendation if shortfall */}
            {!result.isSufficient && (
              <div className="mt-6 bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                  {t('results.recommendation')}
                </h5>
                <p className="text-gray-700 mb-3">{t('results.recommendationMessage')}</p>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <p className="text-sm text-gray-600 mb-1">{t('results.recommendedMonthly')}</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {currency('format', {value: Math.round(result.recommendedMonthlyContribution)})}
                    <span className="text-sm text-gray-500 ml-2">{t('form.perMonth')}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('results.increase')}: {currency('format', {value: Math.round(result.recommendedMonthlyContribution - monthlyContribution)})}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Savings Growth Chart */}
            {savingsChartData && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t('chart.savingsTitle')}</h3>
                <div className="h-80">
                  <Line data={savingsChartData} options={chartOptions} />
                </div>
              </div>
            )}

            {/* Portfolio Composition */}
            {compositionChartData && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t('chart.compositionTitle')}</h3>
                <div className="h-80 flex items-center justify-center">
                  <Doughnut data={compositionChartData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context: any) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${currency('format', {value: Math.round(value)})} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }} />
                </div>
              </div>
            )}
          </div>

          {/* Expert Tips */}
          <ExpertTips
            tips={[
              t('expertTips.tip1'),
              t('expertTips.tip2'),
              t('expertTips.tip3'),
              t('expertTips.tip4'),
            ]}
          />
        </div>
      )}
    </div>
  );
}
