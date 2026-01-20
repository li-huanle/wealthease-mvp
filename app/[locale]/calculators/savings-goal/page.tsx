import { getTranslations, setRequestLocale } from 'next-intl/server';
import SavingsGoalCalculator from '@/components/calculators/SavingsGoalCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Savings Goal Calculator - Plan Your Financial Future | WealthEase',
      description: 'Free savings goal calculator to help you plan and reach your financial targets. Calculate how much to save monthly to achieve your savings goals with our easy-to-use tool.',
      keywords: 'savings goal calculator, financial planning calculator, savings planner, savings target, financial goals calculator, savings calculator',
    },
    zh: {
      title: '储蓄目标计算器 - 规划您的财务未来 | WealthEase',
      description: '免费储蓄目标计算器，帮助您规划和实现财务目标。使用我们易用的工具计算每月需要储蓄多少才能达成储蓄目标。',
      keywords: '储蓄目标计算器, 理财规划计算器, 储蓄规划, 储蓄目标, 财务目标计算器, 储蓄计算器',
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
      canonical: `${baseUrl}/${locale}/calculators/savings-goal`,
      languages: {
        'en': `${baseUrl}/en/calculators/savings-goal`,
        'zh': `${baseUrl}/zh/calculators/savings-goal`,
      },
    },
  };
}

export default async function SavingsGoalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.savingsGoal');

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

        <SavingsGoalCalculator />

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          {locale === 'zh' ? (
            <div className="mt-16 prose prose-lg max-w-none">
              <h2>储蓄目标计算器：规划您的梦想</h2>
              <p>
                无论是买房首付、婚礼基金还是梦想假期的旅费，设定一个清晰的储蓄目标是实现梦想的第一步。本计算器帮您将宏大的目标拆解为每月可执行的储蓄计划。
              </p>

              <h3>如何制定SMART储蓄目标？</h3>
              <ul>
                <li><strong>S (Specific) 具体</strong>：不要说"我想存钱"，而要说"我想存30万作为首付"。</li>
                <li><strong>M (Measurable) 可衡量</strong>：确定具体的金额和截止日期。</li>
                <li><strong>A (Achievable) 可实现</strong>：确保目标金额在您的收入能力范围内。</li>
                <li><strong>R (Relevant) 相关性</strong>：这个目标对您现阶段的生活重要吗？</li>
                <li><strong>T (Time-bound) 有时限</strong>：给自己设定一个明确的Deadline（截止日期）。</li>
              </ul>

              <h2>如何使用此工具？</h2>
              <ol>
                <li><strong>目标金额</strong>：您总共需要存多少钱？</li>
                <li><strong>当前储蓄</strong>：您现在手头已经有多少启动资金？</li>
                <li><strong>每月投入</strong>：您计划每个月存入多少钱？</li>
                <li><strong>投资回报率</strong>：如果您将储蓄用于理财，预期的年化收益率是多少（保守估计建议填2%-3%）？</li>
              </ol>
              <p>
                点击计算后，系统会告诉您按目前的进度何时能达成目标，或者建议您每月应该存多少钱才能按时达成。
              </p>

              <h3>加速储蓄的3个秘诀</h3>
              <p>
                1. <strong>自动化（Pay Yourself First）</strong>：工资到账当天设置自动转账到储蓄账户，先储蓄后消费。<br />
                2. <strong>高收益账户</strong>：不要让钱躺在活期账户里睡觉，放入货币基金或短期理财产品中赚取收益。<br />
                3. <strong>积少成多</strong>：每天少喝一杯奶茶，一年就能多存几千元。
              </p>
            </div>
          ) : (
            <div className="mt-16 prose prose-lg max-w-none">
              <h2>Savings Goal Calculator: Plan Your Dream</h2>
              <p>
                Whether it's a down payment for a home, a wedding fund, or a dream vacation, setting a clear savings goal is the first step to making it a reality. This calculator breaks down your big goals into manageable monthly savings targets.
              </p>

              <h3>Setting SMART Savings Goals</h3>
              <ul>
                <li><strong>Specific</strong>: Don't just say "I want to save." Say "I want to save $30,000 for a down payment."</li>
                <li><strong>Measurable</strong>: Define the exact amount and the deadline.</li>
                <li><strong>Achievable</strong>: Ensure the goal is realistic given your income.</li>
                <li><strong>Relevant</strong>: Does this goal matter to your life right now?</li>
                <li><strong>Time-bound</strong>: Set a firm deadline to keep yourself accountable.</li>
              </ul>

              <h2>How to Use This Tool</h2>
              <ol>
                <li><strong>Goal Amount</strong>: How much total money do you need?</li>
                <li><strong>Current Savings</strong>: How much do you have saved up right now?</li>
                <li><strong>Monthly Contribution</strong>: How much can you save each month?</li>
                <li><strong>Expected Return</strong>: If you invest your savings, what's the annual return? (Conservative estimate: 2-4% for high-yield savings).</li>
              </ol>
              <p>
                After calculating, we'll tell you when you'll reach your goal at your current pace, or how much more you need to save to hit your target date.
              </p>

              <h3>3 Secrets to Saving Faster</h3>
              <p>
                1. <strong>Automate It</strong>: Set up an automatic transfer on payday. "Pay yourself first" before you have a chance to spend it.<br />
                2. <strong>High-Yield Accounts</strong>: Don't let your money sleep in a checking account. Move it to a High-Yield Savings Account (HYSA) to earn interest.<br />
                3. <strong>Micro-Habits</strong>: Cutting one small daily expense can add up to thousands over a few years.
              </p>
            </div>
          )}
        </div>

        <RelatedCalculators currentCalculator="savings-goal" />
      </div>
    </div>
  );
}
