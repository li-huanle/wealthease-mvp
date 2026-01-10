import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import {Mail, MessageSquare, Clock, MapPin, Shield, HelpCircle} from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;

  const metadata = {
    en: {
      title: 'Contact Us - WealthEase',
      description: 'Get in touch with WealthEase team. We\'re here to help with questions about our financial calculators, feedback, or support requests.',
    },
    zh: {
      title: '联系我们 - WealthEase',
      description: '联系 WealthEase 团队。我们随时为您解答关于理财计算器的问题、反馈或支持请求。',
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
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        'en': `${baseUrl}/en/contact`,
        'zh': `${baseUrl}/zh/contact`,
      },
    },
  };
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'contact'});

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('email.title')}
                  </h2>
                  <p className="text-gray-600 mb-3">
                    {t('email.description')}
                  </p>
                  <a
                    href="mailto:support@wealthease.top"
                    className="text-primary-600 hover:text-primary-700 font-medium text-lg"
                  >
                    support@wealthease.top
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="bg-success-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-success-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('response.title')}
                  </h2>
                  <p className="text-gray-600">
                    {t('response.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('location.title')}
                  </h2>
                  <p className="text-gray-600">
                    {t('location.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Topics */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t('helpTopics.title')}
            </h2>

            <div className="space-y-4">
              {/* Topic 1 */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <HelpCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {t('helpTopics.calculator.title')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('helpTopics.calculator.description')}
                  </p>
                </div>
              </div>

              {/* Topic 2 */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {t('helpTopics.feedback.title')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('helpTopics.feedback.description')}
                  </p>
                </div>
              </div>

              {/* Topic 3 */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {t('helpTopics.privacy.title')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('helpTopics.privacy.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <p className="text-sm text-warning-800">
                <strong>{t('note.title')}</strong> {t('note.content')}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            {t('quickLinks.title')}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href={`/${locale}/calculators`}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors text-center"
            >
              <span className="text-2xl mb-2">🧮</span>
              <span className="font-medium text-gray-900">{t('quickLinks.calculators')}</span>
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors text-center"
            >
              <span className="text-2xl mb-2">📚</span>
              <span className="font-medium text-gray-900">{t('quickLinks.blog')}</span>
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors text-center"
            >
              <span className="text-2xl mb-2">🔒</span>
              <span className="font-medium text-gray-900">{t('quickLinks.privacy')}</span>
            </Link>
            <Link
              href={`/${locale}/about`}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors text-center"
            >
              <span className="text-2xl mb-2">ℹ️</span>
              <span className="font-medium text-gray-900">{t('quickLinks.about')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
