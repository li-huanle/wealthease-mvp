import { getTranslations, setRequestLocale } from 'next-intl/server';
import ROICalculator from '@/components/calculators/ROICalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'ROI Calculator - Calculate Investment Returns | WealthEase',
      description: 'Free ROI calculator to measure investment returns. Calculate total return, ROI percentage, and annualized return (CAGR) for any investment.',
      keywords: 'ROI calculator, return on investment, investment return calculator, CAGR calculator, ROI percentage',
    },
    zh: {
      title: '投资回报率计算器 - 计算投资收益 | WealthEase',
      description: '免费投资回报率计算器。计算投资的总回报、ROI百分比和年化收益率(CAGR)，评估任何投资的盈利能力。',
      keywords: '投资回报率计算器, ROI计算器, 收益率计算器, 投资回报计算, 年化收益率计算',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/calculators/roi`,
      languages: {
        'en': `${baseUrl}/en/calculators/roi`,
        'zh': `${baseUrl}/zh/calculators/roi`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: `${baseUrl}/${locale}/calculators/roi`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function ROIPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.roi');

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

        <ROICalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">什么是投资回报率 (ROI)？</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      投资回报率 (ROI - Return on Investment) 是评估投资效率的核心指标，
                      用于衡量投资收益与投入成本之间的比率。
                      <strong>ROI越高，说明投资的盈利能力越强</strong>。
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      ROI计算公式：<code className="bg-gray-100 px-2 py-1 rounded">ROI = (收益 - 成本) / 成本 × 100%</code>
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">ROI vs 年化收益率 (CAGR)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">总ROI</p>
                    <p className="text-gray-600 text-sm">只反映总回报百分比，<strong>忽略时间因素</strong>。</p>
                    <p className="text-gray-500 text-xs mt-2">例：10年赚50%和1年赚50%的ROI都是50%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">年化收益率 (CAGR)</p>
                    <p className="text-gray-600 text-sm">考虑时间因素，将总回报<strong>平摊到每年</strong>。</p>
                    <p className="text-gray-500 text-xs mt-2">可跨时间维度比较不同投资</p>
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
                        <p className="font-semibold text-gray-900 mb-1">输入初始投资</p>
                        <p className="text-gray-600 text-sm">您开始时投入的金额是多少？</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">输入最终价值</p>
                        <p className="text-gray-600 text-sm">投资结束时的总价值或当前市值。</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">设置投资时长</p>
                        <p className="text-gray-600 text-sm">持有投资的时间长度（年/月）。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">查看分析结果</p>
                        <p className="text-gray-600 text-sm">同时查看总回报率和年化回报率。</p>
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
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">投资项目</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">初始投资</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">最终价值</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">持有期</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">总ROI</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">年化CAGR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3">股票A</td>
                          <td className="px-4 py-3">$10,000</td>
                          <td className="px-4 py-3">$15,000</td>
                          <td className="px-4 py-3">5年</td>
                          <td className="px-4 py-3 text-green-600">+50%</td>
                          <td className="px-4 py-3">8.4%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">基金B</td>
                          <td className="px-4 py-3">$10,000</td>
                          <td className="px-4 py-3">$16,000</td>
                          <td className="px-4 py-3">3年</td>
                          <td className="px-4 py-3 text-green-600">+60%</td>
                          <td className="px-4 py-3">16.8%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">房产C</td>
                          <td className="px-4 py-3">$200,000</td>
                          <td className="px-4 py-3">$280,000</td>
                          <td className="px-4 py-3">10年</td>
                          <td className="px-4 py-3 text-green-600">+40%</td>
                          <td className="px-4 py-3">3.4%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">如何解读结果？</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">净收益</p>
                    <p className="text-gray-600 text-sm">您的实际利润或亏损金额（$）。</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">ROI百分比</p>
                    <p className="text-gray-600 text-sm">利润占总成本的百分比，正数为盈利，负数为亏损。</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">年化收益率 (CAGR)</p>
                    <p className="text-gray-600 text-sm">如果每年以稳定速度增长，需要的年增长率。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">专家建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">平衡风险与回报</p>
                    <p className="text-gray-600 text-sm">高ROI通常伴随高风险，分散投资降低单一资产风险。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">考虑时间因素</p>
                    <p className="text-gray-600 text-sm">用CAGR比较不同持有期的投资更准确。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">扣除通胀后再评估</p>
                    <p className="text-gray-600 text-sm">实际购买力增长才是真正的回报。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">计入所有成本</p>
                    <p className="text-gray-600 text-sm">包括手续费、税费等隐性成本。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 好的ROI是多少？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 没有标准答案。一般而言，年化8-12%是股票市场的历史平均水平。需结合投资类型、风险和通胀综合评估。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: ROI可以是负数吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 可以。负ROI表示投资亏损，即最终价值低于初始投入。需分析亏损原因决定是否继续持有。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 为什么CAGR比总ROI更准确？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 因为CAGR考虑了资金的时间价值。100%回报用1年完成比用10年完成价值高得多，CAGR能反映这一差异。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 计算ROI需要考虑税费吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 基本ROI计算不考虑税费。但评估真实回报时，应使用税后净收益。不同投资类型的税率差异很大。</p>
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
                    <span className="text-2xl">📈</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Return on Investment (ROI)?</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      ROI (Return on Investment) measures the efficiency of an investment by comparing
                      returns to costs. <strong>Higher ROI means better profitability</strong>.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Formula: <code className="bg-gray-100 px-2 py-1 rounded">ROI = (Returns - Costs) / Costs × 100%</code>
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">ROI vs. Annualized Return (CAGR)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">Total ROI</p>
                    <p className="text-gray-600 text-sm">Shows total return percentage but <strong>ignores time</strong>.</p>
                    <p className="text-gray-500 text-xs mt-2">Example: 50% return over 1 year vs 10 years looks the same</p>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">CAGR (Annualized)</p>
                    <p className="text-gray-600 text-sm">Accounts for time by showing <strong>yearly average return</strong>.</p>
                    <p className="text-gray-500 text-xs mt-2">Allows comparison across different time periods</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Expert Tips</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Balance Risk & Return</p>
                    <p className="text-gray-600 text-sm">Higher ROI usually means higher risk. Diversify your investments.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Use CAGR for Comparison</p>
                    <p className="text-gray-600 text-sm">Compare investments fairly regardless of holding period.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">Adjust for Inflation</p>
                    <p className="text-gray-600 text-sm">Real return is what matters for purchasing power.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">Include All Costs</p>
                    <p className="text-gray-600 text-sm">Factor in fees, taxes, and other hidden expenses.</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What is a good ROI?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> It depends. Stock market historical average is 8-12% annually. Consider risk, time horizon, and inflation.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Can ROI be negative?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Yes. Negative ROI means your investment lost money - final value is less than initial investment.</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="roi" />
      </div>
    </div>
  );
}
