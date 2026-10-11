import { getTranslations, setRequestLocale } from 'next-intl/server';
import DebtPayoffCalculator from '@/components/calculators/DebtPayoffCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Debt Payoff Calculator - Become Debt Free Faster | WealthEase',
      description: 'Free debt payoff calculator to create your personalized debt elimination plan. Compare avalanche vs snowball methods and see how extra payments can save you thousands.',
      keywords: 'debt payoff calculator, debt snowball calculator, debt avalanche calculator, debt elimination, become debt free, loan payoff calculator',
    },
    zh: {
      title: '债务还清计算器 - 更快摆脱债务 | WealthEase',
      description: '免费债务还清计算器，帮助您创建个性化债务消除计划。比较雪崩法和雪球法，了解额外还款如何为您节省数千元。',
      keywords: '债务还清计算器, 债务雪球计算器, 债务雪崩计算器, 债务消除, 摆脱债务, 贷款还清计算器',
    },
  };

  const lang = locale as 'en' | 'zh';

  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      locale: locale,
      siteName: 'WealthEase',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/calculators/debt-payoff`,
      languages: {
        'en': `${baseUrl}/en/calculators/debt-payoff`,
        'zh': `${baseUrl}/zh/calculators/debt-payoff`,
      },
    },
  };
}

export default async function DebtPayoffPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.debtPayoff');

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

        <DebtPayoffCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              {/* 债务还清指南 */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">债务还清指南：如何更快实现无债一身轻？</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      摆脱债务是理财自由的第一步。本计算器不仅能帮您算出何时能还清债务，
                      还能对比不同的还款策略，看看它们能为您节省多少利息。
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      无论您是面对信用卡债务、助学贷款还是其他贷款，这个工具都能帮您制定最优还款计划。
                    </p>
                  </div>
                </div>
              </section>

              {/* 两大策略 */}
              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">两大核心还款策略对比</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">🏔️</span>
                      <p className="font-bold text-red-600">雪崩法 (Avalanche)</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      <strong>优先偿还利率最高的债务</strong>（如高息信用卡）
                    </p>
                    <ul className="text-gray-500 text-sm space-y-2">
                      <li>✓ 从数学上讲是最优策略</li>
                      <li>✓ 最大程度减少利息支出</li>
                      <li>✓ 最快速度摆脱债务</li>
                      <li>✗ 初期可能缺乏成就感</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">⛄</span>
                      <p className="font-bold text-blue-600">雪球法 (Snowball)</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      <strong>优先偿还余额最小的债务</strong>
                    </p>
                    <ul className="text-gray-500 text-sm space-y-2">
                      <li>✓ 快速消灭小额债务有成就感</li>
                      <li>✓ 心理上更容易坚持</li>
                      <li>✓ 增强还债信心</li>
                      <li>✗ 总利息支出可能稍多</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="text-amber-800 text-sm"><strong>选择建议：</strong>如果您需要心理激励，选择雪球法；如果您想最小化成本，选择雪崩法。</p>
                </div>
              </section>

              {/* 分步指南 */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">如何使用债务还清计算器</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">列出所有债务</p>
                      <p className="text-gray-600 text-sm">点击"添加债务"，输入每笔贷款的当前余额、年利率和最低月还款额。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">输入额外还款</p>
                      <p className="text-gray-600 text-sm">如果您每月能省下几百元用于额外还债，在"额外月还款"中填入。您会惊讶地发现这能把还款期缩短数年！</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">选择还款策略</p>
                      <p className="text-gray-600 text-sm">切换"雪崩法"与"雪球法"，观察总利息和还款时间的变化。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">4</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">执行并坚持</p>
                      <p className="text-gray-600 text-sm">根据计算结果制定还款计划，坚持执行直到无债一身轻！</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 案例 */}
              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">实际案例分析</h3>
                <div className="bg-white rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4"><strong>案例：</strong>三笔债务，每月可用额外还款$200</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-left">债务类型</th>
                          <th className="p-3 text-left">余额</th>
                          <th className="p-3 text-left">利率</th>
                          <th className="p-3 text-left">最低还款</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3">信用卡A</td>
                          <td className="p-3">$5,000</td>
                          <td className="p-3 text-red-600">22.99%</td>
                          <td className="p-3">$150</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3">信用卡B</td>
                          <td className="p-3">$3,000</td>
                          <td className="p-3 text-orange-600">18.99%</td>
                          <td className="p-3">$90</td>
                        </tr>
                        <tr>
                          <td className="p-3">分期贷款</td>
                          <td className="p-3">$2,000</td>
                          <td className="p-3 text-yellow-600">12.99%</td>
                          <td className="p-3">$67</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="font-bold text-red-800 mb-2">雪崩法（推荐）</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 优先还信用卡A</li>
                      <li>• 总利息：$2,847</li>
                      <li>• 预计还清：14个月</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-bold text-blue-800 mb-2">雪球法（心理激励）</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 优先还分期贷款</li>
                      <li>• 总利息：$3,124</li>
                      <li>• 预计还清：16个月</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 实用建议 */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">加速还债的实用建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">💡 暂停不必要开支</p>
                    <p className="text-gray-600 text-sm">暂时取消订阅服务、减少外出就餐，将省下的钱全部投入到"额外还款"中。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">💡 考虑债务重组</p>
                    <p className="text-gray-600 text-sm">如果您的信用卡利率高达20%，考虑申请一笔利率较低（如8%-10%）的个人贷款一次性置换。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">💡 不要只还最低额</p>
                    <p className="text-gray-600 text-sm">只还最低还款额通常会导致您支付巨额利息且需数十年才能还清。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">💡 利用意外之财</p>
                    <p className="text-gray-600 text-sm">将退税、奖金或红包等一次性收入用于提前还款，能大幅缩短还款时间。</p>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 雪崩法和雪球法哪个更好？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong></p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>数学角度：</strong>雪崩法更优，总利息支出更少</li>
                        <li><strong>心理角度：</strong>雪球法更有成就感，更容易坚持</li>
                        <li>如果您的利率差异大（&gt;5%），建议用雪崩法</li>
                        <li>如果您需要心理激励，选择雪球法</li>
                      </ul>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 额外还款$100能有多大影响？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 影响可能超乎您的想象！以$10,000债务、18%利率为例：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>仅还最低额（约$228/月）：需6年多还清，总利息约$6,600</li>
                        <li>每月多还$100：约2.5年还清，总利息约$2,400</li>
                        <li><strong>节省利息：$4,200！节省时间：3.5年！</strong></li>
                      </ul>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 债务合并贷款值得申请吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 债务合并可能适合您的情况：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>高息债务（信用卡18%+）可以合并到10%以下的贷款</li>
                        <li>多笔债务合并为一笔，方便管理</li>
                        <li>固定利率避免利率上涨风险</li>
                      </ul>
                      <p className="mt-2">但需注意：合并贷款可能延长总还款期限，务必计算总成本。</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 还清债务后应该做什么？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 还清债务后：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>建立应急基金（3-6个月生活费）</li>
                        <li>开始定期储蓄和投资</li>
                        <li>保持良好信用记录</li>
                        <li>避免再次陷入债务</li>
                      </ul>
                      <p className="mt-2">将原来用于还债的款项转为储蓄，开始积累财富！</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 信用评分会因还清债务下降吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 总体来说，还清债务对信用评分是有益的：</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>降低债务利用率通常会提高评分</li>
                        <li>按时还款记录保持良好信用历史</li>
                        <li>但关闭已还清的信用卡可能短期内降低评分（因为信用历史长度和利用率）</li>
                      </ul>
                      <p className="mt-2">建议保留零余额的信用卡（偶尔使用并按时还款）。</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Debt Payoff Guide */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Debt Payoff Guide: Become Debt-Free Faster</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Getting out of debt is the first step toward financial freedom.
                      This calculator helps you forecast your debt-free date and compares strategies.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Whether you're dealing with credit cards, student loans, or other debt, this tool helps create your optimal payoff plan.
                    </p>
                  </div>
                </div>
              </section>

              {/* Two Methods */}
              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Two Popular Payoff Strategies</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6">
                    <p className="font-bold text-red-600 mb-3">Avalanche Method</p>
                    <p className="text-gray-600 text-sm mb-3">Pay off <strong>highest interest debt first</strong></p>
                    <ul className="text-gray-500 text-sm space-y-2">
                      <li>✓ Mathematically optimal</li>
                      <li>✓ Minimizes total interest</li>
                      <li>✓ Fastest way to be debt-free</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <p className="font-bold text-blue-600 mb-3">Snowball Method</p>
                    <p className="text-gray-600 text-sm mb-3">Pay off <strong>smallest balance first</strong></p>
                    <ul className="text-gray-500 text-sm space-y-2">
                      <li>✓ Quick wins build motivation</li>
                      <li>✓ Psychologically easier to stick with</li>
                      <li>✓ Builds momentum</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How to Use */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">How to Use This Calculator</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">List Your Debts</p>
                      <p className="text-gray-600 text-sm">Add all loans with balance, APR, and minimum payment.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Add Extra Payments</p>
                      <p className="text-gray-600 text-sm">Enter extra monthly amount. Even $50-$100 can shave years off!</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Choose Strategy</p>
                      <p className="text-gray-600 text-sm">Toggle between Avalanche and Snowball to see the difference.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Example */}
              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example: $10,000 in Credit Card Debt</h3>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="font-bold text-red-800 mb-2">Avalanche (Recommended)</p>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Pay highest rate first</li>
                        <li>• Total interest: ~$2,847</li>
                        <li>• Debt-free: ~14 months</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-bold text-blue-800 mb-2">Snowball (Motivation)</p>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Pay smallest balance first</li>
                        <li>• Total interest: ~$3,124</li>
                        <li>• Debt-free: ~16 months</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tips */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tips to Speed Up Repayment</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Stop New Debt</p>
                    <p className="text-gray-600 text-sm">Put cards away. Don't add to the pile while paying it off.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Debt Consolidation</p>
                    <p className="text-gray-600 text-sm">Consider a lower-rate personal loan to pay off high-interest credit cards.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">Use Windfalls</p>
                    <p className="text-gray-600 text-sm">Apply tax refunds and bonuses to principal payments.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">Cut Expenses</p>
                    <p className="text-gray-600 text-sm">Temporarily reduce subscriptions and dining out.</p>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Which method should I choose?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Avalanche saves more money; Snowball provides psychological wins. Choose based on your needs.</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Does paying more really help that much?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Yes! Even $100/month extra on $10,000 at 18% can save $4,200+ and cut years off your payoff time.</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Should I consolidate my debts?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> If you can get a lower rate (e.g., 10% vs 20%), consolidation can save money. Just don't extend the term too much.</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What after becoming debt-free?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Build an emergency fund (3-6 months), start investing, and maintain good credit habits.</p>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Will paying off debt hurt my credit?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Generally no. Lower debt utilization usually helps your score. Just don't close all your cards at once.</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="debt-payoff" />
      </div>
    </div>
  );
}
