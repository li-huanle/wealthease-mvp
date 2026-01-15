import {getTranslations, setRequestLocale} from 'next-intl/server';
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
          {locale === 'en' ? (
            <>
              <h2>How to Use This Savings Goal Calculator</h2>
              <p>
                Planning for your financial future starts with setting clear savings goals.
                Whether you're saving for a down payment on a house, building an emergency fund,
                or planning a dream vacation, this calculator helps you create a realistic savings plan.
              </p>

              <h3>Step-by-Step Guide</h3>
              <ol>
                <li><strong>Set Your Goal Amount:</strong> Enter the total amount you want to save</li>
                <li><strong>Current Savings:</strong> Input any money you've already saved</li>
                <li><strong>Monthly Contributions:</strong> Decide how much you can save each month</li>
                <li><strong>Timeline:</strong> Set your target date for reaching your goal</li>
                <li><strong>Expected Returns:</strong> Include interest rate if investing your savings</li>
                <li><strong>Calculate:</strong> See if you're on track and get personalized recommendations</li>
              </ol>

              <h3>Why Set Savings Goals?</h3>
              <ul>
                <li><strong>Motivation:</strong> Clear goals keep you focused and motivated</li>
                <li><strong>Tracking:</strong> Measure your progress over time</li>
                <li><strong>Planning:</strong> Create realistic timelines for major purchases</li>
                <li><strong>Compound Growth:</strong> See how interest accelerates your savings</li>
              </ul>

              <h3>Tips for Reaching Your Savings Goals Faster</h3>
              <ul>
                <li>Automate your savings - set up automatic transfers</li>
                <li>Start with high-yield savings accounts (3-4% APY)</li>
                <li>Use windfalls (tax refunds, bonuses) to boost savings</li>
                <li>Reduce small expenses that add up over time</li>
                <li>Consider investing for longer-term goals</li>
              </ul>

              <h3>Popular Savings Goals</h3>
              <ul>
                <li><strong>Emergency Fund:</strong> 3-6 months of expenses</li>
                <li><strong>Home Down Payment:</strong> 10-20% of home price</li>
                <li><strong>Vacation:</strong> $5,000 - $10,000 depending on destination</li>
                <li><strong>Car:</strong> 20% or more of vehicle price</li>
                <li><strong>Wedding:</strong> $20,000 - $30,000 on average</li>
              </ul>
            </>
          ) : (
            <>
              <h2>如何使用储蓄目标计算器</h2>
              <p>
                规划财务未来始于设定明确的储蓄目标。无论您是为购房首付储蓄、建立应急基金，
                还是计划梦想假期，这个计算器都能帮助您创建现实的储蓄计划。
              </p>

              <h3>分步指南</h3>
              <ol>
                <li><strong>设定目标金额：</strong> 输入您想要储蓄的总金额</li>
                <li><strong>当前储蓄：</strong> 输入您已经存下的钱</li>
                <li><strong>月度投入：</strong> 决定您每月能存多少钱</li>
                <li><strong>时间线：</strong> 设定实现目标的目标日期</li>
                <li><strong>预期回报：</strong> 如果投资储蓄，包含利率</li>
                <li><strong>计算：</strong> 查看您是否按计划并获得个性化建议</li>
              </ol>

              <h3>为什么要设定储蓄目标？</h3>
              <ul>
                <li><strong>动力：</strong> 明确的目标让您保持专注和动力</li>
                <li><strong>追踪：</strong> 随时间衡量进度</li>
                <li><strong>规划：</strong> 为重大购买创建现实的时间线</li>
                <li><strong>复利增长：</strong> 看到利息如何加速储蓄增长</li>
              </ul>

              <h3>更快达成储蓄目标的技巧</h3>
              <ul>
                <li>自动化储蓄 - 设置自动转账</li>
                <li>使用高收益储蓄账户（3-4% APY）</li>
                <li>利用意外之财（退税、奖金）增加储蓄</li>
                <li>减少累积起来的小开支</li>
                <li>为长期目标考虑投资</li>
              </ul>

              <h3>常见储蓄目标</h3>
              <ul>
                <li><strong>应急基金：</strong> 3-6个月的支出</li>
                <li><strong>房屋首付：</strong> 房价的10-20%</li>
                <li><strong>度假：</strong> 5,000-10,000元，取决于目的地</li>
                <li><strong>汽车：</strong> 车价的20%或更多</li>
                <li><strong>婚礼：</strong> 平均20,000-30,000元</li>
              </ul>
            </>
          )}
        </div>

        <RelatedCalculators currentCalculator="savings-goal" />
      </div>
    </div>
  );
}
