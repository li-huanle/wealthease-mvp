import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/HomeAffordabilityCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Home Affordability Calculator",
    subtitle: "Find out how much house you can afford based on your income, debts and down payment",
    body: ["Lenders commonly use two debt-to-income limits: housing costs (principal, interest, property tax, insurance and HOA) of no more than 28% of gross monthly income, and all monthly debt payments of no more than 36%. The lower of the two sets your maximum housing payment.", "This calculator works backwards from that payment: it subtracts tax, insurance and HOA, then finds the largest loan your rate and term allow, and adds your down payment to get a price.", "Treat the result as a ceiling, not a target. Lenders may allow higher ratios, and with less than 20% down you will usually pay private mortgage insurance, which reduces what you can afford."],
  },
  zh: {
    title: "买房预算计算器",
    subtitle: "根据收入、负债和首付，估算你能负担的房价",
    body: ["贷款机构常用两条债务收入比：住房支出（本金、利息、房产税、保险和物业费）不超过税前月收入的 28%，全部债务月供不超过 36%。两者中较低的那个，就是你的住房月供上限。", "计算器从这个月供倒推：先扣除房产税、保险和物业费，再按利率和年限算出最多能贷多少，加上首付就是房价上限。", "这个结果是上限，不是目标。不同贷款机构的标准可能更宽松；首付低于 20% 时通常还要付私人房贷保险（PMI），实际能负担的房价会更低。"],
  },
};

const metadata = {
  en: {
    title: "Home Affordability Calculator | WealthEase",
    description: "Free home affordability calculator: estimate how much house you can afford using the 28/36 debt-to-income rule, including property tax, insurance, HOA and your down payment.",
    keywords: "how much house can I afford, home affordability calculator, 28/36 rule, mortgage affordability, house budget calculator",
  },
  zh: {
    title: "买房预算计算器 | WealthEase",
    description: "免费买房预算计算器：按 28/36 债务收入比规则，结合房产税、保险、物业费和首付，估算你能负担的房价。",
    keywords: "买房预算计算器, 能买多贵的房, 28/36 规则, 房贷负担能力, 购房预算",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/home-affordability`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/home-affordability`,
        zh: `${baseUrl}/zh/calculators/home-affordability`,
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

        <RelatedCalculators currentCalculator="home-affordability" />
      </div>
    </div>
  );
}
