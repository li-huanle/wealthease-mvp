import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/RefinanceCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Mortgage Refinance Calculator",
    subtitle: "See when refinancing pays for itself and whether it saves money over the life of the loan",
    body: ["Refinancing replaces your mortgage with a new loan, usually at a lower rate. You pay closing costs up front, and the lower payment earns them back over time. The break-even point is closing costs divided by monthly savings.", "A lower payment does not always mean lower total cost. Restarting a 30-year term on a loan you have already paid for years can add interest even at a lower rate, so the calculator also compares lifetime interest.", "Refinancing usually makes sense if you plan to stay in the home well past the break-even point."],
  },
  zh: {
    title: "房贷再融资计算器",
    subtitle: "看看再融资多久能回本，整个贷款期能不能省钱",
    body: ["再融资是用一笔新贷款替换现有房贷，通常利率更低。手续费需要先付，月供降低后逐月收回。回本时间 = 手续费 ÷ 每月节省。", "月供降低不等于总成本降低。已经还了很多年的贷款如果重新开始 30 年期，即使利率更低，总利息也可能更多，所以计算器同时比较整个期限的总利息。", "如果打算在房子里住的时间明显超过回本期，再融资通常更划算。"],
  },
};

const metadata = {
  en: {
    title: "Mortgage Refinance Calculator | WealthEase",
    description: "Free mortgage refinance calculator: compare your current and new monthly payment, find the break-even point on closing costs, and see lifetime interest savings.",
    keywords: "refinance calculator, mortgage refinance break even, should I refinance, refinance savings calculator, closing costs break even",
  },
  zh: {
    title: "房贷再融资计算器 | WealthEase",
    description: "免费房贷再融资计算器：对比当前和新的月供，算出手续费的回本时间，以及整个贷款期的利息节省。",
    keywords: "房贷再融资计算器, 再融资回本, 要不要再融资, 转贷计算, refinance",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/refinance`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/refinance`,
        zh: `${baseUrl}/zh/calculators/refinance`,
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

        <RelatedCalculators currentCalculator="refinance" />
      </div>
    </div>
  );
}
