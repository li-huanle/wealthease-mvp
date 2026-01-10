import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import {AlertTriangle} from 'lucide-react';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;

  const metadata = {
    en: {
      title: 'Disclaimer - WealthEase',
      description: 'Important disclaimer for WealthEase financial calculators. Our tools are for educational purposes only and do not constitute financial advice.',
    },
    zh: {
      title: '免责声明 - WealthEase',
      description: 'WealthEase 理财计算器的重要免责声明。我们的工具仅供教育目的，不构成财务建议。',
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
      canonical: `${baseUrl}/${locale}/disclaimer`,
      languages: {
        'en': `${baseUrl}/en/disclaimer`,
        'zh': `${baseUrl}/zh/disclaimer`,
      },
    },
  };
}

export default async function DisclaimerPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'disclaimer'});

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-warning-100 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-warning-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('title')}
            </h1>
          </div>
          <p className="text-gray-600 mb-8">
            {t('lastUpdated')}
          </p>

          {/* Important Notice Box */}
          <div className="bg-warning-50 border-l-4 border-warning-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-semibold text-warning-800 mb-2">
              {t('importantNotice.title')}
            </h2>
            <p className="text-warning-700">
              {t('importantNotice.content')}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('general.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('general.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('general.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('notAdvice.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('notAdvice.content1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>{t('notAdvice.items.financial')}</li>
              <li>{t('notAdvice.items.investment')}</li>
              <li>{t('notAdvice.items.tax')}</li>
              <li>{t('notAdvice.items.legal')}</li>
              <li>{t('notAdvice.items.accounting')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">
              {t('notAdvice.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('accuracy.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('accuracy.content1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>{t('accuracy.items.estimates')}</li>
              <li>{t('accuracy.items.assumptions')}</li>
              <li>{t('accuracy.items.market')}</li>
              <li>{t('accuracy.items.personal')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('accuracy.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('noGuarantee.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('noGuarantee.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('noGuarantee.content2')}
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
              {t('userResponsibility.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('userResponsibility.content')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('userResponsibility.items.verify')}</li>
              <li>{t('userResponsibility.items.consult')}</li>
              <li>{t('userResponsibility.items.research')}</li>
              <li>{t('userResponsibility.items.decisions')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('limitation.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('limitation.content')}
            </p>
          </section>

          {/* Professional Advice Box */}
          <div className="bg-primary-50 border border-primary-200 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-primary-800 mb-2">
              {t('seekAdvice.title')}
            </h2>
            <p className="text-primary-700 mb-4">
              {t('seekAdvice.content')}
            </p>
            <ul className="list-disc list-inside text-primary-700 space-y-1 ml-4">
              <li>{t('seekAdvice.items.cfa')}</li>
              <li>{t('seekAdvice.items.cfp')}</li>
              <li>{t('seekAdvice.items.cpa')}</li>
              <li>{t('seekAdvice.items.attorney')}</li>
            </ul>
          </div>

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
