import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/EmergencyFundCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Emergency Fund Calculator",
    subtitle: "Work out your emergency fund target and how long it will take to build",
    body: ["An emergency fund lets you absorb a job loss or medical bill without borrowing at high interest rates or selling investments at a loss. The common rule of thumb is 3 to 6 months of essential expenses, kept somewhere you can withdraw at any time.", "Base the target on what you must spend each month (housing, food, utilities, insurance, minimum debt payments), not on your income. Enter what you have saved and what you can add each month, and the calculator shows the gap and the time needed, including interest.", "The 3 to 6 month figure is a widely used guideline, not an official standard. Self-employed people or single-income households may want more."],
  },
  zh: {
    title: "应急金计算器",
    subtitle: "计算你的应急金目标和存够需要的时间",
    body: ["应急金能让你在失业或遇到医疗开销时，不用去借高息贷款，也不用亏着卖掉投资。通行的经验是 3 到 6 个月的必要支出，放在随时能取的地方。", "金额按每月必须花的钱（房租房贷、吃饭、水电、保险、最低还款）算，不按收入算。输入已有金额和每月能存的钱，计算器会给出差额和达标所需时间（含利息）。", "「3 到 6 个月」是广泛使用的经验值，不是官方标准。自由职业者或家里只有一份收入的，可以多备一些。"],
  },
};

const metadata = {
  en: {
      title: "Emergency Fund Calculator | WealthEase",
      description: "Free emergency fund calculator: find how many months of expenses you need saved, how much you are short and how long it takes to reach your goal.",
      keywords: "emergency fund calculator, how much emergency fund, rainy day fund, months of expenses, savings target",
    },
  zh: {
      title: "应急金计算器 | WealthEase",
      description: "免费应急金计算器：算出需要覆盖几个月支出、还差多少，以及按每月储蓄多久能达标。",
      keywords: "应急金计算器, 应急资金要存多少, 备用金, 几个月生活费, 储蓄目标",
    },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/emergency-fund`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/emergency-fund`,
        zh: `${baseUrl}/zh/calculators/emergency-fund`,
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

        <RelatedCalculators currentCalculator="emergency-fund" />
      </div>
    </div>
  );
}
