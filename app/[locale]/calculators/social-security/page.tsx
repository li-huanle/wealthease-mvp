import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const SocialSecurityCalculator = dynamic(
  () => import('@/components/calculators/SocialSecurityCalculator'),
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
      title: 'Social Security Calculator - Estimate Your Benefits | WealthEase',
      description: 'Free Social Security calculator to estimate your retirement benefits. Calculate monthly benefit based on your earnings record.',
      keywords: 'social security calculator, social security benefits, retirement benefits, SSA, social security administration',
    },
    zh: {
      title: '社保金计算器 - 估算您的退休福利 | WealthEase',
      description: '免费社保金计算器，基于您的收入记录估算退休福利。计算月领取金额。',
      keywords: '社保金计算器, 社会安全金, 退休福利, SSA, 社保福利, 退休金计算',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/calculators/social-security`,
      languages: {
        'en': `${baseUrl}/en/calculators/social-security`,
        'zh': `${baseUrl}/zh/calculators/social-security`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: `${baseUrl}/${locale}/calculators/social-security`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function SocialSecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.socialSecurity');

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

        <SocialSecurityCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">美国社保金简介</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Social Security是美国政府提供的退休福利计划，
                      <strong>是大多数退休人员的重要收入来源之一</strong>。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">领取年龄与金额</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-red-500 mb-2">62</p>
                    <p className="font-semibold text-gray-900 mb-1">最早领取</p>
                    <p className="text-gray-600 text-sm">减少约30%月收入</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-green-500 mb-2">67</p>
                    <p className="font-semibold text-gray-900 mb-1">全额退休</p>
                    <p className="text-gray-600 text-sm">1960年后出生</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-purple-500 mb-2">70</p>
                    <p className="font-semibold text-gray-900 mb-1">最高金额</p>
                    <p className="text-gray-600 text-sm">增加24%月收入</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">策略建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">延迟领取收益高</p>
                    <p className="text-gray-600 text-sm">70岁领取比62岁月收入高24%，终身收益更多。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">考虑健康状况</p>
                    <p className="text-gray-600 text-sm">预期寿命较长则建议延迟，家族有长寿基因更应考虑。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">结合其他收入</p>
                    <p className="text-gray-600 text-sm">有养老金或足够储蓄可延迟社保，优先使用其他资产。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">配偶福利</p>
                    <p className="text-gray-600 text-sm">符合条件的配偶可领取您福利的50%。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 需要工作多少年才有社保金？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 需要工作满10年（40个学分）才能有资格领取社保金。社保金金额基于您收入最高的35年计算。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 在世时未领完的社保金可以继承吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 不能继承。但遗属可领取已故者的社保金（需符合条件）。</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Social Security Estimator</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Estimate your Social Security retirement benefits based on your earnings record.
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Ages</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="font-bold text-red-600">62</p>
                    <p className="text-sm text-gray-600">Earliest -30%</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="font-bold text-green-600">67</p>
                    <p className="text-sm text-gray-600">Full Retirement</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="font-bold text-purple-600">70</p>
                    <p className="text-sm text-gray-600">Max +24%</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="social-security" />
      </div>
    </div>
  );
}
