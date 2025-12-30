import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {Calculator, TrendingUp, Shield} from 'lucide-react';
import { Metadata } from 'next';
import { OrganizationSchema, WebApplicationSchema } from '@/components/StructuredData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

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
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  
  const tools = [
    {
      key: 'compound',
      href: `/${locale}/calculators/compound-interest`,
      icon: '💰'
    },
    {
      key: 'retirement',
      href: `/${locale}/calculators/retirement`,
      icon: '🏖️'
    },
    {
      key: 'loan',
      href: `/${locale}/calculators/loan`,
      icon: '🏠'
    },
    {
      key: 'roi',
      href: `/${locale}/calculators/roi`,
      icon: '📈'
    },
    {
      key: 'budget',
      href: `/${locale}/calculators/budget`,
      icon: '💳'
    }
  ];

  return (
    <>
      <OrganizationSchema
        data={{
          name: 'WealthEase',
          url: 'https://wealthease-mvp.vercel.app',
          logo: 'https://wealthease-mvp.vercel.app/logo.png',
          description: locale === 'zh'
            ? '提供专业的免费理财计算器，包括复利计算器、退休规划计算器、贷款计算器、房贷计算器和投资回报率计算器。'
            : 'Professional free financial calculators including compound interest, retirement planning, loan, mortgage, and ROI calculators.',
        }}
      />
      <WebApplicationSchema
        data={{
          name: 'WealthEase Financial Calculators',
          url: 'https://wealthease-mvp.vercel.app',
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
    <div className="bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <Link href={`/${locale}/calculators`} className="btn-primary inline-block">
          {t('hero.cta')}
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('features.accurate.title')}</h3>
            <p className="text-gray-600">{t('features.accurate.description')}</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-success" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('features.easy.title')}</h3>
            <p className="text-gray-600">{t('features.easy.description')}</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-warning" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('features.free.title')}</h3>
            <p className="text-gray-600">{t('features.free.description')}</p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">{t('tools.title')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.key}
              href={tool.href}
              className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {t(`tools.${tool.key}`)}
              </h3>
              <p className="text-gray-600">{t(`tools.${tool.key}Desc`)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="card max-w-2xl mx-auto text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <h2 className="text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
          <p className="mb-6 text-primary-100">{t('newsletter.subtitle')}</p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={t('newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
            />
            <button type="submit" className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors">
              {t('newsletter.subscribe')}
            </button>
          </form>
        </div>
      </section>
    </div>
    </>
  );
}
