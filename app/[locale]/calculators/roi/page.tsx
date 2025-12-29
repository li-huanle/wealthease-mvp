import {getTranslations, setRequestLocale} from 'next-intl/server';
import ROICalculator from '@/components/calculators/ROICalculator';

export default async function ROIPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.roi');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <ROICalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>What is Return on Investment (ROI)?</h2>
          <p>
            Return on Investment (ROI) is a key performance metric used to evaluate the
            profitability of an investment. It measures the gain or loss from an investment
            relative to the amount invested, expressed as a percentage. A higher ROI means
            a more profitable investment.
          </p>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter your initial investment amount</li>
            <li>Input the current or final value of your investment</li>
            <li>Add any additional investments made during the period (optional)</li>
            <li>Set the investment period in years and months</li>
            <li>Click "Calculate" to see your ROI and annualized returns</li>
          </ol>

          <h2>Understanding Your Results</h2>
          <ul>
            <li><strong>ROI (Return on Investment):</strong> The total percentage return over the entire investment period</li>
            <li><strong>Annualized ROI:</strong> The average yearly return, also known as CAGR (Compound Annual Growth Rate)</li>
            <li><strong>Net Profit:</strong> The actual dollar amount gained or lost</li>
            <li><strong>Total Investment:</strong> Your initial investment plus any additional contributions</li>
          </ul>

          <h2>ROI Formula</h2>
          <p>
            The basic ROI formula is: <strong>ROI = (Final Value - Total Investment) / Total Investment × 100</strong>
          </p>
          <p>
            For annualized returns, we use the CAGR formula: <strong>CAGR = (Final Value / Total Investment)^(1/years) - 1</strong>
          </p>

          <h2>Why Annualized ROI Matters</h2>
          <p>
            While total ROI shows your overall return, annualized ROI allows you to compare
            investments held for different time periods. For example, a 50% return over 5 years
            (annualized: 8.4%) is less impressive than a 30% return over 1 year (annualized: 30%).
            Use annualized ROI to make fair comparisons between different investment opportunities.
          </p>

          <h2>Investment Tips</h2>
          <p>
            Remember that past performance doesn't guarantee future results. Consider risk alongside
            returns - higher returns often come with higher risk. Diversify your portfolio across
            different asset classes to balance risk and reward. Track your investments regularly
            and adjust your strategy based on your financial goals and risk tolerance.
          </p>
        </div>
      </div>
    </div>
  );
}
