import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const InvestmentComparisonCalculator = dynamic(
  () => import('@/components/calculators/InvestmentComparisonCalculator'),
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
  const t = await getTranslations('calculator.investmentComparison');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/investment-comparison`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/investment-comparison`,
        'zh': `${baseUrl}/zh/calculators/investment-comparison`,
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
    } as any
  };
}

export default async function InvestmentComparisonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.investmentComparison');

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

        <InvestmentComparisonCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">投资比较：做出明智的财务决策</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      选择投资选项可能很困难。应该投资股票、债券、房地产，还是高息储蓄账户？
                      <strong>本计算器帮助您并排比较最多三个不同投资方案</strong>，综合考虑回报、税费和时间周期。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">各资产类别的历史平均回报</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">大盘股 (标普500)</p>
                    <p className="text-2xl font-bold text-green-600">~10%</p>
                    <p className="text-xs text-gray-500">高波动</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">小盘股</p>
                    <p className="text-2xl font-bold text-green-600">~12%</p>
                    <p className="text-xs text-gray-500">更高波动</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">国际股票</p>
                    <p className="text-2xl font-bold text-green-600">~8-9%</p>
                    <p className="text-xs text-gray-500">需分散风险</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">债券</p>
                    <p className="text-2xl font-bold text-blue-600">~4-5%</p>
                    <p className="text-xs text-gray-500">低波动</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见投资组合比较</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">股票 vs 债券 vs 现金</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 股票：~10%回报，高波动</li>
                      <li>• 债券：~4-5%回报，中等波动</li>
                      <li>• 储蓄：当前3-5%，无波动</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">税收优惠 vs 征税账户</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Roth IRA：免税增长和提取</li>
                      <li>• 传统401(k)：延税，退休时纳税</li>
                      <li>• 税务账户：即时可得，资本利得税</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">主动 vs 被动投资</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 指数基金：低费用0.03-0.2%</li>
                      <li>• 主动基金：费用0.5-2%，可能跑输</li>
                      <li>• 个股：无基金费用，需研究</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">复利与时间的威力</h3>
                <p className="text-gray-600 mb-4">假设月投$500，年回报8%：</p>
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">时间</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">总投入</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">总价值</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">收益</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3">10年</td>
                          <td className="px-4 py-3">$60,000</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">$91,000</td>
                          <td className="px-4 py-3">+$31,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">20年</td>
                          <td className="px-4 py-3">$120,000</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">$294,000</td>
                          <td className="px-4 py-3">+$174,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">30年</td>
                          <td className="px-4 py-3">$180,000</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">$745,000</td>
                          <td className="px-4 py-3">+$565,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">40年</td>
                          <td className="px-4 py-3">$240,000</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">$1,750,000</td>
                          <td className="px-4 py-3">+$1,510,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-amber-600 mt-4 font-semibold">
                  注意：收益最终远超本金——这就是复利的魔力！
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">费用对回报的长期影响</h3>
                <p className="text-gray-600 mb-4">10万投资30年，年回报8%：</p>
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">0.05% 费率</p>
                      <p className="text-xl font-bold text-green-600">$99万</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">0.5% 费率</p>
                      <p className="text-xl font-bold text-blue-600">$89万</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">1% 费率</p>
                      <p className="text-xl font-bold text-amber-600">$79万</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">2% 费率</p>
                      <p className="text-xl font-bold text-red-600">$63万</p>
                    </div>
                  </div>
                  <p className="text-center text-gray-600 mt-4 text-sm">
                    看似微小的费用差异，30年后造成高达<span className="font-semibold text-red-600">36万</span>的财富差距！
                  </p>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">专家建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">低成本优先</p>
                    <p className="text-gray-600 text-sm">费用是长期回报的最大杀手。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">分散投资</p>
                    <p className="text-gray-600 text-sm">不要把所有鸡蛋放在一个篮子里。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">长期持有</p>
                    <p className="text-gray-600 text-sm">时间在市场中比择时更重要。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">考虑通胀</p>
                    <p className="text-gray-600 text-sm">实际回报（扣除通胀）才是真正收益。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 什么是合理的投资回报预期？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 历史来看：股票约8-10%（经通胀调整后约5-7%），债券约3-5%。应基于您的风险承受能力和投资期限设定现实预期。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 60/40组合还合理吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 60股票/40债券仍是经典组合，但现代版本可能更激进（如100减去年龄的股票比例）。关键是匹配您的风险承受度。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 应该选单一指数基金还是多个？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 最简单：全市场指数基金（如VTI）覆盖美国所有股票。更分散：加上国际股票（VXUS）和债券（BND）。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 税收如何影响投资选择？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 税收优惠账户优先使用（401k、IRA、529）。税务账户中，长期资本利得税（15-20%）低于短期（普通税率）。应税债券利息按普通税率征收。</p>
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
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Make Informed Investment Decisions</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Should you invest in stocks, bonds, real estate, or savings?
                      <strong> This calculator helps compare up to 3 investment scenarios</strong> side-by-side.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Historical Returns by Asset Class</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">S&P 500</p>
                    <p className="text-2xl font-bold text-green-600">~10%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Small Caps</p>
                    <p className="text-2xl font-bold text-green-600">~12%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Int'l Stocks</p>
                    <p className="text-2xl font-bold text-green-600">~8-9%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Bonds</p>
                    <p className="text-2xl font-bold text-blue-600">~4-5%</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Expert Tips</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Low Fees Win</p>
                    <p className="text-gray-600 text-sm">Fees compound negatively over time.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Diversify</p>
                    <p className="text-gray-600 text-sm">Don't put all eggs in one basket.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">Time in Market</p>
                    <p className="text-gray-600 text-sm">Outperforms timing the market.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">Adjust for Inflation</p>
                    <p className="text-gray-600 text-sm">Real returns matter most.</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What are realistic return expectations?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Stocks: 8-10% (5-7% real after inflation). Bonds: 3-5%. Adjust based on your risk tolerance and time horizon.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: How do fees impact returns?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Small fee differences compound dramatically. 1-2% annual fee can cost $100K+ over 30 years on a $100K investment.</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="investment-comparison" />
      </div>
    </div>
  );
}
