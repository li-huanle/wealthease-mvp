import {setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const Calculator = dynamic(() => import('@/components/calculators/AreaConversionCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
});

const content = {
  en: {
    title: "Area Unit Converter",
    subtitle: "Convert square feet, square meters, acres, hectares and more",
    body: ["Real-estate listings, land sales and floor plans use different area units depending on the country: square feet in the US, square meters almost everywhere else, acres and hectares for land.", "Enter a value, choose the unit it is in, and the table shows the same area in every other unit. Handy factors: 1 m² = 10.7639 ft², 1 acre = 43,560 ft² = 4,046.86 m², 1 hectare = 10,000 m² = 2.4711 acres.", "Conversions use exact international definitions (1 ft = 0.3048 m). Rounded for display."],
  },
  zh: {
    title: "面积单位换算",
    subtitle: "平方英尺、平方米、英亩、公顷等单位快速换算",
    body: ["不同国家的房源、土地和户型图使用不同的面积单位：美国用平方英尺，多数国家用平方米，土地则常用英亩和公顷。", "输入数值并选择原单位，表格会列出换算成其他各单位的结果。常用换算：1 平方米 = 10.7639 平方英尺，1 英亩 = 43,560 平方英尺 = 4,046.86 平方米，1 公顷 = 10,000 平方米 = 2.4711 英亩。", "换算采用国际标准定义（1 英尺 = 0.3048 米），显示结果已四舍五入。亩和坪仅在中文页面显示。"],
  },
};

const metadata = {
  en: {
    title: "Area Unit Converter | WealthEase",
    description: "Free area converter: convert between square feet, square meters, square yards, acres, hectares, square kilometers and square miles instantly.",
    keywords: "area converter, square feet to square meters, sq ft to sq m, acres to square feet, hectares to acres, area unit conversion",
  },
  zh: {
    title: "面积单位换算 | WealthEase",
    description: "免费面积单位换算器：平方英尺、平方米、平方码、英亩、公顷、平方公里、平方英里以及亩、坪之间即时换算。",
    keywords: "面积换算, 平方英尺换平方米, 英亩换算, 公顷换算, 亩换算平方米, 坪换算",
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/area-conversion`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/calculators/area-conversion`,
        zh: `${baseUrl}/zh/calculators/area-conversion`,
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

        <RelatedCalculators currentCalculator="area-conversion" />
      </div>
    </div>
  );
}
