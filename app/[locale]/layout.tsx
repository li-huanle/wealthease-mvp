import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import '../globals.css';
import {Inter} from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdSense from '@/components/GoogleAdSense';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

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
      </head>
      <body className={inter.className}>
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
