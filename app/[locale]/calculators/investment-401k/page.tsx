import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const Investment401kCalculator = dynamic(
  () => import('@/components/calculators/Investment401kCalculator'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    ),
  }
);

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('calculator.investment401k');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/investment-401k`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/investment-401k`,
        'zh': `${baseUrl}/zh/calculators/investment-401k`,
      },
    },
    openGraph: {
      title: seo('og:title'),
      description: seo('og:description'),
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: canonicalUrl,
    },
    twitter: {
      card: seo('twitter:card'),
      title: seo('og:title'),
      description: seo('og:description'),
    } as any,
};
}

export default async function Investment401kPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.investment401k');

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

        <Investment401kCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">401(k)退休规划：您的黄金退休工具</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      401(k)是美国最受欢迎的雇主赞助退休储蓄计划，
                      <strong>最大的优势是雇主匹配（Employer Match）</strong>——这是"免费的钱"，错过了就太可惜了！
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      2025年401(k)供款上限为$23,500（50岁以上可追加$7,500）。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💎 最大化雇主匹配</h3>
                <div className="bg-white rounded-xl p-6">
                  <p className="text-gray-600 mb-4">
                    雇主匹配是401(k)的核心优势。以下是典型的匹配方案：
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">常见匹配比例</p>
                      <p className="text-xl font-bold text-primary-600">100%</p>
                      <p className="text-xs text-gray-400">前6%工资</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">举例：年薪$10万</p>
                      <p className="text-xl font-bold text-green-600">$6,000</p>
                      <p className="text-xs text-gray-400">您只需存$6,000</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">您实际获得</p>
                      <p className="text-xl font-bold text-green-600">$12,000</p>
                      <p className="text-xs text-gray-400">立即翻倍！</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">如何使用401(k)计算器</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">输入基本信息</p>
                        <p className="text-gray-600 text-sm">当前年龄、退休年龄、当前储蓄额。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">设定薪资和供款</p>
                        <p className="text-gray-600 text-sm">年薪、计划年度供款金额。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">雇主匹配信息</p>
                        <p className="text-gray-600 text-sm">匹配比例和上限百分比。</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">预期收益</p>
                        <p className="text-gray-600 text-sm">股票基金约7-10%，债券约4-6%。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">5</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">查看结果</p>
                        <p className="text-gray-600 text-sm">了解退休时能积累多少财富。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">实用建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">💡 先拿到全额匹配</p>
                    <p className="text-gray-600 text-sm">无论如何，先存到能获得全额雇主匹配的金额。这是100%回报！</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">💡 尽早开始</p>
                    <p className="text-gray-600 text-sm">复利效应需要时间，越早开始，退休时积累越多。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">💡 考虑Roth选项</p>
                    <p className="text-gray-600 text-sm">如果您的税级在退休后可能更高，Roth 401(k)可能是好选择。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">💡 不要借债投资</p>
                    <p className="text-gray-600 text-sm">避免从401(k)借款，除非绝对必要。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 401(k)退休后能取多少钱？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 取决于您的供款、雇主匹配和投资表现。假设年薪$10万，30年，年收益7%：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>您供款$230/周：约$82万</li>
                        <li>含雇主匹配：约$164万</li>
                        <li>总供款约$36万 + 收益约$128万</li>
                      </ul>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 什么时候可以取钱？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 59½岁后可以无罚款取钱。59½岁前取钱通常需缴纳10%罚款和所得税（特殊情况除外）。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 公司换了，401(k)怎么办？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 有三个选择：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>转入新公司的401(k)</li>
                        <li>转入个人IRA账户</li>
                        <li>保留在原公司（如允许）</li>
                      </ul>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">401(k) Retirement Planning</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      401(k) is the most popular employer-sponsored retirement savings plan in the US.
                      The <strong>biggest advantage is employer match</strong> - free money you don't want to miss!
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      2025 contribution limit: $23,500 (+$7,500 catch-up for 50+).
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Maximizing Employer Match</h3>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Common Match</p>
                      <p className="text-xl font-bold text-primary-600">100%</p>
                      <p className="text-xs text-gray-400">up to 6% of salary</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Example: $100K salary</p>
                      <p className="text-xl font-bold text-green-600">$6,000</p>
                      <p className="text-xs text-gray-400">You save $6,000</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">You actually get</p>
                      <p className="text-xl font-bold text-green-600">$12,000</p>
                      <p className="text-xs text-gray-400">Instant doubling!</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Practical Tips</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Get Full Match First</p>
                    <p className="text-gray-600 text-sm">Always contribute enough to get full employer match - 100% return!</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Start Early</p>
                    <p className="text-gray-600 text-sm">Compound growth needs time. The earlier, the more you'll have.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">Consider Roth Option</p>
                    <p className="text-gray-600 text-sm">If your tax bracket will be higher in retirement, Roth 401(k) may be better.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">Don't Borrow</p>
                    <p className="text-gray-600 text-sm">Avoid 401(k) loans unless absolutely necessary.</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: When can I withdraw?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> After age 59½ without penalty. Earlier withdrawals usually face 10% penalty and income tax.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What if I change jobs?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Roll to new employer's 401(k), roll to IRA, or leave it (if allowed).</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="investment-401k" />
      </div>
    </div>
  );
}
