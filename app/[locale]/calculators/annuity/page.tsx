import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const AnnuityCalculator = dynamic(
  () => import('@/components/calculators/AnnuityCalculator'),
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
      title: 'Annuity Calculator - Retirement Income Planning | WealthEase',
      description: 'Free annuity calculator to estimate your retirement income. Calculate immediate and deferred annuity payments.',
      keywords: 'annuity calculator, retirement income, annuity payments, immediate annuity, deferred annuity, retirement planning',
    },
    zh: {
      title: '年金计算器 - 退休收入规划 | WealthEase',
      description: '免费年金计算器，估算退休收入。计算立即年金和延期年金支付金额。',
      keywords: '年金计算器, 退休收入, 年金支付, 立即年金, 延期年金, 退休规划',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/calculators/annuity`,
      languages: {
        'en': `${baseUrl}/en/calculators/annuity`,
        'zh': `${baseUrl}/zh/calculators/annuity`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: `${baseUrl}/${locale}/calculators/annuity`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function AnnuityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.annuity');

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

        <AnnuityCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">年金：稳定的退休收入来源</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      年金是一种保险公司提供的长期收入产品，
                      <strong>可将一笔资金转换为终身定期收入</strong>，是退休规划的重要组成部分。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">年金类型</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">立即年金</p>
                    <p className="text-gray-600 text-sm mb-3">缴费后立即开始领取收入，适合已退休人员</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• 一次性缴费</li>
                      <li>• 立即开始月付</li>
                      <li>• 可选择终身或固定期限</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">延期年金</p>
                    <p className="text-gray-600 text-sm mb-3">退休后开始领取，享受税收优惠增长</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• 税收递延增长</li>
                      <li>• 退休后开始领取</li>
                      <li>• 可一次性或分期领取</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">年金支付选项</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="font-semibold text-blue-800 mb-2">终身年金</p>
                    <p className="text-sm text-blue-700">活多久领多久，但可能较早去世会亏本</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="font-semibold text-green-800 mb-2">定期年金</p>
                    <p className="text-sm text-green-700">固定年限内支付，如20年，未领完可退还</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <p className="font-semibold text-purple-800 mb-2">连带年金</p>
                    <p className="text-sm text-purple-700">两人共同领取，一方去世后另一方继续领取</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">实用建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">考虑通胀</p>
                    <p className="text-gray-600 text-sm">固定年金可能被通胀侵蚀，考虑通胀保护型产品。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">货比三家</p>
                    <p className="text-gray-600 text-sm">不同保险公司报价可能差异20%以上。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">了解费用</p>
                    <p className="text-gray-600 text-sm">年化费用可能高达2-3%，长期影响显著。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">不要超配</p>
                    <p className="text-gray-600 text-sm">年金流动性差，建议退休资产配置不超过30%。</p>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Annuity Calculator</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Convert a lump sum into guaranteed retirement income with annuities.
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Types</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Immediate</p>
                    <p className="text-gray-600 text-sm">Start payments right away after purchase.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Deferred</p>
                    <p className="text-gray-600 text-sm">Grow tax-deferred, payments start later.</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="annuity" />
      </div>
    </div>
  );
}
