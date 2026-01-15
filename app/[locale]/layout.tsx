import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import '../globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdSense from '@/components/GoogleAdSense';
import dynamic from 'next/dynamic';

// 动态导入非关键组件，延迟加载
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), {
  loading: () => null, // 加载时不显示任何内容
});

const locales = ['en', 'zh'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
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

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="sIjeN1dgXA_DE426qez6fNmHyDss1b8F0iAMiXXamY8" />

        {/* SEO Meta Tags */}
        <meta name="description" content={messages.seo.description} />
        <meta name="keywords" content={messages.seo.keywords} />
        <meta name="author" content="WealthEase" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={messages.seo.title} />
        <meta property="og:description" content={messages.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WealthEase" />
        <meta property="og:image" content="https://wealthease.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content={messages.seo.twitterCard} />
        <meta name="twitter:title" content={messages.seo.title} />
        <meta name="twitter:description" content={messages.seo.description} />
        <meta name="twitter:image" content="https://wealthease.com/og-image.jpg" />
      </head>
      <body>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {adSenseId && <GoogleAdSense adSenseId={adSenseId} />}
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
