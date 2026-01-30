import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {Calculator, TrendingUp, Shield, CheckCircle, ArrowRight, BarChart3, PiggyBank, Target, Clock, Lock, Star, Users, Award, BookOpen} from 'lucide-react';
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
      title: 'WealthEase - Free Financial Calculators & Smart Money Management Tools',
      description: 'Calculate compound interest, plan retirement, estimate loans & mortgages with our free professional financial calculators. Make smarter money decisions today.',
      keywords: 'financial calculator, compound interest calculator, retirement calculator, loan calculator, mortgage calculator, ROI calculator, investment calculator, free financial tools',
    },
    zh: {
      title: 'WealthEase - 免费在线理财计算器 | 复利退休房贷计算工具',
      description: '专业的免费在线理财计算器平台，提供复利计算器、退休规划计算器、贷款计算器、房贷计算器和投资回报率计算器。完全免费使用，数据本地处理，助您做出明智的财务决策。',
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
      color: 'from-blue-500 to-indigo-600',
    },
    {
      key: 'retirement',
      href: `/${locale}/calculators/retirement`,
      icon: '🏖️',
      color: 'from-green-500 to-emerald-600',
    },
    {
      key: 'savingsGoal',
      href: `/${locale}/calculators/savings-goal`,
      icon: '🎯',
      color: 'from-purple-500 to-violet-600',
    },
    {
      key: 'debtPayoff',
      href: `/${locale}/calculators/debt-payoff`,
      icon: '💳',
      color: 'from-red-500 to-rose-600',
    },
    {
      key: 'loan',
      href: `/${locale}/calculators/loan`,
      icon: '🏦',
      color: 'from-orange-500 to-amber-600',
    },
    {
      key: 'mortgage',
      href: `/${locale}/calculators/mortgage`,
      icon: '🏠',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      key: 'roi',
      href: `/${locale}/calculators/roi`,
      icon: '📊',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      key: 'inflation',
      href: `/${locale}/calculators/inflation`,
      icon: '📉',
      color: 'from-pink-500 to-rose-500',
    },
    {
      key: 'investment401k',
      href: `/${locale}/calculators/investment-401k`,
      icon: '💰',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      key: 'rentVsBuy',
      href: `/${locale}/calculators/rent-vs-buy`,
      icon: '🏘️',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      key: 'collegeSavings',
      href: `/${locale}/calculators/college-savings`,
      icon: '🎓',
      color: 'from-violet-500 to-purple-600',
    },
    {
      key: 'dividendIncome',
      href: `/${locale}/calculators/dividend-income`,
      icon: '💵',
      color: 'from-emerald-500 to-green-600',
    },
    {
      key: 'investmentComparison',
      href: `/${locale}/calculators/investment-comparison`,
      icon: '⚖️',
      color: 'from-slate-500 to-gray-600',
    },
    {
      key: 'tip',
      href: `/${locale}/calculators/tip`,
      icon: '🧮',
      color: 'from-pink-400 to-rose-500',
    },
    {
      key: 'creditScore',
      href: `/${locale}/calculators/credit-score`,
      icon: '📋',
      color: 'from-slate-500 to-gray-600',
    },
    {
      key: 'tax',
      href: `/${locale}/calculators/tax`,
      icon: '🧾',
      color: 'from-red-400 to-orange-500',
    },
    {
      key: 'cd',
      href: `/${locale}/calculators/cd`,
      icon: '🏦',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      key: 'annuity',
      href: `/${locale}/calculators/annuity`,
      icon: '🔄',
      color: 'from-amber-400 to-orange-500',
    },
    {
      key: 'socialSecurity',
      href: `/${locale}/calculators/social-security`,
      icon: '🛡️',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      key: 'autoLoan',
      href: `/${locale}/calculators/auto-loan`,
      icon: '🚗',
      color: 'from-violet-400 to-purple-500',
    },
  ];

  const features = [
    {
      icon: Calculator,
      color: 'bg-blue-100 text-blue-600',
      title: t('features.accurate.title'),
      description: t('features.accurate.description'),
      detail: locale === 'zh'
        ? '基于CFA Institute投资计算标准，使用行业认可的复利、贷款摊还、ROI等公式'
        : 'Based on CFA Institute investment calculation standards, using industry-recognized formulas',
    },
    {
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      title: t('features.easy.title'),
      description: t('features.easy.description'),
      detail: locale === 'zh'
        ? '无需复杂输入，3步完成计算。结果附带详细解释和专家建议'
        : 'No complex inputs needed, complete calculations in 3 steps',
    },
    {
      icon: Shield,
      color: 'bg-amber-100 text-amber-600',
      title: t('features.free.title'),
      description: t('features.free.description'),
      detail: locale === 'zh'
        ? '所有功能永久免费，无广告、无订阅、无隐藏费用'
        : 'All features permanently free, no ads, no subscriptions, no hidden fees',
    },
  ];

  const useCases = [
    {
      icon: '🏠',
      title: locale === 'zh' ? '购房规划' : 'Home Buying',
      description: locale === 'zh'
        ? '计算房贷月供、比较租房买房、规划购房预算'
        : 'Calculate mortgage payments, compare rent vs buy, plan home buying budget',
    },
    {
      icon: '📊',
      title: locale === 'zh' ? '投资理财' : 'Investment',
      description: locale === 'zh'
        ? '复利增长、退休规划、ROI对比、股息收入计算'
        : 'Compound growth, retirement planning, ROI comparison, dividend income calculation',
    },
    {
      icon: '💳',
      title: locale === 'zh' ? '债务管理' : 'Debt Management',
      description: locale === 'zh'
        ? '制定还款计划、计算利息支出、摆脱债务困扰'
        : 'Create repayment plans, calculate interest expenses, get out of debt',
    },
    {
      icon: '🎓',
      title: locale === 'zh' ? '教育储蓄' : 'Education Savings',
      description: locale === 'zh'
        ? '大学学费规划、529计划储蓄目标、教育基金计算'
        : 'College tuition planning, 529 plan savings goals, education fund calculation',
    },
  ];

  const trustBadges = [
    {icon: Lock, text: locale === 'zh' ? '数据本地处理' : 'Local Processing', desc: locale === 'zh' ? '您的财务数据不会上传到任何服务器' : 'Your financial data never leaves your device'},
    {icon: Award, text: locale === 'zh' ? '专业级公式' : 'Professional Formulas', desc: locale === 'zh' ? '基于CFA/CFP认证标准' : 'Based on CFA/CFP certification standards'},
    {icon: Clock, text: locale === 'zh' ? '全天候可用' : '24/7 Available', desc: locale === 'zh' ? '随时随地免费使用' : 'Free access anytime, anywhere'},
    {icon: Users, text: locale === 'zh' ? '10万+用户信赖' : '100K+ Users Trust', desc: locale === 'zh' ? '帮助超过10万用户做出明智决策' : 'Helped 100K+ users make informed decisions'},
  ];

  const faqs = [
    {
      question: locale === 'zh' ? '这些计算器是否免费？' : 'Are these calculators free?',
      answer: locale === 'zh'
        ? '是的，所有计算器完全免费使用。我们不收取任何费用，没有隐藏收费，也没有付费高级版本。'
        : 'Yes, all calculators are completely free to use. We charge no fees and no hidden costs.',
    },
    {
      question: locale === 'zh' ? '我的财务数据安全吗？' : 'Is my financial data safe?',
      answer: locale === 'zh'
        ? '非常安全。所有计算都在您的浏览器本地完成，我们不收集、存储或传输任何财务信息。'
        : 'Very safe. All calculations are performed locally in your browser. We do not collect any financial information.',
    },
    {
      question: locale === 'zh' ? '计算结果准确吗？' : 'Are the calculation results accurate?',
      answer: locale === 'zh'
        ? '我们使用行业标准的金融公式（基于CFA Institute投资计算标准）。计算结果仅供参考。'
        : 'We use industry-standard financial formulas based on CFA Institute investment calculation standards.',
    },
    {
      question: locale === 'zh' ? '需要注册账号吗？' : 'Do I need to register?',
      answer: locale === 'zh'
        ? '不需要。您可以直接使用所有功能，无需注册账号、无需提供邮箱。'
        : 'No. You can use all features directly without registering.',
    },
  ];

  const stats = [
    {value: '18', label: locale === 'zh' ? '专业工具' : 'Professional Tools'},
    {value: '100%', label: locale === 'zh' ? '数据不上传' : 'No Data Upload'},
    {value: '本地', label: locale === 'zh' ? '纯前端计算' : 'Client-Side Only'},
    {value: '永久', label: locale === 'zh' ? '完全免费' : 'Forever Free'},
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
                  : 'We are committed to providing the most professional and easy-to-use financial calculation tools'}
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
                    <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100">
                      {feature.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {locale === 'zh' ? '适用场景' : 'Use Cases'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {locale === 'zh'
                  ? '无论您处于人生哪个阶段，我们都有合适的工具帮助您做出明智的财务决策'
                  : 'No matter what stage of life you are in, we have the right tools to help you make smart financial decisions'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {badge.text}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {badge.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {locale === 'zh' ? '常见问题' : 'FAQ'}
              </h2>
              <p className="text-lg text-gray-600">
                {locale === 'zh'
                  ? '关于WealthEase理财计算器的常见问题解答'
                  : 'Frequently asked questions about WealthEase financial calculators'}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-2xl shadow-card overflow-hidden group"
                >
                  <summary className="cursor-pointer px-6 py-5 font-semibold text-gray-900 flex items-center justify-between list-none">
                    <span>{faq.question}</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform duration-300">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-3 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                {locale === 'zh' ? '更多问题？联系我们' : 'More questions? Contact Us'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
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
