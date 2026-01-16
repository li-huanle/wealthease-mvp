import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const CollegeSavingsCalculator = dynamic(
  () => import('@/components/calculators/CollegeSavingsCalculator'),
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
  const t = await getTranslations('calculator.collegeSavings');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/college-savings`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/college-savings`,
        'zh': `${baseUrl}/zh/calculators/college-savings`,
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

export default async function CollegeSavingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            College Savings Calculator (529 Plan)
          </h1>
          <p className="text-xl text-gray-600">
            Plan and save for your child's college education with tax-advantaged 529 plans
          </p>
        </div>

        <CollegeSavingsCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2>Planning for College Education Costs</h2>
          <p>
            College costs have been rising faster than inflation for decades, making early planning essential.
            A 529 college savings plan offers tax-advantaged growth to help you save for future education expenses.
            This calculator helps you determine if you're on track and how much you should be saving monthly.
          </p>

          <h2>What is a 529 Plan?</h2>
          <p>
            A 529 plan is a tax-advantaged savings account specifically designed for education expenses. Named after
            Section 529 of the Internal Revenue Code, these plans offer several key benefits:
          </p>
          <ul>
            <li><strong>Tax-Free Growth:</strong> Investments grow federal tax-free</li>
            <li><strong>Tax-Free Withdrawals:</strong> Qualified education expenses can be withdrawn tax-free</li>
            <li><strong>State Tax Benefits:</strong> Many states offer tax deductions or credits for contributions</li>
            <li><strong>High Contribution Limits:</strong> Most states allow over $300,000 in total contributions</li>
            <li><strong>Flexibility:</strong> Can be used at any accredited college or university nationwide</li>
            <li><strong>Control:</strong> Account owner maintains control, not the beneficiary</li>
          </ul>

          <h2>Current College Cost Trends</h2>
          <p>
            Understanding college cost trends is crucial for planning:
          </p>
          <ul>
            <li><strong>Public In-State:</strong> Average $10,000-$15,000 per year (tuition + fees)</li>
            <li><strong>Public Out-of-State:</strong> Average $25,000-$30,000 per year</li>
            <li><strong>Private College:</strong> Average $35,000-$50,000 per year</li>
            <li><strong>Elite Private:</strong> Can exceed $60,000-$80,000 per year</li>
            <li><strong>Total 4-Year Cost:</strong> $100,000 to $320,000+ depending on school type</li>
            <li><strong>Historical Inflation:</strong> College costs have increased 5-6% annually for decades</li>
          </ul>

          <h2>The Power of Starting Early</h2>
          <p>
            Time is your greatest ally when saving for college. Consider these examples based on a $100,000 college
            cost goal with 7% annual returns:
          </p>
          <ul>
            <li><strong>Start at Birth (18 years):</strong> $212/month needed</li>
            <li><strong>Start at Age 5 (13 years):</strong> $368/month needed</li>
            <li><strong>Start at Age 10 (8 years):</strong> $746/month needed</li>
            <li><strong>Start at Age 15 (3 years):</strong> $2,435/month needed</li>
          </ul>
          <p>
            Starting just 5 years earlier can cut your required monthly savings by 40% or more!
          </p>

          <h2>Investment Strategies for 529 Plans</h2>
          <p>
            Most 529 plans offer various investment options:
          </p>
          <ul>
            <li><strong>Age-Based Portfolios:</strong> Automatically become more conservative as college approaches (recommended for most)</li>
            <li><strong>Aggressive Growth:</strong> 100% stocks, suitable when child is young (typical 8-10% historical returns)</li>
            <li><strong>Moderate Growth:</strong> 60-80% stocks, balanced approach (typical 6-8% historical returns)</li>
            <li><strong>Conservative:</strong> Bonds and stable value, used close to college (typical 3-5% historical returns)</li>
            <li><strong>Target-Date Funds:</strong> Automatically adjust based on expected college enrollment year</li>
          </ul>

          <h2>Qualified Education Expenses</h2>
          <p>
            529 plan funds can be used tax-free for these qualified expenses:
          </p>
          <ul>
            <li>Tuition and mandatory fees</li>
            <li>Room and board (if enrolled at least half-time)</li>
            <li>Required books, supplies, and equipment</li>
            <li>Computer and internet access (if required)</li>
            <li>Special needs equipment</li>
            <li>Up to $10,000 per year for K-12 tuition</li>
            <li>Up to $10,000 lifetime for student loan repayment</li>
          </ul>

          <h2>State Tax Benefits</h2>
          <p>
            Over 30 states offer tax deductions or credits for 529 contributions. Examples:
          </p>
          <ul>
            <li><strong>New York:</strong> Up to $10,000 deduction ($20,000 married)</li>
            <li><strong>Illinois:</strong> Up to $10,000 deduction ($20,000 married)</li>
            <li><strong>Colorado:</strong> Full deduction, no limit</li>
            <li><strong>Indiana:</strong> 20% credit up to $1,000 (on $5,000 contribution)</li>
          </ul>
          <p>
            Always check your state's specific benefits - you may need to use your home state's plan to get the tax break.
          </p>

          <h2>What If You Save Too Much?</h2>
          <p>
            If your child doesn't use all the funds, you have several options:
          </p>
          <ul>
            <li><strong>Change Beneficiary:</strong> Transfer to another family member (siblings, cousins, even yourself)</li>
            <li><strong>Save for Graduate School:</strong> Funds can be used for advanced degrees</li>
            <li><strong>Roll to Roth IRA:</strong> New in 2024, up to $35,000 lifetime can roll to Roth (subject to rules)</li>
            <li><strong>Non-Qualified Withdrawal:</strong> Pay tax + 10% penalty on earnings only (contributions come out tax/penalty-free)</li>
            <li><strong>Scholarship Exception:</strong> If child gets scholarship, can withdraw that amount penalty-free (still pay tax on earnings)</li>
          </ul>

          <h2>Alternatives and Supplements to 529 Plans</h2>
          <p>
            While 529 plans are excellent, consider these complementary strategies:
          </p>
          <ul>
            <li><strong>Roth IRA:</strong> Contributions (not earnings) can be withdrawn tax/penalty-free for education</li>
            <li><strong>Coverdell ESA:</strong> Similar to 529 but lower limits ($2,000/year), can be used for K-12</li>
            <li><strong>UGMA/UTMA:</strong> Custodial accounts with more flexibility but less favorable tax treatment</li>
            <li><strong>Taxable Account:</strong> Most flexible but no tax advantages</li>
            <li><strong>Series I Bonds:</strong> Tax-free for education if income limits met</li>
          </ul>

          <h2>Financial Aid Impact</h2>
          <p>
            529 plans are treated favorably in financial aid calculations:
          </p>
          <ul>
            <li><strong>Parent-Owned 529:</strong> Assessed at max 5.64% in FAFSA calculations (minimal impact)</li>
            <li><strong>Student-Owned Accounts:</strong> Assessed at 20% (much worse for aid)</li>
            <li><strong>Grandparent-Owned 529:</strong> Not reported on FAFSA (as of 2024 FAFSA simplification)</li>
            <li><strong>Strategic Timing:</strong> Use 529 funds in later college years to minimize aid impact</li>
          </ul>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Waiting Too Long:</strong> Starting even 2-3 years earlier makes a huge difference</li>
            <li><strong>Too Conservative Too Soon:</strong> Being overly risk-averse when child is young limits growth</li>
            <li><strong>Ignoring State Tax Benefits:</strong> Free money from state tax deductions</li>
            <li><strong>Sacrificing Retirement:</strong> You can borrow for college but not for retirement</li>
            <li><strong>Over-Contributing:</strong> Don't save so much you sacrifice other financial goals</li>
            <li><strong>Forgetting to Rebalance:</strong> Review and adjust investments as college approaches</li>
          </ul>

          <h2>How to Use This Calculator</h2>
          <ol>
            <li>Enter your child's current age and expected college entry age</li>
            <li>Input current 529 savings and monthly contribution amount</li>
            <li>Set expected investment return (conservative: 5%, moderate: 7%, aggressive: 9%)</li>
            <li>Estimate annual college costs (use current prices - calculator adjusts for inflation)</li>
            <li>Set college cost inflation rate (historical average is 5-6%)</li>
            <li>Specify years in college (typically 4, but can adjust for 2-year or graduate school)</li>
            <li>Click Calculate to see if you're on track</li>
          </ol>

          <h2>Recommended Savings Guidelines</h2>
          <p>
            As a rule of thumb, consider these monthly savings targets to cover 100% of projected costs:
          </p>
          <ul>
            <li><strong>Public In-State Goal ($100k total):</strong> $212/month from birth, $368/month from age 5</li>
            <li><strong>Public Out-of-State Goal ($150k total):</strong> $318/month from birth, $552/month from age 5</li>
            <li><strong>Private College Goal ($250k total):</strong> $530/month from birth, $920/month from age 5</li>
          </ul>
          <p>
            Remember, you don't have to save 100% - many families aim for 50-70% and use a combination of
            savings, current income, financial aid, and student loans.
          </p>

          <h2>Getting Started</h2>
          <p>
            To open a 529 plan:
          </p>
          <ol>
            <li>Research your state's plan and compare fees</li>
            <li>Consider highly-rated plans from other states if your state doesn't offer tax benefits</li>
            <li>Look for low-fee index fund options (fees under 0.25% annually)</li>
            <li>Consider direct-sold plans to avoid advisor fees (unless you need guidance)</li>
            <li>Set up automatic monthly contributions to maintain discipline</li>
            <li>Review and rebalance annually</li>
          </ol>
        </div>

        <RelatedCalculators currentCalculator="college-savings" />
      </div>
    </div>
  );
}
