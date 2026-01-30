import { getTranslations, setRequestLocale } from 'next-intl/server';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

export default async function MortgagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.mortgage');

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

        <MortgageCalculator />

        {locale === 'zh' ? (
          <div className="mt-16 space-y-12">
            {/* 理解房贷 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏠</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">理解房贷计算：从本金到PMI</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    房屋贷款（Mortgage）通常是家庭最大的单笔负债。一个标准的月供不仅包含还给银行的本金和利息，
                    通常还包括房产税、房屋保险以及可能产生的私人抵押贷款保险（PMI）。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    了解月供的构成，有助于您做出更明智的购房决策，避免陷入"房贷陷阱"。
                  </p>
                </div>
              </div>
            </section>

            {/* PITI详解 */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">月供的四大组成部分 (PITI)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">💰 本金 (Principal)</p>
                  <p className="text-gray-600 text-sm">偿还贷款本金的部分。随着还款进行，本金占比逐渐增加。</p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">💵 利息 (Interest)</p>
                  <p className="text-gray-600 text-sm">支付给贷款机构的费用。初期利息占比最高，随本金减少而降低。</p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">🏛️ 房产税 (Property Tax)</p>
                  <p className="text-gray-600 text-sm">地方政府征收的税费，通常由贷款机构代收代缴（Escrow）。</p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">🛡️ 房屋保险 (Insurance)</p>
                  <p className="text-gray-600 text-sm">保护房屋免受火灾、风暴等损害的必要保险，通常为年度费用。</p>
                </div>
              </div>
              <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-800 text-sm"><strong>注意：</strong>如果您首付低于20%，还需要支付PMI（私人抵押贷款保险）。</p>
              </div>
            </section>

            {/* 分步指南 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">如何使用房贷计算器 - 分步指南</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">房屋价格</p>
                      <p className="text-gray-600 text-sm">输入房产的总交易价格，包括所有附加费用。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">首付比例</p>
                      <p className="text-gray-600 text-sm">输入计划支付的首付百分比。20%可避免PMI。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">年利率</p>
                      <p className="text-gray-600 text-sm">输入银行批准的贷款利率，比较不同银行的报价。</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">贷款年限</p>
                      <p className="text-gray-600 text-sm">15年或30年。期限越短，利息越少但月供越高。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">5</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">年度房产税</p>
                      <p className="text-gray-600 text-sm">通常为房价的1%-3%，不同地区差异较大。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">6</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">年度保险费</p>
                      <p className="text-gray-600 text-sm">约为房价的0.3%-1%，视地区和房屋类型而定。</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 15年 vs 30年 */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">15年 vs 30年：如何选择？</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-5">
                    <p className="font-bold text-blue-800 mb-2">30年固定利率</p>
                    <ul className="text-gray-600 text-sm space-y-2">
                      <li>✓ 月供较低，还款压力小</li>
                      <li>✓ 更灵活的资金分配</li>
                      <li>✗ 总利息支出更高</li>
                      <li>✗  Equity积累较慢</li>
                    </ul>
                    <p className="mt-3 text-sm text-gray-500">适合：首次购房者、预算有限者</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-5">
                    <p className="font-bold text-green-800 mb-2">15年固定利率</p>
                    <ul className="text-gray-600 text-sm space-y-2">
                      <li>✓ 总利息大幅减少</li>
                      <li>✓ 更快积累房屋净值</li>
                      <li>✗ 月供压力较大</li>
                      <li>✗ 资金灵活性降低</li>
                    </ul>
                    <p className="mt-3 text-sm text-gray-500">适合：有稳定高收入、可承担高月供</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-700"><strong>案例：</strong>$400,000贷款，利率6%</p>
                <p className="text-gray-600 text-sm">30年月供$2,398，总利息$463,000 | 15年月供$3,372，总利息$206,000</p>
                <p className="text-green-600 font-semibold mt-2">选择15年可节省约$257,000利息！</p>
              </div>
            </section>

            {/* 专家建议 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">购房者专家建议</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-amber-800 mb-1">💡 尽量凑齐20%首付</p>
                  <p className="text-gray-600 text-sm">不仅能省下PMI费用，通常还能获得更优惠的利率。</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-blue-800 mb-1">💡 事先获取预批准</p>
                  <p className="text-gray-600 text-sm">看房前先拿到银行预批信，明确您的预算上限。</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-800 mb-1">💡 考虑15年期贷款</p>
                  <p className="text-gray-600 text-sm">如果您能负担较高月供，15年期能为您节省巨额利息。</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-purple-800 mb-1">💡 留足备用金</p>
                  <p className="text-gray-600 text-sm">购房后有维护费、家具费等支出，不要把所有积蓄都用作首付。</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 什么是PMI？什么时候可以取消？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> PMI（私人抵押贷款保险）是首付低于20%时银行强制要求的保险，保护银行而非您。</p>
                    <p className="mt-2">当您达到以下条件时可申请取消：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>贷款余额降至原始房价的80%以下</li>
                      <li>房屋评估价值不低于购买价格</li>
                      <li>无逾期还款记录</li>
                    </ul>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 多少负债率适合申请房贷？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 一般建议：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>月供不超过月收入的28%（前端比率）</li>
                      <li>总负债（包括车贷、信用卡等）不超过月收入的36%（后端比率）</li>
                      <li>优质借款人可以放宽至43%甚至更高</li>
                    </ul>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 固定利率vs浮动利率怎么选？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>固定利率</strong>：月供稳定，适合长期持有房产者</li>
                      <li><strong>浮动利率(ARM)</strong>：初期利率低，适合短期持有或预期降息者</li>
                    </ul>
                    <p className="mt-2">常见的是7/1 ARM（前7年固定，之后每年调整）。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 购房时有哪些隐藏成本？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 除了首付和月供，还需要考虑：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>过户费（Loan Closing Costs）：约为贷款额的2%-5%</li>
                      <li>房屋检查费：$300-$500</li>
                      <li>产权保险：$1,000-$2,000</li>
                      <li>HOA费：如适用，每月$200-$500</li>
                    </ul>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 提前还贷划算吗？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 取决于您的贷款利率和投资能力：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>如果贷款利率 &gt; 5%，提前还贷相当于&quot;无风险收益&quot;</li>
                      <li>如果贷款利率 &lt; 4%，可考虑投资其他更高收益渠道</li>
                    </ul>
                    <p className="mt-2">同时注意是否有提前还款罚金（Prepayment Penalty）。</p>
                  </div>
                </details>
              </div>
            </section>
          </div>
        ) : (
          <div className="mt-16 space-y-12">
            {/* Understanding Your Mortgage */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏠</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Mortgage Payment</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    A mortgage payment is often the single largest monthly expense for homeowners.
                    It typically bundles property taxes, insurance, and interest into one payment (PITI).
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Understanding these components helps you make smarter home-buying decisions.
                  </p>
                </div>
              </div>
            </section>

            {/* PITI Explained */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">The 4 Parts of a Mortgage (PITI)</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 text-center">
                  <p className="font-semibold text-gray-900 mb-2">💰 Principal</p>
                  <p className="text-gray-600 text-sm">Portion that pays down what you borrowed</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center">
                  <p className="font-semibold text-gray-900 mb-2">💵 Interest</p>
                  <p className="text-gray-600 text-sm">Fee paid to the lender for borrowing</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center">
                  <p className="font-semibold text-gray-900 mb-2">🏛️ Taxes</p>
                  <p className="text-gray-600 text-sm">Property taxes to local government</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center">
                  <p className="font-semibold text-gray-900 mb-2">🛡️ Insurance</p>
                  <p className="text-gray-600 text-sm">Homeowners insurance protection</p>
                </div>
              </div>
              <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-800 text-sm"><strong>Note:</strong> If down payment is under 20%, you'll also pay PMI.</p>
              </div>
            </section>

            {/* Step by Step */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">How to Use This Calculator</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Home Price</p>
                      <p className="text-gray-600 text-sm">Total purchase price of the property.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Down Payment</p>
                      <p className="text-gray-600 text-sm">Cash upfront (20% avoids PMI).</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Interest Rate</p>
                      <p className="text-gray-600 text-sm">Current mortgage rate from lender.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Loan Term</p>
                      <p className="text-gray-600 text-sm">15 or 30 years standard.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">5</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Property Tax</p>
                      <p className="text-gray-600 text-sm">Usually 1-3% of home value annually.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">6</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Insurance</p>
                      <p className="text-gray-600 text-sm">About 0.3-1% of home value yearly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 15 vs 30 */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">15-Year vs 30-Year Mortgage</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-5">
                  <p className="font-bold text-blue-800 mb-2">30-Year Fixed</p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>✓ Lower monthly payments</li>
                    <li>✓ More budget flexibility</li>
                    <li>✗ Higher total interest</li>
                    <li>✗ Slower equity building</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-500">Best for: First-time buyers, budget-conscious</p>
                </div>
                <div className="bg-green-50 rounded-lg p-5">
                  <p className="font-bold text-green-800 mb-2">15-Year Fixed</p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>✓ Significantly less interest</li>
                    <li>✓ Build equity faster</li>
                    <li>✗ Higher monthly payment</li>
                    <li>✗ Less flexibility</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-500">Best for: Higher income, financially stable</p>
                </div>
              </div>
            </section>

            {/* Expert Tips */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Expert Tips for Home Buyers</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-amber-800 mb-1">Aim for 20% Down</p>
                  <p className="text-gray-600 text-sm">Avoids PMI and often secures better rates.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-blue-800 mb-1">Get Pre-Approved</p>
                  <p className="text-gray-600 text-sm">Know your budget before house hunting.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-800 mb-1">Consider 15-Year</p>
                  <p className="text-gray-600 text-sm">If you can afford it, save thousands in interest.</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-purple-800 mb-1">Keep Emergency Fund</p>
                  <p className="text-gray-600 text-sm">Don't deplete all savings for down payment.</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: What is PMI and when can I remove it?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> PMI protects the lender if your down payment is under 20%. You can request removal when your loan-to-value ratio reaches 80% or below.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: What debt-to-income ratio do I need?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Typically: Front-end ratio (housing) under 28%, Back-end ratio (total debt) under 36%. Some lenders go up to 43%.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: Fixed vs ARM: Which is better?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Fixed rates offer stability; ARMs have lower initial rates. Fixed is better for long-term homeowners.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: What are hidden costs when buying?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Closing costs (2-5%), home inspection ($300-$500), title insurance, and HOA fees if applicable.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: Is early mortgage payoff worth it?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> If your rate is over 5%, it's like a guaranteed return. If under 4%, consider investing the money elsewhere.</p>
                  </div>
                </details>
              </div>
            </section>
          </div>
        )}

        <RelatedCalculators currentCalculator="mortgage" />
      </div>
    </div>
  );
}
