import { getTranslations, setRequestLocale } from 'next-intl/server';
import ROICalculator from '@/components/calculators/ROICalculator';
import RelatedCalculators from '@/components/RelatedCalculators';

export default async function ROIPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculator.roi');

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

        <ROICalculator />

        {locale === 'zh' ? (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>什么是投资回报率 (ROI)？</h2>
            <p>
              投资回报率 (ROI) 是评估投资效率或比较不同投资方案盈利能力的关键指标。它计算的是投资收益与投入成本之间的比率。ROI越高，说明投资的盈利能力越强。
            </p>

            <h3>ROI 与 年化收益率 (CAGR)</h3>
            <p>
              <strong>ROI</strong> 只能告诉您总的回报百分比，但忽略了时间因素。例如，10年赚50%和1年赚50%的ROI都是50%，但显然后者更优秀。<br />
              <strong>年化收益率</strong> (Annualized ROI / CAGR) 则考虑了时间因素，将总回报平摊到每年，让您可以跨时间维度比较不同的投资。
            </p>

            <h2>如何使用ROI计算器？</h2>
            <ol>
              <li><strong>初始投资</strong>：输入您开始时的投入金额。</li>
              <li><strong>最终价值</strong>：输入投资结束时的总价值（或当前市值）。</li>
              <li><strong>投资时长</strong>：输入持有投资的时间长度（年/月）。</li>
            </ol>
            <p>
              点击"计算"后，您不仅能看到总的回报率，还能看到年化回报率，这对评估长期投资尤为重要。
            </p>

            <h2>如何解读结果？</h2>
            <ul>
              <li><strong>总回报 (Total Return)</strong>：您的净利润（或亏损）。</li>
              <li><strong>ROI</strong>：总利润占总成本的百分比。</li>
              <li><strong>CAGR</strong>：如果投资每年以稳定的速度增长，需要的年增长率。</li>
            </ul>

            <h3>投资提示</h3>
            <p>
              高ROI通常伴随着高风险。在评估投资时，不仅要看潜在回报，还要考虑风险承受能力。分散投资（鸡蛋不要放在一个篮子里）是降低风险的有效策略。
            </p>
          </div>
        ) : (
          <div className="mt-16 prose prose-lg max-w-none">
            <h2>What is Return on Investment (ROI)?</h2>
            <p>
              Return on Investment (ROI) is a performance measure used to evaluate the efficiency of an investment or compare the efficiency of a number of different investments. ROI tries to directly measure the amount of return on a particular investment, relative to the investment’s cost.
            </p>

            <h3>ROI vs. Annualized ROI</h3>
            <p>
              <strong>Total ROI</strong> gives you the big picture but ignores time. A 20% return over 1 month is fantastic, but a 20% return over 10 years is poor.<br />
              <strong>Annualized ROI</strong> helps you compare investments held for different periods by showing what the yearly return would be.
            </p>

            <h2>How to Use This ROI Calculator</h2>
            <ol>
              <li><strong>Initial Investment</strong>: The amount you started with.</li>
              <li><strong>Final Value</strong>: What the investment is worth now (or when sold).</li>
              <li><strong>Time Period</strong>: How long you held the investment.</li>
            </ol>
            <p>
              Our calculator will provide both the simple ROI and the Compound Annual Growth Rate (CAGR), giving you a complete picture of your investment's performance.
            </p>

            <h2>Understanding Your Results</h2>
            <ul>
              <li><strong>Net Profit</strong>: The actual dollar amount you gained or lost.</li>
              <li><strong>ROI %</strong>: Your return relative to your cost. Positive is gain, negative is loss.</li>
              <li><strong>Annualized Return</strong>: The geometric progression ratio that provides a constant rate of return over the time period.</li>
            </ul>

            <h3>Smart Investing Tip</h3>
            <p>
              Don't chase high ROI without considering risk. A diversified portfolio often yields more consistent long-term returns than betting big on a single high-risk asset.
            </p>
          </div>
        )}

        <RelatedCalculators currentCalculator="roi" />
      </div>
    </div>
  );
}
