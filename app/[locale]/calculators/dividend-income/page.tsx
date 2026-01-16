import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const DividendIncomeCalculator = dynamic(
  () => import('@/components/calculators/DividendIncomeCalculator'),
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
  const t = await getTranslations('calculator.dividendIncome');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/dividend-income`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/dividend-income`,
        'zh': `${baseUrl}/zh/calculators/dividend-income`,
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

export default async function DividendIncomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dividend Income Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your future dividend income and passive cash flow from dividend-paying stocks
          </p>
        </div>

        <DividendIncomeCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Building Passive Income with Dividends</h2>
          <p>
            Dividend investing is a time-tested strategy for building wealth and generating passive income.
            By investing in quality dividend-paying stocks and reinvesting those dividends, you can harness
            the power of compound growth to create a substantial income stream for retirement or financial
            independence.
          </p>

          <h2>What Are Dividends?</h2>
          <p>
            Dividends are regular cash payments that companies make to shareholders from their profits.
            Not all companies pay dividends - many growth companies reinvest profits back into the business.
            However, established companies with stable earnings often share profits with shareholders through
            quarterly dividend payments.
          </p>

          <h3>Types of Dividend-Paying Investments</h3>
          <ul>
            <li><strong>Blue-Chip Stocks:</strong> Large, established companies with consistent dividend history (e.g., Coca-Cola, Johnson & Johnson)</li>
            <li><strong>Dividend Aristocrats:</strong> S&P 500 companies with 25+ years of consecutive dividend increases</li>
            <li><strong>REITs:</strong> Real Estate Investment Trusts required to pay out 90% of income as dividends (typically 3-6% yields)</li>
            <li><strong>Dividend ETFs:</strong> Exchange-traded funds focused on dividend stocks (e.g., VYM, SCHD, VIG)</li>
            <li><strong>Preferred Stocks:</strong> Hybrid securities with fixed dividend payments and priority over common stock</li>
          </ul>

          <h2>Understanding Dividend Yield</h2>
          <p>
            Dividend yield is calculated as: <strong>(Annual Dividend Per Share / Stock Price) × 100</strong>
          </p>
          <p>
            Examples of typical dividend yields by sector:
          </p>
          <ul>
            <li><strong>Utilities:</strong> 3-5% (stable, regulated businesses)</li>
            <li><strong>REITs:</strong> 3-6% (real estate investment trusts)</li>
            <li><strong>Consumer Staples:</strong> 2-4% (food, household products)</li>
            <li><strong>Financials:</strong> 2-4% (banks, insurance)</li>
            <li><strong>Technology:</strong> 1-2% (growth-focused, lower yields)</li>
            <li><strong>High-Yield:</strong> 6-10%+ (higher risk, potential red flags)</li>
          </ul>

          <h2>The Power of Dividend Reinvestment (DRIP)</h2>
          <p>
            Dividend Reinvestment Plans (DRIPs) automatically use dividend payments to purchase additional
            shares. This accelerates wealth building through compound growth. Consider this example with
            a $10,000 initial investment, $500 monthly contributions, 4% dividend yield, 5% dividend growth,
            and 6% stock price appreciation over 30 years:
          </p>
          <ul>
            <li><strong>Without Reinvestment:</strong> ~$450,000 portfolio, $18,000/year dividends</li>
            <li><strong>With Reinvestment:</strong> ~$750,000 portfolio, $30,000/year dividends</li>
          </ul>
          <p>
            That's a 67% increase in portfolio value and dividend income just from reinvesting!
          </p>

          <h2>Dividend Growth Investing</h2>
          <p>
            Dividend growth investing focuses on companies that consistently increase their dividend payments
            year after year. This strategy provides:
          </p>
          <ul>
            <li><strong>Inflation Protection:</strong> Growing dividends outpace inflation over time</li>
            <li><strong>Yield on Cost Growth:</strong> Your effective yield increases each year based on original purchase price</li>
            <li><strong>Quality Companies:</strong> Only financially healthy companies can sustain dividend growth</li>
            <li><strong>Total Return:</strong> Combination of dividend income plus stock price appreciation</li>
          </ul>

          <h2>Yield on Cost (YOC)</h2>
          <p>
            Yield on cost measures dividend income relative to your original investment. Example:
          </p>
          <ul>
            <li>Buy stock at $100/share with $4 dividend (4% yield)</li>
            <li>After 10 years of 7% annual dividend growth, dividend is now $7.87</li>
            <li>Your yield on cost is 7.87% (based on original $100 investment)</li>
            <li>Even if stock yields only 3% at current price, you're earning 7.87% on your money!</li>
          </ul>

          <h2>Tax Considerations for Dividends</h2>
          <p>
            Dividend taxation varies based on account type and dividend classification:
          </p>
          <ul>
            <li><strong>Qualified Dividends:</strong> Taxed at capital gains rates (0%, 15%, or 20% based on income)</li>
            <li><strong>Non-Qualified/Ordinary Dividends:</strong> Taxed as ordinary income (10-37%)</li>
            <li><strong>Tax-Advantaged Accounts:</strong> Dividends in IRA/401(k) grow tax-deferred</li>
            <li><strong>Roth Accounts:</strong> All dividends and growth are tax-free in retirement</li>
            <li><strong>Taxable Accounts:</strong> Pay taxes annually on dividends received</li>
          </ul>

          <h2>Building a Dividend Portfolio</h2>
          <p>
            Diversification is key to a sustainable dividend portfolio:
          </p>
          <ul>
            <li><strong>Sector Diversification:</strong> Spread across 8-10 different sectors</li>
            <li><strong>Geographic Diversification:</strong> Include U.S. and international dividend stocks</li>
            <li><strong>Yield Diversification:</strong> Mix of moderate (2-4%) and higher (4-6%) yielders</li>
            <li><strong>Growth vs Income:</strong> Balance dividend growth stocks with high-yield stocks</li>
            <li><strong>15-30 Holdings:</strong> Enough diversification without being unwieldy</li>
          </ul>

          <h2>Red Flags to Avoid</h2>
          <p>
            Watch out for these warning signs when evaluating dividend stocks:
          </p>
          <ul>
            <li><strong>Unsustainable Payout Ratio:</strong> Paying out more than 100% of earnings</li>
            <li><strong>Declining Revenue/Earnings:</strong> Business fundamentals deteriorating</li>
            <li><strong>High Debt Levels:</strong> May force dividend cuts during downturns</li>
            <li><strong>Yield Too Good to Be True:</strong> Extremely high yields (10%+) often precede dividend cuts</li>
            <li><strong>Inconsistent History:</strong> Companies that frequently cut or suspend dividends</li>
            <li><strong>Stagnant Dividend:</strong> No growth in 5+ years suggests company challenges</li>
          </ul>

          <h2>Dividend Investing Strategies</h2>
          <h3>1. High-Yield Strategy</h3>
          <p>
            Focus on stocks yielding 4-7% for immediate income. Best for retirees needing current cash flow.
            Higher risk of dividend cuts. Examples: REITs, BDCs, utilities.
          </p>

          <h3>2. Dividend Growth Strategy</h3>
          <p>
            Invest in Dividend Aristocrats and companies with 10+ year growth streaks. Lower initial yields
            (2-3%) but strong dividend growth (7-10% annually). Best for long-term wealth building.
          </p>

          <h3>3. Dividend ETF Strategy</h3>
          <p>
            Use low-cost ETFs for instant diversification. Popular options: VYM (Vanguard High Dividend),
            SCHD (Schwab US Dividend Equity), VIG (Vanguard Dividend Appreciation). Great for beginners.
          </p>

          <h3>4. Dividend Capture Strategy</h3>
          <p>
            Advanced strategy: Buy before ex-dividend date, sell after. Requires active management and
            understanding of tax implications. Not recommended for beginners.
          </p>

          <h2>Sample Dividend Portfolio Allocation</h2>
          <p>
            A balanced dividend portfolio might look like:
          </p>
          <ul>
            <li>30% - Dividend Growth Stocks (Aristocrats with 20+ year histories)</li>
            <li>25% - High-Quality Blue Chips (J&J, Coca-Cola, Procter & Gamble)</li>
            <li>20% - Dividend ETFs (VYM, SCHD for diversification)</li>
            <li>15% - REITs (real estate exposure, higher yields)</li>
            <li>10% - International Dividend Stocks (geographic diversification)</li>
          </ul>

          <h2>Realistic Income Expectations</h2>
          <p>
            To generate meaningful dividend income:
          </p>
          <ul>
            <li><strong>$1,000/month ($12,000/year):</strong> Need ~$300,000 portfolio at 4% yield</li>
            <li><strong>$2,500/month ($30,000/year):</strong> Need ~$750,000 portfolio at 4% yield</li>
            <li><strong>$5,000/month ($60,000/year):</strong> Need ~$1,500,000 portfolio at 4% yield</li>
          </ul>
          <p>
            These targets are achievable through consistent investing, dividend reinvestment, and time.
            Starting with $10,000 and adding $500/month at 10% total return reaches $1 million in ~25 years.
          </p>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Chasing Yield:</strong> Buying stocks solely for high yield without checking fundamentals</li>
            <li><strong>Ignoring Total Return:</strong> Focusing only on dividends while stock price declines</li>
            <li><strong>Poor Diversification:</strong> Too concentrated in one sector or company</li>
            <li><strong>Not Reinvesting Early:</strong> Taking income too soon instead of compounding</li>
            <li><strong>Panic Selling:</strong> Selling quality dividend stocks during market downturns</li>
            <li><strong>Ignoring Taxes:</strong> Not optimizing account types for tax efficiency</li>
          </ul>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter your initial investment amount</li>
            <li>Set your planned monthly contribution</li>
            <li>Input average dividend yield (research your target stocks/ETFs)</li>
            <li>Estimate dividend growth rate (conservative: 3-5%, aggressive: 7-10%)</li>
            <li>Set stock price appreciation (historical average: 6-8%)</li>
            <li>Choose whether to reinvest dividends (recommended for growth phase)</li>
            <li>Select your investment time horizon</li>
            <li>Click Calculate to see your projected dividend income</li>
          </ol>

          <h2>Getting Started with Dividend Investing</h2>
          <ol>
            <li>Open a brokerage account (Fidelity, Schwab, Vanguard offer commission-free trading)</li>
            <li>Start with dividend ETFs (VYM or SCHD) for instant diversification</li>
            <li>Enable automatic dividend reinvestment (DRIP)</li>
            <li>Add individual dividend stocks as you learn (research payout ratios, dividend history)</li>
            <li>Contribute regularly (dollar-cost averaging)</li>
            <li>Track your portfolio quarterly and rebalance annually</li>
            <li>Consider tax-advantaged accounts (IRA/401(k)) to avoid annual dividend taxes</li>
          </ol>

          <h2>Advanced Tips</h2>
          <ul>
            <li><strong>Dollar-Cost Average:</strong> Invest consistently regardless of market conditions</li>
            <li><strong>Opportunistic Buying:</strong> Add to positions during market corrections when yields spike</li>
            <li><strong>Dividend Calendar:</strong> Build a portfolio with staggered ex-dividend dates for monthly income</li>
            <li><strong>Tax-Loss Harvesting:</strong> Offset dividend income with capital losses in taxable accounts</li>
            <li><strong>Roth Conversion Ladder:</strong> Convert traditional IRA to Roth for tax-free dividend income</li>
          </ul>
        </div>

        <RelatedCalculators currentCalculator="dividend-income" />
      </div>
    </div>
  );
}
