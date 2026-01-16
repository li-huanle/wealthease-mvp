'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {Line, Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import type { ChartTooltipContext, ChartTickValue } from '@/types/chart';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import ExpertTips from '@/components/calculators/ExpertTips';
import {TrendingUp, Calculator, DollarSign, Calendar, Info} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Historical CPI data (US Bureau of Labor Statistics)
// Base: 1982-1984 = 100, adjusted to 2024 = ~314
const HISTORICAL_CPI: Record<number, number> = {
  1913: 29.7,
  1920: 20.0,
  1930: 16.7,
  1940: 14.0,
  1950: 24.1,
  1960: 29.6,
  1970: 38.8,
  1980: 82.4,
  1990: 130.7,
  2000: 172.2,
  2010: 218.1,
  2015: 237.0,
  2016: 240.0,
  2017: 245.1,
  2018: 251.1,
  2019: 255.7,
  2020: 258.8,
  2021: 270.7,
  2022: 292.3,
  2023: 304.7,
  2024: 314.0,
};

// Calculate CPI for any year using interpolation
function getCPIForYear(year: number): number {
  if (year in HISTORICAL_CPI) {
    return HISTORICAL_CPI[year];
  }

  // Find surrounding years and interpolate
  const years = Object.keys(HISTORICAL_CPI).map(Number).sort((a, b) => a - b);
  const prevYear = years.filter(y => y < year).pop();
  const nextYear = years.filter(y => y > year)[0];

  if (!prevYear || !nextYear) {
    // Extrapolate using average inflation rate (~3%)
    const baseYear = prevYear || nextYear;
    const baseCPI = HISTORICAL_CPI[baseYear];
    const yearsDiff = year - baseYear;
    return baseCPI * Math.pow(1.03, yearsDiff);
  }

  // Linear interpolation
  const prevCPI = HISTORICAL_CPI[prevYear];
  const nextCPI = HISTORICAL_CPI[nextYear];
  const ratio = (year - prevYear) / (nextYear - prevYear);
  return prevCPI + ratio * (nextCPI - prevCPI);
}

// Calculate average inflation rate between two years
function getAverageInflation(startYear: number, endYear: number): number {
  const startCPI = getCPIForYear(startYear);
  const endCPI = getCPIForYear(endYear);
  const years = endYear - startYear;
  return (Math.pow(endCPI / startCPI, 1 / years) - 1) * 100;
}

interface CalculationResult {
  originalAmount: number;
  adjustedAmount: number;
  inflationRate: number;
  totalInflation: number;
  purchasingPower: number;
  yearlyData: {
    year: number;
    cpi: number;
    value: number;
    cumulativeInflation: number;
  }[];
  comparisonData: {
    year: number;
    withInflation: number;
    withoutInflation: number;
  }[];
}

export default function InflationCalculator() {
  const t = useTranslations('calculator.inflation');
  const currency = useTranslations('common.currency');

  const [startYear, setStartYear] = useState<number>(1980);
  const [endYear, setEndYear] = useState<number>(2024);
  const [amount, setAmount] = useState<number>(100);
  const [customInflation, setCustomInflation] = useState<number>(3);
  const [useCustomInflation, setUseCustomInflation] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const currentYear = new Date().getFullYear();

  // Update end year when start year changes
  useEffect(() => {
    if (startYear >= endYear) {
      setEndYear(Math.min(startYear + 10, currentYear));
    }
  }, [startYear, endYear, currentYear]);

  const calculateInflation = () => {
    const startCPI = getCPIForYear(startYear);
    const endCPI = getCPIForYear(endYear);

    // Calculate inflation
    const totalInflation = (endCPI - startCPI) / startCPI;
    const inflationRate = useCustomInflation
      ? customInflation
      : getAverageInflation(startYear, endYear);

    const adjustedAmount = amount * (endCPI / startCPI);
    const purchasingPower = amount / adjustedAmount;

    // Generate yearly data
    const yearlyData: CalculationResult['yearlyData'] = [];
    const comparisonData: CalculationResult['comparisonData'] = [];

    for (let year = startYear; year <= endYear; year++) {
      const cpi = getCPIForYear(year);
      const value = amount * (cpi / startCPI);
      const cumulativeInflation = (cpi - startCPI) / startCPI;

      yearlyData.push({
        year,
        cpi,
        value,
        cumulativeInflation,
      });

      comparisonData.push({
        year,
        withInflation: value,
        withoutInflation: amount,
      });
    }

    setResult({
      originalAmount: amount,
      adjustedAmount,
      inflationRate,
      totalInflation,
      purchasingPower,
      yearlyData,
      comparisonData,
    });
  };

  const handleReset = () => {
    setStartYear(1980);
    setEndYear(2024);
    setAmount(100);
    setCustomInflation(3);
    setUseCustomInflation(false);
    setResult(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(currency('locale'), {
      style: 'currency',
      currency: currency('code'),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const lineChartData = result ? {
    labels: result.yearlyData.map(d => d.year),
    datasets: [
      {
        label: t('results.purchasingPower'),
        data: result.yearlyData.map(d => d.value),
        borderColor: '#486581',
        backgroundColor: 'rgba(72, 101, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  } : null;

  const barChartData = result ? {
    labels: result.yearlyData.map(d => d.year),
    datasets: [
      {
        label: t('results.valueWithInflation'),
        data: result.comparisonData.map(d => d.withInflation),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
      {
        label: t('results.originalAmount'),
        data: result.comparisonData.map(d => d.withoutInflation),
        backgroundColor: 'rgba(72, 101, 129, 0.8)',
        borderColor: 'rgb(72, 101, 129)',
        borderWidth: 1,
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
            return currency('symbol') + Number(value).toFixed(2);
          }
        }
      }
    }
  };

  const expertTips = [
    {
      icon: 'lightbulb' as const,
      title: t('results.expertTips.understanding.title'),
      content: t('results.expertTips.understanding.content'),
    },
    {
      icon: 'trending' as const,
      title: t('results.expertTips.investToBeat.title'),
      content: t('results.expertTips.investToBeat.content'),
    },
    {
      icon: 'calculator' as const,
      title: t('results.expertTips.adjustBudget.title'),
      content: t('results.expertTips.adjustBudget.content'),
    },
    {
      icon: 'shield' as const,
      title: t('results.expertTips.socialSecurity.title'),
      content: t('results.expertTips.socialSecurity.content'),
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-gray-100">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <CalculatorInput
                    label={t('form.startYear')}
                    value={startYear}
                    onChange={setStartYear}
                    min={1913}
                    max={currentYear - 1}
                    step={1}
                    tooltip="Year to calculate from (past)"
                  />
                </div>

                <div>
                  <CalculatorInput
                    label={t('form.endYear')}
                    value={endYear}
                    onChange={setEndYear}
                    min={startYear + 1}
                    max={currentYear}
                    step={1}
                    tooltip={`Year to calculate to (current: ${currentYear})`}
                  />
                </div>
              </div>

              <CalculatorInput
                label="Amount"
                value={amount}
                onChange={setAmount}
                min={0.01}
                max={1000000}
                step={1}
                prefix={currency('symbol')}
                showSlider
                tooltip="Amount in start year dollars"
              />

              {/* Custom Inflation Rate Option */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">{t('form.advancedOptions')}</span>
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={useCustomInflation}
                      onChange={(e) => setUseCustomInflation(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700">{t('form.useCustomRate')}</span>
                  </label>
                </div>

                {useCustomInflation && (
                  <CalculatorInput
                    label={t('form.customInflationRate')}
                    value={customInflation}
                    onChange={setCustomInflation}
                    min={0}
                    max={15}
                    step={0.1}
                    suffix="%"
                    tooltip="Expected average annual inflation rate"
                  />
                )}
              </div>

              {/* Info Box */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-700">
                  <strong>Historical Note:</strong> From {startYear} to {endYear},
                  the actual average inflation rate was {
                    useCustomInflation
                      ? `${customInflation}% (custom)`
                      : `${getAverageInflation(startYear, endYear).toFixed(2)}% (historical)`
                  }.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateInflation}
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
              {/* Main Result */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 border-2 border-primary-200 shadow-card">
                <div className="text-center">
                  <div className="text-sm font-medium text-primary-900 mb-2">
                    {t('results.whatEquals', { amount: formatCurrency(result.originalAmount), startYear, endYear })}
                  </div>
                  <div className="text-5xl font-bold text-primary-600 mb-4">
                    {formatCurrency(result.adjustedAmount)}
                  </div>
                  <div className="text-sm text-primary-800">
                    {t('results.thatsInflation', { inflation: (result.totalInflation * 100).toFixed(1), years: endYear - startYear })}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <ResultCard
                  title={t('results.originalAmount')}
                  value={formatCurrency(result.originalAmount)}
                  tooltip={`Value in ${startYear} dollars`}
                />
                <ResultCard
                  title={t('results.adjustedAmount')}
                  value={formatCurrency(result.adjustedAmount)}
                  tooltip={`Purchasing power in ${endYear} dollars`}
                />
                <ResultCard
                  title={t('results.purchasingPower')}
                  value={`${(result.purchasingPower * 100).toFixed(1)}%`}
                  tooltip={`Your ${startYear} dollar is worth this much in ${endYear}`}
                />
              </div>

              {/* Comparison Chart */}
              <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('results.comparisonChart')}</h3>
                <div style={{ height: '300px' }}>
                  {barChartData && <Bar data={barChartData} options={chartOptions} />}
                </div>
              </div>

              {/* Purchasing Power Over Time */}
              <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('results.purchasingPowerOverTime')}</h3>
                <div style={{ height: '300px' }}>
                  {lineChartData && <Line data={lineChartData} options={chartOptions} />}
                </div>
              </div>

              {/* Historical CPI Table */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                <button
                  onClick={() => {
                    const table = document.getElementById('cpi-table');
                    if (table) {
                      table.classList.toggle('hidden');
                    }
                  }}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <h3 className="text-lg font-bold text-gray-900">{t('results.historicalCPI')}</h3>
                  <span className="text-gray-500">▼</span>
                </button>
                <div id="cpi-table" className="hidden">
                  <div className="overflow-x-auto max-h-64">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold">{t('results.year')}</th>
                          <th className="px-4 py-2 text-right font-semibold">{t('results.cpi')}</th>
                          <th className="px-4 py-2 text-right font-semibold">{t('results.value')}</th>
                          <th className="px-4 py-2 text-right font-semibold">{t('results.inflation')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {result.yearlyData
                          .filter((d, i) => i % 5 === 0 || i === result.yearlyData.length - 1)
                          .map((d, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                              <td className="px-4 py-2 text-gray-900">{d.year}</td>
                              <td className="px-4 py-2 text-right text-gray-700">{d.cpi.toFixed(1)}</td>
                              <td className="px-4 py-2 text-right text-gray-900">{formatCurrency(d.value)}</td>
                              <td className="px-4 py-2 text-right text-red-600">{(d.cumulativeInflation * 100).toFixed(1)}%</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
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
          <div className="text-6xl mb-4">📈</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {t('form.title')}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {t('subtitle')}
          </p>
        </div>
      )}
    </div>
  );
}
