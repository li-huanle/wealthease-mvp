import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import {Info, AlertTriangle, BadgeCheck} from 'lucide-react';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'brokerCompare'});
  const baseUrl = 'https://www.wealthease.top';

  return {
    title: t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
      locale: locale,
      siteName: 'WealthEase',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/compare/broker`,
      languages: {
        'en': `${baseUrl}/en/compare/broker`,
        'zh': `${baseUrl}/zh/compare/broker`,
      },
    },
  };
}

type NameDesc = {name: string; desc: string};
type WhoPick = {who: string; pick: string};
type FaqItem = {q: string; a: string};

export default async function BrokerComparePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'brokerCompare'});

  const positioning = t.raw('positioning.items') as NameDesc[];
  const feeHeaders = t.raw('fees.headers') as string[];
  const feeRows = t.raw('fees.rows') as string[][];
  const requirements = t.raw('requirements.items') as NameDesc[];
  const bonuses = t.raw('bonuses.items') as NameDesc[];
  const fit = t.raw('fit.items') as WhoPick[];
  const risks = t.raw('risks.items') as string[];
  const faq = t.raw('faq.items') as FaqItem[];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {'@type': 'Answer', text: item.a},
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          {/* Hero */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{t('subtitle')}</p>
          <p className="text-sm text-gray-500 mb-6">{t('lastUpdated')}</p>
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-10">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-900">{t('disclosure')}</p>
          </div>

          {/* 一句话定位 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('positioning.title')}</h2>
          <div className="space-y-3 mb-10">
            {positioning.map((item) => (
              <div key={item.name} className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 费率对比 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('fees.title')}</h2>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {feeHeaders.map((h) => (
                    <th key={h} className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50">
                    {row.map((cell, i) => (
                      <td key={i} className={`border border-gray-200 px-3 py-2 ${i === 0 ? 'font-semibold text-gray-900 whitespace-nowrap' : 'text-gray-600'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 font-medium mb-10">{t('fees.takeaway')}</p>

          {/* 开户门槛 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('requirements.title')}</h2>
          <div className="space-y-3 mb-3">
            {requirements.map((item) => (
              <div key={item.name} className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 font-medium mb-10">{t('requirements.takeaway')}</p>

          {/* 开户奖励 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('bonuses.title')}</h2>
          <p className="text-sm text-gray-500 mb-4">{t('bonuses.note')}</p>
          <div className="space-y-3 mb-3">
            {bonuses.map((item) => (
              <div key={item.name} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-green-600" />{item.name}
                </p>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-10">{t('bonuses.compliance')}</p>

          {/* 哪类人适合哪家 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('fit.title')}</h2>
          <div className="space-y-2 mb-10">
            {fit.map((item) => (
              <div key={item.who} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b border-gray-100 py-3">
                <p className="text-gray-600 sm:w-1/2">{item.who}</p>
                <p className="font-semibold text-gray-900">→ {item.pick}</p>
              </div>
            ))}
          </div>

          {/* 风险提示 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('risks.title')}</h2>
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-10">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <ul className="text-sm text-amber-900 space-y-2">
              {risks.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('faq.title')}</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-gray-100 pb-4">
                <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
