'use client';

import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Globe} from 'lucide-react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary-600">
            WealthEase
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}`} className="text-gray-700 hover:text-primary-600 transition-colors">
              {t('home')}
            </Link>
            <Link href={`/${locale}/calculators`} className="text-gray-700 hover:text-primary-600 transition-colors">
              {t('calculators')}
            </Link>
            <Link href={`/${locale}/blog`} className="text-gray-700 hover:text-primary-600 transition-colors">
              {t('blog')}
            </Link>
            <Link href={`/${locale}/about`} className="text-gray-700 hover:text-primary-600 transition-colors">
              {t('about')}
            </Link>
            
            <button 
              onClick={toggleLocale}
              className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Globe size={20} />
              <span>{locale === 'en' ? '中文' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
