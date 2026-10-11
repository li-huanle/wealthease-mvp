import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/NetWorthCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Net Worth Calculator",
    subtitle: "Add up what you own and what you owe to see your net worth",
    body: ["Net worth is everything you own minus everything you owe. It is the simplest single number for tracking financial progress over time.", "List assets at today's market value: cash, investments, retirement accounts, home and vehicles. Then list debts such as your mortgage, car and student loans, and credit card balances.", "Because a home is hard to turn into cash, the calculator also shows net worth without home equity and your liquid assets."],
  },
  zh: {
    title: "净资产计算器",
    subtitle: "把你拥有的和你欠的加起来，算出净资产",
    body: ["净资产 = 你拥有的一切 − 你欠的一切。它是衡量财务进展最简单的一个数字。", "资产按当前市值填写：现金、投资、退休账户、房产、车辆；负债包括房贷、车贷、学贷和信用卡欠款。", "房产不容易变现，所以计算器还会显示不含房屋净值的净资产和流动资产。"],
  },
};

const metadata = {
  en: {
    title: "Net Worth Calculator | WealthEase",
    description: "Free net worth calculator: total your assets (cash, investments, retirement accounts, home, vehicles) and liabilities (mortgage, loans, credit cards) to find your net worth.",
    keywords: "net worth calculator, calculate net worth, assets minus liabilities, personal balance sheet, debt to asset ratio",
  },
  zh: {
    title: "净资产计算器 | WealthEase",
    description: "免费净资产计算器：汇总现金、投资、退休账户、房产、车辆等资产，以及房贷、贷款、信用卡等负债，算出你的净资产。",
    keywords: "净资产计算器, 计算净资产, 资产负债, 个人资产负债表, 资产负债率",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/net-worth`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/net-worth`,
        zh: `${baseUrl}/zh/calculators/net-worth`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    },
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const c = content[locale === 'zh' ? 'zh' : 'en'];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{c.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{c.subtitle}</p>
        </div>

        <Calculator />

        <section className="mt-16 bg-white rounded-2xl shadow-card p-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === 'zh' ? '如何理解这个计算器' : 'How this calculator works'}
          </h2>
          {c.body.map((p) => (
            <p key={p} className="text-gray-600 leading-relaxed">{p}</p>
          ))}
        </section>

        <RelatedCalculators currentCalculator="net-worth" />
      </div>
    </div>
  );
}
