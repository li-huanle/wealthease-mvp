'use client';

import { useMemo, useState } from 'react';
import CalculatorInput from '@/components/calculators/CalculatorInput';
import ResultCard from '@/components/calculators/ResultCard';
import { mortgagePrepayment } from '@/lib/finance';
import { useMoney } from './useMoney';

export default function MortgagePrepaymentCalculator() {
  const { money, tr, symbol } = useMoney();
  const [balance, setBalance] = useState(500000);
  const [loanRate, setLoanRate] = useState(4);
  const [years, setYears] = useState(20);
  const [prepay, setPrepay] = useState(100000);
  const [alt, setAlt] = useState(3);

  const r = useMemo(
    () => mortgagePrepayment({ balance, loanRatePct: loanRate, yearsRemaining: years, prepayAmount: prepay, altReturnPct: alt }),
    [balance, loanRate, years, prepay, alt]
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
        <CalculatorInput label={tr('Remaining loan balance', '剩余本金')} value={balance} onChange={setBalance} min={10000} max={5000000} step={10000} prefix={symbol} />
        <CalculatorInput label={tr('Loan interest rate', '贷款年利率')} value={loanRate} onChange={setLoanRate} min={0} max={10} step={0.05} suffix="%" />
        <CalculatorInput label={tr('Years remaining', '剩余年限')} value={years} onChange={setYears} min={1} max={30} step={1} />
        <CalculatorInput label={tr('Amount to prepay', '打算提前还的金额')} value={prepay} onChange={setPrepay} min={0} max={balance} step={5000} prefix={symbol} />
        <CalculatorInput
          label={tr('After-tax return you can reliably earn instead', '这笔钱留着能稳定拿到的税后年收益')}
          value={alt}
          onChange={setAlt}
          min={0}
          max={12}
          step={0.1}
          suffix="%"
          tooltip={tr('Be honest: a rate you can earn steadily for the whole term, after tax.', '请保守估计：整个期限内都能稳定拿到的、扣税后的收益率。')}
        />
      </div>

      <div className="space-y-4">
        {r && (
          <>
            <ResultCard
              highlight
              title={r.prepayBetter ? tr('Prepaying comes out ahead', '提前还款更划算') : tr('Keeping the money invested comes out ahead', '留着钱投资更划算')}
              value={money(r.advantage)}
              subtitle={tr('difference in wealth at the end of the loan term', '贷款到期时两种做法的资产差额')}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <ResultCard title={tr('Monthly payment now', '现在每月还款')} value={money(r.currentPayment)} />
              <ResultCard title={tr('Monthly payment after prepaying', '提前还款后每月还款')} value={money(r.newPayment)} subtitle={tr('same term, lower payment', '期限不变，月供降低')} />
              <ResultCard title={tr('Interest saved over the term', '期限内省下的利息')} value={money(r.interestSaved)} />
              <ResultCard title={tr('Wealth at end: prepay & invest the saving', '到期资产：提前还+投资省下的月供')} value={money(r.endValuePrepay)} />
              <ResultCard title={tr('Wealth at end: keep loan & invest lump sum', '到期资产：不还款，把钱拿去投资')} value={money(r.endValueInvest)} />
            </div>
            <p className="text-sm text-gray-500">
              {tr(
                'Rule of thumb: prepaying earns your mortgage rate with certainty. Keep emergency cash either way and check your contract for prepayment penalties. Illustration only, not financial advice.',
                '经验法则：提前还款等于稳稳赚到你的房贷利率。无论怎么选都要先留够应急现金，并检查合同里有没有提前还款违约金。仅为演示，不构成投资建议。'
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
