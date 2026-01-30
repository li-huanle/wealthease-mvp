import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// Dynamic import for the calculator component
const TipCalculator = dynamic(
  () => import('@/components/calculators/TipCalculator'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    ),
  }
);

// Generate metadata for SEO
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;

  const metadata = {
    en: {
      title: 'Tip Calculator - Calculate Tips & Split Bills | WealthEase',
      description: 'Free tip calculator to quickly calculate tip amounts by percentage. Split bills between friends with ease. Perfect for restaurants, taxis, and services.',
      keywords: 'tip calculator, split bill, calculate tip, restaurant tip, gratuity calculator, bill splitter, split check',
    },
    zh: {
      title: '小费计算器 - 快速计算小费和分摊账单 | WealthEase',
      description: '免费小费计算器，按百分比快速计算小费金额。轻松和朋友分摊账单。适用于餐厅、出租车和服务场所。',
      keywords: '小费计算器, 分摊账单, 计算小费, 餐厅小费, 小费计算器, 分摊账单, 小费计算工具',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';
  const canonicalUrl = `${baseUrl}/${locale}/calculators/tip`;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/calculators/tip`,
        'zh': `${baseUrl}/zh/calculators/tip`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function TipPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.tip');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <TipCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">小费计算器：快速准确计算小费</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      小费是表达对服务人员工作认可的方式，但计算小费金额有时令人困惑。
                      <strong>本计算器帮助您快速准确地计算小费和分摊账单</strong>，适用于餐厅、出租车等各种服务场景。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">各国小费习惯差异</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🇺🇸</p>
                    <p className="font-semibold text-gray-900 mb-1">美国</p>
                    <p className="text-gray-600 text-sm">15-20%</p>
                    <p className="text-xs text-gray-400">服务行业预期收入</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🇪🇺</p>
                    <p className="font-semibold text-gray-900 mb-1">欧洲</p>
                    <p className="text-gray-600 text-sm">5-10%</p>
                    <p className="text-xs text-gray-400">已含服务费</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🇯🇵</p>
                    <p className="font-semibold text-gray-900 mb-1">日本</p>
                    <p className="text-gray-600 text-sm">不需要</p>
                    <p className="text-xs text-gray-400">可能被拒绝</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🇦🇺</p>
                    <p className="font-semibold text-gray-900 mb-1">澳大利亚</p>
                    <p className="text-gray-600 text-sm">可选</p>
                    <p className="text-xs text-gray-400">非强制</p>
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
                        <p className="font-semibold text-gray-900 mb-1">输入账单金额</p>
                        <p className="text-gray-600 text-sm">输入消费的总金额（不含小费）。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">2</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">选择小费比例</p>
                        <p className="text-gray-600 text-sm">常用比例：10%（基本）、15%（良好）、20%（优质服务）。</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">3</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">设置分摊人数</p>
                        <p className="text-gray-600 text-sm">输入人数，自动计算每人应付金额。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary-600">4</div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">查看详细结果</p>
                        <p className="text-gray-600 text-sm">包括小费金额、总金额、每人分摊等。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">快速小费参考表</h3>
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">账单金额</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">10%</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">15%</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">18%</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">20%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3">$50</td>
                          <td className="px-4 py-3 text-green-600">$5</td>
                          <td className="px-4 py-3 text-green-600">$7.50</td>
                          <td className="px-4 py-3 text-green-600">$9</td>
                          <td className="px-4 py-3 text-green-600">$10</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">$100</td>
                          <td className="px-4 py-3 text-green-600">$10</td>
                          <td className="px-4 py-3 text-green-600">$15</td>
                          <td className="px-4 py-3 text-green-600">$18</td>
                          <td className="px-4 py-3 text-green-600">$20</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">$200</td>
                          <td className="px-4 py-3 text-green-600">$20</td>
                          <td className="px-4 py-3 text-green-600">$30</td>
                          <td className="px-4 py-3 text-green-600">$36</td>
                          <td className="px-4 py-3 text-green-600">$40</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">$500</td>
                          <td className="px-4 py-3 text-green-600">$50</td>
                          <td className="px-4 py-3 text-green-600">$75</td>
                          <td className="px-4 py-3 text-green-600">$90</td>
                          <td className="px-4 py-3 text-green-600">$100</td>
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
                    <p className="font-semibold text-amber-800 mb-1">四舍五入更方便</p>
                    <p className="text-gray-600 text-sm">账单$47，小费10%=4.7，给5整数更省事。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">税前还是税后？</p>
                    <p className="text-gray-600 text-sm">美国通常按税前金额计算小费。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">团体聚餐技巧</p>
                    <p className="text-gray-600 text-sm">大型团体（6+人）可能自动收18-20%服务费。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">自助服务不给小费</p>
                    <p className="text-gray-600 text-sm">快餐、咖啡店取餐通常不需要给小费。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 小费应该给多少？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 美国标准：15%表示满意，20%表示特别满意，10%表示基本服务。外卖10%左右。酒吧每杯1-2美元。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 小费是税前还是税后金额？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 通常按税前金额计算。美国人习惯这样计算，如果账单$100+税，小费基于$100。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 信用卡还是现金给小费？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 都可以。信用卡写在签账单上，餐厅会处理。现金小费直接给服务人员，更快到手。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 服务差可以不给小费吗？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 可以，但建议给最低标准（10%）并在评论中说明问题。服务人员可能遇到您不知道的困难（如人手不足）。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 在国外旅行如何处理小费？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 先了解当地习惯：欧洲通常已含服务费，日本不用给小费，泰国和墨西哥习惯给少量。最好提前查询目的地小费礼仪。</p>
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
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tip Calculator: Quick & Accurate Tips</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Tipping is a way to recognize good service, but calculating amounts can be confusing.
                      <strong> This calculator helps you quickly calculate tips and split bills</strong> for restaurants, taxis, and more.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tipping Customs by Country</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🇺🇸</p>
                    <p className="font-semibold text-gray-900 mb-1">USA</p>
                    <p className="text-gray-600 text-sm">15-20%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🇪🇺</p>
                    <p className="font-semibold text-gray-900 mb-1">Europe</p>
                    <p className="text-gray-600 text-sm">5-10%</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🇯🇵</p>
                    <p className="font-semibold text-gray-900 mb-1">Japan</p>
                    <p className="text-gray-600 text-sm">Not expected</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center">
                    <p className="text-3xl mb-2">🇦🇺</p>
                    <p className="font-semibold text-gray-900 mb-1">Australia</p>
                    <p className="text-gray-600 text-sm">Optional</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Tip Reference</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">15% = Good Service</p>
                    <p className="text-gray-600 text-sm">Standard tip for acceptable service.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">20% = Excellent</p>
                    <p className="text-gray-600 text-sm">Great service deserves 20%.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">10% = Takeout</p>
                    <p className="text-gray-600 text-sm">Lower tip for takeout orders.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">$1-2 = Bartender</p>
                    <p className="text-gray-600 text-sm">Per drink at bars.</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: Pre-tax or post-tax?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> Calculate tip on pre-tax amount in the US. The tax amount is not part of the service you received.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: What if service is bad?</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> You can tip 10% or skip, but consider speaking to a manager. Service issues may be beyond their control.</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="tip" />
      </div>
    </div>
  );
}
