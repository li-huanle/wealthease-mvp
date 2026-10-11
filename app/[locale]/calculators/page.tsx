import Link from 'next/link';
import {
  TrendingUp,
  PiggyBank,
  Calculator,
  Home,
  BarChart3,
  Target,
  CreditCard,
  DollarSign,
  GraduationCap,
  PieChart,
  Briefcase,
  Car,
  Utensils,
  Ruler,
  Receipt,
  Percent,
  Scale,
  LifeBuoy,
  Landmark,
  Wallet,
  GraduationCap as GraduationIcon,
} from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Free Financial Calculators - Income & Tax, Housing, Lifestyle, Investment Tools | WealthEase',
      description: 'Free financial calculators organized by life scenarios: Income & Tax, Housing, Lifestyle, Investment, and more. Get instant accurate results.',
      keywords: 'financial calculators, income tax calculator, 401k calculator, take home pay calculator, mortgage calculator, rent vs buy calculator, tip calculator, car loan calculator, inflation calculator, compound interest calculator, retirement calculator, savings goal calculator, debt payoff calculator, college savings calculator, dividend income calculator, investment comparison calculator, free calculators, investment tools',
    },
    zh: {
      title: '免费理财计算器 - 薪酬税务、房产居住、生活消费、投资工具 | WealthEase',
      description: '按生活场景组织的免费理财计算器：薪酬与税务、房产与居住、生活与消费、投资及其他。即时获取精准结果。',
      keywords: '理财计算器, 薪资税计算器, 401k计算器, 到手工资计算器, 房贷计算器, 租房买房计算器, 小费计算器, 车贷计算器, 通胀计算器, 复利计算器, 退休计算器, 储蓄目标计算器, 债务还清计算器, 大学储蓄计算器, 股息收入计算器, 投资对比计算器, 免费计算器, 投资工具',
    },
  };

  const lang = locale as 'en' | 'zh';

  const baseUrl = 'https://www.wealthease.top';

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
      canonical: `${baseUrl}/${locale}/calculators`,
      languages: {
        'en': `${baseUrl}/en/calculators`,
        'zh': `${baseUrl}/zh/calculators`,
      },
    },
  };
}

export default async function CalculatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'calculatorsPage' });

  const categories = [
    {
      id: 'income-tax',
      icon: <Briefcase className="w-8 h-8" />,
      title: t('categories.incomeTax.title'),
      description: t('categories.incomeTax.description'),
      calculators: [
        {
          icon: <Wallet className="w-8 h-8 text-primary-600" />,
          title: t('tools.takeHomePay.title'),
          description: t('tools.takeHomePay.description'),
          href: `/${locale}/calculators/take-home-pay`,
          available: true,
        },
        {
          icon: <PiggyBank className="w-8 h-8 text-primary-600" />,
          title: t('tools.investment401k.title'),
          description: t('tools.investment401k.description'),
          href: `/${locale}/calculators/investment-401k`,
          available: true,
        },
        {
          icon: <Receipt className="w-8 h-8 text-primary-600" />,
          title: t('tools.taxBracket.title'),
          description: t('tools.taxBracket.description'),
          href: `/${locale}/calculators/tax-bracket`,
          available: true,
        },
        {
          icon: <Receipt className="w-8 h-8 text-primary-600" />,
          title: t('tools.tax.title'),
          description: t('tools.tax.description'),
          href: `/${locale}/calculators/tax`,
          available: true,
        },
        {
          icon: <Briefcase className="w-8 h-8 text-primary-600" />,
          title: t('tools.socialSecurity.title'),
          description: t('tools.socialSecurity.description'),
          href: `/${locale}/calculators/social-security`,
          available: true,
        },
      ],
    },
    {
      id: 'housing',
      icon: <Home className="w-8 h-8" />,
      title: t('categories.housing.title'),
      description: t('categories.housing.description'),
      calculators: [
        {
          icon: <Calculator className="w-8 h-8 text-primary-600" />,
          title: t('tools.mortgage.title'),
          description: t('tools.mortgage.description'),
          href: `/${locale}/calculators/mortgage`,
          available: true,
        },
        {
          icon: <BarChart3 className="w-8 h-8 text-primary-600" />,
          title: t('tools.roi.title'),
          description: t('tools.roi.description'),
          href: `/${locale}/calculators/roi`,
          available: true,
        },
        {
          icon: <Home className="w-8 h-8 text-primary-600" />,
          title: t('tools.rentVsBuy.title'),
          description: t('tools.rentVsBuy.description'),
          href: `/${locale}/calculators/rent-vs-buy`,
          available: true,
        },
        {
          icon: <Ruler className="w-8 h-8 text-primary-600" />,
          title: t('tools.areaConversion.title'),
          description: t('tools.areaConversion.description'),
          href: `/${locale}/calculators/area-conversion`,
          available: true,
        },
      ],
    },
    {
      id: 'everyday-money',
      icon: <Wallet className="w-8 h-8" />,
      title: locale === 'zh' ? '日常理财决策' : 'Everyday Money Decisions',
      description: locale === 'zh' ? '分期年化利率、基金费率、应急金、提前还房贷' : 'Installment APR, fund fees, emergency fund and mortgage prepayment',
      calculators: [
        {
          icon: <Percent className="w-8 h-8 text-primary-600" />,
          title: t('tools.installmentApr.title'),
          description: t('tools.installmentApr.description'),
          href: `/${locale}/calculators/installment-apr`,
          available: true,
        },
        {
          icon: <Scale className="w-8 h-8 text-primary-600" />,
          title: t('tools.fundFees.title'),
          description: t('tools.fundFees.description'),
          href: `/${locale}/calculators/fund-fees`,
          available: true,
        },
        {
          icon: <LifeBuoy className="w-8 h-8 text-primary-600" />,
          title: t('tools.emergencyFund.title'),
          description: t('tools.emergencyFund.description'),
          href: `/${locale}/calculators/emergency-fund`,
          available: true,
        },
        {
          icon: <Landmark className="w-8 h-8 text-primary-600" />,
          title: t('tools.mortgagePrepayment.title'),
          description: t('tools.mortgagePrepayment.description'),
          href: `/${locale}/calculators/mortgage-prepayment`,
          available: true,
        },
      ],
    },
    {
      id: 'lifestyle',
      icon: <Utensils className="w-8 h-8" />,
      title: t('categories.lifestyle.title'),
      description: t('categories.lifestyle.description'),
      calculators: [
        {
          icon: <DollarSign className="w-8 h-8 text-primary-600" />,
          title: t('tools.tip.title'),
          description: t('tools.tip.description'),
          href: `/${locale}/calculators/tip`,
          available: true,
        },
        {
          icon: <Car className="w-8 h-8 text-primary-600" />,
          title: t('tools.carLoan.title'),
          description: t('tools.carLoan.description'),
          href: `/${locale}/calculators/auto-loan`,
          available: true,
        },
        {
          icon: <Calculator className="w-8 h-8 text-primary-600" />,
          title: t('tools.loan.title'),
          description: t('tools.loan.description'),
          href: `/${locale}/calculators/loan`,
          available: true,
        },
        {
          icon: <TrendingUp className="w-8 h-8 text-primary-600" />,
          title: t('tools.inflation.title'),
          description: t('tools.inflation.description'),
          href: `/${locale}/calculators/inflation`,
          available: true,
        },
        {
          icon: <CreditCard className="w-8 h-8 text-primary-600" />,
          title: t('tools.creditScore.title'),
          description: t('tools.creditScore.description'),
          href: `/${locale}/calculators/credit-score`,
          available: true,
        },
      ],
    },
    {
      id: 'investment',
      icon: <TrendingUp className="w-8 h-8" />,
      title: locale === 'zh' ? '投资与规划' : 'Investment & Planning',
      description: locale === 'zh' ? '复利、储蓄目标、债务还清等投资规划工具' : 'Compound interest, savings goals, debt payoff and other investment planning tools',
      calculators: [
        {
          icon: <TrendingUp className="w-8 h-8 text-primary-600" />,
          title: t('tools.compound.title'),
          description: t('tools.compound.description'),
          href: `/${locale}/calculators/compound-interest`,
          available: true,
        },
        {
          icon: <GraduationIcon className="w-8 h-8 text-primary-600" />,
          title: t('tools.retirement.title'),
          description: t('tools.retirement.description'),
          href: `/${locale}/calculators/retirement`,
          available: true,
        },
        {
          icon: <Target className="w-8 h-8 text-primary-600" />,
          title: t('tools.savingsGoal.title'),
          description: t('tools.savingsGoal.description'),
          href: `/${locale}/calculators/savings-goal`,
          available: true,
        },
        {
          icon: <CreditCard className="w-8 h-8 text-primary-600" />,
          title: t('tools.debtPayoff.title'),
          description: t('tools.debtPayoff.description'),
          href: `/${locale}/calculators/debt-payoff`,
          available: true,
        },
        {
          icon: <PiggyBank className="w-8 h-8 text-primary-600" />,
          title: t('tools.cd.title'),
          description: t('tools.cd.description'),
          href: `/${locale}/calculators/cd`,
          available: true,
        },
        {
          icon: <TrendingUp className="w-8 h-8 text-primary-600" />,
          title: t('tools.annuity.title'),
          description: t('tools.annuity.description'),
          href: `/${locale}/calculators/annuity`,
          available: true,
        },
      ],
    },
    {
      id: 'education',
      icon: <GraduationCap className="w-8 h-8" />,
      title: locale === 'zh' ? '教育与家庭' : 'Education & Family',
      description: locale === 'zh' ? '大学学费储蓄、股息收入等家庭财务工具' : 'College savings, dividend income and other family financial tools',
      calculators: [
        {
          icon: <GraduationIcon className="w-8 h-8 text-primary-600" />,
          title: t('tools.collegeSavings.title'),
          description: t('tools.collegeSavings.description'),
          href: `/${locale}/calculators/college-savings`,
          available: true,
        },
        {
          icon: <PieChart className="w-8 h-8 text-primary-600" />,
          title: t('tools.dividendIncome.title'),
          description: t('tools.dividendIncome.description'),
          href: `/${locale}/calculators/dividend-income`,
          available: true,
        },
        {
          icon: <PieChart className="w-8 h-8 text-primary-600" />,
          title: t('tools.investmentComparison.title'),
          description: t('tools.investmentComparison.description'),
          href: `/${locale}/calculators/investment-comparison`,
          available: true,
        },
      ],
    },
  ];

  const total = categories.reduce((n, c) => n + c.calculators.filter((x) => x.available).length, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-gradient-to-b from-primary-50/60 to-white">
        <div className="container mx-auto max-w-6xl px-4 py-14">
          <p className="mb-3 text-sm font-semibold text-primary-700">
            {locale === 'zh' ? `${total} 个免费计算器` : `${total} free calculators`}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">{t('title')}</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">{t('subtitle')}</p>
          {/* Category jump links */}
          <nav className="mt-8 flex flex-wrap gap-2" aria-label={locale === 'zh' ? '分类' : 'Categories'}>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rounded-full border bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-quick ease-out hover:border-primary-300 hover:text-primary-700"
              >
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="mb-14 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 [&>svg]:h-5 [&>svg]:w-5">
                {category.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-gray-950">{category.title}</h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.calculators.map((calc) =>
                calc.available ? (
                  <Link
                    key={calc.title}
                    href={calc.href}
                    className="group flex h-full flex-col rounded-xl bg-white p-5 shadow-card transition-[box-shadow,transform] duration-base ease-out hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors duration-quick ease-out group-hover:bg-primary-50 [&>svg]:h-5 [&>svg]:w-5">
                      {calc.icon}
                    </div>
                    <h3 className="mb-1.5 font-semibold text-gray-900 transition-colors duration-quick ease-out group-hover:text-primary-700">
                      {calc.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{calc.description}</p>
                  </Link>
                ) : (
                  <div key={calc.title} className="flex h-full flex-col rounded-xl border border-dashed p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted opacity-60 [&>svg]:h-5 [&>svg]:w-5">{calc.icon}</div>
                    <h3 className="mb-1.5 font-semibold text-gray-500">{calc.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{calc.description}</p>
                    <span className="mt-auto w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-gray-600">{t('comingSoon')}</span>
                  </div>
                )
              )}
            </div>
          </section>
        ))}

        {/* SEO Content Section */}
        <section className="mt-6 rounded-xl bg-muted/50 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'zh' ? '为什么选择按生活场景组织的计算器？' : 'Why Calculators Organized by Life Scenarios?'}
          </h2>
          <div className="prose prose-gray max-w-none">
            {locale === 'zh' ? (
              <>
                <p className="text-gray-600 mb-4">
                  我们按实际生活场景组织计算器，让您能更快速地找到需要的工具。无论您是在规划退休、考虑买房，还是需要计算小费，我们都有相应的专业工具。
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>薪酬与税务</strong>：了解您的税后收入，规划退休储蓄，查询美国联邦税阶</li>
                  <li><strong>房产与居住</strong>：计算房贷月供，比较租房与买房的长期成本，换算房屋面积单位</li>
                  <li><strong>生活与消费</strong>：快速计算小费金额，估算车贷月供，了解通胀对购买力的影响</li>
                  <li><strong>投资与规划</strong>：复利计算、储蓄目标、债务还清等投资规划工具</li>
                  <li><strong>教育与家庭</strong>：大学学费储蓄、股息收入等家庭财务工具</li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  We organize our calculators by real-life scenarios so you can quickly find the tools you need. Whether you're planning for retirement, considering buying a home, or need to calculate a tip, we have the right professional tool for you.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Income & Tax</strong>: Understand your take-home pay, plan retirement savings, check US federal tax brackets</li>
                  <li><strong>Housing</strong>: Calculate mortgage payments, compare long-term costs of renting vs buying, convert area units</li>
                  <li><strong>Lifestyle</strong>: Quickly calculate tip amounts, estimate car loan payments, understand inflation's impact on purchasing power</li>
                  <li><strong>Investment & Planning</strong>: Compound interest, savings goals, debt payoff and other investment planning tools</li>
                  <li><strong>Education & Family</strong>: College savings, dividend income and other family financial tools</li>
                </ul>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
