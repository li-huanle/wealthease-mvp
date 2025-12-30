import Link from 'next/link';
import { TrendingUp, PiggyBank, Calculator, Home, BarChart3 } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Free Financial Calculators - Compound Interest, Retirement, Loan & More | WealthEase',
      description: 'Access 5 free professional financial calculators: Compound Interest, Retirement Planning, Loan, Mortgage, and ROI Calculator. Get accurate results instantly with detailed charts and expert recommendations.',
      keywords: 'financial calculators, compound interest calculator, retirement calculator, loan calculator, mortgage calculator, ROI calculator, free calculators, investment tools',
    },
    zh: {
      title: '免费理财计算器 - 复利、退休、贷款等专业工具 | WealthEase',
      description: '提供5款免费专业理财计算器：复利计算器、退休规划计算器、贷款计算器、房贷计算器、投资回报率计算器。即时获取精准结果，配有详细图表和专业建议。',
      keywords: '理财计算器, 复利计算器, 退休计算器, 贷款计算器, 房贷计算器, ROI计算器, 免费计算器, 投资工具',
    },
  };

  const lang = locale as 'en' | 'zh';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      locale: locale,
      siteName: 'WealthEase',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    },
    alternates: {
      canonical: `/${locale}/calculators`,
      languages: {
        'en': '/en/calculators',
        'zh': '/zh/calculators',
      },
    },
  };
}

export default async function CalculatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const calculators = [
    {
      icon: <TrendingUp className="w-10 h-10 text-primary-600" />,
      title: 'Compound Interest Calculator',
      description: 'See how your investments grow with compound interest over time',
      href: `/${locale}/calculators/compound-interest`,
      available: true,
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-primary-600" />,
      title: 'Retirement Calculator',
      description: 'Plan for a comfortable retirement',
      href: `/${locale}/calculators/retirement`,
      available: true,
    },
    {
      icon: <Calculator className="w-10 h-10 text-primary-600" />,
      title: 'Loan Calculator',
      description: 'Calculate loan payments and total interest',
      href: `/${locale}/calculators/loan`,
      available: true,
    },
    {
      icon: <Home className="w-10 h-10 text-primary-600" />,
      title: 'Mortgage Calculator',
      description: 'Estimate your monthly mortgage payments',
      href: `/${locale}/calculators/mortgage`,
      available: true,
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-primary-600" />,
      title: 'ROI Calculator',
      description: 'Calculate return on investment and annualized returns',
      href: `/${locale}/calculators/roi`,
      available: true,
    },
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Financial Calculators
            </h1>
            <p className="text-xl text-gray-600">
              Professional-grade tools to help you make smarter financial decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <div key={calc.title}>
                {calc.available ? (
                  <Link
                    href={calc.href}
                    className="block h-full p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary-500"
                  >
                    <div className="mb-4">{calc.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {calc.title}
                    </h3>
                    <p className="text-gray-600">{calc.description}</p>
                  </Link>
                ) : (
                  <div className="h-full p-6 bg-gray-100 rounded-xl border-2 border-gray-200">
                    <div className="mb-4">{calc.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">
                      {calc.title}
                    </h3>
                    <p className="text-gray-500">{calc.description}</p>
                    <span className="inline-block mt-3 text-sm text-gray-400">
                      Coming soon
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SEO Content Section */}
          <div className="mt-16 prose prose-lg max-w-none bg-white rounded-xl p-8 shadow-sm">
            <h2>Why Use Our Financial Calculators?</h2>
            <p>
              Making smart financial decisions requires accurate calculations and clear insights. Our suite of free financial calculators
              provides professional-grade tools that help you understand complex financial scenarios in minutes. Whether you're planning
              for retirement, evaluating a loan, or analyzing investment returns, our calculators deliver instant, reliable results.
            </p>

            <h2>Our Calculator Suite</h2>

            <h3>1. Compound Interest Calculator</h3>
            <p>
              Discover the power of compound interest with our easy-to-use calculator. See how your investments grow over time with
              regular contributions and compound returns. Perfect for understanding long-term investment growth and retirement savings potential.
            </p>

            <h3>2. Retirement Planning Calculator</h3>
            <p>
              Plan your financial future with confidence. Our retirement calculator helps you determine if you're on track to meet your
              retirement goals. Input your current savings, monthly contributions, and retirement timeline to see if your plan is sufficient,
              with personalized recommendations if adjustments are needed.
            </p>

            <h3>3. Loan Calculator</h3>
            <p>
              Calculate monthly loan payments, total interest costs, and amortization schedules for any type of loan. Whether it's a personal
              loan, auto loan, or student loan, our calculator shows you exactly how much you'll pay and when.
            </p>

            <h3>4. Mortgage Calculator</h3>
            <p>
              Get a complete picture of your mortgage costs including principal, interest, property taxes, insurance, and PMI. Our mortgage
              calculator helps homebuyers understand their true monthly payment and total cost of homeownership.
            </p>

            <h3>5. ROI Calculator (Return on Investment)</h3>
            <p>
              Measure the profitability of your investments with both simple ROI and annualized returns (CAGR). Compare different investment
              opportunities on an equal footing and make data-driven investment decisions.
            </p>

            <h2>Key Features</h2>
            <ul>
              <li><strong>100% Free:</strong> All calculators are completely free to use with no hidden fees or registration required</li>
              <li><strong>Accurate Results:</strong> Built on proven financial formulas used by professionals</li>
              <li><strong>Visual Charts:</strong> See your results displayed in easy-to-understand graphs and charts</li>
              <li><strong>Instant Calculations:</strong> Get results in real-time as you adjust your inputs</li>
              <li><strong>Mobile Friendly:</strong> Use on any device - desktop, tablet, or smartphone</li>
              <li><strong>Privacy Protected:</strong> All calculations happen in your browser - we don't store your data</li>
              <li><strong>Expert Guidance:</strong> Each calculator includes educational content and tips</li>
            </ul>

            <h2>How to Get Started</h2>
            <p>
              Simply click on any calculator above to begin. Each tool features an intuitive interface with clearly labeled inputs.
              Enter your financial information, click calculate, and receive detailed results with visual charts and actionable insights.
              No financial expertise required - our calculators are designed for everyone from beginners to experienced investors.
            </p>

            <h2>Who Should Use These Calculators?</h2>
            <p>
              Our financial calculators are perfect for anyone looking to make informed money decisions:
            </p>
            <ul>
              <li>Young professionals starting to invest and plan for the future</li>
              <li>Families planning major purchases like homes or education</li>
              <li>Individuals approaching retirement who need to verify their plans</li>
              <li>Anyone considering taking out a loan or mortgage</li>
              <li>Investors evaluating different investment opportunities</li>
              <li>Financial advisors looking for client-facing tools</li>
            </ul>

            <h2>Frequently Asked Questions</h2>

            <h3>Are these calculators really free?</h3>
            <p>
              Yes! All our financial calculators are 100% free to use with no limits, no registration, and no hidden fees.
              We believe everyone deserves access to quality financial tools.
            </p>

            <h3>Do you store my financial information?</h3>
            <p>
              No. All calculations are performed directly in your web browser. Your financial information never leaves your device,
              ensuring complete privacy and security.
            </p>

            <h3>How accurate are the calculations?</h3>
            <p>
              Our calculators use industry-standard financial formulas that are widely accepted by financial professionals. However,
              these are estimation tools - actual results may vary based on factors like tax situations, fees, and market conditions.
              Always consult with a qualified financial advisor for personalized advice.
            </p>

            <h3>Can I use these calculators on my phone?</h3>
            <p>
              Absolutely! All our calculators are fully responsive and work perfectly on smartphones, tablets, and desktop computers.
            </p>
          </div>
        </div>
    </div>
  );
}
