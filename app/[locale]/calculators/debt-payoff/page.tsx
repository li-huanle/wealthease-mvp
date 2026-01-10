import {getTranslations, setRequestLocale} from 'next-intl/server';
import DebtPayoffCalculator from '@/components/calculators/DebtPayoffCalculator';
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
          {locale === 'en' ? (
            <>
              <h2>How to Use This Debt Payoff Calculator</h2>
              <p>
                Becoming debt-free starts with a plan. This calculator helps you visualize your path to
                financial freedom by showing you exactly when you'll be debt-free and how much you'll save in interest.
              </p>

              <h3>Step-by-Step Guide</h3>
              <ol>
                <li><strong>List Your Debts:</strong> Enter all your debts with balances, interest rates, and minimum payments</li>
                <li><strong>Add Extra Payments:</strong> See how much you can save by paying more than the minimum</li>
                <li><strong>Choose Your Strategy:</strong> Compare avalanche (highest interest first) vs snowball (smallest balance first)</li>
                <li><strong>See Your Timeline:</strong> Get your debt-free date and total interest paid</li>
              </ol>

              <h3>Debt Payoff Strategies: Avalanche vs Snowball</h3>
              <p>
                <strong>The Debt Avalanche Method</strong> pays off debts with the highest interest rates first.
                This is the mathematically optimal approach that saves the most money in interest payments.
              </p>
              <p>
                <strong>The Debt Snowball Method</strong> pays off the smallest balances first.
                This provides quick wins and psychological motivation to keep going.
              </p>

              <h3>Why Pay Off Debt Early?</h3>
              <ul>
                <li><strong>Save Money:</strong> Pay less interest over time</li>
                <li><strong>Improve Credit Score:</strong> Lower credit utilization boosts your score</li>
                <li><strong>Reduce Stress:</strong> Financial peace of mind</li>
                <li><strong>More Options:</strong> Freedom to pursue other goals without debt burden</li>
              </ul>

              <h3>Tips to Pay Off Debt Faster</h3>
              <ul>
                <li>Pay more than the minimum on one debt while paying minimums on others</li>
                <li>Use windfalls (tax refunds, bonuses) to make lump-sum payments</li>
                <li>Consider consolidating high-interest debt to a lower rate</li>
                <li>Cut expenses temporarily and direct savings to debt payments</li>
                <li>Negotiate lower interest rates with creditors</li>
              </ul>

              <h3>Common Types of Debt</h3>
              <ul>
                <li><strong>Credit Cards:</strong> Typically 15-25% APR - prioritize these!</li>
                <li><strong>Personal Loans:</strong> Usually 6-36% APR depending on credit</li>
                <li><strong>Student Loans:</strong> Federal loans 3-7%, private loans may vary</li>
                <li><strong>Car Loans:</strong> Typically 3-10% APR</li>
                <li><strong>Mortgages:</strong> Usually lowest rate, pay off after other debts</li>
              </ul>
            </>
          ) : (
            <>
              <h2>如何使用债务还清计算器</h2>
              <p>
                摆脱债务始于计划。这个计算器通过向您展示确切的无债日期和节省的利息金额，
                帮助您可视化财务自由之路。
              </p>

              <h3>分步指南</h3>
              <ol>
                <li><strong>列出债务：</strong> 输入所有债务的余额、利率和最低还款额</li>
                <li><strong>增加额外还款：</strong> 查看超过最低还款额能节省多少</li>
                <li><strong>选择策略：</strong> 比较雪崩法（最高利率优先）vs 雪球法（最小余额优先）</li>
                <li><strong>查看时间线：</strong> 获得无债日期和总利息支出</li>
              </ol>

              <h3>债务还清策略：雪崩法 vs 雪球法</h3>
              <p>
                <strong>债务雪崩法</strong>优先偿还利率最高的债务。
                这是数学上最优的方法，能节省最多的利息支出。
              </p>
              <p>
                <strong>债务雪球法</strong>优先偿还余额最小的债务。
                这提供快速胜利和心理动力，让您坚持下去。
              </p>

              <h3>为什么要提前还清债务？</h3>
              <ul>
                <li><strong>省钱：</strong> 随时间支付更少的利息</li>
                <li><strong>提高信用评分：</strong> 更低的信用利用率提高您的分数</li>
                <li><strong>减少压力：</strong> 财务内心平静</li>
                <li><strong>更多选择：</strong> 没有债务负担，可以追求其他目标</li>
              </ul>

              <h3>更快还清债务的技巧</h3>
              <ul>
                <li>对一笔债务支付超过最低还款额，同时对其他债务支付最低额</li>
                <li>利用意外之财（退税、奖金）进行一次性还款</li>
                <li>考虑将高息债务合并到较低利率</li>
                <li>暂时削减支出，将节省的钱用于还债</li>
                <li>与债权人协商降低利率</li>
              </ul>

              <h3>常见债务类型</h3>
              <ul>
                <li><strong>信用卡：</strong> 通常15-25%年利率 - 优先处理这些！</li>
                <li><strong>个人贷款：</strong> 通常6-36%年利率，取决于信用</li>
                <li><strong>学生贷款：</strong> 联邦贷款3-7%，私人贷款可能不同</li>
                <li><strong>汽车贷款：</strong> 通常3-10%年利率</li>
                <li><strong>抵押贷款：</strong> 通常利率最低，在其他债务之后还清</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
