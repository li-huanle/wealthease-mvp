import {getTranslations, setRequestLocale} from 'next-intl/server';
import LoanCalculator from '@/components/calculators/LoanCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

export default async function LoanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.loan');

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

        <LoanCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Understanding Loan Payments</h2>
          <p>
            When you take out a loan, understanding how your monthly payments are calculated
            is crucial for making informed financial decisions. This calculator helps you
            determine your exact monthly payment, total interest costs, and how your loan
            balance decreases over time.
          </p>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter the total loan amount you need to borrow</li>
            <li>Input the annual interest rate (APR) offered by your lender</li>
            <li>Set the loan term in years (how long you'll take to repay)</li>
            <li>Click "Calculate" to see your monthly payment and total costs</li>
          </ol>

          <h2>Key Loan Terms Explained</h2>
          <ul>
            <li><strong>Principal:</strong> The original amount you borrow</li>
            <li><strong>Interest Rate:</strong> The percentage charged by the lender annually</li>
            <li><strong>Loan Term:</strong> The length of time to repay the loan</li>
            <li><strong>Monthly Payment:</strong> The fixed amount you pay each month</li>
            <li><strong>Total Interest:</strong> The total cost of borrowing over the loan term</li>
          </ul>

          <h2>Tips for Getting the Best Loan</h2>
          <p>
            Shop around with multiple lenders to compare interest rates. Even a small difference
            in rates can save you thousands over the life of the loan. Consider making extra
            payments when possible to reduce total interest costs. Always check for prepayment
            penalties before signing a loan agreement.
          </p>
        </div>

        <RelatedCalculators currentCalculator="loan" />
      </div>
    </div>
  );
}
