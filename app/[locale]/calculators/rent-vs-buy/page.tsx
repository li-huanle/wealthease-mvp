import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const RentVsBuyCalculator = dynamic(
  () => import('@/components/calculators/RentVsBuyCalculator'),
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
  const t = await getTranslations('calculator.rentVsBuy');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/rent-vs-buy`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/rent-vs-buy`,
        'zh': `${baseUrl}/zh/calculators/rent-vs-buy`,
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

export default async function RentVsBuyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rent vs Buy Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Compare the long-term financial costs of renting versus buying a home
          </p>
        </div>

        <RentVsBuyCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Should You Rent or Buy?</h2>
          <p>
            The decision to rent or buy a home is one of the most significant financial choices you'll make.
            While homeownership has traditionally been seen as part of the American Dream, it's not always
            the best financial decision for everyone. This calculator helps you compare the true costs of
            renting versus buying over time.
          </p>

          <h2>Understanding the True Cost of Homeownership</h2>
          <p>
            Many people focus solely on the monthly mortgage payment when considering buying a home, but
            homeownership comes with many additional costs:
          </p>
          <ul>
            <li><strong>Property Taxes:</strong> Typically 1-2% of home value annually, varies by location</li>
            <li><strong>Home Insurance:</strong> $1,000-$3,000+ per year depending on coverage</li>
            <li><strong>Maintenance and Repairs:</strong> Generally 1% of home value annually</li>
            <li><strong>HOA Fees:</strong> Can range from $100-$500+ monthly in many communities</li>
            <li><strong>Closing Costs:</strong> 2-5% of purchase price upfront</li>
            <li><strong>Utilities:</strong> Often higher than in rental properties</li>
          </ul>

          <h2>The Opportunity Cost of Renting</h2>
          <p>
            While renting doesn't build equity, it has several financial advantages:
          </p>
          <ul>
            <li><strong>Flexibility:</strong> Easy to relocate for career opportunities</li>
            <li><strong>Predictable Costs:</strong> No surprise repair bills</li>
            <li><strong>Investment Capital:</strong> Down payment money can be invested elsewhere</li>
            <li><strong>Lower Monthly Costs:</strong> Often cheaper than buying in expensive markets</li>
            <li><strong>No Maintenance Burden:</strong> Landlord handles repairs and upkeep</li>
          </ul>

          <h2>The 5-Year Rule</h2>
          <p>
            Financial experts often cite the "5-year rule" - you should plan to stay in a home for at least
            5 years for buying to make financial sense. This is because of the high upfront costs (down payment,
            closing costs) and selling costs (typically 6% in realtor fees). In the first few years, most of
            your mortgage payment goes to interest, not building equity.
          </p>

          <h2>Market-Specific Considerations</h2>
          <p>
            The rent vs buy decision heavily depends on your local market. In expensive coastal cities like
            San Francisco or New York, the price-to-rent ratio can be 30:1 or higher, making renting more
            attractive. In more affordable markets, buying often makes sense sooner. Use the calculator to
            input your specific local costs.
          </p>

          <h2>The Break-Even Point</h2>
          <p>
            The break-even point is when the cumulative cost of buying equals the cumulative cost of renting
            (accounting for opportunity costs). After this point, buying becomes the more economical choice.
            This calculator identifies your break-even point based on your inputs.
          </p>

          <h2>Tax Considerations</h2>
          <p>
            Homeowners can deduct mortgage interest and property taxes on their federal tax return, though
            the 2017 Tax Cuts and Jobs Act limited these deductions. With the higher standard deduction
            ($27,700 for married couples in 2023), many homeowners no longer itemize. Consider consulting
            a tax professional for your specific situation.
          </p>

          <h2>Non-Financial Factors</h2>
          <p>
            While this calculator focuses on financial aspects, remember that the rent vs buy decision also
            involves lifestyle factors:
          </p>
          <ul>
            <li>Career stability and mobility needs</li>
            <li>Desire to customize your living space</li>
            <li>Family planning and school districts</li>
            <li>Time and willingness to handle maintenance</li>
            <li>Emotional value of homeownership</li>
          </ul>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter the home purchase price and expected down payment</li>
            <li>Input current mortgage rates and loan term</li>
            <li>Estimate property taxes, insurance, and maintenance costs</li>
            <li>Enter your current or expected monthly rent</li>
            <li>Set realistic appreciation and investment return rates</li>
            <li>Choose your expected time horizon</li>
            <li>Click Calculate to see the comparison</li>
          </ol>

          <h2>Important Assumptions</h2>
          <p>
            This calculator makes several assumptions to simplify the complex rent vs buy analysis:
          </p>
          <ul>
            <li>Home appreciation and rent increases remain constant (in reality they fluctuate)</li>
            <li>You'll reinvest the difference between rent and mortgage payments</li>
            <li>You won't prepay your mortgage or make extra principal payments</li>
            <li>Investment returns are steady (actual returns vary year to year)</li>
            <li>You'll stay in the home for the full time period entered</li>
          </ul>

          <h2>When Buying Makes Sense</h2>
          <p>
            Buying typically makes more sense when:
          </p>
          <ul>
            <li>You plan to stay in the area for 5+ years</li>
            <li>You have 20% down payment to avoid PMI</li>
            <li>Your monthly housing cost (including all expenses) is less than 28% of gross income</li>
            <li>Local home prices are reasonable relative to rents (price-to-rent ratio under 20)</li>
            <li>You have stable employment and emergency savings</li>
            <li>You're ready for the responsibility of maintenance and repairs</li>
          </ul>

          <h2>When Renting Makes Sense</h2>
          <p>
            Renting typically makes more sense when:
          </p>
          <ul>
            <li>You're new to an area or career path is uncertain</li>
            <li>Local housing prices are very high relative to rents</li>
            <li>You don't have sufficient savings for down payment and closing costs</li>
            <li>You value flexibility and minimal maintenance responsibility</li>
            <li>You can achieve better returns investing your down payment elsewhere</li>
            <li>You're in a temporary life stage (grad school, short-term job, etc.)</li>
          </ul>
        </div>

        <RelatedCalculators currentCalculator="rent-vs-buy" />
      </div>
    </div>
  );
}
