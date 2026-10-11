import type { Metadata } from 'next';

export const SITE_URL = 'https://www.wealthease.top';

type Lang = 'en' | 'zh';
export type PageSeo = Record<Lang, { title: string; description: string; keywords?: string }>;

/** Build page metadata (title, description, canonical, hreflang, OG, Twitter) for a path like "/calculators/loan". */
export function buildMetadata(locale: string, path: string, seo: PageSeo): Metadata {
  const lang: Lang = locale === 'zh' ? 'zh' : 'en';
  const { title, description, keywords } = seo[lang];
  const url = `${SITE_URL}/${locale}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path}`,
        zh: `${SITE_URL}/zh${path}`,
        'x-default': `${SITE_URL}/en${path}`,
      },
    },
    openGraph: { title, description, type: 'website', siteName: 'WealthEase', locale, url },
    twitter: { card: 'summary_large_image', title, description },
  };
}
