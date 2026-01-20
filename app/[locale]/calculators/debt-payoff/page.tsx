import { getTranslations, setRequestLocale } from 'next-intl/server';
import DebtPayoffCalculator from '@/components/calculators/DebtPayoffCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Debt Payoff Calculator - Become Debt Free Faster | WealthEase',
      description: 'Free debt payoff calculator to create your personalized debt elimination plan. Compare avalanche vs snowball methods and see how extra payments can save you thousands.',
      keywords: 'debt payoff calculator, debt snowball calculator, debt avalanche calculator, debt elimination, become debt free, loan payoff calculator',
    },
    zh: {
      title: '债务还清计算器 - 更快摆脱债务 | WealthEase',
      description: '免费债务还清计算器，帮助您创建个性化债务消除计划。比较雪崩法和雪球法，了解额外还款如何为您节省数千元。',
      keywords: '债务还清计算器, 债务雪球计算器, 债务雪崩计算器, 债务消除, 摆脱债务, 贷款还清计算器',
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
      canonical: `${baseUrl}/${locale}/calculators/debt-payoff`,
      languages: {
        'en': `${baseUrl}/en/calculators/debt-payoff`,
        'zh': `${baseUrl}/zh/calculators/debt-payoff`,
      },
    },
  };
}

export default async function DebtPayoffPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.debtPayoff');

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

        <DebtPayoffCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          {locale === 'zh' ? (
            <div className="mt-16 prose prose-lg max-w-none">
              <h2>债务还清指南：如何更快实现无债一身轻？</h2>
              <p>
                摆脱债务是理财自由的第一步。本计算器不仅能帮您算出何时能还清债务，还能对比不同的还款策略，看看它们能为您节省多少利息。
              </p>

              <h3>两大核心还款策略</h3>
              <ul>
                <li><strong>雪崩法 (Avalanche Method)</strong>：<br />
                  <em>优先偿还利率最高的债务</em>（如高息信用卡）。从数学上讲，这是最优策略，因为它能最大程度减少利息支出，帮您最快上岸。
                </li>
                <li><strong>雪球法 (Snowball Method)</strong>：<br />
                  <em>优先偿还余额最小的债务</em>。虽然总体利息可能稍多，但这种方法能让您通过快速消灭小额债务获得成就感，心理上更容易坚持。
                </li>
              </ul>

              <h2>如何使用此工具？</h2>
              <ol>
                <li><strong>列出所有债务</strong>：点击"添加债务"，输入每笔贷款的当前余额、年利率和最低月还款额。</li>
                <li><strong>输入额外还款</strong>：如果您每月能省下几百元用于额外还债，请在"额外月还款"中填入，您会惊讶地发现这能把还款期缩短数年！</li>
                <li><strong>选择策略</strong>：切换"雪崩法"与"雪球法"，观察利息总额的变化。</li>
              </ol>

              <h2>加速还债的小贴士</h2>
              <p>
                1. <strong>暂停不必要的开支</strong>：暂时取消订阅服务、减少外出就餐，将省下的钱全部投入到"额外还款"中。<br />
                2. <strong>债务重组</strong>：如果您的信用卡利率高达20%，考虑申请一笔利率较低（如8%-10%）的个人贷款将其一次性置换。<br />
                3. <strong>不仅是支付最低额</strong>：只还最低还款额通常会导致您支付巨额利息且需数十年才能还清。
              </p>
            </div>
          ) : (
            <div className="mt-16 prose prose-lg max-w-none">
              <h2>Debt Payoff Guide: How to Become Debt-Free Faster</h2>
              <p>
                Getting out of debt is the first step toward financial freedom. This calculator helps you forecast your debt-free date and compares different payoff strategies to see how much interest you can save.
              </p>

              <h3>Top 2 Payoff Strategies</h3>
              <ul>
                <li><strong>Avalanche Method</strong>:<br />
                  <em>Prioritize the debt with the highest interest rate.</em> Mathematically, this is the best strategy. By attacking high-interest debts (like credit cards) first, you pay less interest overall and get out of debt faster.
                </li>
                <li><strong>Snowball Method</strong>:<br />
                  <em>Prioritize the debt with the smallest balance.</em> Comparing to the Avalanche method, you might pay slightly more interest, but knocking out small debts quickly gives you psychological "wins" that keep you motivated.
                </li>
              </ul>

              <h2>How to Use This Tool</h2>
              <ol>
                <li><strong>List Your Debts</strong>: Add all your loans, credit cards, or other debts. Enter the current balance, APR, and minimum monthly payment for each.</li>
                <li><strong>Add Extra Payments</strong>: If you can squeeze an extra $50 or $100 from your budget, enter it in the "Monthly Extra Payment" field. You'll stick to see how many months (or years!) this shaves off your timeline.</li>
                <li><strong>Compare</strong>: Toggle between Avalanche and Snowball to see the difference in total interest paid.</li>
              </ol>

              <h2>Tips to Speed Up Repayment</h2>
              <p>
                1. <strong>Stop New Debt</strong>: Put the credit cards in a drawer. Stop adding to the pile while you're trying to shovel it away.<br />
                2. <strong>Debt Consolidation</strong>: If you have high-interest debt (20%+), see if you qualify for a personal loan with a lower rate (e.g., 10%) to pay it off instantly.<br />
                3. <strong>Windfalls</strong>: Use tax refunds, bonuses, or cash gifts to make lump-sum payments on your principal.
              </p>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="debt-payoff" />
      </div>
    </div>
  );
}
