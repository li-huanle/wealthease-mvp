import {getTranslations, setRequestLocale} from 'next-intl/server';
import RetirementCalculator from '@/components/calculators/RetirementCalculator';

export default async function RetirementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.retirement');

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

        <RetirementCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Why Retirement Planning Matters</h2>
          <p>
            Retirement planning is crucial for ensuring financial security in your golden years.
            By starting early and consistently saving, you can leverage the power of compound
            interest to build a substantial retirement fund.
          </p>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter your current age and desired retirement age</li>
            <li>Input your current savings and monthly contribution amount</li>
            <li>Set your expected annual return rate (typically 6-8% for diversified portfolios)</li>
            <li>Estimate your monthly expenses in retirement</li>
            <li>Set your life expectancy (average is around 80-85 years)</li>
            <li>Click "Calculate" to see if you're on track</li>
          </ol>

          <h2>Key Factors in Retirement Planning</h2>
          <ul>
            <li><strong>Start Early:</strong> Time is your greatest asset in retirement planning</li>
            <li><strong>Consistent Savings:</strong> Regular contributions add up significantly over time</li>
            <li><strong>Investment Returns:</strong> A diversified portfolio can help grow your savings</li>
            <li><strong>Inflation:</strong> Consider inflation when estimating retirement expenses</li>
            <li><strong>Healthcare Costs:</strong> Medical expenses often increase in retirement</li>
          </ul>

          <h2>Common Retirement Savings Strategies</h2>
          <p>
            Consider maximizing contributions to tax-advantaged accounts like 401(k)s and IRAs.
            Many employers offer matching contributions - this is essentially free money that can
            significantly boost your retirement savings. Additionally, diversify your investments
            across stocks, bonds, and other assets to balance risk and return.
          </p>
        </div>
      </div>
    </div>
  );
}
