'use client';

import { Lightbulb, TrendingUp, Shield, Calculator } from 'lucide-react';

interface Tip {
  icon: 'lightbulb' | 'trending' | 'shield' | 'calculator';
  title: string;
  content: string;
}

interface ExpertTipsProps {
  tips: Tip[];
  locale: string;
}

const iconMap = {
  lightbulb: Lightbulb,
  trending: TrendingUp,
  shield: Shield,
  calculator: Calculator,
};

export default function ExpertTips({ tips, locale }: ExpertTipsProps) {
  const labels = {
    en: {
      title: 'Expert Tips',
      subtitle: 'Professional guidance for better financial decisions',
    },
    'en-US': {
      title: 'Expert Tips',
      subtitle: 'Professional guidance for better financial decisions',
    },
    zh: {
      title: '专家建议',
      subtitle: '专业指导，助您做出更明智的财务决策',
    },
    'zh-CN': {
      title: '专家建议',
      subtitle: '专业指导，助您做出更明智的财务决策',
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 md:p-8 shadow-card">
      <div className="flex items-center mb-6">
        <div className="bg-accent-500 rounded-lg p-2 mr-3">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => {
          const Icon = iconMap[tip.icon];
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="bg-primary-100 rounded-lg p-2 mr-3 flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-primary-200">
        <div className="flex items-start text-xs text-gray-500">
          <Shield className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>
            {locale === 'zh'
              ? '以上建议仅供参考，不构成专业投资建议。在进行重大财务决策前，请咨询持牌金融顾问。'
              : 'These tips are for informational purposes only and do not constitute professional investment advice. Consult a licensed financial advisor before making major financial decisions.'}
          </p>
        </div>
      </div>
    </div>
  );
}
