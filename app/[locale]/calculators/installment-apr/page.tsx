import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/InstallmentAprCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Installment APR Calculator",
    subtitle: "Find the real annual interest rate hidden in monthly fees and installment plans",
    body: ["Installment plans advertise a small monthly fee, but you repay principal every month while the fee keeps being charged on the original amount. That is why a 0.6% monthly fee is not 7.2% a year: over 12 months it works out to about 13.8% compounded.", "Enter the amount, the number of months and the fee rate. The calculator finds the rate at which the present value of your payments equals the money you actually received (the internal rate of return), and shows it as both a nominal and a compounded annual rate.", "When comparing offers, compare annual rates only, and ask lenders for the compounded figure. A simple-interest quote will always look lower."],
  },
  zh: {
    title: "分期年化利率计算器",
    subtitle: "算出分期和月费率背后真正的年化利率",
    body: ["分期通常只宣传一个很小的月手续费，但你每月都在还本金，手续费却一直按最初的本金收。所以「每月 0.6%」不是年化 7.2%：12 期下来按复利折算约为 13.8%。", "输入分期本金、期数和月费率，计算器会找出让还款现金流现值等于你实际到手金额的那个利率（内部收益率），并同时给出名义年化和复利年化。", "比较不同贷款时只看年化利率，并让对方给出按复利算的数字；按单利报出来的数字总是显得更低。"],
  },
};

const metadata = {
  en: {
      title: "Installment APR Calculator | WealthEase",
      description: "Free installment APR calculator: convert a monthly fee rate into the true annual percentage rate (IRR) of credit-card installments and consumer loans.",
      keywords: "installment APR calculator, monthly fee to annual rate, credit card installment cost, true loan cost, effective interest rate calculator",
    },
  zh: {
      title: "分期年化利率计算器 | WealthEase",
      description: "免费分期年化利率计算器：把每月手续费率换算成信用卡分期、消费贷的真实年化利率（IRR）。",
      keywords: "分期年化利率计算器, 月费率换算年化, 信用卡分期成本, 实际年化利率, 消费贷利率计算",
    },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/installment-apr`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/installment-apr`,
        zh: `${baseUrl}/zh/calculators/installment-apr`,
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

        <RelatedCalculators currentCalculator="installment-apr" />
      </div>
    </div>
  );
}
