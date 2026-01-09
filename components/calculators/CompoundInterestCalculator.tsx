'use client';

import {useState, useEffect} from 'react';
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

  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [annualReturn, setAnnualReturn] = useState<string>('7');
  const [years, setYears] = useState<string>('20');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateCompoundInterest = () => {
    const principal = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(annualReturn) || 0) / 100;
    const time = parseInt(years) || 0;

    if (time <= 0) return;

    const yearlyData: CalculationResult['yearlyData'] = [];
    let balance = principal;
    let totalContributed = principal;

    for (let year = 1; year <= time; year++) {
      const yearStartBalance = balance;
      
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
    setInitialInvestment('10000');
    setMonthlyContribution('500');
    setAnnualReturn('7');
    setYears('20');
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
        label: 'Total Balance',
        data: result.yearlyData.map(d => d.balance),
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Total Contributions',
        data: result.yearlyData.map(d => d.contributions),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
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

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">{t('form.calculate')}</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.initialInvestment')}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="input-field pl-8"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.monthlyContribution')}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="input-field pl-8"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.annualReturn')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="input-field pr-8"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="absolute right-4 top-3 text-gray-500">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.years')}
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="input-field"
              min="1"
              max="50"
            />
          </div>

          <div className="flex gap-4">
            <button onClick={calculateCompoundInterest} className="btn-primary flex-1">
              {t('form.calculate')}
            </button>
            <button onClick={handleReset} className="btn-secondary">
              {t('form.reset')}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        {result ? (
          <div className="space-y-6">
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <h2 className="text-2xl font-bold mb-6">{t('results.title')}</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-primary-100 text-sm">{t('results.finalBalance')}</p>
                  <p className="text-4xl font-bold">{formatCurrency(result.finalBalance)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-400">
                  <div>
                    <p className="text-primary-100 text-sm">{t('results.totalContributions')}</p>
                    <p className="text-2xl font-semibold">{formatCurrency(result.totalContributions)}</p>
                  </div>
                  
                  <div>
                    <p className="text-primary-100 text-sm">{t('results.totalInterest')}</p>
                    <p className="text-2xl font-semibold text-success">{formatCurrency(result.totalInterest)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ height: '400px' }}>
                {chartData && <Line data={chartData} options={chartOptions} />}
              </div>
            </div>
          </div>
        ) : (
          <div className="card h-full flex items-center justify-center text-center">
            <div>
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-500">Enter your details and click calculate to see results</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
