import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/TakeHomePayCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Take-Home Pay Calculator (US)",
    subtitle: "Estimate your paycheck after federal tax, FICA, state tax and 401(k)",
    body: ["Your paycheck is smaller than your salary because of federal income tax, FICA taxes (6.2% Social Security up to $184,500 of wages and 1.45% Medicare, plus 0.9% Additional Medicare above $200,000 for single filers), state tax and any pre-tax deductions.", "This calculator uses the 2026 federal tax brackets and standard deduction. A traditional 401(k) contribution lowers your income tax but not FICA, while pre-tax health premiums lower both. Enter a flat state rate to include state income tax; nine states (AK, FL, NV, NH, SD, TN, TX, WA, WY) have none on wages.", "The result is an estimate for planning. Credits, itemized deductions, local taxes and your employer's withholding method can change what actually lands in your account."],
  },
  zh: {
    title: "美国税后工资计算器",
    subtitle: "估算扣除联邦税、FICA、州税和 401(k) 后的到手工资",
    body: ["到手工资比税前年薪少，是因为要扣联邦所得税、FICA 税（社保税 6.2%，工资上限 $184,500；Medicare 1.45%，单身收入超过 $200,000 的部分另加 0.9%）、州税以及各种税前扣除。", "本计算器使用 2026 年联邦税率档位和标准扣除额。传统 401(k) 缴款能减少所得税但不减少 FICA；税前医保保费则两者都减少。填入统一的州税率即可估算州所得税；AK、FL、NV、NH、SD、TN、TX、WA、WY 九个州不对工资征收州所得税。", "结果仅供规划参考。税收抵免、分项扣除、地方税和雇主的预扣方式都会让实际到账金额有所不同。"],
  },
};

const metadata = {
  en: {
    title: "Take-Home Pay Calculator (US) | WealthEase",
    description: "Free US take-home pay calculator for 2026: estimate net salary after federal income tax, Social Security, Medicare, state tax, 401(k) and health premiums, per year, month, biweekly, week and hour.",
    keywords: "take home pay calculator, paycheck calculator, salary after tax, net pay calculator, 2026 federal tax, FICA calculator, 401k paycheck",
  },
  zh: {
    title: "美国税后工资计算器 | WealthEase",
    description: "免费美国税后工资计算器（2026）：估算扣除联邦所得税、社保税、Medicare、州税、401(k) 和医保保费后的税后年薪、月薪、双周薪、周薪和时薪。",
    keywords: "美国税后工资计算器, 税后收入计算, 美国工资扣税, 2026联邦税率, FICA, 401k",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/take-home-pay`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/take-home-pay`,
        zh: `${baseUrl}/zh/calculators/take-home-pay`,
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

        <RelatedCalculators currentCalculator="take-home-pay" />
      </div>
    </div>
  );
}
