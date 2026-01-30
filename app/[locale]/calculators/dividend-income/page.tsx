import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const DividendIncomeCalculator = dynamic(
  () => import('@/components/calculators/DividendIncomeCalculator'),
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
  const t = await getTranslations('calculator.dividendIncome');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wealthease.com';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/dividend-income`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/dividend-income`,
        'zh': `${baseUrl}/zh/calculators/dividend-income`,
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

export default async function DividendIncomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.dividendIncome');

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

        <DividendIncomeCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💵</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">股息投资：构建被动收入流</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      股息投资是经过时间验证的财富增长策略。
                      通过投资优质股息股票并股息再投资，
                      <strong>您可以利用复利效应创造可观的被动收入</strong>。
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      本计算器帮助您规划达到目标股息收入所需的投资金额和时间。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">什么是股息？</h3>
                <p className="text-gray-600 mb-4">股息是公司从盈利中定期向股东支付的现金分红。主要类型包括：</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">蓝筹股</p>
                    <p className="text-gray-600 text-sm">大型成熟公司，如可口可乐、强生</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">股息贵族</p>
                    <p className="text-gray-600 text-sm">标普500中连续25年增加股息的公司</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">REITs</p>
                    <p className="text-gray-600 text-sm">需派发90%收入作为股息，收益率3-6%</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">股息再投资 (DRIP) 的威力</h3>
                <p className="text-gray-600 mb-4">假设初始投资10万，年追加5万，股息率4%，股息增长率5%，股价年涨6%，30年后：</p>
                <div className="bg-white rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">不复投股息</p>
                      <p className="text-2xl font-bold text-gray-700">约45万</p>
                      <p className="text-sm text-gray-500">年股息$18,000</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <p className="text-sm text-green-600 mb-1">股息再投资</p>
                      <p className="text-2xl font-bold text-green-600">约75万</p>
                      <p className="text-sm text-green-600">年股息$30,000</p>
                    </div>
                  </div>
                  <p className="text-center text-amber-600 mt-4 font-semibold">
                    复投使财富增加67%！
                  </p>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">各行业股息率参考</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">公用事业</p>
                    <p className="text-gray-600 text-sm">3-5%，业务稳定</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">REITs房地产</p>
                    <p className="text-gray-600 text-sm">3-6%，高派息要求</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">消费必需品</p>
                    <p className="text-gray-600 text-sm">2-4%，防御性强</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">金融业</p>
                    <p className="text-gray-600 text-sm">2-4%，银行保险</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">科技股</p>
                    <p className="text-gray-600 text-sm">1-2%，增长导向</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">高收益陷阱</p>
                    <p className="text-gray-600 text-sm">6-10%+，需警惕风险</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">专家建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">关注股息增长</p>
                    <p className="text-gray-600 text-sm">股息增长率比初始收益率更重要，可跑赢通胀。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">分散投资</p>
                    <p className="text-gray-600 text-sm">覆盖8-10个行业，避免过度集中。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">长期持有</p>
                    <p className="text-gray-600 text-sm">至少持有5年以上，复利效应才明显。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">注意派息率</p>
                    <p className="text-gray-600 text-sm">派息率超过100%可能有削减股息风险。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 产生有意义股息收入需要多少本金？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 按4%股息率计算：月入$1,000需本金30万；月入$2,500需本金75万；月入$5,000需本金150万。通过定投和股息再投资，25年可达目标。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 股息要交税吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 合格股息按资本利得税税率（0%、15%、20%），非合格股息按普通收入税率（10-37%）。IRA账户免税，Roth账户完全免税。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 高股息率股票可以买吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 需警惕：极高股息率（10%+）往往是陷阱，可能是股价下跌导致，或公司面临困境。优先选择股息贵族（25年连续增长）。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 什么是 Yield on Cost（成本收益率）？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 成本收益率 = 当前股息 / 原始买入成本。例如：100元买入，股息从4元涨到8元，成本收益率8%，即使当前股价收益率仅3%，您仍获得8%回报。</p>
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
                    <span className="text-2xl">💵</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Passive Income with Dividends</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Dividend investing is a time-tested strategy for building wealth.
                      By investing in quality dividend stocks and reinvesting,
                      <strong> you can harness compound growth for substantial passive income</strong>.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Dividend Yield by Sector</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Utilities</p>
                    <p className="text-gray-600 text-sm">3-5%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">REITs</p>
                    <p className="text-gray-600 text-sm">3-6%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="font-semibold text-gray-900 mb-2">Tech</p>
                    <p className="text-gray-600 text-sm">1-2%</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Expert Tips</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">Focus on Growth</p>
                    <p className="text-gray-600 text-sm">Dividend growth matters more than initial yield.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">Diversify</p>
                    <p className="text-gray-600 text-sm">Spread across 8-10 sectors.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">Reinvest Dividends</p>
                    <p className="text-gray-600 text-sm">DRIP accelerates wealth building.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">Check Payout Ratio</p>
                    <p className="text-gray-600 text-sm">Over 100% signals risk of dividend cuts.</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: How much do I need for meaningful income?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> At 4% yield: $1,000/month needs $300K; $2,500/month needs $750K; $5,000/month needs $1.5M.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Are dividends taxed?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Qualified dividends: 0-20%. Non-qualified: 10-37%. Tax-advantaged accounts (IRA/Roth) have different rules.</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="dividend-income" />
      </div>
    </div>
  );
}
