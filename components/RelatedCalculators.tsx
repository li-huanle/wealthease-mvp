'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';

// 定义计算器类型和关联关系
type CalculatorType =
  | 'compound-interest'
  | 'retirement'
  | 'investment-401k'
  | 'inflation'
  | 'savings-goal'
  | 'debt-payoff'
  | 'loan'
  | 'mortgage'
  | 'roi'
  | 'rent-vs-buy'
  | 'college-savings'
  | 'dividend-income'
  | 'investment-comparison'
  | 'tip'
  | 'credit-score'
  | 'tax'
  | 'cd'
  | 'annuity'
  | 'social-security'
  | 'auto-loan'
  | 'installment-apr'
  | 'fund-fees'
  | 'emergency-fund'
  | 'mortgage-prepayment'
  | 'take-home-pay';

interface CalculatorInfo {
  id: CalculatorType;
  titleKey: string;
  descKey: string;
  icon: string;
}

// 计算器基本信息
const calculators: Record<CalculatorType, CalculatorInfo> = {
  'compound-interest': {
    id: 'compound-interest',
    titleKey: 'compound.title',
    descKey: 'compound.description',
    icon: '📈',
  },
  'retirement': {
    id: 'retirement',
    titleKey: 'retirement.title',
    descKey: 'retirement.description',
    icon: '🏖️',
  },
  'investment-401k': {
    id: 'investment-401k',
    titleKey: 'investment401k.title',
    descKey: 'investment401k.description',
    icon: '💼',
  },
  'inflation': {
    id: 'inflation',
    titleKey: 'inflation.title',
    descKey: 'inflation.description',
    icon: '💹',
  },
  'savings-goal': {
    id: 'savings-goal',
    titleKey: 'savingsGoal.title',
    descKey: 'savingsGoal.description',
    icon: '🎯',
  },
  'debt-payoff': {
    id: 'debt-payoff',
    titleKey: 'debtPayoff.title',
    descKey: 'debtPayoff.description',
    icon: '💳',
  },
  'loan': {
    id: 'loan',
    titleKey: 'loan.title',
    descKey: 'loan.description',
    icon: '🏦',
  },
  'mortgage': {
    id: 'mortgage',
    titleKey: 'mortgage.title',
    descKey: 'mortgage.description',
    icon: '🏠',
  },
  'roi': {
    id: 'roi',
    titleKey: 'roi.title',
    descKey: 'roi.description',
    icon: '📊',
  },
  'rent-vs-buy': {
    id: 'rent-vs-buy',
    titleKey: 'rentVsBuy.title',
    descKey: 'rentVsBuy.description',
    icon: '🏘️',
  },
  'college-savings': {
    id: 'college-savings',
    titleKey: 'collegeSavings.title',
    descKey: 'collegeSavings.description',
    icon: '🎓',
  },
  'dividend-income': {
    id: 'dividend-income',
    titleKey: 'dividendIncome.title',
    descKey: 'dividendIncome.description',
    icon: '💰',
  },
  'investment-comparison': {
    id: 'investment-comparison',
    titleKey: 'investmentComparison.title',
    descKey: 'investmentComparison.description',
    icon: '⚖️',
  },
  'tip': {
    id: 'tip',
    titleKey: 'tip.title',
    descKey: 'tip.description',
    icon: '💵',
  },
  'credit-score': {
    id: 'credit-score',
    titleKey: 'creditScore.title',
    descKey: 'creditScore.description',
    icon: '📋',
  },
  'tax': {
    id: 'tax',
    titleKey: 'tax.title',
    descKey: 'tax.description',
    icon: '🧾',
  },
  'cd': {
    id: 'cd',
    titleKey: 'cd.title',
    descKey: 'cd.description',
    icon: '🏦',
  },
  'annuity': {
    id: 'annuity',
    titleKey: 'annuity.title',
    descKey: 'annuity.description',
    icon: '🔄',
  },
  'social-security': {
    id: 'social-security',
    titleKey: 'socialSecurity.title',
    descKey: 'socialSecurity.description',
    icon: '🛡️',
  },
  'auto-loan': {
    id: 'auto-loan',
    titleKey: 'autoLoan.title',
    descKey: 'autoLoan.description',
    icon: '🚗',
  },
  'installment-apr': {
    id: 'installment-apr',
    titleKey: 'installmentApr.title',
    descKey: 'installmentApr.description',
    icon: '📉',
  },
  'fund-fees': {
    id: 'fund-fees',
    titleKey: 'fundFees.title',
    descKey: 'fundFees.description',
    icon: '💸',
  },
  'emergency-fund': {
    id: 'emergency-fund',
    titleKey: 'emergencyFund.title',
    descKey: 'emergencyFund.description',
    icon: '🛟',
  },
  'mortgage-prepayment': {
    id: 'mortgage-prepayment',
    titleKey: 'mortgagePrepayment.title',
    descKey: 'mortgagePrepayment.description',
    icon: '🏠',
  },
  'take-home-pay': {
    id: 'take-home-pay',
    titleKey: 'takeHomePay.title',
    descKey: 'takeHomePay.description',
    icon: '💼',
  },
};

// 定义计算器之间的关联关系
const relatedCalculatorsMap: Record<CalculatorType, CalculatorType[]> = {
  'compound-interest': ['retirement', 'investment-401k', 'savings-goal', 'dividend-income'],
  'retirement': ['investment-401k', 'compound-interest', 'inflation', 'dividend-income'],
  'investment-401k': ['take-home-pay', 'retirement', 'compound-interest', 'inflation'],
  'inflation': ['retirement', 'investment-401k', 'rent-vs-buy', 'college-savings'],
  'savings-goal': ['compound-interest', 'emergency-fund', 'debt-payoff', 'retirement'],
  'debt-payoff': ['loan', 'mortgage', 'savings-goal', 'roi'],
  'loan': ['mortgage', 'debt-payoff', 'installment-apr', 'rent-vs-buy'],
  'mortgage': ['loan', 'mortgage-prepayment', 'rent-vs-buy', 'debt-payoff'],
  'roi': ['investment-comparison', 'dividend-income', 'compound-interest', 'investment-401k'],
  'rent-vs-buy': ['mortgage', 'loan', 'inflation', 'investment-comparison'],
  'college-savings': ['savings-goal', 'compound-interest', 'investment-401k', 'inflation'],
  'dividend-income': ['roi', 'compound-interest', 'investment-comparison', 'retirement'],
  'investment-comparison': ['roi', 'fund-fees', 'compound-interest', 'investment-401k'],
  'tip': ['loan', 'inflation', 'mortgage'],
  'credit-score': ['loan', 'mortgage', 'auto-loan'],
  'tax': ['take-home-pay', 'investment-401k', 'retirement', 'annuity'],
  'cd': ['investment-comparison', 'compound-interest', 'annuity'],
  'annuity': ['retirement', 'social-security', 'investment-401k'],
  'social-security': ['retirement', 'annuity', 'tax'],
  'auto-loan': ['loan', 'mortgage', 'credit-score'],
  'installment-apr': ['loan', 'debt-payoff', 'credit-score'],
  'fund-fees': ['compound-interest', 'investment-comparison', 'retirement'],
  'emergency-fund': ['savings-goal', 'debt-payoff', 'inflation'],
  'mortgage-prepayment': ['mortgage', 'loan', 'investment-comparison'],
  'take-home-pay': ['tax', 'investment-401k', 'savings-goal'],
};

interface RelatedCalculatorsProps {
  currentCalculator: CalculatorType;
  maxItems?: number;
}

export default function RelatedCalculators({
  currentCalculator,
  maxItems = 3
}: RelatedCalculatorsProps) {
  const locale = useLocale();
  const t = useTranslations('calculatorsPage.tools');

  const relatedIds = relatedCalculatorsMap[currentCalculator] || [];
  const relatedItems = relatedIds
    .slice(0, maxItems)
    .map(id => calculators[id])
    .filter(Boolean);

  if (relatedItems.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {locale === 'zh' ? '相关计算器' : 'Related Calculators'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedItems.map((calc) => (
          <Link
            key={calc.id}
            href={`/${locale}/calculators/${calc.id}`}
            className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{calc.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {t(calc.titleKey)}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {t(calc.descKey)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/calculators`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          {locale === 'zh' ? '查看所有计算器' : 'View All Calculators'}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
