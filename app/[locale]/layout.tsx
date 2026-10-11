import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {Analytics} from '@vercel/analytics/next';
import '../globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdSense from '@/components/GoogleAdSense';
import CloudflareAnalytics from '@/components/CloudflareAnalytics';
import dynamic from 'next/dynamic';

// 动态导入非关键组件，延迟加载
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), {
  loading: () => null, // 加载时不显示任何内容
});

const locales = ['en', 'zh'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

// Site-wide defaults; pages override these via their own generateMetadata.
export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const seo = await getTranslations({locale, namespace: 'seo'});
  return {
    metadataBase: new URL('https://www.wealthease.top'),
    title: seo('title'),
    description: seo('description'),
    keywords: seo('keywords'),
    authors: [{name: 'WealthEase'}],
    openGraph: {
      title: seo('og:title'),
      description: seo('og:description'),
      type: 'website',
      siteName: 'WealthEase',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo('og:title'),
      description: seo('og:description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const cfBeaconToken =
    process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? '579b578ba8444267afc5b79cf598c633';

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="sIjeN1dgXA_DE426qez6fNmHyDss1b8F0iAMiXXamY8" />

        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:image" content="https://wealthease.top/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:image" content="https://wealthease.top/og-image.jpg" />
      </head>
      <body>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {adSenseId && <GoogleAdSense adSenseId={adSenseId} />}
        {cfBeaconToken && <CloudflareAnalytics token={cfBeaconToken} />}
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
