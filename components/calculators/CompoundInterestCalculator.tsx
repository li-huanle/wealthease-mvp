'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
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
import {TrendingUp, Calculator, Lightbulb, Shield} from 'lucide-react';

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
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  yearlyData: {
    year: number;
    balance: number;
    contributions: number;
    interest: number;
  }[];
}

export default function CompoundInterestCalculator() {
  const t = useTranslations('calculator.compound');
  const currency = useTranslations('common.currency');

  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [years, setYears] = useState<number>(20);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateCompoundInterest = () => {
    const principal = initialInvestment || 0;
    const monthly = monthlyContribution || 0;
    const rate = (annualReturn || 0) / 100;
    const time = years || 0;

    if (time <= 0) return;

    const yearlyData: CalculationResult['yearlyData'] = [];
    let balance = principal;
    let totalContributed = principal;

    for (let year = 1; year <= time; year++) {
      // Add monthly contributions with interest
      for (let month = 0; month < 12; month++) {
        balance += monthly;
        totalContributed += monthly;
        balance *= (1 + rate / 12);
      }

      yearlyData.push({
        year,
        balance: Math.round(balance * 100) / 100,
        contributions: totalContributed,
        interest: Math.round((balance - totalContributed) * 100) / 100
      });
    }

    const finalResult: CalculationResult = {
      finalBalance: Math.round(balance * 100) / 100,
      totalContributions: totalContributed,
      totalInterest: Math.round((balance - totalContributed) * 100) / 100,
      yearlyData
    };

    setResult(finalResult);

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem('calculationHistory') || '[]');
    history.unshift({
      date: new Date().toISOString(),
      type: 'compound',
      inputs: { initialInvestment, monthlyContribution, annualReturn, years },
      result: finalResult
    });
    localStorage.setItem('calculationHistory', JSON.stringify(history.slice(0, 10)));
  };

  const handleReset = () => {
    setInitialInvestment(10000);
    setMonthlyContribution(500);
    setAnnualReturn(7);
    setYears(20);
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
    labels: result.yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: t('results.totalInterest'),
        data: result.yearlyData.map(d => d.balance),
        borderColor: '#486581',
        backgroundColor: 'rgba(72, 101, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: t('results.totalContributions'),
        data: result.yearlyData.map(d => d.contributions),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
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
      title: t('results.title') + ' ' + (currency('code') === 'CNY' ? '秘诀' : 'Tip'),
      content: currency('code') === 'CNY'
        ? '尽早开始投资是复利增长的关键。每月增加500元投资，20年后可能额外获得数十万元收益。'
        : 'Starting early is key to compound growth. Adding $500 monthly can yield hundreds of thousands in extra returns over 20 years.'
    },
    {
      icon: 'trending' as const,
      title: currency('code') === 'CNY' ? '长期持有' : 'Long-Term Growth',
      content: currency('code') === 'CNY'
        ? '复利需要时间才能发挥威力。保持投资至少10-15年，才能看到显著的增长效果。'
        : 'Compound interest needs time to work its magic. Stay invested for at least 10-15 years to see significant growth.'
    },
    {
      icon: 'calculator' as const,
      title: currency('code') === 'CNY' ? '持续投入' : 'Consistent Contributions',
      content: currency('code') === 'CNY'
        ? '定期定额投资（定投）可以平滑市场波动风险，并获得更好的平均成本。'
        : 'Regular investments help smooth out market volatility and achieve better average costs over time.'
    },
    {
      icon: 'shield' as const,
      title: currency('code') === 'CNY' ? '风险提示' : 'Risk Reminder',
      content: currency('code') === 'CNY'
        ? '过去的表现不代表未来收益。实际投资回报可能与预期不同。'
        : 'Past performance does not guarantee future results. Actual returns may vary from projections.'
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
                label={t('form.initialInvestment')}
                value={initialInvestment}
                onChange={setInitialInvestment}
                min={0}
                max={10000000}
                step={100}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '初始投资是复利增长的基础，金额越大，增长效果越明显'
                  : 'Your initial investment is the foundation for compound growth'}
              />

              <CalculatorInput
                label={t('form.monthlyContribution')}
                value={monthlyContribution}
                onChange={setMonthlyContribution}
                min={0}
                max={50000}
                step={50}
                prefix={currency('symbol')}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '每月定期投入可以加速复利增长，积少成多'
                  : 'Regular monthly contributions accelerate compound growth'}
              />

              <CalculatorInput
                label={t('form.annualReturn')}
                value={annualReturn}
                onChange={setAnnualReturn}
                min={0}
                max={30}
                step={0.1}
                suffix="%"
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '年化收益率基于历史市场平均，实际收益可能不同'
                  : 'Based on historical market averages, actual returns may vary'}
              />

              <CalculatorInput
                label={t('form.years')}
                value={years}
                onChange={setYears}
                min={1}
                max={50}
                step={1}
                showSlider
                tooltip={currency('code') === 'CNY'
                  ? '投资时间越长，复利效果越显著'
                  : 'Longer time horizons maximize compound interest effects'}
              />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateCompoundInterest}
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
                  title={t('results.finalBalance')}
                  value={formatCurrency(result.finalBalance)}
                  subtitle={t('results.title')}
                  highlight
                  tooltip={currency('code') === 'CNY' ? '投资本金与收益的总和' : 'Total of principal and earnings'}
                />
                <ResultCard
                  title={t('results.totalContributions')}
                  value={formatCurrency(result.totalContributions)}
                  tooltip={currency('code') === 'CNY' ? '您投入的总金额' : 'Total amount you contributed'}
                />
                <ResultCard
                  title={t('results.totalInterest')}
                  value={formatCurrency(result.totalInterest)}
                  subtitle={currency('code') === 'CNY' ? '纯收益' : 'Pure Earnings'}
                  trend={{
                    value: ((result.totalInterest / result.totalContributions) * 100).toFixed(1) + '%',
                    isPositive: true
                  }}
                  tooltip={currency('code') === 'CNY' ? '复利产生的收益' : 'Earnings from compound interest'}
                />
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
            {currency('code') === 'CNY' ? '准备开始计算' : 'Ready to Calculate'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {currency('code') === 'CNY'
              ? '输入您的投资详情并点击计算按钮，查看复利增长的强大力量'
              : 'Enter your investment details and click calculate to see the power of compound growth'}
          </p>
        </div>
      )}
    </div>
  );
}
