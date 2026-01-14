import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {Calculator, TrendingUp, Shield, CheckCircle, ArrowRight, BarChart3, PiggyBank, Target} from 'lucide-react';
import {Metadata} from 'next';
import {OrganizationSchema, WebApplicationSchema} from '@/components/StructuredData';
import dynamic from 'next/dynamic';

// 动态导入 NewsletterForm，延迟加载非关键组件
const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), {
  loading: () => (
    <div className="card max-w-2xl mx-auto text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white p-12">
      <div className="animate-pulse">
        <div className="h-8 bg-white/30 rounded mb-4 mx-auto w-48"></div>
        <div className="h-4 bg-white/20 rounded mb-6 mx-auto w-64"></div>
        <div className="h-12 bg-white/20 rounded mx-auto max-w-md"></div>
      </div>
    </div>
  ),
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;

  const metadata = {
    en: {
      title: 'WealthEase - Free Financial Calculators & Tools for Smart Money Management',
      description: 'Free professional financial calculators including compound interest, retirement planning, loan, mortgage, and ROI calculators. Make informed financial decisions with accurate calculations and expert guidance.',
      keywords: 'financial calculator, compound interest calculator, retirement calculator, loan calculator, mortgage calculator, ROI calculator, investment calculator, free financial tools',
    },
    zh: {
      title: 'WealthEase - 免费理财计算器与智能财务管理工具',
      description: '提供专业的免费理财计算器，包括复利计算器、退休规划计算器、贷款计算器、房贷计算器和投资回报率计算器。精准计算，助您做出明智的财务决策。',
      keywords: '理财计算器, 复利计算器, 退休规划计算器, 贷款计算器, 房贷计算器, 投资回报率计算器, 财务工具, 免费计算器',
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
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'zh': `${baseUrl}/zh`,
      },
    },
  };
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const tools = [
    {
      key: 'compound',
      href: `/${locale}/calculators/compound-interest`,
      icon: '📈',
      color: 'from-blue-500 to-blue-600',
    },
    {
      key: 'retirement',
      href: `/${locale}/calculators/retirement`,
      icon: '🏖️',
      color: 'from-green-500 to-green-600',
    },
    {
      key: 'savingsGoal',
      href: `/${locale}/calculators/savings-goal`,
      icon: '🎯',
      color: 'from-purple-500 to-purple-600',
    },
    {
      key: 'debtPayoff',
      href: `/${locale}/calculators/debt-payoff`,
      icon: '💳',
      color: 'from-red-500 to-red-600',
    },
    {
      key: 'loan',
      href: `/${locale}/calculators/loan`,
      icon: '🏠',
      color: 'from-orange-500 to-orange-600',
    },
    {
      key: 'roi',
      href: `/${locale}/calculators/roi`,
      icon: '📊',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const features = [
    {
      icon: Calculator,
      color: 'bg-blue-100 text-blue-600',
      title: t('features.accurate.title'),
      description: t('features.accurate.description'),
    },
    {
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      title: t('features.easy.title'),
      description: t('features.easy.description'),
    },
    {
      icon: Shield,
      color: 'bg-amber-100 text-amber-600',
      title: t('features.free.title'),
      description: t('features.free.description'),
    },
  ];

  const stats = [
    {value: '50,000+', label: locale === 'zh' ? '服务用户' : 'Users Served'},
    {value: '7', label: locale === 'zh' ? '专业工具' : 'Professional Tools'},
    {value: '100%', label: locale === 'zh' ? '永久免费' : 'Always Free'},
    {value: '24/7', label: locale === 'zh' ? '随时可用' : 'Always Available'},
  ];

  return (
    <>
      <OrganizationSchema
        data={{
          name: 'WealthEase',
          url: 'https://www.wealthease.top',
          logo: 'https://www.wealthease.top/logo.png',
          description: locale === 'zh'
            ? '提供专业的免费理财计算器，包括复利计算器、退休规划计算器、贷款计算器、房贷计算器和投资回报率计算器。'
            : 'Professional free financial calculators including compound interest, retirement planning, loan, mortgage, and ROI calculators.',
        }}
      />
      <WebApplicationSchema
        data={{
          name: 'WealthEase Financial Calculators',
          url: 'https://www.wealthease.top',
          description: locale === 'zh'
            ? '免费的专业理财计算器套件，助您做出明智的财务决策'
            : 'Free professional financial calculator suite to help you make smart money decisions',
          applicationCategory: 'FinanceApplication',
          offers: {
            price: '0',
            priceCurrency: 'USD',
          },
        }}
      />

      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-card mb-8">
                <Shield className="w-4 h-4 text-success-500 mr-2" />
                <span className="text-sm font-medium text-gray-600">
                  {locale === 'zh' ? '专业级计算器 · 完全免费 · 数据安全' : 'Professional Tools · 100% Free · Secure'}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('hero.title')}
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href={`/${locale}/calculators`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-card hover:shadow-card-hover border border-gray-200 text-lg"
                >
                  {locale === 'zh' ? '了解更多' : 'Learn More'}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                  <span>{locale === 'zh' ? '行业标准公式' : 'Industry-Standard Formulas'}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                  <span>{locale === 'zh' ? '隐私优先设计' : 'Privacy-First Design'}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                  <span>{locale === 'zh' ? '无需注册' : 'No Registration Required'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary-100 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('features.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {locale === 'zh'
                  ? '我们致力于提供最专业、最易用的理财计算工具，帮助您做出明智的财务决策'
                  : 'We are committed to providing the most professional and easy-to-use financial calculation tools to help you make smart financial decisions'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all duration-300 group"
                  >
                    <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('tools.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {locale === 'zh' ? '选择适合您的专业理财工具' : 'Choose the right financial tool for your needs'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Link
                  key={tool.key}
                  href={tool.href}
                  className="group bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-all duration-300 border border-gray-100 hover:border-primary-200"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {t(`tools.${tool.key}`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`tools.${tool.key}Desc`)}
                  </p>
                  <div className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                    {locale === 'zh' ? '开始使用' : 'Start Using'}
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/calculators`}
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-card hover:shadow-card-hover border-2 border-primary-200 group"
              >
                {locale === 'zh' ? '查看所有工具' : 'View All Tools'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <NewsletterForm />
          </div>
        </section>
      </div>
    </>
  );
}
