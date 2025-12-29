import {getTranslations, setRequestLocale} from 'next-intl/server';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';

export default async function CompoundInterestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.compound');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>
        
        <CompoundInterestCalculator />
        
        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>What is Compound Interest?</h2>
          <p>
            Compound interest is the interest calculated on the initial principal and also on the accumulated 
            interest of previous periods. It's often called "interest on interest" and can significantly 
            increase your investment returns over time.
          </p>
          
          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter your initial investment amount</li>
            <li>Add your monthly contribution (if any)</li>
            <li>Set your expected annual interest rate</li>
            <li>Choose your investment time period</li>
            <li>Click "Calculate" to see your results</li>
          </ol>
          
          <h2>The Power of Compound Interest</h2>
          <p>
            Albert Einstein reportedly called compound interest "the eighth wonder of the world." 
            The earlier you start investing, the more time your money has to grow exponentially.
          </p>
        </div>
      </div>
    </div>
  );
}
