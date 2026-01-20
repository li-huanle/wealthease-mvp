import {getTranslations, setRequestLocale} from 'next-intl/server';
import dynamic from 'next/dynamic';
import RelatedCalculators from '@/components/RelatedCalculators';

// 动态导入计算器组件，显示骨架屏
const CompoundInterestCalculator = dynamic(
  () => import('@/components/calculators/CompoundInterestCalculator'),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-96 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-200 rounded-lg h-32"></div>
          <div className="bg-gray-200 rounded-lg h-32"></div>
          <div className="bg-gray-200 rounded-lg h-32"></div>
        </div>
      </div>
    ),
  }
);

export default async function CompoundInterestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.compound');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <CompoundInterestCalculator />
        
{locale === 'zh' ? (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>什么是复利？</h2>
            <p>
              复利（Compound Interest）往往被爱因斯坦称为"世界第八大奇迹"。它的核心原理是：不仅本金产生利息，已经产生的利息也会在下一个周期产生新的利息。这种"利滚利"的效应，随着时间的推移，会让财富呈现指数级增长。
            </p>
            
            <h3>复利计算公式</h3>
            <p>
              复利的基本公式为：<strong>A = P(1 + r/n)^(nt)</strong>
            </p>
            <ul>
              <li><strong>P (Principal)</strong>：本金（初始投资额）</li>
              <li><strong>r (Rate)</strong>：年利率（以小数表示，如5% = 0.05）</li>
              <li><strong>n (Number)</strong>：每年复利次数（如按月复利则n=12）</li>
              <li><strong>t (Time)</strong>：投资年限</li>
            </ul>

            <h2>如何使用此复利计算器？</h2>
            <ol>
              <li><strong>初始投资</strong>：输入您现在的本金金额。</li>
              <li><strong>每月投入</strong>：输入您计划每月追加投资的金额（定投）。</li>
              <li><strong>年利率</strong>：输入预期的年化收益率（例如股票长期平均约为7%-10%）。</li>
              <li><strong>投资年限</strong>：输入您计划投资的时间长度。</li>
            </ol>
            <p>
              点击"计算"后，您将看到更加直观的图表，展示本金、定期投入和利息收益随时间变化的趋势。
            </p>

            <h2>复利实际案例</h2>
            <p>
              假设您现在25岁，每月投资2000元，年化收益率为8%：
            </p>
            <ul>
              <li><strong>10年后</strong>：您投入了24万，账户总值约为36万。</li>
              <li><strong>20年后</strong>：您投入了48万，账户总值约为118万。</li>
              <li><strong>30年后</strong>：您投入了72万，账户总值约为298万。</li>
            </ul>
            <p>
              可以看到，随着时间推移，利息收益（复利部分）逐渐超过了您的本金投入。
            </p>

            <h3>常见问题 (FAQ)</h3>
            <dl>
              <dt><strong>Q: 复利频率对收益有影响吗？</strong></dt>
              <dd>A: 有影响。复利频率越高（如按日或按月），最终收益越高，但对于长期投资来说，按月复利和按年复利的差别通常在可接受范围内。</dd>
              
              <dt><strong>Q: 多少年化收益率是合理的？</strong></dt>
              <dd>A: 一般银行储蓄约为2%-3%，债券约为4%-6%，股票指数基金长期平均约为8%-10%。高收益通常伴随高风险。</dd>
            </dl>
          </div>
        ) : (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>What is Compound Interest?</h2>
            <p>
              Compound interest is the interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods on a deposit or loan. Albert Einstein reportedly called usage of compound interest "the eighth wonder of the world."
            </p>
            <p>
              Unlike simple interest, where you only earn interest on your principal, compound interest allows your money to grow at an accelerating rate. It is the fundamental concept behind building wealth over time.
            </p>

            <h3>The Compound Interest Formula</h3>
            <p>
              The formula used in this calculator is: <strong>A = P(1 + r/n)^(nt)</strong>
            </p>
            <ul>
              <li><strong>P (Principal)</strong>: Your initial investment</li>
              <li><strong>r (Annual Interest Rate)</strong>: The expected return (decimal)</li>
              <li><strong>n (Compound Frequency)</strong>: Times per year interest is compounded</li>
              <li><strong>t (Time)</strong>: Number of years invested</li>
            </ul>

            <h2>How to Use This Calculator</h2>
            <ol>
              <li><strong>Initial Investment</strong>: The amount of money you have to start with.</li>
              <li><strong>Monthly Contribution</strong>: Amount you plan to add to your investment each month.</li>
              <li><strong>Interest Rate</strong>: Your estimated annual return (e.g., 7% for stock market average).</li>
              <li><strong>Years</strong>: How long you plan to let the money grow.</li>
            </ol>

            <h2>Real-Life Example</h2>
            <p>
              Let's say you invest $5,000 upfront and contribute $500 monthly for 20 years at an 8% annual return:
            </p>
            <ul>
              <li><strong>Total Contributions</strong>: $125,000</li>
              <li><strong>Interest Earned</strong>: $171,000+</li>
              <li><strong>Final Balance</strong>: ~$296,000</li>
            </ul>
            <p>
              Notice that your interest earned is significantly higher than your total contributions. This is the power of compound interest working over time.
            </p>

            <h3>Frequently Asked Questions</h3>
            <dl>
              <dt><strong>Does compounding frequency matter?</strong></dt>
              <dd>Yes, more frequent compounding (monthly/daily) yields higher returns than annual compounding, though the difference is often small for typical savings accounts.</dd>

              <dt><strong>What is a realistic interest rate?</strong></dt>
              <dd>Savings accounts typically offer 1-4%, bonds 4-6%, and the stock market historically averages 7-10% annually over long periods (inflation adjusted).</dd>
            </dl>
          </div>
        )}

        <RelatedCalculators currentCalculator="compound-interest" />
      </div>
    </div>
  );
}
