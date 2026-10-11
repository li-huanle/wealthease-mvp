// Pure calculation helpers for the everyday-money calculators.

/** Monthly payment of an equal-installment loan. */
export function pmt(principal: number, annualRatePct: number, months: number): number {
  if (months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

/** Future value of a lump sum plus level monthly contributions at a monthly rate. */
export function futureValue(lump: number, monthly: number, monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return lump + monthly * months;
  const g = Math.pow(1 + monthlyRate, months);
  return lump * g + (monthly * (g - 1)) / monthlyRate;
}

export interface InstallmentAprInput {
  principal: number;
  months: number;
  /** Fee charged every month on the ORIGINAL principal, in percent (e.g. 0.6). */
  monthlyFeePct: number;
  /** One-off fee paid up front, in currency units. */
  upfrontFee?: number;
}

export interface InstallmentAprResult {
  monthlyPayment: number;
  totalCost: number;
  naiveAnnualPct: number;
  /** IRR-based nominal annual rate (monthly IRR x 12), in percent. */
  aprPct: number;
  /** Compounded annual rate, in percent. */
  effectiveAnnualPct: number;
}

export function installmentApr(input: InstallmentAprInput): InstallmentAprResult | null {
  const { principal, months, monthlyFeePct } = input;
  const upfront = input.upfrontFee ?? 0;
  if (!(principal > 0) || !(months >= 1)) return null;
  const n = Math.floor(months);
  const payment = principal / n + (principal * monthlyFeePct) / 100;
  const received = principal - upfront;
  const totalCost = payment * n - principal + upfront;
  if (!(received > 0) || payment * n <= received) {
    return { monthlyPayment: payment, totalCost, naiveAnnualPct: monthlyFeePct * 12, aprPct: 0, effectiveAnnualPct: 0 };
  }
  // Solve sum_{k=1..n} payment / (1+r)^k = received for the monthly rate r.
  const pv = (r: number) => (r === 0 ? payment * n : (payment * (1 - Math.pow(1 + r, -n))) / r);
  let lo = 0;
  let hi = 1;
  while (pv(hi) > received && hi < 1e6) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > received) lo = mid;
    else hi = mid;
  }
  const r = (lo + hi) / 2;
  return {
    monthlyPayment: payment,
    totalCost,
    naiveAnnualPct: monthlyFeePct * 12,
    aprPct: r * 12 * 100,
    effectiveAnnualPct: (Math.pow(1 + r, 12) - 1) * 100,
  };
}

export interface FundFeeInput {
  initial: number;
  monthly: number;
  annualReturnPct: number;
  years: number;
  feeAPct: number;
  feeBPct: number;
}

export interface FundFeeResult {
  valueA: number;
  valueB: number;
  contributed: number;
  difference: number;
  differencePct: number;
  /** Year-by-year balances for both funds (index 0 = start). */
  series: { year: number; a: number; b: number }[];
}

export function fundFees(input: FundFeeInput): FundFeeResult {
  const { initial, monthly, annualReturnPct, years, feeAPct, feeBPct } = input;
  const months = Math.round(years * 12);
  const rate = (fee: number) => (annualReturnPct - fee) / 100 / 12;
  const valueA = futureValue(initial, monthly, rate(feeAPct), months);
  const valueB = futureValue(initial, monthly, rate(feeBPct), months);
  const series = [];
  for (let y = 0; y <= Math.floor(years); y++) {
    series.push({
      year: y,
      a: futureValue(initial, monthly, rate(feeAPct), y * 12),
      b: futureValue(initial, monthly, rate(feeBPct), y * 12),
    });
  }
  const better = Math.max(valueA, valueB);
  const worse = Math.min(valueA, valueB);
  return {
    valueA,
    valueB,
    contributed: initial + monthly * months,
    difference: better - worse,
    differencePct: better > 0 ? ((better - worse) / better) * 100 : 0,
    series,
  };
}

export interface EmergencyFundInput {
  monthlyExpenses: number;
  targetMonths: number;
  currentSavings: number;
  monthlySaving: number;
  annualRatePct: number;
}

export interface EmergencyFundResult {
  target: number;
  gap: number;
  /** null when the target is not reachable within 50 years. */
  monthsToGoal: number | null;
  coveredMonths: number;
}

export function emergencyFund(input: EmergencyFundInput): EmergencyFundResult {
  const { monthlyExpenses, targetMonths, currentSavings, monthlySaving, annualRatePct } = input;
  const target = monthlyExpenses * targetMonths;
  const gap = Math.max(0, target - currentSavings);
  const coveredMonths = monthlyExpenses > 0 ? currentSavings / monthlyExpenses : 0;
  if (gap === 0) return { target, gap, monthsToGoal: 0, coveredMonths };
  const r = annualRatePct / 100 / 12;
  let balance = currentSavings;
  for (let m = 1; m <= 600; m++) {
    balance = balance * (1 + r) + monthlySaving;
    if (balance >= target) return { target, gap, monthsToGoal: m, coveredMonths };
  }
  return { target, gap, monthsToGoal: null, coveredMonths };
}

export interface PrepaymentInput {
  balance: number;
  loanRatePct: number;
  yearsRemaining: number;
  prepayAmount: number;
  /** Stable after-tax return you could earn on the same money elsewhere, in percent. */
  altReturnPct: number;
}

export interface PrepaymentResult {
  currentPayment: number;
  newPayment: number;
  monthlySaving: number;
  interestSaved: number;
  /** Wealth at the end of the term if you prepay and invest the monthly saving. */
  endValuePrepay: number;
  /** Wealth at the end of the term if you keep the loan and invest the lump sum. */
  endValueInvest: number;
  prepayBetter: boolean;
  advantage: number;
}

export function mortgagePrepayment(input: PrepaymentInput): PrepaymentResult | null {
  const { balance, loanRatePct, yearsRemaining, prepayAmount, altReturnPct } = input;
  const n = Math.round(yearsRemaining * 12);
  if (!(balance > 0) || n < 1) return null;
  const prepay = Math.min(Math.max(prepayAmount, 0), balance);
  const currentPayment = pmt(balance, loanRatePct, n);
  const newPayment = pmt(balance - prepay, loanRatePct, n);
  const monthlySaving = currentPayment - newPayment;
  const alt = altReturnPct / 100 / 12;
  const endValuePrepay = futureValue(0, monthlySaving, alt, n);
  const endValueInvest = futureValue(prepay, 0, alt, n);
  return {
    currentPayment,
    newPayment,
    monthlySaving,
    interestSaved: monthlySaving * n - prepay,
    endValuePrepay,
    endValueInvest,
    prepayBetter: endValuePrepay >= endValueInvest - 0.5,
    advantage: Math.abs(endValuePrepay - endValueInvest),
  };
}
