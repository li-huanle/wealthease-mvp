import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const InvestmentComparisonCalculator = dynamic(
  () => import('@/components/calculators/InvestmentComparisonCalculator'),
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
  const t = await getTranslations('calculator.investmentComparison');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/investment-comparison`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/investment-comparison`,
        'zh': `${baseUrl}/zh/calculators/investment-comparison`,
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

export default async function InvestmentComparisonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Return Comparison Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Compare different investment options side-by-side to make informed financial decisions
          </p>
        </div>

        <InvestmentComparisonCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Making Informed Investment Decisions</h2>
          <p>
            Choosing between investment options can be challenging. Should you invest in stocks, bonds, real estate,
            or keep your money in a high-yield savings account? This calculator helps you compare up to three different
            investment scenarios side-by-side, accounting for returns, taxes, and time horizon.
          </p>

          <h2>Common Investment Comparisons</h2>
          <h3>1. Stocks vs Bonds vs Cash</h3>
          <ul>
            <li><strong>Stocks (S&P 500 Index):</strong> Historical average 10% annual return, high volatility, 15% long-term capital gains tax</li>
            <li><strong>Bonds (Aggregate Bond Index):</strong> Historical average 4-5% annual return, moderate volatility, taxed as ordinary income</li>
            <li><strong>High-Yield Savings:</strong> 3-5% current rates, no volatility, interest taxed as ordinary income (22-37%)</li>
          </ul>

          <h3>2. Tax-Advantaged vs Taxable Accounts</h3>
          <ul>
            <li><strong>Roth IRA:</strong> Tax-free growth and withdrawals, 0% tax on gains</li>
            <li><strong>Traditional 401(k):</strong> Tax-deferred growth, taxed as ordinary income in retirement</li>
            <li><strong>Taxable Brokerage:</strong> Immediate access, 15-20% long-term capital gains tax, annual dividend taxes</li>
          </ul>

          <h3>3. Active vs Passive Investing</h3>
          <ul>
            <li><strong>Index Funds:</strong> Low fees (0.03-0.20%), match market returns (~10% historical)</li>
            <li><strong>Actively Managed Funds:</strong> Higher fees (0.5-2%), may underperform market after fees</li>
            <li><strong>Individual Stock Picking:</strong> No fund fees, requires research, higher risk/reward potential</li>
          </ul>

          <h2>Understanding Investment Returns</h2>
          <h3>Historical Average Returns by Asset Class</h3>
          <ul>
            <li><strong>Large Cap Stocks (S&P 500):</strong> ~10% annual (1926-2024)</li>
            <li><strong>Small Cap Stocks:</strong> ~12% annual but higher volatility</li>
            <li><strong>International Stocks:</strong> ~8-9% annual</li>
            <li><strong>REITs (Real Estate):</strong> ~10-11% annual</li>
            <li><strong>Corporate Bonds:</strong> ~5-6% annual</li>
            <li><strong>Government Bonds:</strong> ~3-4% annual</li>
            <li><strong>Commodities (Gold):</strong> ~3-4% annual</li>
            <li><strong>Savings Accounts:</strong> Variable, currently 3-5%</li>
          </ul>

          <h3>Risk-Adjusted Returns</h3>
          <p>
            Higher returns typically come with higher risk (volatility). The Sharpe Ratio measures risk-adjusted returns:
          </p>
          <ul>
            <li><strong>Stocks:</strong> Higher returns but 15-20% annual volatility</li>
            <li><strong>Bonds:</strong> Lower returns but only 3-5% volatility</li>
            <li><strong>60/40 Portfolio:</strong> Balanced approach with moderate risk/return</li>
          </ul>

          <h2>Tax Impact on Investment Returns</h2>
          <p>
            Taxes can significantly reduce investment returns. Understanding tax treatment is crucial:
          </p>

          <h3>Tax Rates by Investment Type (2024)</h3>
          <ul>
            <li><strong>Long-Term Capital Gains:</strong> 0%, 15%, or 20% based on income (assets held 1+ year)</li>
            <li><strong>Short-Term Capital Gains:</strong> Taxed as ordinary income, 10-37%</li>
            <li><strong>Qualified Dividends:</strong> Same as long-term capital gains, 0-20%</li>
            <li><strong>Ordinary Dividends:</strong> Taxed as ordinary income, 10-37%</li>
            <li><strong>Interest Income:</strong> Taxed as ordinary income, 10-37%</li>
            <li><strong>REIT Dividends:</strong> Generally taxed as ordinary income</li>
          </ul>

          <h3>Tax-Advantaged Account Benefits</h3>
          <ul>
            <li><strong>Traditional IRA/401(k):</strong> Tax-deferred growth, reduce current taxable income</li>
            <li><strong>Roth IRA/401(k):</strong> Tax-free growth and withdrawals in retirement</li>
            <li><strong>HSA (Health Savings Account):</strong> Triple tax advantage - deductible, tax-free growth, tax-free medical withdrawals</li>
            <li><strong>529 Plan:</strong> Tax-free growth for education expenses</li>
          </ul>

          <h2>The Power of Time and Compounding</h2>
          <p>
            Time is the most powerful factor in investment growth. Compare investing $500/month at 8% return:
          </p>
          <ul>
            <li><strong>10 years:</strong> $91,000 total value ($60,000 invested, $31,000 gains)</li>
            <li><strong>20 years:</strong> $294,000 total value ($120,000 invested, $174,000 gains)</li>
            <li><strong>30 years:</strong> $745,000 total value ($180,000 invested, $565,000 gains)</li>
            <li><strong>40 years:</strong> $1,750,000 total value ($240,000 invested, $1,510,000 gains)</li>
          </ul>
          <p>
            Notice how gains eventually far exceed contributions - that's compound interest at work!
          </p>

          <h2>Inflation-Adjusted Returns</h2>
          <p>
            Real returns (after inflation) are what matter for purchasing power. With 3% inflation:
          </p>
          <ul>
            <li>10% stock return → 7% real return</li>
            <li>5% bond return → 2% real return</li>
            <li>3% savings account → 0% real return (breaks even with inflation)</li>
            <li>1% savings account → -2% real return (losing purchasing power)</li>
          </ul>

          <h2>Common Investment Strategies</h2>
          <h3>1. Target-Date Funds</h3>
          <p>
            Automatically adjust asset allocation as you age. Start aggressive (90% stocks) when young,
            gradually shift conservative (30% stocks) near retirement. Ideal for hands-off investors.
          </p>

          <h3>2. Three-Fund Portfolio</h3>
          <ul>
            <li>60% Total U.S. Stock Market Index</li>
            <li>30% Total International Stock Index</li>
            <li>10% Total Bond Market Index</li>
          </ul>
          <p>Simple, diversified, low-cost approach popularized by Bogleheads.</p>

          <h3>3. Age-Based Allocation</h3>
          <p>
            Traditional rule: "Your age in bonds" (e.g., at 40 years old, hold 40% bonds, 60% stocks).
            Modern variant: "120 minus your age in stocks" (more aggressive given longer lifespans).
          </p>

          <h3>4. Core-Satellite Approach</h3>
          <p>
            80% in core index funds (low-cost, diversified), 20% in satellite investments (individual stocks,
            sector funds, real estate) for potential outperformance.
          </p>

          <h2>Fees and Their Impact</h2>
          <p>
            Investment fees compound negatively over time. $100,000 invested for 30 years at 8% return:
          </p>
          <ul>
            <li><strong>0.05% fee (index fund):</strong> $990,000 final value</li>
            <li><strong>0.50% fee (low-cost fund):</strong> $890,000 final value (-$100k)</li>
            <li><strong>1.00% fee (typical mutual fund):</strong> $790,000 final value (-$200k)</li>
            <li><strong>2.00% fee (some actively managed):</strong> $630,000 final value (-$360k)</li>
          </ul>
          <p>
            Even small fee differences create massive wealth gaps over decades!
          </p>

          <h2>Risk Considerations</h2>
          <h3>Market Risk (Volatility)</h3>
          <ul>
            <li>Stocks can drop 20-50% in bear markets</li>
            <li>Recovery takes 2-5 years on average</li>
            <li>Long time horizon (10+ years) smooths out volatility</li>
            <li>Dollar-cost averaging reduces timing risk</li>
          </ul>

          <h3>Sequence of Returns Risk</h3>
          <p>
            Returns matter more near retirement. A market crash in your last working year is far worse than
            a crash 20 years before retirement. Consider shifting to bonds 5-10 years before retirement.
          </p>

          <h3>Diversification</h3>
          <p>
            Don't put all eggs in one basket. Diversify across:
          </p>
          <ul>
            <li>Asset classes (stocks, bonds, real estate)</li>
            <li>Geographic regions (U.S., international, emerging markets)</li>
            <li>Company sizes (large cap, mid cap, small cap)</li>
            <li>Sectors (tech, healthcare, financials, etc.)</li>
          </ul>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Chasing Past Performance:</strong> Last year's winner is often next year's loser</li>
            <li><strong>Panic Selling:</strong> Selling during downturns locks in losses</li>
            <li><strong>Timing the Market:</strong> Time in market beats timing the market</li>
            <li><strong>Ignoring Fees:</strong> 1-2% annual fees devastate long-term returns</li>
            <li><strong>Over-Concentration:</strong> Too much in one stock or sector increases risk</li>
            <li><strong>Not Rebalancing:</strong> Let winners ride too far from target allocation</li>
            <li><strong>Tax Inefficiency:</strong> Not utilizing tax-advantaged accounts</li>
          </ul>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Set your investment time horizon (years)</li>
            <li>For each investment option:
              <ul>
                <li>Give it a descriptive name (e.g., "S&P 500 Index Fund")</li>
                <li>Enter initial investment amount</li>
                <li>Set monthly contribution (if any)</li>
                <li>Input expected annual return (be conservative!)</li>
                <li>Set tax rate on gains (use 15% for long-term capital gains, 22-37% for ordinary income)</li>
              </ul>
            </li>
            <li>Click Compare to see side-by-side results</li>
            <li>Review growth charts and after-tax values</li>
            <li>Consider risk factors not captured in calculations</li>
          </ol>

          <h2>Sample Scenarios to Compare</h2>
          <h3>Scenario 1: Young Professional (Age 30)</h3>
          <ul>
            <li><strong>Option A:</strong> Aggressive - 100% stocks, 9% return, 15% tax</li>
            <li><strong>Option B:</strong> Balanced - 70/30 stocks/bonds, 7% return, 15% tax</li>
            <li><strong>Option C:</strong> Conservative - High-yield savings, 4% return, 25% tax</li>
          </ul>

          <h3>Scenario 2: Pre-Retiree (Age 55)</h3>
          <ul>
            <li><strong>Option A:</strong> Balanced - 60/40 stocks/bonds, 6% return, 15% tax</li>
            <li><strong>Option B:</strong> Conservative - 40/60 stocks/bonds, 4.5% return, 15% tax</li>
            <li><strong>Option C:</strong> Dividend Focus - Dividend stocks, 5% return, 20% tax</li>
          </ul>

          <h3>Scenario 3: Account Type Comparison</h3>
          <ul>
            <li><strong>Option A:</strong> Roth IRA - 8% return, 0% tax (tax-free withdrawals)</li>
            <li><strong>Option B:</strong> Traditional IRA - 8% return, 25% tax (deferred to retirement)</li>
            <li><strong>Option C:</strong> Taxable - 8% return, 15% tax (pay as you go)</li>
          </ul>

          <h2>Beyond the Numbers</h2>
          <p>
            While this calculator provides valuable quantitative comparisons, also consider:
          </p>
          <ul>
            <li><strong>Liquidity Needs:</strong> Can you access funds when needed?</li>
            <li><strong>Risk Tolerance:</strong> Can you stomach 30-50% drops without panic selling?</li>
            <li><strong>Time Commitment:</strong> How much management does the investment require?</li>
            <li><strong>Expertise Required:</strong> Do you understand what you're investing in?</li>
            <li><strong>Sleep-at-Night Factor:</strong> Will you worry constantly about this investment?</li>
          </ul>

          <h2>Recommended Resources</h2>
          <ul>
            <li><strong>Books:</strong> "A Random Walk Down Wall Street" by Burton Malkiel, "The Simple Path to Wealth" by JL Collins</li>
            <li><strong>Websites:</strong> Bogleheads.org forum, Mr. Money Mustache, The White Coat Investor</li>
            <li><strong>Tools:</strong> Personal Capital (portfolio tracking), Morningstar (fund research)</li>
            <li><strong>Podcasts:</strong> ChooseFI, BiggerPockets Money, Afford Anything</li>
          </ul>
        </div>

        <RelatedCalculators currentCalculator="investment-comparison" />
      </div>
    </div>
  );
}
