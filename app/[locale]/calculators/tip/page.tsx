import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const TipCalculator = dynamic(
  () => import('@/components/calculators/TipCalculator'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    ),
  }
);

// Generate metadata for SEO
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;

  const metadata = {
    en: {
      title: 'Tip Calculator - Calculate Tips & Split Bills | WealthEase',
      description: 'Free tip calculator to quickly calculate tip amounts by percentage. Split bills between friends with ease. Perfect for restaurants, taxis, and services.',
      keywords: 'tip calculator, split bill, calculate tip, restaurant tip, gratuity calculator, bill splitter, split check',
    },
    zh: {
      title: '小费计算器 - 快速计算小费和分摊账单 | WealthEase',
      description: '免费小费计算器，按百分比快速计算小费金额。轻松和朋友分摊账单。适用于餐厅、出租车和服务场所。',
      keywords: '小费计算器, 分摊账单, 计算小费, 餐厅小费, 小费计算器, 分摊账单, 小费计算工具',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/tip`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/tip`,
        'zh': `${baseUrl}/zh/calculators/tip`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function TipPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.tip');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <TipCalculator />

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-6 md:p-8 prose prose-lg max-w-none">
          <h2>{t('seo.howToUse.title')}</h2>
          <ol>
            <li>{t('seo.howToUse.step1')}</li>
            <li>{t('seo.howToUse.step2')}</li>
            <li>{t('seo.howToUse.step3')}</li>
            <li>{t('seo.howToUse.step4')}</li>
          </ol>

          <h2>{t('seo.customTip.title')}</h2>
          <p>{t('seo.customTip.content')}</p>

          <h2>{t('seo.splitting.title')}</h2>
          <p>{t('seo.splitting.content')}</p>

          <h2>{t('seo.standardTips.title')}</h2>
          <ul>
            <li>{t('seo.standardTips.usa')}</li>
            <li>{t('seo.standardTips.europe')}</li>
            <li>{t('seo.standardTips.asia')}</li>
            <li>{t('seo.standardTips.australia')}</li>
          </ul>

          <h2>{t('seo.groupDining.title')}</h2>
          <p>{t('seo.groupDining.content')}</p>

          <h2>{t('seo.tax.title')}</h2>
          <p>{t('seo.tax.content')}</p>
        </div>

        <RelatedCalculators currentCalculator="tip" />
      </div>
    </div>
  );
}
