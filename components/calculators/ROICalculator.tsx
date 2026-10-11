'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import ExpertTips from '@/components/calculators/ExpertTips';
import {Calculator} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CalculationResult {
  totalInvestment: number;
  totalReturn: number;
  netProfit: number;
  roi: number;
  annualizedROI: number;
  totalPeriodYears: number;
}

export default function ROICalculator() {
  const t = useTranslations('calculator.roi');
  const currency = useTranslations('common.currency');

  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(15000);
  const [additionalInvestment, setAdditionalInvestment] = useState<number>(0);
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState<number>(3);
  const [investmentPeriodMonths, setInvestmentPeriodMonths] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateROI = () => {
    const totalInvestment = initialInvestment + additionalInvestment;
    const totalReturn = finalValue;
    const netProfit = finalValue - totalInvestment;
    const roi = ((finalValue - totalInvestment) / totalInvestment) * 100;

    const totalPeriodYears = investmentPeriodYears + (investmentPeriodMonths / 12);

    const annualizedROI = totalPeriodYears > 0
      ? (Math.pow(finalValue / totalInvestment, 1 / totalPeriodYears) - 1) * 100
      : roi;

    setResult({
      totalInvestment,
      totalReturn,
      netProfit,
      roi,
      annualizedROI,
      totalPeriodYears,
    });
  };

  const handleReset = () => {
    setInitialInvestment(10000);
    setFinalValue(15000);
    setAdditionalInvestment(0);
    setInvestmentPeriodYears(3);
    setInvestmentPeriodMonths(0);
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

  const formatPercent = (value: number) => {
    return value.toFixed(2) + '%';
  };

  const chartData = result ? {
    labels: [t('results.invested'), t('results.currentValue'), t('results.profit')],
    datasets: [
      {
        label: t('results.amount'),
        data: [result.totalInvestment, result.totalReturn, result.netProfit],
        backgroundColor: [
          'rgba(72, 101, 129, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          result.netProfit >= 0 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(72, 101, 129)',
          'rgb(34, 197, 94)',
          result.netProfit >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
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
        display: false,
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
      title: currency('code') === 'CNY' ? '分散投资' : 'Diversify Investments',
      content: currency('code') === 'CNY'
        ? '不要把所有鸡蛋放在一个篮子里。分散投资可以降低风险并提高长期回报。'
        : 'Don\'t put all your eggs in one basket. Diversification helps reduce risk and improve long-term returns.'
    },
    {
      icon: 'trending' as const,
      title: currency('code') === 'CNY' ? '关注年化回报率' : 'Focus on Annualized Returns',
      content: currency('code') === 'CNY'
        ? '比较不同投资时，使用年化回报率（CAGR）来准确评估投资表现。'
        : 'Use annualized returns (CAGR) to accurately compare investment performance across different time periods.'
    },
    {
      icon: 'calculator' as const,
      title: currency('code') === 'CNY' ? '考虑投资成本' : 'Consider Investment Costs',
      content: currency('code') === 'CNY'
        ? '交易费用、管理费和税收会降低实际回报。计算ROI时要考虑这些成本。'
        : 'Trading fees, management fees, and taxes reduce your actual returns. Factor these costs into your ROI calculations.'
    },
    {
      icon: 'shield' as const,
      title: currency('code') === 'CNY' ? '长期投资视角' : 'Long-Term Perspective',
      content: currency('code') === 'CNY'
        ? '短期市场波动可能影响ROI。保持长期投资视角以获得更稳定的回报。'
        : 'Short-term market volatility can impact ROI. Maintain a long-term investment perspective for more stable returns.'
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
                  label={t('form.initialInvestment')}
                  value={initialInvestment}
                  onChange={setInitialInvestment}
                  min={0}
                  max={100000000}
                  step={100}
                  prefix={currency('symbol')}
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '初始投资金额'
                    : 'Initial investment amount'}
                />

                <CalculatorInput
                  label={t('form.finalValue')}
                  value={finalValue}
                  onChange={setFinalValue}
                  min={0}
                  max={100000000}
                  step={100}
                  prefix={currency('symbol')}
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '投资结束时的价值'
                    : 'Value at the end of investment period'}
                />
              </div>

              <CalculatorInput
                label={t('form.additionalInvestment')}
                value={additionalInvestment}
                onChange={setAdditionalInvestment}
                min={0}
                max={50000000}
                step={100}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '投资期间追加的金额'
                  : 'Additional amount invested during the period'}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <CalculatorInput
                  label={t('form.years')}
                  value={investmentPeriodYears}
                  onChange={setInvestmentPeriodYears}
                  min={0}
                  max={50}
                  step={1}
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '投资年限'
                    : 'Investment period in years'}
                />

                <CalculatorInput
                  label={t('form.months')}
                  value={investmentPeriodMonths}
                  onChange={setInvestmentPeriodMonths}
                  min={0}
                  max={11}
                  step={1}
                  showSlider
                  tooltip={currency('code') === 'CNY'
                    ? '额外的月份'
                    : 'Additional months'}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateROI}
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
                result.roi >= 0 ? 'bg-success-50 border-2 border-success-200' : 'bg-danger-50 border-2 border-danger-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {result.roi >= 0 ? '📈' : '📉'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {result.roi >= 0 ? t('results.profit') : t('results.loss')}
                    </h3>
                    <p className={result.roi >= 0 ? 'text-success-700' : 'text-danger-700'}>
                      {result.roi >= 0
                        ? t('results.profitMessage')
                        : t('results.lossMessage')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <ResultCard
                  title={t('results.roi')}
                  value={formatPercent(result.roi)}
                  subtitle={t('results.totalReturn') + ': ' + formatCurrency(result.netProfit)}
                  highlight
                  tooltip={currency('code') === 'CNY' ? '投资回报率百分比' : 'Return on investment percentage'}
                />
                <ResultCard
                  title={t('results.annualizedROI')}
                  value={formatPercent(result.annualizedROI)}
                  subtitle={t('results.period') + ': ' + result.totalPeriodYears.toFixed(1) + ' ' + t('results.years')}
                  tooltip={currency('code') === 'CNY' ? '年化回报率（CAGR）' : 'Annualized return (CAGR)'}
                />
              </div>

              {/* Investment Summary */}
              <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  {t('results.summary')}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      {t('results.totalInvested')}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(result.totalInvestment)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      {t('results.currentValue')}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(result.totalReturn)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      {t('results.netProfit')}
                    </div>
                    <div className={`text-2xl font-bold ${result.netProfit >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                      {formatCurrency(result.netProfit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('results.chartTitle')}</h3>
                <div style={{ height: '400px' }}>
                  {chartData && <Bar data={chartData} options={chartOptions} />}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-accent-50 rounded-2xl p-6 border-2 border-accent-200 shadow-card">
                <h3 className="text-lg font-bold text-accent-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">💡</span>
                  {t('results.understanding')}
                </h3>
                <div className="space-y-2 text-accent-800">
                  <p>
                    <strong>{t('results.roiLabel')}:</strong> {t('results.roiExplanation')}
                  </p>
                  <p>
                    <strong>{t('results.annualizedLabel')}:</strong> {t('results.annualizedExplanation')}
                  </p>
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
          <div className="text-6xl mb-4">📈</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {currency('code') === 'CNY' ? '计算投资回报' : 'Calculate ROI'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {currency('code') === 'CNY'
              ? '输入投资详情并点击计算按钮，查看您的投资回报率'
              : 'Enter your investment details and click calculate to see your return on investment'}
          </p>
        </div>
      )}
    </div>
  );
}
