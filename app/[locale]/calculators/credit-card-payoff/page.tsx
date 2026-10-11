import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/CreditCardPayoffCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Credit Card Payoff Calculator",
    subtitle: "See how long it takes to pay off your credit card and what it costs in interest",
    body: ["Credit card interest is charged on the balance every month, so a small payment can barely cover the interest. If your payment is not larger than one month of interest, the balance never goes down.", "Enter your balance, APR and monthly payment to see your payoff date and total interest. Or set a target number of months to see the payment you need.", "Paying even a little more than the minimum shortens the payoff dramatically. Stopping new charges on the card matters as much as the payment amount."],
  },
  zh: {
    title: "信用卡还清计算器",
    subtitle: "算出信用卡多久能还清，以及要付多少利息",
    body: ["信用卡每月都按欠款计息，还款太少时可能只够付利息。如果每月还款不高于当月利息，欠款永远不会减少。", "输入欠款、年利率和每月还款，就能看到还清时间和总利息；也可以设定目标月数，算出每月需要还多少。", "每月比最低还款多还一点，还清时间就会大幅缩短。同时停止在这张卡上新增消费，和还款金额同样重要。"],
  },
};

const metadata = {
  en: {
    title: "Credit Card Payoff Calculator | WealthEase",
    description: "Free credit card payoff calculator: find how many months it takes to pay off your balance, total interest paid, and the monthly payment needed to be debt-free by a target date.",
    keywords: "credit card payoff calculator, how long to pay off credit card, credit card interest calculator, debt free date, monthly payment to pay off credit card",
  },
  zh: {
    title: "信用卡还清计算器 | WealthEase",
    description: "免费信用卡还清计算器：算出还清欠款需要几个月、总共支付多少利息，以及想在指定时间还清每月需要还多少。",
    keywords: "信用卡还款计算器, 信用卡多久还清, 信用卡利息计算, 还清债务, 信用卡月还款",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/credit-card-payoff`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/credit-card-payoff`,
        zh: `${baseUrl}/zh/calculators/credit-card-payoff`,
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

        <RelatedCalculators currentCalculator="credit-card-payoff" />
      </div>
    </div>
  );
}
