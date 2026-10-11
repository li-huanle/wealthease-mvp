'use client';

import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Globe, Menu, X, TrendingUp} from 'lucide-react';
import {useState} from 'react';
import {cn} from '@/lib/cn';
import {buttonClasses} from '@/components/ui/Button';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  const home = `/${locale}`;
  const navLinks = [
    { href: home, label: t('home') },
    { href: `/${locale}/calculators`, label: t('calculators') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  // Home only matches exactly; other sections also match their sub-pages.
  const isActive = (href: string) =>
    href === home ? pathname === home : pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={home} className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm transition-transform duration-quick ease-out group-hover:-rotate-6">
              <TrendingUp className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-gray-900">WealthEase</span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                {locale === 'zh' ? '智能理财工具' : 'Smart Financial Tools'}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-quick ease-out',
                  isActive(link.href) ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-3.5 -bottom-[13px] h-0.5 rounded-full bg-primary-600" aria-hidden />
                )}
              </Link>
            ))}

            <div className="mx-2 h-5 w-px bg-border" />

            <button onClick={toggleLocale} className={buttonClasses('ghost', 'sm')}>
              <Globe className="h-4 w-4" />
              <span>{locale === 'en' ? '中文' : 'EN'}</span>
            </button>
            <Link href={`/${locale}/calculators`} className={buttonClasses('primary', 'sm', 'ml-1')}>
              {locale === 'zh' ? '开始计算' : 'Get started'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={buttonClasses('ghost', 'sm', 'lg:hidden px-2')}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="animate-fade-in border-t bg-white lg:hidden">
          <div className="container mx-auto space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'block rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-quick ease-out',
                  isActive(link.href) ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-muted hover:text-gray-900'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t pt-2">
              <button onClick={toggleLocale} className={buttonClasses('ghost', 'md', 'w-full justify-start')}>
                <Globe className="h-4 w-4" />
                <span>{locale === 'en' ? 'Switch to 中文' : '切换到 EN'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
