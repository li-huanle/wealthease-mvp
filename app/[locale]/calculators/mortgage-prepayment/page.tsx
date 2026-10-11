import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/MortgagePrepaymentCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Mortgage Prepayment Calculator",
    subtitle: "Should you prepay your mortgage or keep the cash? Run the numbers",
    body: ["Prepaying a mortgage is the same as earning your mortgage rate with certainty. So the only real question is: can you reliably earn more than that, after tax, on the same money for the rest of the term?", "This calculator keeps the loan term fixed. If you prepay, your monthly payment falls and we assume you invest that saving at your alternative return; if you do not, the lump sum is invested instead. It compares wealth at the end of the term and also shows the interest saved.", "Whichever you choose, keep emergency cash first and check your contract for prepayment penalties. Equal-installment loans front-load interest, so early prepayment saves the most."],
  },
  zh: {
    title: "提前还房贷计算器",
    subtitle: "该不该提前还房贷？算一笔账",
    body: ["提前还房贷等于稳稳赚到你的房贷利率。所以关键只有一个问题：同一笔钱在剩下的年限里，你能稳定拿到比它更高的税后收益吗？", "本计算器保持贷款期限不变。提前还款后月供下降，我们假设你把省下的月供按备选收益率拿去投资；不还款的话，则把这笔钱一次性拿去投资。最后比较到期时的资产，并给出省下的利息。", "无论怎么选，都要先留够应急现金，并检查合同里有没有提前还款违约金。等额本息前几年利息占比高，越早还省得越多。"],
  },
};

const metadata = {
  en: {
      title: "Mortgage Prepayment Calculator | WealthEase",
      description: "Free mortgage prepayment calculator: compare paying off part of your mortgage early against investing the same money, with interest saved and end-of-term wealth.",
      keywords: "mortgage prepayment calculator, pay off mortgage early, prepay vs invest, extra mortgage payment, interest saved",
    },
  zh: {
      title: "提前还房贷计算器 | WealthEase",
      description: "免费提前还房贷计算器：对比提前还款和把钱拿去投资，给出省下的利息和贷款到期时的资产差额。",
      keywords: "提前还房贷计算器, 提前还款划算吗, 房贷提前还款利息, 还贷还是投资, 等额本息提前还款",
    },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/mortgage-prepayment`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/mortgage-prepayment`,
        zh: `${baseUrl}/zh/calculators/mortgage-prepayment`,
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

        <RelatedCalculators currentCalculator="mortgage-prepayment" />
      </div>
    </div>
  );
}
