import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';
import { SITE_URL } from '@/lib/seo';

// Dynamic import for the calculator component
const CollegeSavingsCalculator = dynamic(
  () => import('@/components/calculators/CollegeSavingsCalculator'),
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
  const t = await getTranslations('calculator.collegeSavings');
  const seo = await getTranslations('seo');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_URL;
  const canonicalUrl = `${baseUrl}/${locale}/calculators/college-savings`;

  return {
    title: t('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/college-savings`,
        'zh': `${baseUrl}/zh/calculators/college-savings`,
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

export default async function CollegeSavingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.collegeSavings');

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

        <CollegeSavingsCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">大学储蓄计划：529计划详解</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      大学学费几十年来涨幅超过通胀，<strong>提前规划至关重要</strong>。
                      529教育储蓄计划是专为此设计的税收优惠账户。
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      本计算器帮助您了解是否在正确的储蓄轨道上，以及每月需要储蓄多少。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">529计划的核心优势</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">💰</p>
                    <p className="font-semibold text-gray-900 mb-1">免税增长</p>
                    <p className="text-gray-600 text-sm">投资收益免税累积</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🏦</p>
                    <p className="font-semibold text-gray-900 mb-1">提现免税</p>
                    <p className="text-gray-600 text-sm">符合条件支出免联邦税</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🧾</p>
                    <p className="font-semibold text-gray-900 mb-1">州税优惠</p>
                    <p className="text-gray-600 text-sm">多数州提供税收减免</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">📈</p>
                    <p className="font-semibold text-gray-900 mb-1">高存款限额</p>
                    <p className="text-gray-600 text-sm">多数州允许超30万美元</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🏫</p>
                    <p className="font-semibold text-gray-900 mb-1">灵活使用</p>
                    <p className="text-gray-600 text-sm">全国任何认证院校可用</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">👤</p>
                    <p className="font-semibold text-gray-900 mb-1">账户控制</p>
                    <p className="text-gray-600 text-sm">账户所有人掌控资金</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">越早开始越轻松</h3>
                <p className="text-gray-600 mb-4">基于10万美金大学目标，假设7%年化收益：</p>
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">开始时间</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">持有年限</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">月存金额</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">节省比例</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3">出生时</td>
                          <td className="px-4 py-3">18年</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">¥1,450/月</td>
                          <td className="px-4 py-3 text-green-600">基准</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">5岁时</td>
                          <td className="px-4 py-3">13年</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">¥2,520/月</td>
                          <td className="px-4 py-3">需多存74%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">10岁时</td>
                          <td className="px-4 py-3">8年</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">¥5,110/月</td>
                          <td className="px-4 py-3">需多存252%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">15岁时</td>
                          <td className="px-4 py-3">3年</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">¥16,680/月</td>
                          <td className="px-4 py-3">需多存1050%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-amber-700 mt-4 text-sm">
                  💡 提前5年开始，月存金额可减少40%以上！
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">当前大学费用趋势</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">公立州内大学</p>
                    <p className="text-gray-600 text-sm">约¥7-11万/年（含学费和食宿）</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">公立州外大学</p>
                    <p className="text-gray-600 text-sm">约¥18-22万/年</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">私立大学</p>
                    <p className="text-gray-600 text-sm">约¥25-36万/年</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-gray-900 mb-2">精英私立大学</p>
                    <p className="text-gray-600 text-sm">可达¥45-60万+/年</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">投资策略建议</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">年龄型组合（推荐）</p>
                    <p className="text-gray-600 text-sm">随孩子年龄自动调整风险，幼儿时高股票比例，临近大学转为保守。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">积极成长型</p>
                    <p className="text-gray-600 text-sm">100%股票，适合幼儿，历史收益约8-10%。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">平衡型</p>
                    <p className="text-gray-600 text-sm">60-80%股票，适合学龄儿童，收益约6-8%。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">保守型</p>
                    <p className="text-gray-600 text-sm">债券和稳定价值产品，临近大学使用，收益约3-5%。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 存多了怎么办？孩子用不完？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 有几个选择：1）更换受益人（其他家庭成员）；2）保留读研；3）2024年起可转入Roth IRA（终身最高3.5万）；4）非合格提现仅对收益部分征税+10%罚款。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 529计划影响 FAFSA 助学金吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 父母拥有的529计划在FAFSA中仅以5.64%评估，影响很小。学生拥有的账户评估20%。祖父母拥有的计划在2024年简化后不再报告。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 哪些支出符合免税条件？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 符合条件支出包括：学费和必修费、半职以上的食宿、必修教材、电脑和网络（符合条件时）、特殊需求设备、K-12每年最多1万美元、大学贷款终身最多1万美元。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 应该用州税减免还是选择低费率计划？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 如果您所在州提供529税收减免，通常应使用本州计划。但若本州计划费率过高，可考虑其他州低费率计划（可能失去州税减免，但节省的费用可能更多）。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 529计划和 Roth IRA 哪个更好？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 两者用途不同：529专用于教育，Roth IRA可用于任何目的（但教育支出也可提现）。通常建议优先使用529获得州税减免，再用Roth IRA作为补充。</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex-items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">529 College Savings Plans</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      College costs have risen faster than inflation for decades, making
                      <strong> early planning essential</strong>. A 529 plan offers tax-advantaged growth.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Use this calculator to see if you're on track and how much to save monthly.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">529 Plan Benefits</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">💰</p>
                    <p className="font-semibold text-gray-900 mb-1">Tax-Free Growth</p>
                    <p className="text-gray-600 text-sm">Earnings not taxed annually</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🏦</p>
                    <p className="font-semibold text-gray-900 mb-1">Tax-Free Withdrawals</p>
                    <p className="text-gray-600 text-sm">For qualified education expenses</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🧾</p>
                    <p className="font-semibold text-gray-900 mb-1">State Tax Benefits</p>
                    <p className="text-gray-600 text-sm">30+ states offer deductions</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Power of Starting Early</h3>
                <p className="text-gray-600 mb-4">Based on $100,000 goal with 7% annual returns:</p>
                <div className="bg-white rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">Start Time</th>
                        <th className="px-4 py-3 text-left">Years</th>
                        <th className="px-4 py-3 text-left">Monthly</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-4 py-3">At Birth (18 years)</td><td className="px-4 py-3">18</td><td className="px-4 py-3 text-green-600">$212</td></tr>
                      <tr><td className="px-4 py-3">Age 5 (13 years)</td><td className="px-4 py-3">13</td><td className="px-4 py-3 text-green-600">$368</td></tr>
                      <tr><td className="px-4 py-3">Age 10 (8 years)</td><td className="px-4 py-3">8</td><td className="px-4 py-3 text-green-600">$746</td></tr>
                      <tr><td className="px-4 py-3">Age 15 (3 years)</td><td className="px-4 py-3">3</td><td className="px-4 py-3 text-green-600">$2,435</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What if we save too much?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Change beneficiary, save for grad school, roll to Roth IRA ($35K lifetime), or pay 10% penalty on earnings only.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: How do 529 plans affect financial aid?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Parent-owned 529s are assessed at only 5.64% on FAFSA. Grandparent-owned plans aren't reported (2024+).</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="college-savings" />
      </div>
    </div>
  );
}
