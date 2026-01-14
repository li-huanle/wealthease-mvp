import {getTranslations, setRequestLocale} from 'next-intl/server';
import dynamic from 'next/dynamic';

// Dynamic import for the calculator component
const Investment401kCalculator = dynamic(
  () => import('@/components/calculators/Investment401kCalculator'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    ),
  }
);

export default async function Investment401kPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.retirement');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            401(k) & Retirement Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Plan your retirement with 401(k) employer matching and compound growth
          </p>
        </div>

        <Investment401kCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Why 401(k) Planning Matters</h2>
          <p>
            A 401(k) plan is one of the most powerful tools for retirement savings in the United States.
            With tax-advantaged contributions, potential employer matching, and compound growth over time,
            your 401(k) can become a substantial part of your retirement portfolio.
          </p>

          <h2>Understanding Employer Match</h2>
          <p>
            Many employers offer matching contributions, effectively giving you free money. For example,
            if your employer matches 4% of your salary up to 50% of your contribution, contributing
            4% of a $100,000 salary ($4,000) results in an additional $2,000 from your employer
            - that's an instant 50% return on your investment!
          </p>

          <h2>2025/2026 Contribution Limits</h2>
          <p>
            The IRS sets annual contribution limits for 401(k) plans. For 2025, the standard limit is
            $23,500, and if you're 50 or older, you can contribute an additional $7,500 in catch-up
            contributions, bringing your total to $31,000. These limits are adjusted periodically for inflation.
          </p>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter your current age and planned retirement age</li>
            <li>Input your current retirement savings</li>
            <li>Set your annual salary and planned contribution amount</li>
            <li>Configure your employer match details</li>
            <li>Choose your expected annual return and compound frequency</li>
            <li>Set your expected annual expenses in retirement</li>
            <li>Click "Calculate" to see your retirement projection</li>
          </ol>

          <h2>Key Factors in 401(k) Planning</h2>
          <ul>
            <li><strong>Start Early:</strong> Time is your greatest asset - starting in your 20s vs 30s can double your retirement savings</li>
            <li><strong>Maximize Match:</strong> Always contribute at least enough to get your full employer match</li>
            <li><strong>Catch-Up Contributions:</strong> Use the extra contribution limits if you're 50 or older</li>
            <li><strong>Investment Selection:</strong> Choose appropriate investments based on your risk tolerance and time horizon</li>
            <li><strong>Regular Reviews:</strong> Review and adjust your contributions annually as your income grows</li>
          </ul>

          <h2>Compound Interest Power</h2>
          <p>
            Compound interest is the engine that drives retirement growth. The more frequently your investments
            compound (daily vs monthly vs annually), the more your money grows over time. This calculator
            lets you see the impact of different compound frequencies on your final balance.
          </p>

          <h2>Tax Advantages of 401(k)</h2>
          <p>
            Traditional 401(k) contributions reduce your taxable income now, lowering your current tax bill.
            Your investments grow tax-deferred until retirement, when you pay taxes on withdrawals.
            This tax advantage can significantly boost your long-term returns compared to taxable accounts.
          </p>
        </div>
      </div>
    </div>
  );
}
