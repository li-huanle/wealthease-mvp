import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(zh|en)/:path*']
};
