import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/FundFeesCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Fund Fee Impact Calculator",
    subtitle: "Compare two funds and see what fees really cost over time",
    body: ["Fees are one of the few things in investing you can know in advance. Because they are charged every year on the whole balance, a difference that looks small compounds into a large one: each extra 1 percentage point of annual fees leaves roughly 18% less after 20 years and 26% less after 30.", "Enter your contributions, the return before fees and each fund's total annual fee (management + custody + sales service). The calculator assumes both funds earn the same before costs, so the gap you see is purely fees.", "Purchase and redemption fees and taxes are not included. This is an illustration, not investment advice."],
  },
  zh: {
    title: "基金费率影响计算器",
    subtitle: "对比两只基金，看费率长期到底吃掉多少收益",
    body: ["费率是投资里少数可以事先确定的东西。它每年按全部资产扣，看似很小的差距会被复利放大：年费率每高 1 个百分点，20 年后到手的钱少约 18%，30 年后少约 26%。", "输入投入金额、扣费前收益率，以及两只基金的年总费率（管理费 + 托管费 + 销售服务费）。计算器假设两只基金扣费前收益相同，所以看到的差距纯粹来自费率。", "未计入申购赎回费和税。仅为演示，不构成投资建议。"],
  },
};

const metadata = {
  en: {
      title: "Fund Fee Impact Calculator | WealthEase",
      description: "Free fund fee calculator: compare two funds with different expense ratios and see how fees reduce your final balance over 10, 20 or 30 years.",
      keywords: "fund fee calculator, expense ratio calculator, index fund fees, investment fee impact, management fee comparison",
    },
  zh: {
      title: "基金费率影响计算器 | WealthEase",
      description: "免费基金费率计算器：对比两只基金的年费率，看费率如何影响 10 年、20 年、30 年后的最终资产。",
      keywords: "基金费率计算器, 基金费用影响, 指数基金费率, 管理费对比, 投资费率",
    },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/fund-fees`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/fund-fees`,
        zh: `${baseUrl}/zh/calculators/fund-fees`,
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

        <RelatedCalculators currentCalculator="fund-fees" />
      </div>
    </div>
  );
}
