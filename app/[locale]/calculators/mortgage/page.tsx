import {getTranslations, setRequestLocale} from 'next-intl/server';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

export default async function MortgagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.mortgage');

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

        <MortgageCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Understanding Your Mortgage Payment</h2>
          <p>
            A mortgage is more than just principal and interest. Your total monthly payment
            typically includes property taxes, homeowners insurance, and possibly PMI (Private
            Mortgage Insurance) if your down payment is less than 20%. This calculator shows
            you the complete picture of your housing costs.
          </p>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter the purchase price of the home</li>
            <li>Input your down payment percentage (typically 5-20%)</li>
            <li>Set the interest rate offered by your lender</li>
            <li>Choose your loan term (usually 15 or 30 years)</li>
            <li>Add annual property tax and home insurance costs</li>
            <li>Include HOA fees if applicable</li>
            <li>Click "Calculate" to see your total monthly payment</li>
          </ol>

          <h2>Key Mortgage Components</h2>
          <ul>
            <li><strong>Principal & Interest (P&I):</strong> The core loan payment</li>
            <li><strong>Property Tax:</strong> Annual tax paid to local government, divided monthly</li>
            <li><strong>Homeowners Insurance:</strong> Required coverage for the property</li>
            <li><strong>PMI:</strong> Insurance required when down payment is less than 20%</li>
            <li><strong>HOA Fees:</strong> Monthly fees for homeowners associations (if applicable)</li>
          </ul>

          <h2>Tips for Homebuyers</h2>
          <p>
            Aim for a down payment of at least 20% to avoid PMI and get better interest rates.
            Get pre-approved before house hunting to know your budget. Consider a 15-year mortgage
            if you can afford higher payments - you'll pay significantly less interest over time.
            Don't forget to budget for maintenance, utilities, and unexpected repairs beyond your
            monthly payment.
          </p>

          <h2>What is PMI?</h2>
          <p>
            Private Mortgage Insurance (PMI) protects the lender if you default on your loan.
            It's typically required when your down payment is less than 20% of the home's value.
            PMI can be removed once you've built 20% equity in your home, either through payments
            or appreciation. Contact your lender to request PMI removal when you reach this threshold.
          </p>
        </div>

        <RelatedCalculators currentCalculator="mortgage" />
      </div>
    </div>
  );
}
