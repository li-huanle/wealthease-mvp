import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;

  const metadata = {
    en: {
      title: 'Terms of Service - WealthEase',
      description: 'Read the terms of service for using WealthEase financial calculators and tools. Learn about usage rules, disclaimers, and user responsibilities.',
    },
    zh: {
      title: '服务条款 - WealthEase',
      description: '阅读使用 WealthEase 理财计算器和工具的服务条款。了解使用规则、免责声明和用户责任。',
    },
  };

  const lang = locale as 'en' | 'zh';

  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      locale: locale,
      siteName: 'WealthEase',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
      languages: {
        'en': `${baseUrl}/en/terms`,
        'zh': `${baseUrl}/zh/terms`,
      },
    },
  };
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'terms'});

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('lastUpdated')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('acceptance.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('acceptance.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('acceptance.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('services.content')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('services.items.calculators')}</li>
              <li>{t('services.items.blog')}</li>
              <li>{t('services.items.resources')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('useRules.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('useRules.content')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('useRules.items.lawful')}</li>
              <li>{t('useRules.items.accurate')}</li>
              <li>{t('useRules.items.noHarm')}</li>
              <li>{t('useRules.items.noCommercial')}</li>
              <li>{t('useRules.items.noReverse')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('disclaimer.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('disclaimer.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('disclaimer.content2')}
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              {t('disclaimer.content3')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('accuracy.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('accuracy.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('accuracy.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('intellectualProperty.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('intellectualProperty.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('intellectualProperty.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('thirdParty.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('thirdParty.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('limitation.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('limitation.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('limitation.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('indemnification.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('indemnification.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('termination.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termination.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('governingLaw.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('governingLaw.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('changes.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('changes.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('contact.content')}
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              Email: <a href="mailto:support@wealthease.top" className="text-primary-600 hover:underline">
                support@wealthease.top
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
