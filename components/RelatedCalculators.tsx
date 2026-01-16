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
  | 'investment-comparison';

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
};

// 定义计算器之间的关联关系
const relatedCalculatorsMap: Record<CalculatorType, CalculatorType[]> = {
  'compound-interest': ['retirement', 'investment-401k', 'savings-goal', 'dividend-income'],
  'retirement': ['investment-401k', 'compound-interest', 'inflation', 'dividend-income'],
  'investment-401k': ['retirement', 'compound-interest', 'inflation', 'college-savings'],
  'inflation': ['retirement', 'investment-401k', 'rent-vs-buy', 'college-savings'],
  'savings-goal': ['compound-interest', 'college-savings', 'debt-payoff', 'retirement'],
  'debt-payoff': ['loan', 'mortgage', 'savings-goal', 'roi'],
  'loan': ['mortgage', 'debt-payoff', 'rent-vs-buy', 'roi'],
  'mortgage': ['loan', 'rent-vs-buy', 'inflation', 'debt-payoff'],
  'roi': ['investment-comparison', 'dividend-income', 'compound-interest', 'investment-401k'],
  'rent-vs-buy': ['mortgage', 'loan', 'inflation', 'investment-comparison'],
  'college-savings': ['savings-goal', 'compound-interest', 'investment-401k', 'inflation'],
  'dividend-income': ['roi', 'compound-interest', 'investment-comparison', 'retirement'],
  'investment-comparison': ['roi', 'dividend-income', 'compound-interest', 'investment-401k'],
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
