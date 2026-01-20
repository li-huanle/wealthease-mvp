import { getTranslations, setRequestLocale } from 'next-intl/server';
import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

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
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>为什么退休规划如此重要？</h2>
            <p>
              退休规划是确保您晚年生活质量的关键。随着人均寿命的延长和医疗成本的增加，仅靠社会养老金往往难以维持理想的生活水平。尽早开始规划，利用时间的复利效应，是实现财务自由的最佳途径。
            </p>

            <h3>4% 退休法则</h3>
            <p>
              理财界著名的"4%法则"认为，如果您每年从退休储蓄中提取不超过4%的资金，那么您的积蓄理论上可以维持30年以上而不会耗尽。这意味着，您需要的退休总储蓄大约是您期望年支出的25倍。
            </p>

            <h2>如何使用此退休计算器？</h2>
            <ol>
              <li><strong>当前年龄 & 退休年龄</strong>：输入您现在的年龄和计划退休的年龄。</li>
              <li><strong>当前储蓄</strong>：您目前已经积累的养老金或投资储备。</li>
              <li><strong>每月储蓄</strong>：您计划每月存入多少钱用于退休投资。</li>
              <li><strong>预期年化收益率</strong>：输入投资组合的预期长期回报率（如6%-8%）。</li>
              <li><strong>退休后每月支出</strong>：估算您退休后每月需要多少生活费（按现值计算）。</li>
              <li><strong>预期寿命</strong>：用于测算储蓄是否足够覆盖您的一生。</li>
            </ol>

            <h2>退休规划的关键因素</h2>
            <ul>
              <li><strong>尽早开始</strong>：25岁开始储蓄比35岁开始要轻松得多。</li>
              <li><strong>持续投资</strong>：定期定额投资（定投）可以平滑市场波动风险。</li>
              <li><strong>资产配置</strong>：年轻时可以适当增加股票比例以获取更高收益，临近退休时应增加债券比例以保值。</li>
              <li><strong>通货膨胀</strong>：切勿忽视通胀对购买力的侵蚀，长期规划必须考虑均值约3%的通胀率。</li>
            </ul>

            <h3>常见退休储蓄策略</h3>
            <p>
              在中国，除了依靠基本养老保险外，越来越多的年轻人开始配置商业养老保险、指数基金定投或房产投资来构建多支柱养老体系。在美国，则通常利用401(k)和IRA等税收优惠账户进行长期投资。
            </p>
          </div>
        ) : (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>Why Retirement Planning Matters</h2>
            <p>
              Retirement planning is essential because it determines your quality of life in your later years. With increasing life expectancy and rising healthcare costs, relying solely on Social Security is rarely enough. The earlier you start, the more manageable your savings goals become, thanks to the power of compound interest.
            </p>

            <h3>The 4% Rule</h3>
            <p>
              A common rule of thumb in retirement planning is the "4% Rule," which suggests that if you withdraw 4% of your portfolio in the first year of retirement and adjust for inflation thereafter, your savings should last for at least 30 years. This implies you need to save about 25 times your annual retirement expenses.
            </p>

            <h2>How to Use This Calculator</h2>
            <ol>
              <li><strong>Current & Retirement Age</strong>: Define your timeline.</li>
              <li><strong>Current Savings</strong>: Enter what you have saved so far.</li>
              <li><strong>Monthly Savings</strong>: How much can you contribute each month?</li>
              <li><strong>Expected Annual Return</strong>: A conservative estimate for a diversified portfolio is often 6-8%.</li>
              <li><strong>Monthly Expenses in Retirement</strong>: Estimate your future budget (in today's dollars).</li>
              <li><strong>Life Expectancy</strong>: Helps calculate if your money will last as long as you do.</li>
            </ol>

            <h2>Key Factors to Consider</h2>
            <ul>
              <li><strong>Start Early</strong>: Starting at 25 vs. 35 makes a massive difference due to compounding.</li>
              <li><strong>Inflation</strong>: Your money will buy less in the future. This calculator adjusts for inflation to keep your purchasing power in check.</li>
              <li><strong>Healthcare Costs</strong>: Often the largest expense in retirement; ensure you buffer for this.</li>
              <li><strong>Market Volatility</strong>: Diversify your investments to protect against market downturns, especially as you near retirement.</li>
            </ul>

            <h3>Strategies to Boost Savings</h3>
            <p>
              Maximize contributions to tax-advantaged accounts like 401(k)s (especially if your employer matches) and IRAs. Increasing your savings rate by even 1% annually can significantly impact your final nest egg.
            </p>
          </div>
        )}

        <RelatedCalculators currentCalculator="retirement" />
      </div>
    </div>
  );
}
