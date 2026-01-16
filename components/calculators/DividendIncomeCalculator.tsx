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
import {TrendingUp, DollarSign, Calculator, PieChart} from 'lucide-react';

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
  totalPortfolioValue: number;
  annualDividendIncome: number;
  monthlyDividendIncome: number;
  totalDividendsReceived: number;
  totalInvested: number;
  totalReturns: number;
  portfolioValueData: number[];
  annualDividendData: number[];
  years: number[];
}

export default function DividendIncomeCalculator() {
  const t = useTranslations('calculator.dividendIncome');
  const currency = useTranslations('common.currency');

  // Input states
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [dividendYield, setDividendYield] = useState<number>(4);
  const [dividendGrowthRate, setDividendGrowthRate] = useState<number>(5);
  const [stockPriceGrowth, setStockPriceGrowth] = useState<number>(6);
  const [reinvestDividends, setReinvestDividends] = useState<boolean>(true);
  const [yearsToInvest, setYearsToInvest] = useState<number>(20);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateDividendIncome = () => {
    if (yearsToInvest <= 0) return;

    let portfolioValue = initialInvestment;
    let totalInvested = initialInvestment;
    let totalDividendsReceived = 0;
    let currentDividendYield = dividendYield / 100;

    const portfolioValueData: number[] = [initialInvestment];
    const annualDividendData: number[] = [initialInvestment * currentDividendYield];
    const years: number[] = [0];

    for (let year = 1; year <= yearsToInvest; year++) {
      // Add monthly contributions throughout the year
      for (let month = 1; month <= 12; month++) {
        portfolioValue += monthlyContribution;
        totalInvested += monthlyContribution;
      }

      // Calculate annual dividend
      const annualDividend = portfolioValue * currentDividendYield;
      totalDividendsReceived += annualDividend;

      // Reinvest dividends if enabled
      if (reinvestDividends) {
        portfolioValue += annualDividend;
      }

      // Apply stock price growth
      portfolioValue *= (1 + stockPriceGrowth / 100);

      // Grow dividend yield (dividend growth)
      currentDividendYield *= (1 + dividendGrowthRate / 100);

      portfolioValueData.push(portfolioValue);
      annualDividendData.push(portfolioValue * currentDividendYield);
      years.push(year);
    }

    const finalAnnualDividend = portfolioValue * currentDividendYield;
    const finalMonthlyDividend = finalAnnualDividend / 12;
    const totalReturns = portfolioValue - totalInvested;

    setResult({
      totalPortfolioValue: portfolioValue,
      annualDividendIncome: finalAnnualDividend,
      monthlyDividendIncome: finalMonthlyDividend,
      totalDividendsReceived,
      totalInvested,
      totalReturns,
      portfolioValueData,
      annualDividendData,
      years,
    });
  };

  const portfolioChartData = result ? {
    labels: result.years.map(y => `Year ${y}`),
    datasets: [
      {
        label: t('chart.portfolioValue'),
        data: result.portfolioValueData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
    ],
  } : null;

  const dividendChartData = result ? {
    labels: result.years.map(y => `Year ${y}`),
    datasets: [
      {
        label: t('chart.annualDividend'),
        data: result.annualDividendData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  } : null;

  const compositionChartData = result ? {
    labels: [t('results.invested'), t('results.returns')],
    datasets: [
      {
        data: [result.totalInvested, result.totalReturns],
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
            <TrendingUp className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Investment Inputs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
              {t('form.investmentSection')}
            </h3>

            <CalculatorInput
              label={t('form.initialInvestment')}
              value={initialInvestment}
              onChange={setInitialInvestment}
              min={0}
              max={1000000}
              step={1000}
              prefix={currency('symbol')}
              tooltip={t('form.initialInvestmentTooltip')}
            />

            <CalculatorInput
              label={t('form.monthlyContribution')}
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              min={0}
              max={10000}
              step={100}
              prefix={currency('symbol')}
              suffix={t('form.perMonth')}
              tooltip={t('form.monthlyContributionTooltip')}
            />

            <CalculatorInput
              label={t('form.yearsToInvest')}
              value={yearsToInvest}
              onChange={setYearsToInvest}
              min={1}
              max={50}
              step={1}
              suffix={t('form.years')}
              tooltip={t('form.yearsToInvestTooltip')}
            />

            {/* Reinvest Checkbox */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reinvestDividends}
                  onChange={(e) => setReinvestDividends(e.target.checked)}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-3 text-sm font-semibold text-gray-700">
                  {t('form.reinvestDividends')}
                </span>
              </label>
              <p className="ml-8 mt-1 text-xs text-gray-500">
                {t('form.reinvestDividendsTooltip')}
              </p>
            </div>
          </div>

          {/* Dividend & Growth Inputs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
              {t('form.dividendSection')}
            </h3>

            <CalculatorInput
              label={t('form.dividendYield')}
              value={dividendYield}
              onChange={setDividendYield}
              min={0}
              max={15}
              step={0.1}
              suffix="%"
              tooltip={t('form.dividendYieldTooltip')}
            />

            <CalculatorInput
              label={t('form.dividendGrowthRate')}
              value={dividendGrowthRate}
              onChange={setDividendGrowthRate}
              min={0}
              max={15}
              step={0.5}
              suffix="%"
              tooltip={t('form.dividendGrowthRateTooltip')}
            />

            <CalculatorInput
              label={t('form.stockPriceGrowth')}
              value={stockPriceGrowth}
              onChange={setStockPriceGrowth}
              min={-10}
              max={20}
              step={0.5}
              suffix="%"
              tooltip={t('form.stockPriceGrowthTooltip')}
            />
          </div>
        </div>

        <button
          onClick={calculateDividendIncome}
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

            {/* Highlight Banner */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-6 text-white">
              <h4 className="text-xl font-bold mb-2">{t('results.projectedIncome')}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-green-100 text-sm mb-1">{t('results.monthlyDividend')}</p>
                  <p className="text-3xl font-bold">
                    {currency('format', {value: Math.round(result.monthlyDividendIncome)})}
                    <span className="text-sm ml-2">{t('form.perMonth')}</span>
                  </p>
                </div>
                <div>
                  <p className="text-green-100 text-sm mb-1">{t('results.annualDividend')}</p>
                  <p className="text-3xl font-bold">
                    {currency('format', {value: Math.round(result.annualDividendIncome)})}
                    <span className="text-sm ml-2">{t('form.perYear')}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ResultCard
                title={t('results.portfolioValue')}
                value={currency('format', {value: Math.round(result.totalPortfolioValue)})}
                icon={<PieChart className="w-6 h-6 text-blue-600" />}
                tooltip={t('results.portfolioValueTooltip')}
              />

              <ResultCard
                title={t('results.totalDividends')}
                value={currency('format', {value: Math.round(result.totalDividendsReceived)})}
                icon={<DollarSign className="w-6 h-6 text-green-600" />}
                tooltip={t('results.totalDividendsTooltip')}
              />

              <ResultCard
                title={t('results.totalInvested')}
                value={currency('format', {value: Math.round(result.totalInvested)})}
                icon={<DollarSign className="w-6 h-6 text-gray-600" />}
                tooltip={t('results.totalInvestedTooltip')}
              />

              <ResultCard
                title={t('results.totalReturns')}
                value={currency('format', {value: Math.round(result.totalReturns)})}
                icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
                highlight={true}
                tooltip={t('results.totalReturnsTooltip')}
              />
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Portfolio Value Chart */}
            {portfolioChartData && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t('chart.portfolioTitle')}</h3>
                <div className="h-80">
                  <Line data={portfolioChartData} options={chartOptions} />
                </div>
              </div>
            )}

            {/* Dividend Income Chart */}
            {dividendChartData && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t('chart.dividendTitle')}</h3>
                <div className="h-80">
                  <Line data={dividendChartData} options={chartOptions} />
                </div>
              </div>
            )}
          </div>

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
