import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const AutoLoanCalculator = dynamic(
  () => import('@/components/calculators/AutoLoanCalculator'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    ),
  }
);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Auto Loan Calculator - Car Payment Estimator | WealthEase',
      description: 'Free auto loan calculator to estimate your monthly car payment. Calculate total interest, loan terms, and find the best rates.',
      keywords: 'auto loan calculator, car loan calculator, car payment, vehicle loan, auto financing, car finance',
    },
    zh: {
      title: '车贷计算器 - 汽车贷款月供计算 | WealthEase',
      description: '免费车贷计算器，估算您的汽车月供。计算总利息、贷款期限和最优利率。',
      keywords: '车贷计算器, 汽车贷款, 车月供, 车辆贷款, 汽车金融, 车贷利率',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/calculators/auto-loan`,
      languages: {
        'en': `${baseUrl}/en/calculators/auto-loan`,
        'zh': `${baseUrl}/zh/calculators/auto-loan`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: `${baseUrl}/${locale}/calculators/auto-loan`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function AutoLoanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.autoLoan');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <AutoLoanCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🚗</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">购车贷款小贴士</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      车贷是大多数消费者购车的主要方式，
                      <strong>了解贷款成本结构有助于做出更明智的决策</strong>。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">车贷成本构成</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">💰</p>
                    <p className="font-semibold text-gray-900 mb-1">车价</p>
                    <p className="text-gray-600 text-sm">厂商建议零售价(MSRP)</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">📊</p>
                    <p className="font-semibold text-gray-900 mb-1">利率</p>
                    <p className="text-gray-600 text-sm">APR决定利息成本</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">📅</p>
                    <p className="font-semibold text-gray-900 mb-1">期限</p>
                    <p className="text-gray-600 text-sm">36-72个月常见</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">💳</p>
                    <p className="font-semibold text-gray-900 mb-1">首付</p>
                    <p className="text-gray-600 text-sm">建议至少20%</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">车贷期限对比</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">期限</th>
                        <th className="px-4 py-3 text-left">月供（$3万车价）</th>
                        <th className="px-4 py-3 text-left">总利息</th>
                        <th className="px-4 py-3 text-left">建议</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-4 py-3">36个月</td><td className="px-4 py-3 text-green-600">$897</td><td className="px-4 py-3">约$2,300</td><td className="px-4 py-3 text-gray-500">推荐</td></tr>
                      <tr><td className="px-4 py-3">48个月</td><td className="px-4 py-3 text-yellow-600">$690</td><td className="px-4 py-3">约$3,100</td><td className="px-4 py-3 text-gray-500">可接受</td></tr>
                      <tr><td className="px-4 py-3">60个月</td><td className="px-4 py-3 text-orange-600">$566</td><td className="px-4 py-3">约$4,000</td><td className="px-4 py-3 text-gray-500">注意总成本</td></tr>
                      <tr><td className="px-4 py-3">72个月</td><td className="px-4 py-3 text-red-600">$484</td><td className="px-4 py-3">约$5,000+</td><td className="px-4 py-3 text-red-500">风险较高</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">专家建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">控制贷款期限</p>
                    <p className="text-gray-600 text-sm">尽量选择60个月以下，避免长期负债风险。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">提高首付比例</p>
                    <p className="text-gray-600 text-sm">20%以上可避免负资产，并可能获得更好利率。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">检查信用分数</p>
                    <p className="text-gray-600 text-sm">720分以上可获得最佳利率（~5%）。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">多方比较</p>
                    <p className="text-gray-600 text-sm">比较银行、信用合作社和经销商贷款利率。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 新车还是二手车贷款？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 新车利率较低（约5-7%），二手车利率较高（约7-15%），但新车折旧快。需权衡。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 车贷提前还款划算吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 大多数车贷提前还款没有罚款，可节省利息支出。但需确认贷款合同条款。</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Auto Loan Calculator</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Estimate your monthly car payment and total loan costs.
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tips</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Shorter Terms</p>
                    <p className="text-gray-600 text-sm">Keep under 60 months to minimize interest.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">20% Down</p>
                    <p className="text-gray-600 text-sm">Avoid being underwater on the loan.</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="auto-loan" />
      </div>
    </div>
  );
}
