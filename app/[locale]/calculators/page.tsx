import Link from 'next/link';
import { TrendingUp, PiggyBank, Calculator, Home, BarChart3, Target, CreditCard } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Free Financial Calculators - Compound Interest, Retirement, Loan & More | WealthEase',
      description: 'Access 7 free professional financial calculators: Compound Interest, Retirement Planning, Savings Goal, Debt Payoff, Loan, Mortgage, and ROI Calculator. Get accurate results instantly with detailed charts and expert recommendations.',
      keywords: 'financial calculators, compound interest calculator, retirement calculator, savings goal calculator, debt payoff calculator, loan calculator, mortgage calculator, ROI calculator, free calculators, investment tools',
    },
    zh: {
      title: '免费理财计算器 - 复利、退休、贷款等专业工具 | WealthEase',
      description: '提供7款免费专业理财计算器：复利计算器、退休规划计算器、储蓄目标计算器、债务还清计算器、贷款计算器、房贷计算器、投资回报率计算器。即时获取精准结果，配有详细图表和专业建议。',
      keywords: '理财计算器, 复利计算器, 退休计算器, 储蓄目标计算器, 债务还清计算器, 贷款计算器, 房贷计算器, ROI计算器, 免费计算器, 投资工具',
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

  const calculators = [
    {
      icon: <TrendingUp className="w-10 h-10 text-primary-600" />,
      title: t('tools.compound.title'),
      description: t('tools.compound.description'),
      href: `/${locale}/calculators/compound-interest`,
      available: true,
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-primary-600" />,
      title: t('tools.retirement.title'),
      description: t('tools.retirement.description'),
      href: `/${locale}/calculators/retirement`,
      available: true,
    },
    {
      icon: <Target className="w-10 h-10 text-primary-600" />,
      title: t('tools.savingsGoal.title'),
      description: t('tools.savingsGoal.description'),
      href: `/${locale}/calculators/savings-goal`,
      available: true,
    },
    {
      icon: <CreditCard className="w-10 h-10 text-primary-600" />,
      title: t('tools.debtPayoff.title'),
      description: t('tools.debtPayoff.description'),
      href: `/${locale}/calculators/debt-payoff`,
      available: true,
    },
    {
      icon: <Calculator className="w-10 h-10 text-primary-600" />,
      title: t('tools.loan.title'),
      description: t('tools.loan.description'),
      href: `/${locale}/calculators/loan`,
      available: true,
    },
    {
      icon: <Home className="w-10 h-10 text-primary-600" />,
      title: t('tools.mortgage.title'),
      description: t('tools.mortgage.description'),
      href: `/${locale}/calculators/mortgage`,
      available: true,
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-primary-600" />,
      title: t('tools.roi.title'),
      description: t('tools.roi.description'),
      href: `/${locale}/calculators/roi`,
      available: true,
    },
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('subtitle')}
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
                      {t('comingSoon')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
