import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const CDCalculator = dynamic(
  () => import('@/components/calculators/CDCalculator'),
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
      title: 'CD Calculator - Certificate of Deposit Returns | WealthEase',
      description: 'Free CD calculator to calculate your certificate of deposit returns. Compare different terms and find the best CD rates.',
      keywords: 'CD calculator, certificate of deposit, bank CD, fixed deposit, CD rates, CD returns',
    },
    zh: {
      title: '定期存款计算器 - CD存款收益计算 | WealthEase',
      description: '免费定期存款计算器，计算定期存单收益。比较不同存期和最优利率。',
      keywords: '定期存款计算器, CD存单, 定期存款, 银行定存, CD利率, 存款收益',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/calculators/cd`,
      languages: {
        'en': `${baseUrl}/en/calculators/cd`,
        'zh': `${baseUrl}/zh/calculators/cd`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: `${baseUrl}/${locale}/calculators/cd`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function CDPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.cd');

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

        <CDCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏦</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">定期存款（CD）简介</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      定期存款（Certificate of Deposit，CD）是银行提供的固定期限储蓄产品，
                      <strong>利率高于普通储蓄账户</strong>，适合保守型投资者。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">定期存款特点</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🔒</p>
                    <p className="font-semibold text-gray-900 mb-1">保本保息</p>
                    <p className="text-gray-600 text-sm">FDIC保险最高$25万</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">📈</p>
                    <p className="font-semibold text-gray-900 mb-1">利率固定</p>
                    <p className="text-gray-600 text-sm">锁定存期利率不变</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">⚠️</p>
                    <p className="font-semibold text-gray-900 mb-1">提前支取罚息</p>
                    <p className="text-gray-600 text-sm">损失部分利息</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见存期与利率</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">存期</th>
                        <th className="px-4 py-3 text-left">典型利率</th>
                        <th className="px-4 py-3 text-left">特点</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-4 py-3">3个月</td><td className="px-4 py-3">4.5-5.0%</td><td className="px-4 py-3 text-gray-500">短期灵活</td></tr>
                      <tr><td className="px-4 py-3">6个月</td><td className="px-4 py-3">4.5-5.0%</td><td className="px-4 py-3 text-gray-500">中等流动性</td></tr>
                      <tr><td className="px-4 py-3">1年</td><td className="px-4 py-3">4.5-5.0%</td><td className="px-4 py-3 text-gray-500">主流选择</td></tr>
                      <tr><td className="px-4 py-3">2年</td><td className="px-4 py-3">4.25-4.75%</td><td className="px-4 py-3 text-gray-500">略高利率</td></tr>
                      <tr><td className="px-4 py-3">5年</td><td className="px-4 py-3">4.0-4.5%</td><td className="px-4 py-3 text-gray-500">最高利率</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">实用建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">阶梯存款法</p>
                    <p className="text-gray-600 text-sm">将资金分成几份，存不同期限，兼顾收益和流动性。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">货比三家</p>
                    <p className="text-gray-600 text-sm">网上银行利率通常高于传统银行。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">FDIC保障</p>
                    <p className="text-gray-600 text-sm">选择有FDIC标志的银行，每银行最高$25万保障。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">到期处理</p>
                    <p className="text-gray-600 text-sm">关注自动续期条款，及时转存更高利率产品。</p>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">CD Investment Calculator</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Certificates of Deposit offer higher rates than regular savings with FDIC insurance.
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tips</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Laddering Strategy</p>
                    <p className="text-gray-600 text-sm">Split funds across terms for flexibility.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Shop Online Banks</p>
                    <p className="text-gray-600 text-sm">Often offer higher rates than traditional banks.</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="cd" />
      </div>
    </div>
  );
}
