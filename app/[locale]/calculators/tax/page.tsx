import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

const TaxCalculator = dynamic(
  () => import('@/components/calculators/TaxCalculator'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    ),
  }
);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Income Tax Calculator - Estimate Your Tax Liability | WealthEase',
      description: 'Free tax calculator to estimate federal and state income tax. Calculate take-home pay, effective tax rate, and tax brackets.',
      keywords: 'tax calculator, income tax calculator, federal tax, state tax, take-home pay, tax bracket',
    },
    zh: {
      title: '税务计算器 - 估算您的应缴税款 | WealthEase',
      description: '免费税务计算器，估算联邦和州所得税。计算实际到手收入、有效税率和税级。',
      keywords: '税务计算器, 所得税计算, 联邦税, 州税, 实发工资, 税级, 税款计算',
    },
  };

  const lang = locale as 'en' | 'zh';
  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/calculators/tax`,
      languages: {
        'en': `${baseUrl}/en/calculators/tax`,
        'zh': `${baseUrl}/zh/calculators/tax`,
      },
    },
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      siteName: 'WealthEase',
      locale: locale,
      url: `${baseUrl}/${locale}/calculators/tax`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    } as any,
  };
}

export default async function TaxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.tax');

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

        <TaxCalculator />

        {/* SEO Content */}
        <div className="mt-16">
          {locale === 'zh' ? (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🧾</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">美国税务简介</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      了解美国税务系统可以帮助您更好地规划财务。
                      <strong>本计算器估算联邦所得税、州税和FICA</strong>，帮助您了解实际到手收入。
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2026年联邦税级（单身）</h3>
                <div className="bg-white rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">税级</th>
                        <th className="px-4 py-3 text-left">收入范围</th>
                        <th className="px-4 py-3 text-left">税率</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-4 py-3">10%</td><td>$0 - $12,400</td><td>首$12,400</td></tr>
                      <tr><td className="px-4 py-3">12%</td><td>$12,401 - $50,400</td><td>超出部分</td></tr>
                      <tr><td className="px-4 py-3">22%</td><td>$50,401 - $105,700</td><td>超出部分</td></tr>
                      <tr><td className="px-4 py-3">24%</td><td>$105,701 - $201,775</td><td>超出部分</td></tr>
                      <tr><td className="px-4 py-3">32%</td><td>$201,776 - $256,225</td><td>超出部分</td></tr>
                      <tr><td className="px-4 py-3">35%</td><td>$256,226 - $640,600</td><td>超出部分</td></tr>
                      <tr><td className="px-4 py-3">37%</td><td>$640,601+</td><td>超出部分</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见抵税项目</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-amber-800 mb-1">401(k) / 403(b)</p>
                    <p className="text-gray-600 text-sm">2026年上限$24,500，50岁以上可多缴$8,000。</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-1">HSA健康储蓄账户</p>
                    <p className="text-gray-600 text-sm">2026年：个人$4,400，家庭$8,750。</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-1">传统IRA</p>
                    <p className="text-gray-600 text-sm">2026年上限$7,500（50岁以上可多缴$1,100；有收入限制）。</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-800 mb-1">标准扣除额</p>
                    <p className="text-gray-600 text-sm">2026年：单身$16,100，已婚联合$32,200，户主$24,150。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">常见问题 (FAQ)</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: 有效税率和边际税率有什么区别？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> 边际税率是最后一美元收入的税率（如22%），有效税率是总税款除以总收入（通常更低）。</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>Q: W-4表格如何填写？</span>
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-600">
                      <p><strong>A:</strong> W-4影响预扣税款。使用计算器估算后，调整W-4的免税额和额外预扣项，避免多退少补。</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Income Tax Estimator</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Estimate your federal income tax, state tax, and take-home pay.
                </p>
              </section>

              <section className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">2026 Tax Brackets (Single)</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">10%</p>
                    <p className="text-sm text-gray-500">$0 - $12,400</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">12%</p>
                    <p className="text-sm text-gray-500">$12,401 - $50,400</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">22%</p>
                    <p className="text-sm text-gray-500">$50,401 - $105,700</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">24%+</p>
                    <p className="text-sm text-gray-500">$105,701+</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="tax" />
      </div>
    </div>
  );
}
