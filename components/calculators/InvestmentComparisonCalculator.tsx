'use client';

import {useState} from 'react';
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
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import ExpertTips from '@/components/calculators/ExpertTips';
import {TrendingUp, BarChart3, Calculator, Award} from 'lucide-react';

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

interface InvestmentOption {
  name: string;
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  years: number;
  taxRate: number;
}

interface InvestmentResult {
  name: string;
  finalValue: number;
  totalContributions: number;
  totalReturns: number;
  afterTaxValue: number;
  growthData: number[];
}

export default function InvestmentComparisonCalculator() {
  const t = useTranslations('calculator.investmentComparison');
  const currency = useTranslations('common.currency');

  // Investment Option 1
  const [name1, setName1] = useState<string>('Stock Market Index Fund');
  const [initial1, setInitial1] = useState<number>(10000);
  const [monthly1, setMonthly1] = useState<number>(500);
  const [return1, setReturn1] = useState<number>(8);
  const [tax1, setTax1] = useState<number>(15);

  // Investment Option 2
  const [name2, setName2] = useState<string>('High-Yield Savings');
  const [initial2, setInitial2] = useState<number>(10000);
  const [monthly2, setMonthly2] = useState<number>(500);
  const [return2, setReturn2] = useState<number>(4);
  const [tax2, setTax2] = useState<number>(22);

  // Investment Option 3
  const [name3, setName3] = useState<string>('Real Estate Investment');
  const [initial3, setInitial3] = useState<number>(10000);
  const [monthly3, setMonthly3] = useState<number>(500);
  const [return3, setReturn3] = useState<number>(10);
  const [tax3, setTax3] = useState<number>(20);

  // Common parameters
  const [years, setYears] = useState<number>(20);

  const [results, setResults] = useState<InvestmentResult[] | null>(null);

  const calculateInvestment = (option: InvestmentOption): InvestmentResult => {
    const monthlyRate = option.annualReturn / 100 / 12;
    const months = option.years * 12;

    let balance = option.initialInvestment;
    const growthData: number[] = [balance];

    // Calculate growth over time
    for (let month = 1; month <= months; month++) {
      balance = balance * (1 + monthlyRate) + option.monthlyContribution;

      // Store yearly values
      if (month % 12 === 0) {
        growthData.push(balance);
      }
    }

    const totalContributions = option.initialInvestment + (option.monthlyContribution * months);
    const totalReturns = balance - totalContributions;
    const taxOnReturns = totalReturns * (option.taxRate / 100);
    const afterTaxValue = balance - taxOnReturns;

    return {
      name: option.name,
      finalValue: balance,
      totalContributions,
      totalReturns,
      afterTaxValue,
      growthData,
    };
  };

  const compareInvestments = () => {
    const option1: InvestmentOption = {
      name: name1,
      initialInvestment: initial1,
      monthlyContribution: monthly1,
      annualReturn: return1,
      years,
      taxRate: tax1,
    };

    const option2: InvestmentOption = {
      name: name2,
      initialInvestment: initial2,
      monthlyContribution: monthly2,
      annualReturn: return2,
      years,
      taxRate: tax2,
    };

    const option3: InvestmentOption = {
      name: name3,
      initialInvestment: initial3,
      monthlyContribution: monthly3,
      annualReturn: return3,
      years,
      taxRate: tax3,
    };

    const result1 = calculateInvestment(option1);
    const result2 = calculateInvestment(option2);
    const result3 = calculateInvestment(option3);

    setResults([result1, result2, result3]);
  };

  const growthChartData = results ? {
    labels: Array.from({length: years + 1}, (_, i) => `Year ${i}`),
    datasets: results.map((result, index) => ({
      label: result.name,
      data: result.growthData,
      borderColor: index === 0 ? 'rgb(59, 130, 246)' : index === 1 ? 'rgb(34, 197, 94)' : 'rgb(234, 88, 12)',
      backgroundColor: index === 0 ? 'rgba(59, 130, 246, 0.1)' : index === 1 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 88, 12, 0.1)',
      fill: true,
      tension: 0.4,
    })),
  } : null;

  const comparisonChartData = results ? {
    labels: results.map(r => r.name),
    datasets: [
      {
        label: t('chart.finalValue'),
        data: results.map(r => r.afterTaxValue),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: t('chart.totalReturns'),
        data: results.map(r => r.totalReturns),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
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

  const bestInvestment = results ? results.reduce((best, current) =>
    current.afterTaxValue > best.afterTaxValue ? current : best
  ) : null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <BarChart3 className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
        </div>

        {/* Common Parameters */}
        <div className="mb-8 pb-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('form.commonParams')}</h3>
          <CalculatorInput
            label={t('form.years')}
            value={years}
            onChange={setYears}
            min={1}
            max={50}
            step={1}
            suffix={t('form.yearsUnit')}
            tooltip={t('form.yearsTooltip')}
          />
        </div>

        {/* Investment Options */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Option 1 */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{t('form.investment')} 1</h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.investmentName')}
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
              />
            </div>

            <CalculatorInput
              label={t('form.initialInvestment')}
              value={initial1}
              onChange={setInitial1}
              min={0}
              max={1000000}
              step={1000}
              prefix={currency('symbol')}
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.monthlyContribution')}
              value={monthly1}
              onChange={setMonthly1}
              min={0}
              max={10000}
              step={100}
              prefix={currency('symbol')}
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.annualReturn')}
              value={return1}
              onChange={setReturn1}
              min={-10}
              max={30}
              step={0.5}
              suffix="%"
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.taxRate')}
              value={tax1}
              onChange={setTax1}
              min={0}
              max={50}
              step={1}
              suffix="%"
              showSlider={false}
            />
          </div>

          {/* Option 2 */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">{t('form.investment')} 2</h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.investmentName')}
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
              />
            </div>

            <CalculatorInput
              label={t('form.initialInvestment')}
              value={initial2}
              onChange={setInitial2}
              min={0}
              max={1000000}
              step={1000}
              prefix={currency('symbol')}
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.monthlyContribution')}
              value={monthly2}
              onChange={setMonthly2}
              min={0}
              max={10000}
              step={100}
              prefix={currency('symbol')}
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.annualReturn')}
              value={return2}
              onChange={setReturn2}
              min={-10}
              max={30}
              step={0.5}
              suffix="%"
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.taxRate')}
              value={tax2}
              onChange={setTax2}
              min={0}
              max={50}
              step={1}
              suffix="%"
              showSlider={false}
            />
          </div>

          {/* Option 3 */}
          <div className="bg-orange-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">{t('form.investment')} 3</h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.investmentName')}
              </label>
              <input
                type="text"
                value={name3}
                onChange={(e) => setName3(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
              />
            </div>

            <CalculatorInput
              label={t('form.initialInvestment')}
              value={initial3}
              onChange={setInitial3}
              min={0}
              max={1000000}
              step={1000}
              prefix={currency('symbol')}
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.monthlyContribution')}
              value={monthly3}
              onChange={setMonthly3}
              min={0}
              max={10000}
              step={100}
              prefix={currency('symbol')}
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.annualReturn')}
              value={return3}
              onChange={setReturn3}
              min={-10}
              max={30}
              step={0.5}
              suffix="%"
              showSlider={false}
            />

            <CalculatorInput
              label={t('form.taxRate')}
              value={tax3}
              onChange={setTax3}
              min={0}
              max={50}
              step={1}
              suffix="%"
              showSlider={false}
            />
          </div>
        </div>

        <button
          onClick={compareInvestments}
          className="w-full mt-8 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
        >
          <Calculator className="w-6 h-6 mr-2" />
          {t('form.calculate')}
        </button>
      </div>

      {results && bestInvestment && (
        <div className="space-y-8">
          {/* Winner Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 md:p-8 text-gray-900 shadow-lg">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">{t('results.bestInvestment')}</h3>
            </div>
            <p className="text-xl font-semibold mb-2">{bestInvestment.name}</p>
            <p className="text-lg">
              {t('results.afterTaxValue')}: <span className="font-bold">{currency('format', {value: Math.round(bestInvestment.afterTaxValue)})}</span>
            </p>
          </div>

          {/* Comparison Results */}
          <div className="grid md:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-card p-6 ${result === bestInvestment ? 'ring-2 ring-yellow-400' : ''}`}>
                <h4 className="text-lg font-bold text-gray-900 mb-4">{result.name}</h4>

                <ResultCard
                  title={t('results.finalValue')}
                  value={currency('format', {value: Math.round(result.finalValue)})}
                  icon={<TrendingUp className={`w-6 h-6 ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : 'text-orange-600'}`} />}
                />

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('results.totalContributions')}</span>
                    <span className="font-semibold text-gray-900">{currency('format', {value: Math.round(result.totalContributions)})}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('results.totalReturns')}</span>
                    <span className="font-semibold text-green-600">{currency('format', {value: Math.round(result.totalReturns)})}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-sm font-semibold text-gray-700">{t('results.afterTaxValue')}</span>
                    <span className="font-bold text-gray-900">{currency('format', {value: Math.round(result.afterTaxValue)})}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Growth Chart */}
          {growthChartData && (
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t('chart.growthTitle')}</h3>
              <div className="h-96">
                <Line data={growthChartData} options={chartOptions} />
              </div>
            </div>
          )}

          {/* Comparison Bar Chart */}
          {comparisonChartData && (
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t('chart.comparisonTitle')}</h3>
              <div className="h-96">
                <Bar data={comparisonChartData} options={chartOptions} />
              </div>
            </div>
          )}

          {/* Expert Tips */}
          <ExpertTips
            tips={[
              {
                icon: 'shield' as const,
                title: t('expertTips.tip1Title'),
                content: t('expertTips.tip1'),
              },
              {
                icon: 'calculator' as const,
                title: t('expertTips.tip2Title'),
                content: t('expertTips.tip2'),
              },
              {
                icon: 'trending' as const,
                title: t('expertTips.tip3Title'),
                content: t('expertTips.tip3'),
              },
              {
                icon: 'lightbulb' as const,
                title: t('expertTips.tip4Title'),
                content: t('expertTips.tip4'),
              },
            ]}
            locale={currency('locale')}
          />
        </div>
      )}
    </div>
  );
}
