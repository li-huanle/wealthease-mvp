import { getTranslations, setRequestLocale } from 'next-intl/server';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

export default async function MortgagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.mortgage');

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

        <MortgageCalculator />

        {locale === 'zh' ? (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>理解房贷计算：从本金到PMI</h2>
            <p>
              房屋贷款（Mortgage）通常是家庭最大的单笔负债。一个标准的月供不仅包含还给银行的本金和利息，通常还包括房产税、房屋保险以及可能产生的私人抵押贷款保险（PMI）。
            </p>

            <h3>月供的组成部分</h3>
            <ul>
              <li><strong>本息 (P&I)</strong>：偿还贷款本金和支付利息的核心部分。</li>
              <li><strong>房产税 (Property Tax)</strong>：地方政府征收的税费，通常由贷款机构代收代缴。</li>
              <li><strong>房屋保险 (Home Insurance)</strong>：保护房屋免受火灾、风暴等损害的必要保险。</li>
              <li><strong>PMI</strong>：如果您首付低于20%，银行通常会强制要求购买此保险以降低其风险。</li>
              <li><strong>HOA费用</strong>：如果您购买的是公寓或位于有业主协会的社区，还需考虑每月的物业管理费。</li>
            </ul>

            <h2>如何使用房贷计算器？</h2>
            <ol>
              <li><strong>房屋价格</strong>：输入房产的总交易价格。</li>
              <li><strong>首付比例</strong>：输入您计划支付的首付百分比（通常为20%以避免PMI）。</li>
              <li><strong>年利率</strong>：输入银行批准的贷款利率。</li>
              <li><strong>贷款年限</strong>：选择15年或30年（通常30年利息更多但月供更低）。</li>
              <li><strong>税费保险</strong>：输入预估的年度房产税和保险费用。</li>
            </ol>

            <h2>给购房者的建议</h2>
            <p>
              1. <strong>尽量凑齐20%首付</strong>：这不仅能帮您省下PMI费用，通常还能获得更优的利率。<br />
              2. <strong>预先批准 (Pre-approval)</strong>：看房前先拿到银行预批信，明确您的预算上限。<br />
              3. <strong>考虑15年期贷款</strong>：如果您能负担较高的月供，15年期贷款能为您节省巨额利息。<br />
              4. <strong>留足备用金</strong>：购房后会有维护费、家具费等隐性支出，不要把所有积蓄都用作首付。
            </p>
          </div>
        ) : (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>Understanding Your Mortgage Payment</h2>
            <p>
              A mortgage payment is often the single largest monthly expense for homeowners. It’s not just repayment of your loan; it typically bundles property taxes, insurance, and interest into one payment (often called PITI).
            </p>

            <h3>The 4 Parts of a Mortgage Payment (PITI)</h3>
            <ul>
              <li><strong>Principal</strong>: The portion that pays down the amount you borrowed.</li>
              <li><strong>Interest</strong>: The fee paid to the lender for the privilege of borrowing money.</li>
              <li><strong>Taxes</strong>: Property taxes paid to your local government, often held in escrow by the lender.</li>
              <li><strong>Insurance</strong>: Homeowners insurance protects your property from damage.</li>
            </ul>

            <p>
              <em>Note: If your down payment is under 20%, you may also pay Private Mortgage Insurance (PMI).</em>
            </p>

            <h2>How to Use This Mortgage Calculator</h2>
            <ol>
              <li><strong>Home Price</strong>: The total purchase price of the property.</li>
              <li><strong>Down Payment</strong>: How much cash you are paying upfront (e.g., 20%).</li>
              <li><strong>Interest Rate</strong>: The user's current mortgage rate.</li>
              <li><strong>Loan Term</strong>: Standard terms are 15 or 30 years.</li>
              <li><strong>Taxes & Insurance</strong>: Estimate annual costs for accurate monthly budgeting.</li>
            </ol>

            <h2>15-Year vs. 30-Year Mortgage</h2>
            <p>
              <strong>30-Year:</strong> Lower monthly payments, but you pay significantly more interest over the life of the loan.<br />
              <strong>15-Year:</strong> Higher monthly payments, but you build equity faster and save thousands in interest.
            </p>

            <h3>What is PMI?</h3>
            <p>
              Private Mortgage Insurance (PMI) is an extra fee charged by lenders if your down payment is less than 20%. It protects the lender, not you. The good news is that once you reach 20% equity in your home, you can request to have PMI removed.
            </p>
          </div>
        )}

        <RelatedCalculators currentCalculator="mortgage" />
      </div>
    </div>
  );
}
