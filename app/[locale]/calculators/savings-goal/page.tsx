import { getTranslations, setRequestLocale } from 'next-intl/server';
import SavingsGoalCalculator from '@/components/calculators/SavingsGoalCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Savings Goal Calculator - Plan Your Financial Future | WealthEase',
      description: 'Free savings goal calculator to help you plan and reach your financial targets. Calculate how much to save monthly to achieve your savings goals with our easy-to-use tool.',
      keywords: 'savings goal calculator, financial planning calculator, savings planner, savings target, financial goals calculator, savings calculator',
    },
    zh: {
      title: '储蓄目标计算器 - 规划您的财务未来 | WealthEase',
      description: '免费储蓄目标计算器，帮助您规划和实现财务目标。使用我们易用的工具计算每月需要储蓄多少才能达成储蓄目标。',
      keywords: '储蓄目标计算器, 理财规划计算器, 储蓄规划, 储蓄目标, 财务目标计算器, 储蓄计算器',
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
      canonical: `${baseUrl}/${locale}/calculators/savings-goal`,
      languages: {
        'en': `${baseUrl}/en/calculators/savings-goal`,
        'zh': `${baseUrl}/zh/calculators/savings-goal`,
      },
    },
  };
}

export default async function SavingsGoalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.savingsGoal');

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

        <SavingsGoalCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">储蓄目标计算器：规划您的财务梦想</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      无论是买房首付、婚礼基金、退休储备还是梦想假期的旅费，
                      <strong>设定清晰的储蓄目标是实现梦想的第一步</strong>。
                      本计算器帮您将宏大的目标拆解为每月可执行的储蓄计划。
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      有了明确的储蓄目标和可行的时间表，存钱就不再是遥不可及的梦想。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">SMART目标法则</h3>
                <p className="text-gray-600 mb-4">制定有效的储蓄目标应遵循SMART原则：</p>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">S</p>
                    <p className="font-semibold text-gray-900 mb-1">具体</p>
                    <p className="text-gray-600 text-sm">明确金额和用途</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">M</p>
                    <p className="font-semibold text-gray-900 mb-1">可衡量</p>
                    <p className="text-gray-600 text-sm">有明确的数字</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">A</p>
                    <p className="font-semibold text-gray-900 mb-1">可实现</p>
                    <p className="text-gray-600 text-sm">符合收入能力</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">R</p>
                    <p className="font-semibold text-gray-900 mb-1">相关性</p>
                    <p className="text-gray-600 text-sm">对生活重要</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">T</p>
                    <p className="font-semibold text-gray-900 mb-1">有时限</p>
                    <p className="text-gray-600 text-sm">设定截止日期</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">使用步骤指南</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">输入目标金额</p>
                        <p className="text-gray-600 text-sm">您总共需要存多少钱？例如：30万首付、10万旅行基金。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">输入当前储蓄</p>
                        <p className="text-gray-600 text-sm">您现在手头已经有多少启动资金？</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">设定时间期限</p>
                        <p className="text-gray-600 text-sm">您希望在多长时间内达成目标？</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">选择投资方式</p>
                        <p className="text-gray-600 text-sm">保守型（货币基金2-3%）或积极型（基金5-8%）。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">5</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">查看分析结果</p>
                        <p className="text-gray-600 text-sm">了解每月需要存多少，何时达成目标。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">实战案例分析</h3>
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">案例</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">目标金额</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">期限</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">月存</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">达成时间</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3">案例1：买房首付</td>
                          <td className="px-4 py-3">¥300,000</td>
                          <td className="px-4 py-3">5年</td>
                          <td className="px-4 py-3 text-green-600">¥4,300</td>
                          <td className="px-4 py-3">5年</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">案例2：新车基金</td>
                          <td className="px-4 py-3">¥200,000</td>
                          <td className="px-4 py-3">3年</td>
                          <td className="px-4 py-3 text-green-600">¥5,100</td>
                          <td className="px-4 py-3">3年</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">案例3：旅行基金</td>
                          <td className="px-4 py-3">¥50,000</td>
                          <td className="px-4 py-3">2年</td>
                          <td className="px-4 py-3 text-green-600">¥1,950</td>
                          <td className="px-4 py-3">2年</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">专家建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">先储蓄后消费</p>
                    <p className="text-gray-600 text-sm">工资到账当天就转账到储蓄账户，养成习惯。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">使用高息账户</p>
                    <p className="text-gray-600 text-sm">选择年化2-3%的货币基金或储蓄产品。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">积少成多</p>
                    <p className="text-gray-600 text-sm">每天省30元，一年多存1万多。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">定期检视调整</p>
                    <p className="text-gray-600 text-sm">每季度检查进度，调整储蓄计划。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 每月存多少钱合适？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 一般建议将收入的10-20%用于储蓄。具体比例取决于您的收入水平、固定支出和目标紧急程度。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 存不下钱怎么办？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 试试以下方法：1）记账了解消费习惯；2）先储蓄后消费；3）从小额开始养成习惯；4）设置自动转账。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 应该追求高收益投资吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 短期目标（1-2年）建议保守型产品；长期目标（5年以上）可适当配置基金等理财产品。风险与收益成正比。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 目标设定后可以调整吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 当然可以！生活情况会变化，定期检视并调整目标是明智的做法。使用计算器重新计算即可。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 紧急情况需要动用储蓄怎么办？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 建议建立3-6个月的应急基金单独存放。如需动用非紧急储蓄，事后应尽快补足并调整目标计划。</p>
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
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Savings Goal Calculator: Plan Your Financial Dreams</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Whether it's a down payment for a home, a wedding fund, retirement savings, or a dream vacation,
                      <strong> setting a clear savings goal is the first step to making it a reality</strong>.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      With a clear goal and achievable timeline, saving becomes manageable.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">SMART Goal Framework</h3>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">S</p>
                    <p className="font-semibold text-gray-900 mb-1">Specific</p>
                    <p className="text-gray-600 text-sm">Be clear on amount</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">M</p>
                    <p className="font-semibold text-gray-900 mb-1">Measurable</p>
                    <p className="text-gray-600 text-sm">Use exact numbers</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">A</p>
                    <p className="font-semibold text-gray-900 mb-1">Achievable</p>
                    <p className="text-gray-600 text-sm">Match your income</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">R</p>
                    <p className="font-semibold text-gray-900 mb-1">Relevant</p>
                    <p className="text-gray-600 text-sm">Matters to you</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">T</p>
                    <p className="font-semibold text-gray-900 mb-1">Time-bound</p>
                    <p className="text-gray-600 text-sm">Set a deadline</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Expert Tips</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Pay Yourself First</p>
                    <p className="text-gray-600 text-sm">Transfer on payday before spending anything.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Use High-Yield Accounts</p>
                    <p className="text-gray-600 text-sm">Earn 2-3% with HYSA or money market funds.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">Micro-Habits Count</p>
                    <p className="text-gray-600 text-sm">Saving $10/day = $3,650/year.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">Review Quarterly</p>
                    <p className="text-gray-600 text-sm">Check progress and adjust as needed.</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: How much should I save monthly?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> A general guideline is 10-20% of income. Adjust based on your expenses and goals.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What if I can't save?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Start small: track spending, automate transfers, begin with what you can.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Should I invest for higher returns?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Short-term goals: conservative (HYSA). Long-term (5+ years): consider index funds.</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="savings-goal" />
      </div>
    </div>
  );
}
