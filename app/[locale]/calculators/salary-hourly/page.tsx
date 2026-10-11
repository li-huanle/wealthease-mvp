import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/SalaryHourlyCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Hourly to Salary Calculator",
    subtitle: "Convert an hourly wage to salary, or a salary to an hourly rate",
    body: ["A full-time year is usually 40 hours a week for 52 weeks, or 2,080 hours. Multiply your hourly rate by 2,080 to get an annual salary, and divide a salary by 2,080 to get an hourly rate.", "Adjust the hours per week and any unpaid weeks off to match your job. Paid vacation and holidays count as worked weeks because you are paid for them.", "These figures are gross pay before taxes. Use the take-home pay calculator to see what lands in your account."],
  },
  zh: {
    title: "时薪年薪换算",
    subtitle: "时薪和年薪互相换算",
    body: ["全职一年通常按每周 40 小时、52 周计算，即 2,080 小时。时薪乘以 2,080 得到年薪，年薪除以 2,080 得到时薪。", "可以按实际情况调整每周工时和无薪休假周数。带薪休假和节假日照常发工资，按工作周计算。", "以上都是税前收入。想知道实际到手多少，请使用税后工资计算器。"],
  },
};

const metadata = {
  en: {
    title: "Hourly to Salary Calculator | WealthEase",
    description: "Free hourly to salary calculator: convert an hourly wage into annual, monthly, biweekly, weekly and daily pay, or turn an annual salary into an hourly rate.",
    keywords: "hourly to salary calculator, salary to hourly, how much is $25 an hour per year, annual salary calculator, wage converter",
  },
  zh: {
    title: "时薪年薪换算 | WealthEase",
    description: "免费时薪年薪换算器：把时薪换算成年薪、月薪、双周薪、周薪和日薪，或把年薪换算成时薪。",
    keywords: "时薪换算年薪, 年薪换算时薪, 工资换算, 月薪计算, 时薪计算器",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/salary-hourly`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/salary-hourly`,
        zh: `${baseUrl}/zh/calculators/salary-hourly`,
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

        <RelatedCalculators currentCalculator="salary-hourly" />
      </div>
    </div>
  );
}
