import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

const seo = {
  en: {
    title: "Retirement Calculator - How Much Do You Need to Retire? | WealthEase",
    description: "Free retirement calculator: estimate how much you need to retire, whether your savings are on track, and how much to save each month.",
    keywords: "retirement calculator, retirement savings, how much to retire, retirement planning, 401k projection",
  },
  zh: {
    title: "退休规划计算器 - 退休需要攒多少钱？ | WealthEase",
    description: "免费退休规划计算器：估算退休所需金额、当前储蓄是否达标，以及每月需要存多少。",
    keywords: "退休计算器, 退休储蓄, 退休需要多少钱, 退休规划, 养老金预测",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, '/calculators/retirement', seo);
}

export default async function RetirementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.retirement');

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

        <RetirementCalculator />

        {locale === 'zh' ? (
          <div className="mt-16 space-y-12">
            {/* 为什么退休规划重要 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏖️</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么退休规划如此重要？</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    退休规划是确保您晚年生活质量的关键。随着人均寿命的延长和医疗成本的增加，
                    <strong>仅靠社会养老金往往难以维持理想的生活水平</strong>。尽早开始规划，利用时间的复利效应，是实现财务自由的最佳途径。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    越早开始，您需要承担的经济压力就越小。25岁开始每月定投2000元，可能比40岁开始每月定投8000元更能积累到理想的退休资金。
                  </p>
                </div>
              </div>
            </section>

            {/* 4%法则 */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 4% 退休法则</h3>
              <div className="bg-white rounded-xl p-6">
                <p className="text-gray-600 mb-4">
                  理财界著名的<strong>"4%法则"</strong>认为：如果您每年从退休储蓄中提取不超过4%的资金，
                  那么您的积蓄理论上可以维持<strong>30年以上</strong>而不会耗尽。
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-600">25倍</p>
                    <p className="text-sm text-gray-500">所需退休储蓄</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-600">4%</p>
                    <p className="text-sm text-gray-500">安全提取率</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-600">30+年</p>
                    <p className="text-sm text-gray-500">资金可持续时间</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  例如：若您希望退休后每月花费1万元，一年共12万元，则需要准备约300万元（12万 × 25倍）的退休储蓄。
                </p>
              </div>
            </section>

            {/* 分步使用指南 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">如何使用此计算器 - 分步指南</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">当前年龄 & 退休年龄</p>
                      <p className="text-gray-600 text-sm">定义您的工作年限和退休时间点。通常退休年龄在60-67岁之间。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">当前储蓄</p>
                      <p className="text-gray-600 text-sm">包括养老金账户、社保个人账户、商业保险现金价值等所有可用于退休的资金。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">每月储蓄</p>
                      <p className="text-gray-600 text-sm">您计划每月为退休存入的金额。建议至少存入收入的10%-15%。</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">预期年化收益率</p>
                      <p className="text-gray-600 text-sm">股票基金约7%-10%，债券基金约4%-6%，保守组合约5%-7%。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">5</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">退休后每月支出</p>
                      <p className="text-gray-600 text-sm">估算退休后每月需要多少生活费（按当前物价水平计算）。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">6</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">预期寿命</p>
                      <p className="text-gray-600 text-sm">用于测算储蓄是否足够覆盖您的一生。通常按85-90岁规划。</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 实际案例 */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">实际案例分析</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-gray-700 mb-4"><strong>案例：</strong>李先生，30岁，计划60岁退休，当前储蓄20万，每月可存5000元</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left">退休年龄</th>
                        <th className="p-3 text-left">总投入</th>
                        <th className="p-3 text-left">预期储蓄</th>
                        <th className="p-3 text-left">月可支配（4%法则）</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">60岁</td>
                        <td className="p-3">200万</td>
                        <td className="p-3 font-bold text-green-600">~560万</td>
                        <td className="p-3">~1.8万</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">55岁</td>
                        <td className="p-3">170万</td>
                        <td className="p-3 font-bold text-green-600">~380万</td>
                        <td className="p-3">~1.3万</td>
                      </tr>
                      <tr>
                        <td className="p-3">65岁</td>
                        <td className="p-3">230万</td>
                        <td className="p-3 font-bold text-green-600">~780万</td>
                        <td className="p-3">~2.6万</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                <strong>结论：</strong>退休年龄每推迟5年，月可支配收入显著增加。建议根据自身健康状况和工作能力灵活规划。
              </p>
            </section>

            {/* 实用提示 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">退休规划实用提示</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-amber-800 mb-1">💡 充分利用税收优惠</p>
                  <p className="text-gray-600 text-sm">在美国善用401(k)和IRA账户，在中国关注社保缴费基数和税延养老险，合理利用税收优惠最大化储蓄。</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-blue-800 mb-1">💡 考虑通胀因素</p>
                  <p className="text-gray-600 text-sm">今天100万的购买力，20年后可能只有50-60万。退休规划必须考虑年均3%左右的通胀率。</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-800 mb-1">💡 医疗支出预留</p>
                  <p className="text-gray-600 text-sm">医疗往往是退休后最大的支出项。建议预留专项医疗基金，或配置合适的医疗保险。</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-purple-800 mb-1">💡 动态调整策略</p>
                  <p className="text-gray-600 text-sm">每年审视一次退休计划，根据收入变化、市场环境和健康状况及时调整目标和策略。</p>
                </div>
              </div>
            </section>

            {/* 常见问题 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 我应该存多少钱用于退休？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 一般建议：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>收入替代率：退休后收入应为退休前的70%-80%</li>
                      <li>储蓄率：每月至少存入收入的10%-15%</li>
                      <li>雇主匹配：如果有401(k)匹配，至少存入能获得全额匹配的比例</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">具体数额还需根据您的目标退休生活方式调整。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 社保养老金能领多少？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 社保养老金计算复杂，主要取决于：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>缴费年限（越长越好）</li>
                      <li>缴费基数（与工资挂钩）</li>
                      <li>当地社会平均工资</li>
                      <li>退休时的政策规定</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">通常来说，社保只能提供基础保障，建议作为退休收入的组成部分而非全部。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 临近退休应该如何调整投资组合？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 建议采用"生命周期投资策略"：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>距离退休10年以上</strong>：股债比例可配置为70%/30%，追求增长</li>
                      <li><strong>距离退休5-10年</strong>：调整为50%/50%，平衡风险</li>
                      <li><strong>距离退休5年以内</strong>：股债比例降至30%/70%，保护收益</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">目标日期基金(Target Date Fund)可以自动完成这一调整。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 如果起步晚了怎么办？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 即使起步晚，也有策略可以弥补：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>提高储蓄率：将更多收入用于退休投资</li>
                      <li>延迟退休：多工作几年让复利继续发挥作用</li>
                      <li>降低退休生活预期：调整退休后的生活方式</li>
                      <li>考虑兼职或灵活工作：延长收入来源</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">关键是<strong>现在就开始</strong>，不要因为晚了就放弃。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 什么时候是最佳退休储蓄时机？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 答案很简单：<strong>越早越好</strong>。</p>
                    <p className="mt-2">25岁开始每月存1000元 vs 35岁开始每月存2000元：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>同样存到60岁，25岁开始最终积累更多</li>
                      <li>因为多出来的10年复利效应惊人</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">如果已经错过最佳时机，最好的策略就是<strong>从现在开始</strong>，并尽可能提高储蓄率。</p>
                  </div>
                </details>
              </div>
            </section>
          </div>
        ) : (
          <div className="mt-16 space-y-12">
            {/* Why Retirement Planning Matters */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏖️</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Retirement Planning Matters</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Retirement planning is essential because it determines your quality of life in your later years.
                    With increasing life expectancy and rising healthcare costs,
                    <strong> relying solely on Social Security is rarely enough</strong>.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The earlier you start, the more manageable your savings goals become, thanks to the power of compound interest.
                  </p>
                </div>
              </div>
            </section>

            {/* 4% Rule */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">The 4% Rule</h3>
              <div className="bg-white rounded-xl p-6">
                <p className="text-gray-600 mb-4">
                  The <strong>"4% Rule"</strong> suggests that if you withdraw 4% of your portfolio in the first year of retirement
                  and adjust for inflation thereafter, your savings should last for at least 30 years.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-600">25x</p>
                    <p className="text-sm text-gray-500">Needed Savings</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-600">4%</p>
                    <p className="text-sm text-gray-500">Safe Withdrawal Rate</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-600">30+ years</p>
                    <p className="text-sm text-gray-500">Portfolio Longevity</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Step by Step Guide */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">How to Use This Calculator - Step by Step</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Current & Retirement Age</p>
                      <p className="text-gray-600 text-sm">Define your working years and retirement timeline.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Current Savings</p>
                      <p className="text-gray-600 text-sm">Total saved in retirement accounts and investments.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Monthly Savings</p>
                      <p className="text-gray-600 text-sm">How much you can contribute each month.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Expected Annual Return</p>
                      <p className="text-gray-600 text-sm">Conservative estimate: 6-8% for diversified portfolio.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">5</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Monthly Expenses in Retirement</p>
                      <p className="text-gray-600 text-sm">Estimate your future budget in today's dollars.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">6</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Life Expectancy</p>
                      <p className="text-gray-600 text-sm">Plan for longevity (85-90 years typically).</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Real Life Example */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Life Example</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-gray-700 mb-4"><strong>Scenario:</strong> John, age 30, plans to retire at 65, current savings $50,000, monthly contribution $1,000</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left">Retirement Age</th>
                        <th className="p-3 text-left">Total Contributions</th>
                        <th className="p-3 text-left">Expected Savings</th>
                        <th className="p-3 text-left">Monthly (4% Rule)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">60 years old</td>
                        <td className="p-3">$400,000</td>
                        <td className="p-3 font-bold text-green-600">~$1.2M</td>
                        <td className="p-3">~$4,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">65 years old</td>
                        <td className="p-3">$460,000</td>
                        <td className="p-3 font-bold text-green-600">~$1.8M</td>
                        <td className="p-3">~$6,000</td>
                      </tr>
                      <tr>
                        <td className="p-3">67 years old</td>
                        <td className="p-3">$484,000</td>
                        <td className="p-3 font-bold text-green-600">~$2.2M</td>
                        <td className="p-3">~$7,300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                <strong>Key Insight:</strong> Delaying retirement by just 5 years can significantly increase your monthly income in retirement.
              </p>
            </section>

            {/* Practical Tips */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Expert Retirement Planning Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-amber-800 mb-1">Maximize Tax-Advantaged Accounts</p>
                  <p className="text-gray-600 text-sm">401(k), IRA, and similar accounts offer significant tax benefits. Never leave employer matching on the table.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-blue-800 mb-1">Account for Inflation</p>
                  <p className="text-gray-600 text-sm">Today's $1 million may buy only $550,000 worth of goods in 30 years at 3% inflation. Plan accordingly.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-800 mb-1">Healthcare Costs</p>
                  <p className="text-gray-600 text-sm">Healthcare is often the largest retirement expense. Budget accordingly and consider long-term care insurance.</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-purple-800 mb-1">Review Annually</p>
                  <p className="text-gray-600 text-sm">Life changes. Review and adjust your retirement plan at least once a year based on new circumstances.</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: How much should I save for retirement?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> General guidelines:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Income replacement: 70-80% of pre-retirement income</li>
                      <li>Savings rate: At least 10-15% of gross income</li>
                      <li>Employer match: Contribute at least enough to get full match</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">Use our calculator for personalized estimates based on your situation.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: How much will I get from Social Security?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Social Security benefits depend on:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Your earnings history and contribution record</li>
                      <li>The age at which you claim benefits (62-70)</li>
                      <li>Inflation adjustments (COLA)</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">Social Security typically replaces only about 40% of pre-retirement income for average earners.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: How should I adjust my portfolio as I near retirement?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Consider a lifecycle approach:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>10+ years away:</strong> 70/30 stocks/bonds for growth</li>
                      <li><strong>5-10 years away:</strong> 50/50 balance</li>
                      <li><strong>Within 5 years:</strong> 30/70 protect gains</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">Target Date Funds automatically adjust this ratio as you age.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: What if I started saving late?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Strategies to catch up:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Increase savings rate significantly</li>
                      <li>Consider working longer</li>
                      <li>Adjust retirement lifestyle expectations</li>
                      <li>Explore part-time work options</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">The key is to <strong>start now</strong> - don't compound your delay by waiting further.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: What is the best time to start saving?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> The answer is simple: <strong>as early as possible</strong>.</p>
                    <p className="mt-2">Starting at 25 vs. 35 makes a massive difference:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>10 extra years of compound growth</li>
                      <li>Significantly less monthly contribution needed</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">If you've already missed the early start, the next best time is <strong>now</strong>.</p>
                  </div>
                </details>
              </div>
            </section>
          </div>
        )}

        <RelatedCalculators currentCalculator="retirement" />
      </div>
    </div>
  );
}
