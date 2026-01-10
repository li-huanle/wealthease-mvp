import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;

  const metadata = {
    en: {
      title: 'Privacy Policy - WealthEase',
      description: 'Learn how WealthEase protects your privacy and handles your data. We do not store or share your financial information.',
    },
    zh: {
      title: '隐私政策 - WealthEase',
      description: '了解 WealthEase 如何保护您的隐私并处理您的数据。我们不存储或分享您的财务信息。',
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
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: {
        'en': `${baseUrl}/en/privacy`,
        'zh': `${baseUrl}/zh/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'privacy'});

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
              {t('intro.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('intro.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('intro.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('dataCollection.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('dataCollection.content')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('dataCollection.items.anonymous')}</li>
              <li>{t('dataCollection.items.analytics')}</li>
              <li>{t('dataCollection.items.cookies')}</li>
              <li>{t('dataCollection.items.location')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('noFinancialData.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('noFinancialData.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('cookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('cookies.content')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('cookies.items.essential')}</li>
              <li>{t('cookies.items.analytics')}</li>
              <li>{t('cookies.items.advertising')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('thirdParty.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('thirdParty.content')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('thirdParty.items.google')}</li>
              <li>{t('thirdParty.items.vercel')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('dataSecurity.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('dataSecurity.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('userRights.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('userRights.content')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('userRights.items.access')}</li>
              <li>{t('userRights.items.correction')}</li>
              <li>{t('userRights.items.deletion')}</li>
              <li>{t('userRights.items.objection')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('children.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('children.content')}
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
