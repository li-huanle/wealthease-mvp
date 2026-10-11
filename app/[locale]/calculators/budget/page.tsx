import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/BudgetCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "50/30/20 Budget Calculator",
    subtitle: "Split your take-home pay with the 50/30/20 rule and compare it with your real spending",
    body: ["The 50/30/20 rule splits take-home pay into three buckets: 50% for needs (housing, utilities, groceries, insurance, minimum debt payments), 30% for wants and 20% for savings and extra debt payoff.", "Enter your monthly take-home pay to see the target for each bucket, then add what you really spend to see where you are over or under.", "It is a starting point rather than a rule. In expensive cities needs often take more than half; the important part is protecting the savings share."],
  },
  zh: {
    title: "50/30/20 预算计算器",
    subtitle: "用 50/30/20 法则分配到手收入，并与实际支出对比",
    body: ["50/30/20 法则把到手收入分成三份：50% 用于必要支出（住房、水电、日常饮食、保险、最低还款），30% 用于想要的支出，20% 用于储蓄和额外还债。", "输入每月到手收入即可看到各部分的目标金额，再填入实际支出，就能看到哪部分超了、哪部分不足。", "它是一个起点而不是硬性规定。在生活成本高的城市，必要支出常常超过一半；关键是守住储蓄的比例。"],
  },
};

const metadata = {
  en: {
    title: "50/30/20 Budget Calculator | WealthEase",
    description: "Free 50/30/20 budget calculator: divide your monthly take-home pay into needs, wants and savings, then compare the targets with what you actually spend.",
    keywords: "50/30/20 budget calculator, budget calculator, monthly budget, needs wants savings, budgeting rule",
  },
  zh: {
    title: "50/30/20 预算计算器 | WealthEase",
    description: "免费 50/30/20 预算计算器：把每月到手收入分成必要支出、想要的支出和储蓄，再与实际支出对比。",
    keywords: "50/30/20 预算, 预算计算器, 月度预算, 记账, 储蓄比例",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/budget`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/budget`,
        zh: `${baseUrl}/zh/calculators/budget`,
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

        <RelatedCalculators currentCalculator="budget" />
      </div>
    </div>
  );
}
