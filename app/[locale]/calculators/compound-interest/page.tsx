import {getTranslations, setRequestLocale} from 'next-intl/server';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// 动态导入计算器组件，显示骨架屏
const CompoundInterestCalculator = dynamic(
  () => import('@/components/calculators/CompoundInterestCalculator'),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-96 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-200 rounded-lg h-32"></div>
          <div className="bg-gray-200 rounded-lg h-32"></div>
          <div className="bg-gray-200 rounded-lg h-32"></div>
        </div>
      </div>
    ),
  }
);

export default async function CompoundInterestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.compound');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <CompoundInterestCalculator />
        
{locale === 'zh' ? (
          <div className="mt-16 space-y-12">
            {/* 什么是复利 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">什么是复利？</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    复利（Compound Interest）被爱因斯坦称为"世界第八大奇迹"。它的核心原理是：
                    <strong>不仅本金产生利息，已经产生的利息也会在下一个周期产生新的利息</strong>。
                    这种"利滚利"的效应，随着时间的推移，会让财富呈现指数级增长。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    与单利相比，复利能够让你的钱以加速的方式增长。这就是为什么理财专家常说："复利是世界上最重要的数学发现之一。"
                  </p>
                </div>
              </div>
            </section>

            {/* 复利计算公式 */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">复利计算公式</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-2xl font-mono text-center text-primary-600 font-bold">
                  A = P(1 + r/n)^(nt)
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-2">P = 本金 (Principal)</p>
                  <p className="text-gray-600 text-sm">您最初的投资金额</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-2">r = 年利率 (Rate)</p>
                  <p className="text-gray-600 text-sm">年化收益率（小数形式，如8% = 0.08）</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-2">n = 复利频率 (Number)</p>
                  <p className="text-gray-600 text-sm">每年复利次数（月复利n=12，日复利n=365）</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-2">t = 时间 (Time)</p>
                  <p className="text-gray-600 text-sm">投资年限</p>
                </div>
              </div>
            </section>

            {/* 分步使用指南 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">如何使用此计算器 - 分步指南</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">初始投资 (Initial Investment)</p>
                    <p className="text-gray-600 text-sm">输入您现在的本金金额。这笔钱的来源可以是储蓄、奖金或任何可用资金。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">每月投入 (Monthly Contribution)</p>
                    <p className="text-gray-600 text-sm">输入您计划每月追加投资的金额。定投是积累财富的有效方式，建议根据个人能力设定。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">年利率 (Annual Return)</p>
                    <p className="text-gray-600 text-sm">输入预期的年化收益率。参考：银行储蓄约2-3%，债券约4-6%，股票指数基金长期平均约7-10%。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">投资年限 (Investment Period)</p>
                    <p className="text-gray-600 text-sm">输入您计划投资的时间长度。建议至少5-10年，让复利效应充分显现。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">5</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">点击"计算"查看结果</p>
                    <p className="text-gray-600 text-sm">系统将生成详细的结果报告，包括增长曲线图、收益明细和关键数据。</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 实际案例 */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">实际案例分析</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-gray-700 mb-4"><strong>假设条件：</strong>25岁开始，每月投资2000元，年化收益率8%</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">10年后</p>
                    <p className="text-xl font-bold text-gray-900">~36万</p>
                    <p className="text-xs text-gray-400">本金24万 + 利息12万</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">20年后</p>
                    <p className="text-xl font-bold text-gray-900">~118万</p>
                    <p className="text-xs text-gray-400">本金48万 + 利息70万</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">30年后</p>
                    <p className="text-xl font-bold text-gray-900">~298万</p>
                    <p className="text-xs text-gray-400">本金72万 + 利息226万</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                <strong>关键洞察：</strong>随着时间推移，利息收益逐渐超过本金投入。到第30年，利息部分占总收益的76%！
              </p>
            </section>

            {/* 专家提示 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">专家理财提示</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-amber-800 mb-1">💡 尽早开始</p>
                  <p className="text-gray-600 text-sm">越早开始投资，复利效应越明显。晚10年开始，可能需要多投入2倍的资金才能达到相同目标。</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-blue-800 mb-1">💡 坚持定投</p>
                  <p className="text-gray-600 text-sm">每月固定金额投资，无论市场涨跌。定投可以平滑成本，降低择时风险。</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-800 mb-1">💡 不要轻易赎回</p>
                  <p className="text-gray-600 text-sm">长期持有是复利发挥作用的关键。频繁买卖会中断复利增长，降低收益。</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-purple-800 mb-1">💡 分散投资</p>
                  <p className="text-gray-600 text-sm">不要把鸡蛋放在一个篮子里。股票、债券、基金合理配置，降低整体风险。</p>
                </div>
              </div>
            </section>

            {/* 常见问题 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 复利频率对收益影响大吗？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 有影响但差异不大。复利频率越高，最终收益越高。例如：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>年复利（n=1）：10年后约$21,589</li>
                      <li>月复利（n=12）：10年后约$22,080</li>
                      <li>日复利（n=365）：10年后约$22,133</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">差异约2.5%，对于长期投资影响有限，选择方便的方式即可。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 多少年化收益率是合理的？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 不同投资品种的风险和收益不同：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>货币基金/储蓄：2%-4%（低风险）</li>
                      <li>债券基金：4%-6%（中低风险）</li>
                      <li>股票指数基金：7%-10%（高风险，长期平均）</li>
                      <li>个股投资：可能更高或更低，波动更大</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">高收益通常伴随高风险，请根据自身风险承受能力选择。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 需要多少钱才能开始复利投资？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 复利投资没有最低门槛。关键是：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>即使每月只投资$100，长期也能积累可观财富</li>
                      <li>关键是尽早开始和长期坚持</li>
                      <li>许多券商支持零门槛开户和定投</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">复利的秘密在于时间，不是本金规模。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 通货膨胀会影响复利收益吗？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 会。名义收益率需要减去通货膨胀率才是实际收益。</p>
                    <p className="mt-2">例如：</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>名义收益率：8%</li>
                      <li>通货膨胀率：3%</li>
                      <li>实际收益率：约5%</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">选择投资收益时，考虑"实际购买力增长"而非只看表面数字。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 复利计算器和复利定投有什么区别？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 主要区别在于是否考虑定期追加投资：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>普通复利计算</strong>：只考虑初始本金一次性投入</li>
                      <li><strong>复利定投计算</strong>：考虑每月追加投资，更接近真实投资场景</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">我们的计算器支持两种模式，可以更准确地模拟您的投资计划。</p>
                  </div>
                </details>
              </div>
            </section>

            {/* 相关工具 */}
            <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">相关计算器</h3>
              <p className="text-gray-600 mb-4">探索更多理财工具，全面规划您的财务未来</p>
            </section>
          </div>
        ) : (
          <div className="mt-16 space-y-12">
            {/* What is Compound Interest */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Compound Interest?</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Compound interest is the interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods. Albert Einstein reportedly called it "the eighth wonder of the world."
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Unlike simple interest where you only earn interest on your principal, compound interest allows your money to grow at an accelerating rate over time.
                  </p>
                </div>
              </div>
            </section>

            {/* Formula */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">The Compound Interest Formula</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-2xl font-mono text-center text-primary-600 font-bold">
                  A = P(1 + r/n)^(nt)
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-1">P = Principal</p>
                  <p className="text-gray-500 text-sm">Your initial investment</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-1">r = Annual Rate</p>
                  <p className="text-gray-500 text-sm">Expected return (decimal)</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-1">n = Frequency</p>
                  <p className="text-gray-500 text-sm">Times compounded per year</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-1">t = Time</p>
                  <p className="text-gray-500 text-sm">Years invested</p>
                </div>
              </div>
            </section>

            {/* Step by Step Guide */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">How to Use This Calculator - Step by Step</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Initial Investment</p>
                    <p className="text-gray-600 text-sm">Enter the amount of money you have available to invest now.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Monthly Contribution</p>
                    <p className="text-gray-600 text-sm">Amount you plan to add to your investment each month through regular investing.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Annual Return Rate</p>
                    <p className="text-gray-600 text-sm">Your estimated annual return. Stock market historically averages 7-10%.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Investment Period</p>
                    <p className="text-gray-600 text-sm">How long you plan to let your money grow. Minimum 5-10 years recommended.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">5</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Click "Calculate"</p>
                    <p className="text-gray-600 text-sm">View detailed results including growth chart and investment breakdown.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real Life Example */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Life Example</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-gray-700 mb-4"><strong>Scenario:</strong> Start at age 25, invest $500/month, 8% annual return</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">After 10 years</p>
                    <p className="text-xl font-bold text-gray-900">~$91,000</p>
                    <p className="text-xs text-gray-400">Contributions: $60,000</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">After 20 years</p>
                    <p className="text-xl font-bold text-gray-900">~$298,000</p>
                    <p className="text-xs text-gray-400">Contributions: $120,000</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">After 30 years</p>
                    <p className="text-xl font-bold text-gray-900">~$750,000</p>
                    <p className="text-xs text-gray-400">Contributions: $180,000</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                <strong>Key Insight:</strong> By year 30, your interest earnings ($570,000+) far exceed your total contributions ($180,000)!
              </p>
            </section>

            {/* Expert Tips */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Expert Financial Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-amber-800 mb-1">Start Early</p>
                  <p className="text-gray-600 text-sm">The earlier you start, the more time compound interest has to work. A 10-year delay can double the required contribution.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-blue-800 mb-1">Consistent Investing</p>
                  <p className="text-gray-600 text-sm">Regular monthly contributions, regardless of market conditions, help smooth out volatility and build wealth over time.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-800 mb-1">Stay Invested</p>
                  <p className="text-gray-600 text-sm">Time in the market beats timing the market. Don't interrupt the compounding process by frequent buying and selling.</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-purple-800 mb-1">Diversify</p>
                  <p className="text-gray-600 text-sm">Spread investments across different asset classes to reduce risk while maintaining growth potential.</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: Does compounding frequency matter?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Yes, but the difference is small for long-term investing:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Annual compounding (n=1): ~$21,589 after 10 years</li>
                      <li>Monthly compounding (n=12): ~$22,080 after 10 years</li>
                      <li>Daily compounding (n=365): ~$22,133 after 10 years</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">The difference is about 2.5% - choose the frequency that works best for your situation.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: What is a realistic expected return?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Different investments have different risk-return profiles:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Savings accounts: 2%-4% (low risk)</li>
                      <li>Bond funds: 4%-6% (low-medium risk)</li>
                      <li>Stock index funds: 7-10% long-term average (higher risk)</li>
                      <li>Individual stocks: Variable, higher volatility</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">Higher returns typically come with higher risk. Choose based on your risk tolerance.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: How much money do I need to start?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> There is no minimum to start benefiting from compound interest:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Even $100/month can grow significantly over time</li>
                      <li>Starting early matters more than starting big</li>
                      <li>Many brokerages offer zero-minimum accounts</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">The magic of compound interest is about time, not the size of your initial investment.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: Does inflation affect compound interest returns?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Yes. You need to subtract inflation from your nominal return to get the real return.</p>
                    <p className="mt-2">Example:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Nominal return: 8%</li>
                      <li>Inflation rate: 3%</li>
                      <li>Real return: approximately 5%</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">Consider "real purchasing power growth" rather than just the nominal numbers.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: What's the difference between simple and compound interest?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> The key difference is how interest is calculated:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>Simple Interest:</strong> Interest calculated only on principal. You earn the same amount each year.</li>
                      <li><strong>Compound Interest:</strong> Interest calculated on principal + accumulated interest. Growth accelerates over time.</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">Over long periods, compound interest can significantly outperform simple interest.</p>
                  </div>
                </details>
              </div>
            </section>
          </div>
        )}

        <RelatedCalculators currentCalculator="compound-interest" />
      </div>
    </div>
  );
}
