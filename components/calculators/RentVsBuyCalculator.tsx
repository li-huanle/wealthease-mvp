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
import {Home, TrendingUp, DollarSign, Calculator} from 'lucide-react';

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
  buyingTotalCost: number;
  rentingTotalCost: number;
  difference: number;
  isBuyingBetter: boolean;
  monthlyMortgage: number;
  monthlyRent: number;
  homeEquity: number;
  investmentValue: number;
  breakEvenYear: number | null;
  buyingCostData: number[];
  rentingCostData: number[];
  years: number[];
}

export default function RentVsBuyCalculator() {
  const t = useTranslations('calculator.rentVsBuy');
  const currency = useTranslations('common.currency');

  // Home purchase inputs
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [mortgageRate, setMortgageRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [hoaFees, setHoaFees] = useState<number>(200);
  const [homeInsurance, setHomeInsurance] = useState<number>(1500);
  const [maintenanceRate, setMaintenanceRate] = useState<number>(1);
  const [homeAppreciationRate, setHomeAppreciationRate] = useState<number>(3);
  const [closingCosts, setClosingCosts] = useState<number>(2);

  // Renting inputs
  const [monthlyRent, setMonthlyRent] = useState<number>(2000);
  const [rentIncreaseRate, setRentIncreaseRate] = useState<number>(3);

  // Investment inputs
  const [investmentReturnRate, setInvestmentReturnRate] = useState<number>(7);
  const [yearsToStay, setYearsToStay] = useState<number>(10);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateRentVsBuy = () => {
    if (yearsToStay <= 0) return;

    // Calculate down payment and loan amount
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;
    const closingCostAmount = homePrice * (closingCosts / 100);

    // Calculate monthly mortgage payment (principal + interest)
    const monthlyRate = mortgageRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const monthlyMortgage = monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

    // Calculate monthly property tax
    const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;

    // Calculate monthly home insurance
    const monthlyHomeInsurance = homeInsurance / 12;

    // Calculate monthly maintenance
    const monthlyMaintenance = (homePrice * (maintenanceRate / 100)) / 12;

    // Total monthly cost for buying
    const totalMonthlyBuying = monthlyMortgage + monthlyPropertyTax + monthlyHomeInsurance + hoaFees + monthlyMaintenance;

    // Arrays to track costs over time
    const buyingCostData: number[] = [];
    const rentingCostData: number[] = [];
    const years: number[] = [];

    let cumulativeBuyingCost = downPayment + closingCostAmount;
    let cumulativeRentingCost = 0;
    let currentRent = monthlyRent;
    let remainingLoanBalance = loanAmount;
    let homeValue = homePrice;
    let investmentValue = downPayment + closingCostAmount; // If renting, this money is invested
    let breakEvenYear: number | null = null;

    for (let year = 0; year <= yearsToStay; year++) {
      years.push(year);

      if (year > 0) {
        // Update buying costs
        for (let month = 1; month <= 12; month++) {
          cumulativeBuyingCost += totalMonthlyBuying;

          // Calculate how much of the mortgage payment goes to principal
          const interestPayment = remainingLoanBalance * monthlyRate;
          const principalPayment = monthlyMortgage - interestPayment;
          remainingLoanBalance = Math.max(0, remainingLoanBalance - principalPayment);
        }

        // Appreciate home value
        homeValue *= (1 + homeAppreciationRate / 100);

        // Update renting costs
        cumulativeRentingCost += currentRent * 12;

        // Grow investment (down payment + monthly savings difference)
        const monthlySavings = totalMonthlyBuying - currentRent;
        for (let month = 1; month <= 12; month++) {
          investmentValue *= (1 + investmentReturnRate / 100 / 12);
          if (monthlySavings > 0) {
            // If renting is cheaper, invest the difference
            investmentValue += Math.abs(monthlySavings);
          }
        }

        // Increase rent
        currentRent *= (1 + rentIncreaseRate / 100);
      }

      // Net cost for buying (total spent - home equity)
      const homeEquity = homeValue - remainingLoanBalance;
      const netBuyingCost = cumulativeBuyingCost - homeEquity;

      // Net cost for renting (total spent - investment value)
      const netRentingCost = cumulativeRentingCost + (downPayment + closingCostAmount) - investmentValue;

      buyingCostData.push(netBuyingCost);
      rentingCostData.push(netRentingCost);

      // Check for break-even point
      if (breakEvenYear === null && year > 0 && netBuyingCost < netRentingCost) {
        breakEvenYear = year;
      }
    }

    const finalBuyingCost = buyingCostData[buyingCostData.length - 1];
    const finalRentingCost = rentingCostData[rentingCostData.length - 1];
    const finalHomeEquity = homeValue - remainingLoanBalance;
    const finalInvestmentValue = investmentValue;

    setResult({
      buyingTotalCost: finalBuyingCost,
      rentingTotalCost: finalRentingCost,
      difference: finalRentingCost - finalBuyingCost,
      isBuyingBetter: finalBuyingCost < finalRentingCost,
      monthlyMortgage: totalMonthlyBuying,
      monthlyRent: monthlyRent,
      homeEquity: finalHomeEquity,
      investmentValue: finalInvestmentValue,
      breakEvenYear: breakEvenYear,
      buyingCostData,
      rentingCostData,
      years,
    });
  };

  const chartData = result ? {
    labels: result.years.map(y => `Year ${y}`),
    datasets: [
      {
        label: t('chart.buyingCost'),
        data: result.buyingCostData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: t('chart.rentingCost'),
        data: result.rentingCostData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
        text: t('chart.title'),
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
            <Home className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Buying Inputs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Home className="w-5 h-5 mr-2 text-primary-600" />
              {t('form.buyingSection')}
            </h3>

            <CalculatorInput
              label={t('form.homePrice')}
              value={homePrice}
              onChange={setHomePrice}
              min={50000}
              max={2000000}
              step={10000}
              prefix={currency('symbol')}
              tooltip={t('form.homePriceTooltip')}
            />

            <CalculatorInput
              label={t('form.downPaymentPercent')}
              value={downPaymentPercent}
              onChange={setDownPaymentPercent}
              min={0}
              max={50}
              step={1}
              suffix="%"
              tooltip={t('form.downPaymentPercentTooltip')}
            />

            <CalculatorInput
              label={t('form.mortgageRate')}
              value={mortgageRate}
              onChange={setMortgageRate}
              min={0}
              max={15}
              step={0.1}
              suffix="%"
              tooltip={t('form.mortgageRateTooltip')}
            />

            <CalculatorInput
              label={t('form.loanTerm')}
              value={loanTerm}
              onChange={setLoanTerm}
              min={10}
              max={30}
              step={5}
              suffix={t('form.years')}
              tooltip={t('form.loanTermTooltip')}
            />

            <CalculatorInput
              label={t('form.propertyTaxRate')}
              value={propertyTaxRate}
              onChange={setPropertyTaxRate}
              min={0}
              max={5}
              step={0.1}
              suffix="%"
              tooltip={t('form.propertyTaxRateTooltip')}
            />

            <CalculatorInput
              label={t('form.hoaFees')}
              value={hoaFees}
              onChange={setHoaFees}
              min={0}
              max={1000}
              step={50}
              prefix={currency('symbol')}
              suffix={t('form.perMonth')}
              tooltip={t('form.hoaFeesTooltip')}
            />

            <CalculatorInput
              label={t('form.homeInsurance')}
              value={homeInsurance}
              onChange={setHomeInsurance}
              min={500}
              max={10000}
              step={100}
              prefix={currency('symbol')}
              suffix={t('form.perYear')}
              tooltip={t('form.homeInsuranceTooltip')}
            />

            <CalculatorInput
              label={t('form.maintenanceRate')}
              value={maintenanceRate}
              onChange={setMaintenanceRate}
              min={0}
              max={5}
              step={0.1}
              suffix="%"
              tooltip={t('form.maintenanceRateTooltip')}
            />

            <CalculatorInput
              label={t('form.homeAppreciationRate')}
              value={homeAppreciationRate}
              onChange={setHomeAppreciationRate}
              min={-5}
              max={10}
              step={0.5}
              suffix="%"
              tooltip={t('form.homeAppreciationRateTooltip')}
            />

            <CalculatorInput
              label={t('form.closingCosts')}
              value={closingCosts}
              onChange={setClosingCosts}
              min={0}
              max={5}
              step={0.5}
              suffix="%"
              tooltip={t('form.closingCostsTooltip')}
            />
          </div>

          {/* Renting Inputs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
              {t('form.rentingSection')}
            </h3>

            <CalculatorInput
              label={t('form.monthlyRent')}
              value={monthlyRent}
              onChange={setMonthlyRent}
              min={500}
              max={10000}
              step={100}
              prefix={currency('symbol')}
              tooltip={t('form.monthlyRentTooltip')}
            />

            <CalculatorInput
              label={t('form.rentIncreaseRate')}
              value={rentIncreaseRate}
              onChange={setRentIncreaseRate}
              min={0}
              max={10}
              step={0.5}
              suffix="%"
              tooltip={t('form.rentIncreaseRateTooltip')}
            />

            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
              {t('form.otherSection')}
            </h3>

            <CalculatorInput
              label={t('form.investmentReturnRate')}
              value={investmentReturnRate}
              onChange={setInvestmentReturnRate}
              min={0}
              max={15}
              step={0.5}
              suffix="%"
              tooltip={t('form.investmentReturnRateTooltip')}
            />

            <CalculatorInput
              label={t('form.yearsToStay')}
              value={yearsToStay}
              onChange={setYearsToStay}
              min={1}
              max={30}
              step={1}
              suffix={t('form.years')}
              tooltip={t('form.yearsToStayTooltip')}
            />
          </div>
        </div>

        <button
          onClick={calculateRentVsBuy}
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

            {/* Recommendation Banner */}
            <div className={`rounded-xl p-6 mb-6 ${
              result.isBuyingBetter
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : 'bg-gradient-to-r from-blue-500 to-blue-600'
            } text-white`}>
              <h4 className="text-xl font-bold mb-2">
                {result.isBuyingBetter ? t('results.buyingBetter') : t('results.rentingBetter')}
              </h4>
              <p className="text-green-100">
                {result.isBuyingBetter
                  ? t('results.buyingBetterDesc', {amount: currency('format', {value: Math.abs(result.difference)})})
                  : t('results.rentingBetterDesc', {amount: currency('format', {value: Math.abs(result.difference)})})}
              </p>
              {result.breakEvenYear && (
                <p className="mt-2 text-sm">
                  {t('results.breakEven', {years: result.breakEvenYear})}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ResultCard
                title={t('results.buyingTotalCost')}
                value={currency('format', {value: Math.round(result.buyingTotalCost)})}
                icon={<Home className="w-6 h-6 text-blue-600" />}
                tooltip={t('results.buyingTotalCostTooltip')}
              />

              <ResultCard
                title={t('results.rentingTotalCost')}
                value={currency('format', {value: Math.round(result.rentingTotalCost)})}
                icon={<DollarSign className="w-6 h-6 text-red-600" />}
                tooltip={t('results.rentingTotalCostTooltip')}
              />

              <ResultCard
                title={t('results.homeEquity')}
                value={currency('format', {value: Math.round(result.homeEquity)})}
                icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                tooltip={t('results.homeEquityTooltip')}
              />

              <ResultCard
                title={t('results.investmentValue')}
                value={currency('format', {value: Math.round(result.investmentValue)})}
                icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
                tooltip={t('results.investmentValueTooltip')}
              />
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="font-semibold text-gray-700 mb-2">{t('results.monthlyBuying')}</h5>
                <p className="text-2xl font-bold text-gray-900">
                  {currency('format', {value: Math.round(result.monthlyMortgage)})}
                  <span className="text-sm text-gray-500 ml-2">{t('form.perMonth')}</span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="font-semibold text-gray-700 mb-2">{t('results.monthlyRenting')}</h5>
                <p className="text-2xl font-bold text-gray-900">
                  {currency('format', {value: Math.round(result.monthlyRent)})}
                  <span className="text-sm text-gray-500 ml-2">{t('form.perMonth')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          {chartData && (
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t('chart.header')}</h3>
              <div className="h-96">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}

          {/* Expert Tips */}
          <ExpertTips
            tips={[
              {
                icon: 'lightbulb' as const,
                title: t('expertTips.tip1Title'),
                content: t('expertTips.tip1'),
              },
              {
                icon: 'shield' as const,
                title: t('expertTips.tip2Title'),
                content: t('expertTips.tip2'),
              },
              {
                icon: 'trending' as const,
                title: t('expertTips.tip3Title'),
                content: t('expertTips.tip3'),
              },
              {
                icon: 'calculator' as const,
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
