import { getTranslations, setRequestLocale } from 'next-intl/server';
import LoanCalculator from '@/components/calculators/LoanCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

export default async function LoanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.loan');

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

        <LoanCalculator />

        {locale === 'zh' ? (
          <div className="mt-16 space-y-12">
            {/* 理解贷款 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">贷款计算器：理解您的月供</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    无论是申请个人贷款、汽车贷款还是商业贷款，理解月供的构成都至关重要。
                    本计算器采用标准的<strong>等额本息还款法</strong>，帮助您精确计算每月的还款额及总利息支出。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    贷款是大多数人生活中的重要财务决策，了解贷款成本有助于您做出更明智的选择。
                  </p>
                </div>
              </div>
            </section>

            {/* 关键术语 */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">贷款关键术语</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">💵 本金 (Principal)</p>
                  <p className="text-gray-600 text-sm">您从银行或贷款机构借入的原始金额。</p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">📊 年利率 (APR)</p>
                  <p className="text-gray-600 text-sm">贷款的年度成本。信用评分越高，利率通常越低。</p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">⏰ 期限 (Term)</p>
                  <p className="text-gray-600 text-sm">还清贷款的时间长度。期限越长，月供越低但利息越多。</p>
                </div>
              </div>
            </section>

            {/* 分步指南 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">如何使用贷款计算器</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">贷款金额</p>
                    <p className="text-gray-600 text-sm">输入您想借入的总额（不包括利息）。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">年利率</p>
                    <p className="text-gray-600 text-sm">输入银行提供的年化利率（APR）。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">贷款期限</p>
                    <p className="text-gray-600 text-sm">选择或输入还款年限（通常1-7年）。</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-green-800"><strong>结果说明：</strong>点击计算后，您将看到每月固定还款额和总利息支出。</p>
              </div>
            </section>

            {/* 实际案例 */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">实际案例对比</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-gray-700 mb-4"><strong>案例：</strong>申请10万元个人贷款，利率8%</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left">贷款期限</th>
                        <th className="p-3 text-left">月供</th>
                        <th className="p-3 text-left">总利息</th>
                        <th className="p-3 text-left">总还款额</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">3年</td>
                        <td className="p-3 font-bold text-blue-600">$3,134</td>
                        <td className="p-3 text-green-600">$12,836</td>
                        <td className="p-3">$112,836</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">5年</td>
                        <td className="p-3 font-bold text-blue-600">$2,027</td>
                        <td className="p-3 text-green-600">$21,622</td>
                        <td className="p-3">$121,622</td>
                      </tr>
                      <tr>
                        <td className="p-3">7年</td>
                        <td className="p-3 font-bold text-blue-600">$1,558</td>
                        <td className="p-3 text-green-600">$30,872</td>
                        <td className="p-3">$130,872</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                <strong>结论：</strong>选择3年期限比7年期限可节省约18,000元利息！月供仅增加约1,576元。
              </p>
            </section>

            {/* 专家建议 */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">降低贷款成本的专家建议</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-amber-800 mb-1">💡 提高信用分</p>
                  <p className="text-gray-600 text-sm">良好的信用记录能帮您获得更低的利率。贷款前可先检查并优化信用报告。</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-blue-800 mb-1">💡 多比较几家银行</p>
                  <p className="text-gray-600 text-sm">不同银行的利率差异可能很大。建议同时咨询3-5家机构，包括银行信用社和网贷平台。</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-800 mb-1">💡 缩短贷款期限</p>
                  <p className="text-gray-600 text-sm">虽然月供会增加，但总利息支出会大幅减少。尽量选择您能承受的最短期限。</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-purple-800 mb-1">💡 考虑额外还款</p>
                  <p className="text-gray-600 text-sm">如果合同允许，定期进行额外还款可直接冲抵本金，节省利息并缩短期限。</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 等额本息和等额本金有什么区别？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 本计算器使用"等额本息"方式：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>等额本息</strong>：月供相同，前期利息多本金少</li>
                      <li><strong>等额本金</strong>：月供递减，前期还款压力大但总利息少</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">等额本息是最常见的贷款方式，适合预算稳定的借款人。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 贷款审批需要多长时间？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 视贷款类型和机构而定：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>个人贷款（无抵押）：1-3个工作日</li>
                      <li>汽车贷款：同一天可审批完成</li>
                      <li>房屋抵押贷款：通常需要2-4周</li>
                    </ul>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 贷款利率多少算合理？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 2024年参考利率（信用良好者）：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>个人信用贷款：6%-15%</li>
                      <li>汽车贷款：4%-8%</li>
                      <li>房屋抵押贷款：3%-6%</li>
                      <li>利率超过20%需谨慎考虑</li>
                    </ul>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 提前还款有罚金吗？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 视贷款合同而定：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>许多个人贷款允许免费提前还款</li>
                      <li>部分贷款合同规定1-3年内提前还款需支付罚金</li>
                      <li>罚金通常为剩余利息的1-2个月或一定比例</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">建议在签署合同前确认提前还款条款。</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: 贷款被拒会影响信用吗？</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> 贷款申请会被计入信用查询（Hard Inquiry），短期内可能轻微影响信用分约5-10分。</p>
                    <p className="mt-2">但被拒本身不会造成长期影响。建议：</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>90天内多家银行的查询通常合并计算</li>
                      <li>先比较利率再正式申请</li>
                    </ul>
                  </div>
                </details>
              </div>
            </section>
          </div>
        ) : (
          <div className="mt-16 space-y-12">
            {/* Understanding Loans */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Loan Payments</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Whether you're taking out a personal loan, auto loan, or business loan,
                    knowing your exact monthly payment is key to budgeting.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This calculator uses the standard amortization formula to determine your principal and interest breakdown.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Terms */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Loan Terms</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 text-center">
                  <p className="font-semibold text-gray-900 mb-2">💵 Principal</p>
                  <p className="text-gray-600 text-sm">Original amount borrowed</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center">
                  <p className="font-semibold text-gray-900 mb-2">📊 Interest Rate</p>
                  <p className="text-gray-600 text-sm">Cost of borrowing yearly</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center">
                  <p className="font-semibold text-gray-900 mb-2">⏰ Loan Term</p>
                  <p className="text-gray-600 text-sm">Time to repay the loan</p>
                </div>
              </div>
            </section>

            {/* Steps */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">How to Use This Calculator</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">1</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Loan Amount</p>
                    <p className="text-gray-600 text-sm">Total amount to borrow</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Interest Rate</p>
                    <p className="text-gray-600 text-sm">Annual percentage rate (APR)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Loan Term</p>
                    <p className="text-gray-600 text-sm">Years to repay</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Example */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example: $50,000 Personal Loan at 8%</h3>
              <div className="bg-white rounded-xl p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">3 Years</p>
                    <p className="text-xl font-bold text-blue-600">$1,567</p>
                    <p className="text-xs text-gray-400">Total: $56,418</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">5 Years</p>
                    <p className="text-xl font-bold text-blue-600">$1,014</p>
                    <p className="text-xs text-gray-400">Total: $60,811</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">7 Years</p>
                    <p className="text-xl font-bold text-blue-600">$779</p>
                    <p className="text-xs text-gray-400">Total: $65,436</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Tips for Lowering Loan Costs</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-amber-800 mb-1">Shop Around</p>
                  <p className="text-gray-600 text-sm">Compare rates from banks, credit unions, and online lenders.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-blue-800 mb-1">Improve Credit</p>
                  <p className="text-gray-600 text-sm">Higher scores mean lower rates. Check your credit report first.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-800 mb-1">Shorter Terms</p>
                  <p className="text-gray-600 text-sm">Higher payments but significantly less total interest.</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <p className="font-semibold text-purple-800 mb-1">Prepayment</p>
                  <p className="text-gray-600 text-sm">Pay extra toward principal to save interest and shorten term.</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: What's a good interest rate?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Depends on loan type and your credit: Personal loans 6-15%, Auto loans 4-8%, Mortgage 3-6%.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: Does pre-payment hurt credit?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> No. Paying off a loan early won't hurt your credit. It may actually help your utilization ratio.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: Fixed vs variable rate?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Fixed rates stay the same; variable rates can change. Fixed provides stability, variable may start lower.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: How long does approval take?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> Personal loans: 1-3 business days. Auto loans: same day. Mortgages: 2-4 weeks.</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Q: Does being denied hurt credit?</span>
                    <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-600">
                    <p><strong>A:</strong> The hard inquiry may temporarily lower your score 5-10 points. Apply strategically within 90 days.</p>
                  </div>
                </details>
              </div>
            </section>
          </div>
        )}

        <RelatedCalculators currentCalculator="loan" />
      </div>
    </div>
  );
}
