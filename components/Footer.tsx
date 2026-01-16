'use client';

import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';
import {TrendingUp, Mail, Shield, FileText, AlertTriangle} from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-2 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">WealthEase</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('tagline')}
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <Shield className="w-4 h-4 text-success-400" />
              <span className="text-xs text-gray-500">
                {locale === 'zh' ? '隐私优先 · 本地计算 · 数据不上传' : 'Privacy First · Client-Side · No Data Upload'}
              </span>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('company')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/disclaimer`} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('disclaimer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('resources')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/blog`} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calculators`} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('tools')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hot Searches Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {locale === 'zh' ? '热门搜索' : 'Hot Searches'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/calculators/mortgage`} className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {locale === 'zh' ? '房贷利率计算' : 'Mortgage Rate Calculator'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calculators/inflation`} className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {locale === 'zh' ? '通货膨胀计算方法' : 'How to Calculate Inflation'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calculators/compound-interest`} className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {locale === 'zh' ? '复利计算公式' : 'Compound Interest Formula'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calculators/debt-payoff`} className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {locale === 'zh' ? '如何快速还清债务' : 'How to Pay Off Debt Fast'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calculators/retirement`} className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {locale === 'zh' ? '退休规划多少钱够' : 'How Much to Save for Retirement'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {locale === 'zh' ? '订阅更新' : 'Stay Updated'}
            </h4>
            <p className="text-gray-400 text-xs mb-4">
              {locale === 'zh'
                ? '获取最新的理财技巧和工具更新'
                : 'Get financial tips and new tool updates'}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Mail className="w-4 h-4 mr-2" />
              {locale === 'zh' ? '立即订阅' : 'Subscribe Now'}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} WealthEase. {locale === 'zh' ? '版权所有' : 'All rights reserved.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span>{locale === 'zh' ? '系统运行正常' : 'All Systems Operational'}</span>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <span className="hover:text-gray-400 cursor-pointer transition-colors">
                  {locale === 'zh' ? '隐私设置' : 'Privacy Settings'}
                </span>
                <span className="hover:text-gray-400 cursor-pointer transition-colors">
                  {locale === 'zh' ? 'Cookie 设置' : 'Cookie Settings'}
                </span>
              </div>
              <a
                href="https://valuristories.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-500 hover:underline transition-colors text-xs"
              >
                ValuRistories
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-800 bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-gray-600">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                {locale === 'zh'
                  ? '免责声明：本网站仅用于教育目的，不构成财务或税务建议。所有计算均在您的浏览器本地执行，数据不上传至任何服务器，您的财务隐私绝对安全。'
                  : 'Disclaimer: This website is for educational purposes only and does not constitute financial or tax advice. All calculations run locally in your browser - no data is sent to any server. Your financial privacy is 100% secure.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
