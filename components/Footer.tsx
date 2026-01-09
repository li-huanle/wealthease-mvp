'use client';

import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">WealthEase</h3>
            <p className="text-gray-400">{t('tagline')}</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  {t('contact')}
                </span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  {t('privacy')}
                </span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  {t('terms')}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('resources')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calculators`} className="hover:text-white transition-colors">
                  {t('tools')}
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  {t('guides')}
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
