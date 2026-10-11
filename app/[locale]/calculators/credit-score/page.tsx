import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const CreditScoreCalculator = dynamic(
  () => import('@/components/calculators/CreditScoreCalculator'),
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
      title: 'Credit Score Estimator - Check Your Credit Health | WealthEase',
      description: 'Free credit score estimator based on payment history, credit utilization, and other factors. Understand what affects your credit score.',
      keywords: 'credit score estimator, credit score check, credit health, credit utilization, FICO score, credit report',
    },
    zh: {
      title: '信用分估算器 - 检查您的信用状况 | WealthEase',
      description: '免费信用分估算器，基于付款记录、信用利用率等因素。了解影响您信用分的因素。',
      keywords: '信用分估算, 信用检查, 信用状况, 信用利用率, 芝麻信用, 信用报告',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/calculators/credit-score`,
      languages: {
        'en': `${baseUrl}/en/calculators/credit-score`,
        'zh': `${baseUrl}/zh/calculators/credit-score`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: `${baseUrl}/${locale}/calculators/credit-score`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function CreditScorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.creditScore');

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

        <CreditScoreCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">信用分估算：了解您的信用健康</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      信用分是贷款、租房、申请信用卡的重要依据。
                      <strong>本估算器基于FICO评分模型</strong>，帮助您了解影响信用的主要因素。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">FICO评分因素权重</h3>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-red-500">35%</p>
                    <p className="font-semibold text-gray-900 mt-2">付款历史</p>
                    <p className="text-gray-600 text-sm">是否按时还款</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-orange-500">30%</p>
                    <p className="font-semibold text-gray-900 mt-2">信用利用率</p>
                    <p className="text-gray-600 text-sm">已用/总额比例</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-yellow-500">15%</p>
                    <p className="font-semibold text-gray-900 mt-2">信用历史</p>
                    <p className="text-gray-600 text-sm">账户时间长短</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-green-500">10%</p>
                    <p className="font-semibold text-gray-900 mt-2">信用组合</p>
                    <p className="text-gray-600 text-sm">贷款、信用卡等</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl font-bold text-blue-500">10%</p>
                    <p className="font-semibold text-gray-900 mt-2">新信用</p>
                    <p className="text-gray-600 text-sm">近期查询次数</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">信用分等级</h3>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-green-700 text-lg">优秀</p>
                    <p className="text-2xl font-bold text-green-600 my-2">800-850</p>
                    <p className="text-xs text-gray-600">最佳利率</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-blue-700 text-lg">良好</p>
                    <p className="text-2xl font-bold text-blue-600 my-2">740-799</p>
                    <p className="text-xs text-gray-600">好利率</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-yellow-700 text-lg">一般</p>
                    <p className="text-2xl font-bold text-yellow-600 my-2">670-739</p>
                    <p className="text-xs text-gray-600">平均利率</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-orange-700 text-lg">较差</p>
                    <p className="text-2xl font-bold text-orange-600 my-2">580-669</p>
                    <p className="text-xs text-gray-600">较高利率</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-red-700 text-lg">很差</p>
                    <p className="text-2xl font-bold text-red-600 my-2">300-579</p>
                    <p className="text-xs text-gray-600">难以获批</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">实用建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">按时还款最重要</p>
                    <p className="text-gray-600 text-sm">逾期记录影响长达7年，设置自动还款。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">控制信用利用率</p>
                    <p className="text-gray-600 text-sm">保持在30%以下，最好低于10%。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">保留老账户</p>
                    <p className="text-gray-600 text-sm">不要轻易关闭旧信用卡，保持历史长度。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">减少硬查询</p>
                    <p className="text-gray-600 text-sm">6个月内硬查询超过6次会降低分数。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 免费信用分从哪里查？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> AnnualCreditReport.com每年可免费获取三大信用局报告。Credit Karma、Discover Scorecard等提供免费信用分估算。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 硬查询和软查询有什么区别？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 硬查询（申请贷款/信用卡）会影响分数。软查询（自查、信用卡公司监控）不影响。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 信用分可以快速提升吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 短期可还清信用卡欠款降低利用率，但信用历史和付款记录需要时间积累。每月改善5-10分是正常速度。</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Credit Score Estimator</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Your credit score affects loans, rent, and more.
                  <strong> This estimator uses the FICO model</strong> to help you understand key factors.
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Score Ranges</h3>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-green-700">Excellent</p>
                    <p className="text-2xl font-bold text-green-600">800-850</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-blue-700">Good</p>
                    <p className="text-2xl font-bold text-blue-600">740-799</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-yellow-700">Fair</p>
                    <p className="text-2xl font-bold text-yellow-600">670-739</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-orange-700">Poor</p>
                    <p className="text-2xl font-bold text-orange-600">580-669</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-red-700">Very Poor</p>
                    <p className="text-2xl font-bold text-red-600">300-579</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tips</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Pay on Time</p>
                    <p className="text-gray-600 text-sm">Late payments hurt for up to 7 years.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Low Utilization</p>
                    <p className="text-gray-600 text-sm">Keep below 30%, ideally under 10%.</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="credit-score" />
      </div>
    </div>
  );
}
