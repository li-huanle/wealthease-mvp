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
  Wallet,
} from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Free Financial Calculators - Income & Tax, Housing, Lifestyle Tools | WealthEase',
      description: 'Free financial calculators organized by life scenarios: Income & Tax (401(k), Take-home Pay), Housing (Mortgage, Rent vs Buy), and Lifestyle (Tip, Car Loan, Inflation). Get instant accurate results.',
      keywords: 'financial calculators, income tax calculator, 401k calculator, take home pay calculator, mortgage calculator, rent vs buy calculator, tip calculator, car loan calculator, inflation calculator, free calculators, investment tools, tax bracket calculator, hoa calculator',
    },
    zh: {
      title: '免费理财计算器 - 薪酬税务、房产居住、生活消费工具 | WealthEase',
      description: '按生活场景组织的免费理财计算器：薪酬与税务（401(k)、到手工资）、房产与居住（房贷、租房买房）、生活与消费（小费、车贷、通胀）。即时获取精准结果。',
      keywords: '理财计算器, 薪资税计算器, 401k计算器, 到手工资计算器, 房贷计算器, 租房买房计算器, 小费计算器, 车贷计算器, 通胀计算器, 免费计算器, 投资工具, 税阶查询, HOA计算器',
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
          available: false,
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
          available: false,
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
          icon: <Ruler className="w-8 h-8 text-primary-600" />,
          title: t('tools.areaConversion.title'),
          description: t('tools.areaConversion.description'),
          href: `/${locale}/calculators/area-conversion`,
          available: false,
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
          available: false,
        },
        {
          icon: <Car className="w-8 h-8 text-primary-600" />,
          title: t('tools.carLoan.title'),
          description: t('tools.carLoan.description'),
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
      ],
    },
  ];

  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Categories */}
        {categories.map((category, categoryIndex) => (
          <section key={category.id} className="mb-16">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-3 rounded-xl">
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            {/* Calculators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.calculators.map((calc) => (
                <div key={calc.title}>
                  {calc.available ? (
                    <Link
                      href={calc.href}
                      className="block h-full p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-500 group"
                    >
                      <div className="mb-4">{calc.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {calc.title}
                      </h3>
                      <p className="text-gray-600">{calc.description}</p>
                    </Link>
                  ) : (
                    <div className="h-full p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <div className="mb-4">{calc.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-500 mb-2">
                        {calc.title}
                      </h3>
                      <p className="text-gray-500 mb-3">{calc.description}</p>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        {t('comingSoon')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* SEO Content Section */}
        <section className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-card">
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
                </ul>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
