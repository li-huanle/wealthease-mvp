import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const InflationCalculator = dynamic(
  () => import('@/components/calculators/InflationCalculator'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    ),
  }
);

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('calculator.inflation');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/inflation`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/inflation`,
        'zh': `${baseUrl}/zh/calculators/inflation`,
      },
    },
    openGraph: {
      title: seo('og:title'),
      description: seo('og:description'),
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: canonicalUrl,
    },
    twitter: {
      card: seo('twitter:card'),
      title: seo('og:title'),
      description: seo('og:description'),
    } as any
  };
}

export default async function InflationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Inflation Calculator
          </h1>
          <p className="text-xl text-gray-600">
            See how inflation affects your purchasing power over time using historical CPI data
          </p>
        </div>

        <InflationCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Understanding Inflation</h2>
          <p>
            Inflation is the rate at which prices for goods and services rise over time, reducing the
            purchasing power of money. The Consumer Price Index (CPI) is the most widely used measure
            of inflation in the United States, tracked by the Bureau of Labor Statistics since 1913.
          </p>

          <h2>Historical Inflation Rates</h2>
          <p>
            Over the past century, the United States has experienced varying inflation rates. The 1970s saw
            double-digit inflation, while the 2010s experienced relatively low inflation. Understanding these
            historical patterns can help you make better financial planning decisions.
          </p>

          <h2>The Rule of 72 and Inflation</h2>
          <p>
            At a 3% annual inflation rate, prices will double approximately every 24 years. This means that
            if you're planning for retirement 30 years out, you need to account for the fact that your
            expenses could be more than double what they are today.
          </p>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Select a start year (historical year)</li>
            <li>Select an end year (typically the current year)</li>
            <li>Enter the amount you want to adjust for inflation</li>
            <li>Optionally, use a custom inflation rate instead of historical data</li>
            <li>Click "Calculate" to see the adjusted amount</li>
          </ol>

          <h2>CPI Data Explained</h2>
          <p>
            The Consumer Price Index tracks changes in the prices of a fixed basket of goods and services,
            including food, housing, transportation, medical care, and more. When the CPI rises,
            it costs more to purchase the same basket of goods, indicating inflation. This calculator uses
            actual historical CPI data from 1913 to 2024.
          </p>

          <h2>Investment and Inflation</h2>
          <p>
            To protect your purchasing power, your investments need to earn returns that exceed the
            inflation rate. Historically, stocks have provided average returns of 7-10% annually,
            while bonds have returned 3-5%. After accounting for average inflation of 3%, stocks have
            provided real returns of 4-7%, making them an effective hedge against inflation over long periods.
          </p>

          <h2>Strategies to Combat Inflation</h2>
          <ul>
            <li><strong>Invest in Growth Assets:</strong> Stocks, real estate, and commodities historically outpace inflation</li>
            <li><strong>Inflation-Protected Securities:</strong> Treasury Inflation-Protected Securities (TIPS) adjust principal based on CPI</li>
            <li><strong>I Bonds:</strong> Series I savings bonds earn interest plus inflation adjustments</li>
            <li><strong>Real Estate:</strong> Property values and rental income often increase with inflation</li>
            <li><strong>Diversification:</strong> A mix of asset classes helps protect against various economic scenarios</li>
          </ul>

          <h2>Planning for Future Inflation</h2>
          <p>
            When setting long-term financial goals, always account for inflation. If you're saving for
            retirement in 20 years, you'll need significantly more money than today's expenses suggest.
            This calculator can help you estimate the future cost of goals and adjust your savings accordingly.
          </p>

          <h2>Social Security COLA</h2>
          <p>
            Social Security includes Cost-of-Living Adjustments (COLA) that automatically increase benefits
            based on inflation. This helps retirees maintain some purchasing power, but the COLA may not
            fully match your actual inflation experience, especially in healthcare costs.
          </p>
        </div>

        <RelatedCalculators currentCalculator="inflation" />
      </div>
    </div>
  );
}
