import { getTranslations, setRequestLocale } from 'next-intl/server';
import LoanCalculator from '@/components/calculators/LoanCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

export default async function LoanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.loan');

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

        <LoanCalculator />

        {locale === 'zh' ? (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>贷款计算器：理解您的月供</h2>
            <p>
              无论是申请个人贷款、汽车贷款还是商业贷款，理解月供的构成都至关重要。本计算器采用标准的等额本息还款法，帮助您精确计算每月的还款额及总利息支出。
            </p>

            <h3>关键术语解释</h3>
            <ul>
              <li><strong>本金 (Principal)</strong>：您从银行或贷款机构借入的原始金额。</li>
              <li><strong>年利率 (APR)</strong>：贷款的年度成本，通常以百分比表示。信用评分越高，通常能获得越低的利率。</li>
              <li><strong>贷款期限 (Term)</strong>：您需要还清贷款的时间长度。期限越长，月供越低，但总支付利息越多。</li>
            </ul>

            <h2>如何使用贷款计算器？</h2>
            <ol>
              <li><strong>贷款金额</strong>：输入您想借入的总额。</li>
              <li><strong>年利率</strong>：输入银行提供的年化利率。</li>
              <li><strong>贷款期限</strong>：选择或输入还款年限。</li>
            </ol>
            <p>
              点击"计算"后，您将看到每月需要支付的固定金额（月供），以及在整个贷款期间您将支付的利息总额。
            </p>

            <h2>如何降低贷款成本？</h2>
            <p>
              1. <strong>提高信用分</strong>：良好的信用记录能帮您拿到更低的利率。<br />
              2. <strong>缩短贷款期限</strong>：虽然月供会增加，但总利息支出会大幅减少。<br />
              3. <strong>额外还款</strong>：如果合同允许，定期进行额外还款可以直接冲抵本金，从而节省利息。
            </p>

            <h3>常见问题</h3>
            <p>
              <strong>问：等额本息和等额本金有什么区别？</strong><br />
              答：本计算器默认使用最常见的"等额本息"（Monthly Payment 固定）。另一种"等额本金"方式前期还款压力大，但总利息较少。
            </p>
          </div>
        ) : (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>Understanding Your Loan Payments</h2>
            <p>
              Whether you're taking out a personal loan, auto loan, or business loan, knowing your exact monthly payment is key to budgeting. This calculator uses the standard amortization formula to determine your principal and interest breakdown.
            </p>

            <h3>Key Loan Terms Explained</h3>
            <ul>
              <li><strong>Principal</strong>: The original amount of money you borrow.</li>
              <li><strong>Interest Rate (APR)</strong>: The cost of borrowing, expressed as a yearly percentage. Higher credit scores usually qualify for lower rates.</li>
              <li><strong>Loan Term</strong>: The lifespan of the loan. Longer terms mean lower monthly payments but higher total interest costs.</li>
            </ul>

            <h2>How to Use This Calculator</h2>
            <ol>
              <li><strong>Loan Amount</strong>: Enter the total amount you need to borrow.</li>
              <li><strong>Interest Rate</strong>: Input the annual percentage rate (APR) offered by the lender.</li>
              <li><strong>Loan Term</strong>: Input how many years you have to pay back the loan.</li>
            </ol>
            <p>
              After clicking "Calculate," you'll see your estimated monthly payment and the total interest you'll pay over the life of the loan.
            </p>

            <h2>Tips for Lowering Loan Costs</h2>
            <ul>
              <li><strong>Shop Around</strong>: Compare rates from multiple lenders (banks, credit unions, online lenders).</li>
              <li><strong>Improve Credit Score</strong>: A higher score can significantly lower your APR.</li>
              <li><strong>Shorter Term</strong>: Opting for a 3-year term instead of a 5-year term increases monthly payments but drastically cuts total interest.</li>
              <li><strong>Prepayment</strong>: Check if your lender allows penalty-free early payments to pay down principal faster.</li>
            </ul>
          </div>
        )}

        <RelatedCalculators currentCalculator="loan" />
      </div>
    </div>
  );
}
