import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/TaxBracketCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Federal Tax Bracket Calculator (US)",
    subtitle: "See which federal bracket you are in and how your tax is built, bracket by bracket",
    body: ["The US has a progressive income tax: each rate applies only to the slice of taxable income that falls inside its bracket. Earning more and crossing into a higher bracket never reduces your take-home pay on the income below it.", "Enter your gross income and filing status. The calculator subtracts the 2026 standard deduction (and any other deductions you enter), then shows how much of your income is taxed at each rate, your marginal rate, your effective rate and how much room you have before the next bracket.", "Brackets shown are the 2026 federal rates from IRS Rev. Proc. 2025-32. They do not include FICA, state or local taxes, or credits, so use this for planning rather than filing."],
  },
  zh: {
    title: "美国联邦税率档位计算器",
    subtitle: "查看你处于哪个联邦税档，以及税款如何按档位逐级累计",
    body: ["美国个税是累进制：每个税率只适用于落在对应区间内的那部分应税收入。收入增加、跨入更高税档，并不会让较低区间的收入多交税。", "输入税前收入和报税身份，计算器会减去 2026 年标准扣除额（以及你填写的其他扣除），再显示每个税率适用的收入、边际税率、有效税率，以及距离下一税档的空间。", "页面采用 IRS Rev. Proc. 2025-32 公布的 2026 年联邦税率档位，不含 FICA、州税和地方税及税收抵免，仅用于规划，不能用于报税。"],
  },
};

const metadata = {
  en: {
    title: "Federal Tax Bracket Calculator (US) | WealthEase",
    description: "Free 2026 US federal tax bracket calculator: find your marginal tax bracket, see tax owed in each bracket, your effective rate and how much income is left before the next bracket.",
    keywords: "tax bracket calculator, federal tax brackets 2026, marginal tax rate calculator, effective tax rate, which tax bracket am I in",
  },
  zh: {
    title: "美国联邦税率档位计算器 | WealthEase",
    description: "免费 2026 年美国联邦税率档位计算器：查你的边际税档、各档位应缴税额、有效税率，以及距离下一税档还有多少收入空间。",
    keywords: "税率档位计算器, 2026美国联邦税率, 边际税率计算, 有效税率, 我在哪个税档",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/tax-bracket`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/tax-bracket`,
        zh: `${baseUrl}/zh/calculators/tax-bracket`,
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

        <RelatedCalculators currentCalculator="tax-bracket" />
      </div>
    </div>
  );
}
