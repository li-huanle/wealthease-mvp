import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const RentVsBuyCalculator = dynamic(
  () => import('@/components/calculators/RentVsBuyCalculator'),
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
  const t = await getTranslations('calculator.rentVsBuy');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/rent-vs-buy`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/rent-vs-buy`,
        'zh': `${baseUrl}/zh/calculators/rent-vs-buy`,
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

export default async function RentVsBuyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rent vs Buy Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Compare the long-term financial costs of renting versus buying a home
          </p>
        </div>

        <RentVsBuyCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏘️</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">租房 vs 买房：您的人生重要决策</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      租房还是买房是大多数人一生中最重要的财务决策之一。
                      虽然买房被视为"美国梦"的一部分，但并非所有人都适合买房。
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      这个计算器帮助您全面比较租房和买房的真实成本。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">买房的真实成本</h3>
                <p className="text-gray-600 mb-4">买房不仅仅是月供，还有许多隐藏成本：</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">🏛️ 房产税</p>
                    <p className="text-gray-600 text-sm">房价的1-2%/年，不同地区差异大。</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">🛡️ 房屋保险</p>
                    <p className="text-gray-600 text-sm">$1,000-3,000+/年，视地区和覆盖范围而定。</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">🔧 维护保养</p>
                    <p className="text-gray-600 text-sm">房价的1%/年，紧急维修可能更贵。</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">🏢 HOA费</p>
                    <p className="text-gray-600 text-sm">$100-500+/月，公寓和社区普遍存在。</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">📋 过户费用</p>
                    <p className="text-gray-600 text-sm">购房价的2-5%，一次性支付。</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">💵 卖房成本</p>
                    <p className="text-gray-600 text-sm">约售价的6%给中介。</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">租房的优势</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">🔄 灵活性</p>
                    <p className="text-gray-600 text-sm">随时可以搬迁抓住职业机会。</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">📊 可预测成本</p>
                    <p className="text-gray-600 text-sm">没有意外的维修账单。</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">💰 投资资本</p>
                    <p className="text-gray-600 text-sm">首付资金可投资其他地方。</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">💸 月成本更低</p>
                    <p className="text-gray-600 text-sm">在高价市场租房通常更便宜。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">5年法则：何时买房划算？</h3>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
                  <p className="text-amber-800">
                    <strong>财务专家普遍建议：</strong>计划在同一地点居住至少5年，买房才在财务上有意义。
                  </p>
                </div>
                <p className="text-gray-600 mb-4">原因包括：</p>
                <ul className="text-gray-600 space-y-2">
                  <li>• 高昂的前期成本（首付、过户费）需要时间分摊</li>
                  <li>• 卖房时需支付约6%的中介费</li>
                  <li>• 贷款初期大部分还款用于支付利息，而非积累房屋净值</li>
                </ul>
              </section>

              <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">盈亏平衡点</h3>
                <div className="bg-white rounded-xl p-6">
                  <p className="text-gray-600 mb-4">
                    盈亏平衡点是指：买房的累计成本等于租房的累计成本（包括机会成本）的时刻。
                    在这个时点之后，买房变得更加经济划算。
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-2">典型盈亏平衡时间</p>
                    <p className="text-2xl font-bold text-primary-600">3-5年</p>
                    <p className="text-xs text-gray-400">取决于当地市场情况</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">什么情况适合买房？</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">✓ 计划居住5年以上</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">✓ 有20%首付，避免PMI</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">✓ 房价租金比低于20</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">✓ 工作稳定，有应急储蓄</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">什么情况适合租房？</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">✓ 新到某地，职业不稳定</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">✓ 房价租金比高于20</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">✓ 首付资金可获得更高投资回报</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">✓ 看重灵活性，不想负责维修</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 房价租金比多少算合理？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 一般来说：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>低于15：买房通常更划算</li>
                        <li>15-20：需要详细计算</li>
                        <li>高于20：租房通常更划算</li>
                      </ul>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 买房的投资回报率是多少？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 买房的回报来自两个方面：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>房屋升值：年均3-5%（取决于地区）</li>
                        <li>强制储蓄：每月还款的一部分在偿还本金</li>
                      </ul>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 租房时房东涨租怎么办？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 租房时需要考虑：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>年度租金涨幅通常为3-5%</li>
                        <li>长期来看可能超过通胀</li>
                        <li>但您保留了首付资金的投资收益</li>
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
                    <span className="text-2xl">🏘️</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Rent vs Buy: Major Financial Decision</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      The decision to rent or buy a home is one of the most significant financial choices.
                      While homeownership is part of the American Dream, it's not right for everyone.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This calculator helps you compare the true costs of renting versus buying.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">True Cost of Homeownership</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Property Tax</p>
                    <p className="text-gray-600 text-sm">1-2% of home value/year</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Insurance</p>
                    <p className="text-gray-600 text-sm">$1,000-3,000+/year</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Maintenance</p>
                    <p className="text-gray-600 text-sm">~1% of home value/year</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">HOA Fees</p>
                    <p className="text-gray-600 text-sm">$100-500+/month</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Closing Costs</p>
                    <p className="text-gray-600 text-sm">2-5% of purchase price</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Selling Costs</p>
                    <p className="text-gray-600 text-sm">~6% when selling</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">The 5-Year Rule</h3>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
                  <p className="text-amber-800">
                    <strong>Financial experts recommend</strong> staying 5+ years for buying to make sense financially.
                  </p>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What's a good price-to-rent ratio?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Under 15: buy; 15-20: depends; Over 20: rent</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What about investment returns?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Home appreciation 3-5% + principal paydown = total return</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="rent-vs-buy" />
      </div>
    </div>
  );
}
