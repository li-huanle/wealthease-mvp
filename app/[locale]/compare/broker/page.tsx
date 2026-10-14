import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import {Info, AlertTriangle, BadgeCheck} from 'lucide-react';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'brokerCompare'});
  const seo = {title: t('title'), description: t('subtitle')};
  return buildMetadata(locale, '/compare/broker', {en: seo, zh: seo});
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
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}}
      />
      <div className="border-b bg-gradient-to-b from-primary-50/60 to-white">
        <div className="container mx-auto max-w-4xl px-4 py-14">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">{t('title')}</h1>
          <p className="mb-4 text-lg text-muted-foreground">{t('subtitle')}</p>
          <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="[overflow-wrap:anywhere]">
          <div className="mb-12 flex items-start gap-3 rounded-xl border bg-muted/50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" />
            <p className="text-sm text-gray-700">{t('disclosure')}</p>
          </div>

          {/* 一句话定位 */}
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-950">{t('positioning.title')}</h2>
          <div className="mb-12 grid gap-3 sm:grid-cols-2">
            {positioning.map((item) => (
              <div key={item.name} className="rounded-xl bg-white p-4 shadow-card">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 费率对比 */}
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-950">{t('fees.title')}</h2>
          <div className="mb-3 overflow-x-auto rounded-xl shadow-card">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-muted/60">
                  {feeHeaders.map((h) => (
                    <th key={h} className="whitespace-nowrap border-b px-3 py-2.5 text-left font-semibold text-gray-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row) => (
                  <tr key={row[0]} className="border-b last:border-0 transition-colors duration-quick ease-out hover:bg-muted/40">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-3 py-2.5 align-top ${i === 0 ? 'whitespace-nowrap font-semibold text-gray-900' : 'text-gray-600'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-12 font-medium text-gray-800">{t('fees.takeaway')}</p>

          {/* 开户门槛 */}
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-950">{t('requirements.title')}</h2>
          <div className="space-y-3 mb-3">
            {requirements.map((item) => (
              <div key={item.name} className="rounded-xl bg-white p-4 shadow-card">
                <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-12 font-medium text-gray-800">{t('requirements.takeaway')}</p>

          {/* 开户奖励 */}
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-950">{t('bonuses.title')}</h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('bonuses.note')}</p>
          <div className="space-y-3 mb-3">
            {bonuses.map((item) => (
              <div key={item.name} className="rounded-xl bg-white p-4 shadow-card">
                <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary-600" />{item.name}
                </p>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-12 text-sm text-muted-foreground">{t('bonuses.compliance')}</p>

          {/* 哪类人适合哪家 */}
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-950">{t('fit.title')}</h2>
          <div className="mb-12 divide-y rounded-xl bg-white px-4 shadow-card">
            {fit.map((item) => (
              <div key={item.who} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-4">
                <p className="text-gray-600 sm:w-1/2">{item.who}</p>
                <p className="font-semibold text-primary-700">→ {item.pick}</p>
              </div>
            ))}
          </div>

          {/* 风险提示 */}
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-950">{t('risks.title')}</h2>
          <div className="mb-12 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <ul className="text-sm text-amber-900 space-y-2">
              {risks.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          {/* FAQ */}
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-950">{t('faq.title')}</h2>
          <div className="divide-y rounded-xl bg-white shadow-card">
            {faq.map((item) => (
              <div key={item.q} className="px-5 py-4">
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
