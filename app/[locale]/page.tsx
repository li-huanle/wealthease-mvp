import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {Calculator, TrendingUp, Shield, CheckCircle, ArrowRight, BarChart3, PiggyBank, Target, Clock, Lock, Star, Users, Award, BookOpen, ChevronDown} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import {ButtonLink} from '@/components/ui/Button';
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
    {
      key: 'takeHomePay',
      href: `/${locale}/calculators/take-home-pay`,
      icon: '💼',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      key: 'taxBracket',
      href: `/${locale}/calculators/tax-bracket`,
      icon: '🧾',
      color: 'from-red-400 to-rose-500',
    },
    {
      key: 'areaConversion',
      href: `/${locale}/calculators/area-conversion`,
      icon: '📐',
      color: 'from-lime-400 to-green-500',
    },
    {
      key: 'homeAffordability',
      href: `/${locale}/calculators/home-affordability`,
      icon: '🏡',
      color: 'from-teal-400 to-emerald-500',
    },
    {
      key: 'creditCardPayoff',
      href: `/${locale}/calculators/credit-card-payoff`,
      icon: '💳',
      color: 'from-rose-400 to-pink-500',
    },
    {
      key: 'salaryHourly',
      href: `/${locale}/calculators/salary-hourly`,
      icon: '⏱️',
      color: 'from-indigo-400 to-blue-500',
    },
    {
      key: 'refinance',
      href: `/${locale}/calculators/refinance`,
      icon: '🔁',
      color: 'from-cyan-400 to-sky-500',
    },
    {
      key: 'budget',
      href: `/${locale}/calculators/budget`,
      icon: '📊',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      key: 'netWorth',
      href: `/${locale}/calculators/net-worth`,
      icon: '🧮',
      color: 'from-violet-400 to-fuchsia-500',
    },
    {
      key: 'installmentApr',
      href: `/${locale}/calculators/installment-apr`,
      icon: '🧮',
      color: 'from-rose-400 to-red-500',
    },
    {
      key: 'fundFees',
      href: `/${locale}/calculators/fund-fees`,
      icon: '💸',
      color: 'from-sky-400 to-blue-500',
    },
    {
      key: 'emergencyFund',
      href: `/${locale}/calculators/emergency-fund`,
      icon: '🛟',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      key: 'mortgagePrepayment',
      href: `/${locale}/calculators/mortgage-prepayment`,
      icon: '🏠',
      color: 'from-amber-400 to-orange-500',
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
        ? '无需复杂输入，3步完成计算。结果附带详细解释和实用建议'
        : 'No complex inputs needed, complete calculations in 3 steps',
    },
    {
      icon: Shield,
      color: 'bg-amber-100 text-amber-600',
      title: t('features.free.title'),
      description: t('features.free.description'),
      detail: locale === 'zh'
        ? '所有功能永久免费，无需注册、无订阅、无隐藏费用'
        : 'All features permanently free, no sign-up, no subscriptions, no hidden fees',
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
    {icon: Award, text: locale === 'zh' ? '标准金融公式' : 'Standard Formulas', desc: locale === 'zh' ? '采用通行的金融计算公式，并注明假设' : 'Widely used financial formulas with stated assumptions'},
    {icon: Clock, text: locale === 'zh' ? '全天候可用' : '24/7 Available', desc: locale === 'zh' ? '随时随地免费使用' : 'Free access anytime, anywhere'},
    {icon: Users, text: locale === 'zh' ? '2026 年数据' : 'Updated for 2026', desc: locale === 'zh' ? '税率档位、扣除额和缴费上限已更新到 2026 年' : 'Tax brackets, deductions and contribution limits updated for 2026'},
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
    {value: String(tools.length), label: locale === 'zh' ? '个计算器' : 'Calculators'},
    {value: '100%', label: locale === 'zh' ? '浏览器本地计算' : 'Runs in your browser'},
    {value: '$0', label: locale === 'zh' ? '永久免费' : 'Free forever'},
    {value: '2', label: locale === 'zh' ? '种语言（中/英）' : 'Languages (EN/中文)'},
  ];

  // US-first selection shown on the home page; the full list lives on /calculators.
  const popularKeys = ['takeHomePay', 'homeAffordability', 'mortgage', 'creditCardPayoff', 'salaryHourly', 'compound', 'retirement', 'taxBracket', 'investment401k'];
  const popularTools = popularKeys
    .map((key) => tools.find((tool) => tool.key === key))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));

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

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgb(15_23_42/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(15_23_42/0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
          />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary-400/20 blur-3xl" />

          <div className="container relative mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-fade-in-up mb-6 flex justify-center">
                <Badge>
                  <Shield className="h-3.5 w-3.5 text-primary-600" />
                  {locale === 'zh' ? '免费 · 无需注册 · 数据不出浏览器' : 'Free · No sign-up · Data stays in your browser'}
                </Badge>
              </div>

              <h1 className="animate-fade-in-up animate-delay-1 mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-gray-950 md:text-6xl">
                {t('hero.title')}
              </h1>

              <p className="animate-fade-in-up animate-delay-2 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t('hero.subtitle')}
              </p>

              <div className="animate-fade-in-up animate-delay-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={`/${locale}/calculators`} size="lg" className="group w-full sm:w-auto">
                  {t('hero.cta')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink href={`/${locale}/calculators/take-home-pay`} variant="secondary" size="lg" className="w-full sm:w-auto">
                  {locale === 'zh' ? '算算税后工资' : 'Estimate my paycheck'}
                </ButtonLink>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {[
                  locale === 'zh' ? '行业标准公式' : 'Industry-standard formulas',
                  locale === 'zh' ? '隐私优先设计' : 'Privacy-first design',
                  locale === 'zh' ? '无需注册' : 'No registration required',
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b bg-muted/40">
          <div className="container mx-auto grid grid-cols-2 divide-x divide-y px-4 md:grid-cols-4 md:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-8 text-center">
                <div className="text-3xl font-semibold tabular-nums tracking-tight text-gray-950 md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-2 text-sm font-semibold text-primary-700">{locale === 'zh' ? '热门工具' : 'Popular tools'}</p>
                <h2 className="text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">{t('tools.title')}</h2>
                <p className="mt-2 text-muted-foreground">
                  {locale === 'zh' ? '选择适合您的专业理财工具' : 'Choose the right financial tool for your needs'}
                </p>
              </div>
              <ButtonLink href={`/${locale}/calculators`} variant="secondary" className="group">
                {locale === 'zh' ? `查看全部 ${tools.length} 个` : `View all ${tools.length}`}
                <ArrowRight className="h-4 w-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5" />
              </ButtonLink>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {popularTools.map((tool) => (
                <Link
                  key={tool.key}
                  href={tool.href}
                  className="group flex gap-4 rounded-xl bg-white p-5 shadow-card transition-[box-shadow,transform] duration-base ease-out hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-xl transition-colors duration-quick ease-out group-hover:bg-primary-50">
                    {tool.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 transition-colors duration-quick ease-out group-hover:text-primary-700">
                      {t(`tools.${tool.key}`)}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{t(`tools.${tool.key}Desc`)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brokerage comparison callout */}
        <section className="px-4 pb-20">
          <div className="container mx-auto max-w-6xl">
            <Link
              href={`/${locale}/compare/broker`}
              className="group flex flex-col gap-4 rounded-xl bg-white p-6 shadow-card transition-[box-shadow,transform] duration-base ease-out hover:-translate-y-0.5 hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-primary-700">{locale === 'zh' ? '新指南' : 'New guide'}</p>
                  <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-quick ease-out group-hover:text-primary-700 md:text-xl">
                    {locale === 'zh' ? '在美华人券商对比：费率、开户门槛和开户奖励' : 'Compare US brokerages: fees, account minimums and bonuses'}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {locale === 'zh' ? '5 家美国持牌券商并排对比，并按适合人群给出建议。' : 'Five US-licensed brokers side by side, with who each one fits best.'}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-700">
                {locale === 'zh' ? '查看对比' : 'See the comparison'}
                <ArrowRight className="h-4 w-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y bg-muted/40 px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">{t('features.title')}</h2>
              <p className="text-muted-foreground">
                {locale === 'zh'
                  ? '我们致力于提供最专业、最易用的理财计算工具，帮助您做出明智的财务决策'
                  : 'We are committed to providing the most professional and easy-to-use financial calculation tools'}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-xl bg-white p-6 shadow-card">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    <p className="mt-4 border-t pt-4 text-sm text-muted-foreground">{feature.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
                {locale === 'zh' ? '适用场景' : 'Use Cases'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'zh'
                  ? '无论您处于人生哪个阶段，我们都有合适的工具帮助您做出明智的财务决策'
                  : 'No matter what stage of life you are in, we have the right tools to help you make smart financial decisions'}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="rounded-xl bg-white p-6 shadow-card">
                  <div className="mb-4 text-3xl">{useCase.icon}</div>
                  <h3 className="mb-2 font-semibold text-gray-900">{useCase.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{useCase.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 grid gap-8 border-t pt-12 md:grid-cols-2 lg:grid-cols-4">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.text} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{badge.text}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t bg-muted/40 px-4 py-20">
          <div className="container mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
                {locale === 'zh' ? '常见问题' : 'FAQ'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'zh'
                  ? '关于WealthEase理财计算器的常见问题解答'
                  : 'Frequently asked questions about WealthEase financial calculators'}
              </p>
            </div>

            <div className="divide-y rounded-xl bg-white shadow-card">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-base ease-out group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</div>
                </details>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center text-sm font-medium text-primary-700 transition-colors duration-quick ease-out hover:text-primary-800"
              >
                {locale === 'zh' ? '更多问题？联系我们' : 'More questions? Contact Us'}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl">
            <NewsletterForm />
          </div>
        </section>
      </div>
    </>
  );
}
