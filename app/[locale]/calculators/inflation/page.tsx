import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';
import { SITE_URL } from '@/lib/seo';

// Dynamic import for the calculator component
const InflationCalculator = dynamic(
  () => import('@/components/calculators/InflationCalculator'),
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
  const t = await getTranslations('calculator.inflation');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_URL;
  const canonicalUrl = `${baseUrl}/${locale}/calculators/inflation`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/inflation`,
        'zh': `${baseUrl}/zh/calculators/inflation`,
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

export default async function InflationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Inflation Calculator
          </h1>
          <p className="text-xl text-gray-600">
            See how inflation affects your purchasing power over time using historical CPI data
          </p>
        </div>

        <InflationCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              {/* 理解通胀 */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📉</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">理解通货膨胀：隐形的财富杀手</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      通货膨胀是指商品和服务价格随时间持续上涨，导致货币购买力下降的现象。
                      它是经济的常态，但也是<strong>隐形的财富杀手</strong>——如果您不善加应对，它会悄悄吞噬您的储蓄价值。
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      美国劳工统计局（BLS）自1913年开始追踪消费者价格指数（CPI），这是衡量通胀最广泛的指标。
                    </p>
                  </div>
                </div>
              </section>

              {/* 72法则 */}
              <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 复利与通胀：72法则</h3>
                <div className="bg-white rounded-xl p-6 mb-6">
                  <p className="text-gray-600 mb-4">
                    <strong>72法则</strong>告诉我们：在特定通胀率下，价格翻倍所需的年数约等于72除以通胀率。
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">3%通胀率</p>
                      <p className="text-2xl font-bold text-primary-600">24年</p>
                      <p className="text-xs text-gray-400">价格翻倍</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">5%通胀率</p>
                      <p className="text-2xl font-bold text-primary-600">14.4年</p>
                      <p className="text-xs text-gray-400">价格翻倍</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">8%通胀率</p>
                      <p className="text-2xl font-bold text-primary-600">9年</p>
                      <p className="text-xs text-gray-400">价格翻倍</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>启示：</strong>如果您计划30年后退休，按3%通胀率计算，您需要的资金可能是现在的2.4倍！
                </p>
              </section>

              {/* 分步指南 */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">如何使用通胀计算器</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">选择起始年份</p>
                        <p className="text-gray-600 text-sm">选择您想比较的起始年份（可追溯至1913年）。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">选择结束年份</p>
                        <p className="text-gray-600 text-sm">通常是当前年份，或您想预测的未来年份。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">输入金额</p>
                        <p className="text-gray-600 text-sm">输入您想调整的金额（现值或历史值）。</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">选择数据来源</p>
                        <p className="text-gray-600 text-sm">使用历史CPI数据或自定义通胀率。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">5</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">查看结果</p>
                        <p className="text-gray-600 text-sm">了解金额的购买力变化和总通胀率。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 实际案例 */}
              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">历史通胀案例</h3>
                <div className="bg-white rounded-xl p-6 mb-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-left">年份</th>
                          <th className="p-3 text-left">$1,000购买力</th>
                          <th className="p-3 text-left">年平均通胀</th>
                          <th className="p-3 text-left">备注</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3">1990年</td>
                          <td className="p-3 font-bold text-green-600">$2,200</td>
                          <td className="p-3">~2.5%</td>
                          <td className="p-3 text-gray-500">冷战结束</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3">2000年</td>
                          <td className="p-3 font-bold text-green-600">$1,800</td>
                          <td className="p-3">~2.5%</td>
                          <td className="p-3 text-gray-500">科技泡沫</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3">2010年</td>
                          <td className="p-3 font-bold text-green-600">$1,400</td>
                          <td className="p-3">~1.8%</td>
                          <td className="p-3 text-gray-500">金融危机后</td>
                        </tr>
                        <tr>
                          <td className="p-3">2024年</td>
                          <td className="p-3 font-bold text-primary-600">$1,000</td>
                          <td className="p-3">~3%</td>
                          <td className="p-3 text-gray-500">当前基准</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>说明：</strong>表格显示1990年的$1,000在2024年需要多少才能达到同等购买力。
                </p>
              </section>

              {/* 投资应对策略 */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">如何应对通胀保护财富</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">📈 投资股票</p>
                    <p className="text-gray-600 text-sm">历史上股票年均收益7-10%，扣除3%通胀后仍有4-7%的实际回报，是抵御通胀的有效工具。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">🏠 房产投资</p>
                    <p className="text-gray-600 text-sm">房产价值和租金通常随通胀上涨，同时可获得租金现金流。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">💵 TIPS（通胀保护债券）</p>
                    <p className="text-gray-600 text-sm">美国财政部发行的通胀保护债券，本金随CPI调整，收益稳定。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">💰 I债券</p>
                    <p className="text-gray-600 text-sm">美国政府发行的储蓄债券，利率包含固定部分和通胀调整部分。</p>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: CPI数据是如何计算的？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> CPI（消费者价格指数）追踪一篮子固定商品和服务的价格变化，包括：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>食品和饮料</li>
                        <li>住房成本</li>
                        <li>服装和交通运输</li>
                        <li>医疗保健和娱乐</li>
                      </ul>
                      <p className="mt-2">当CPI上涨，说明同等金额能买到的商品减少了，即通胀发生。</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 历史上最高的通胀是哪年？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 美国历史上通胀最高的时期：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>1918年：一战期间，约20%</li>
                        <li>1920年：战后通胀，约15%</li>
                        <li>1940年代初：二战期间，约9%</li>
                        <li>1970-1980年代：滞涨时期，峰值达14.8%（1980年）</li>
                      </ul>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 我的存款会被通胀吃掉多少？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 以3%历史平均通胀率计算：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>10年后：购买力下降约26%</li>
                        <li>20年后：购买力下降约54%</li>
                        <li>30年后：购买力下降约70%</li>
                      </ul>
                      <p className="mt-2">这意味着如果您把现金放在床垫下，30年后100万可能只值30万的购买力！</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 退休规划如何考虑通胀？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 退休规划必须考虑通胀：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>预计退休后每月开支时，按3%通胀率推算未来金额</li>
                        <li>退休储蓄目标应为预期年支出的25倍（4%法则）</li>
                        <li>考虑将部分资产配置到通胀保护投资</li>
                      </ul>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 社保COLA能跟上通胀吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 社安金包含生活成本调整（COLA），根据CPI自动调整。</p>
                      <p className="mt-2">但需要注意：</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>COLA基于上一年Q3的CPI计算</li>
                        <li>医疗通胀可能高于整体CPI</li>
                        <li>COLA不能完全匹配个人的实际通胀体验</li>
                      </ul>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Understanding Inflation */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📉</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Inflation: The Silent Wealth Killer</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Inflation is the rate at which prices for goods and services rise over time,
                      reducing purchasing power. It's a normal economic phenomenon but can silently erode your savings.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      The Consumer Price Index (CPI), tracked by the BLS since 1913, is the most widely used measure of inflation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Rule of 72 */}
              <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Rule of 72</h3>
                <div className="bg-white rounded-xl p-6 mb-6">
                  <p className="text-gray-600 mb-4">
                    The <strong>Rule of 72</strong> shows how long it takes for prices to double at a given inflation rate.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">3% inflation</p>
                      <p className="text-2xl font-bold text-primary-600">24 years</p>
                      <p className="text-xs text-gray-400">to double</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">5% inflation</p>
                      <p className="text-2xl font-bold text-primary-600">14.4 years</p>
                      <p className="text-xs text-gray-400">to double</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">8% inflation</p>
                      <p className="text-2xl font-bold text-primary-600">9 years</p>
                      <p className="text-xs text-gray-400">to double</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>Implication:</strong> At 3% inflation, you'll need 2.4x more money to maintain the same lifestyle 30 years from now.
                </p>
              </section>

              {/* How to Use */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">How to Use This Calculator</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Start Year</p>
                        <p className="text-gray-600 text-sm">Select historical start year (back to 1913).</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">End Year</p>
                        <p className="text-gray-600 text-sm">Usually current year or future projection.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Amount</p>
                        <p className="text-gray-600 text-sm">Enter the amount to adjust for inflation.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Data Source</p>
                        <p className="text-gray-600 text-sm">Use historical CPI or custom inflation rate.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">5</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">View Results</p>
                        <p className="text-gray-600 text-sm">See purchasing power changes and total inflation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Strategies */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">How to Protect Against Inflation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Invest in Stocks</p>
                    <p className="text-gray-600 text-sm">Historically 7-10% returns, 4-7% after inflation. Best hedge against inflation.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Real Estate</p>
                    <p className="text-gray-600 text-sm">Property values and rents typically rise with inflation.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">TIPS</p>
                    <p className="text-gray-600 text-sm">Treasury Inflation-Protected Securities adjust principal based on CPI.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">I Bonds</p>
                    <p className="text-gray-600 text-sm">Savings bonds with interest plus inflation adjustments.</p>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: How is CPI calculated?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> CPI tracks prices of a fixed basket of goods including food, housing, transportation, healthcare, and more.</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What was the highest inflation?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> US inflation peaked at 14.8% in 1980 during the "Great Inflation" era.</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: How much will my savings lose?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> At 3% average inflation: 10 years = 26% loss, 20 years = 54% loss, 30 years = 70% loss.</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: How to plan for retirement with inflation?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Plan for 25x annual expenses, adjust savings goals for inflation, and maintain inflation-protected investments.</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Does Social Security COLA keep up?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> COLA adjusts based on CPI, but may not match everyone's personal inflation experience, especially healthcare costs.</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="inflation" />
      </div>
    </div>
  );
}
