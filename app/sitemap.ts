import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.wealthease.top';
  const locales = ['en', 'zh'];

  const calculators = [
    'annuity',
    'auto-loan',
    'cd',
    'college-savings',
    'compound-interest',
    'credit-score',
    'debt-payoff',
    'dividend-income',
    'inflation',
    'investment-401k',
    'investment-comparison',
    'loan',
    'mortgage',
    'rent-vs-buy',
    'retirement',
    'roi',
    'savings-goal',
    'social-security',
    'tax',
    'tip',
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Add home pages for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          zh: `${baseUrl}/zh`,
        },
      },
    });
  });

  // Add calculator list pages for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/calculators`,
          zh: `${baseUrl}/zh/calculators`,
        },
      },
    });
  });

  // Add static pages for each locale
  const staticPages = ['about', 'privacy', 'terms', 'disclaimer', 'contact', 'blog'];
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${page}`,
            zh: `${baseUrl}/zh/${page}`,
          },
        },
      });
    });
  });

  // Add individual blog posts for each locale
  blogPosts.forEach((post) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${post.slug}`,
            zh: `${baseUrl}/zh/blog/${post.slug}`,
          },
        },
      });
    });
  });

  // Add individual calculator pages for each locale
  calculators.forEach((calc) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/calculators/${calc}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/calculators/${calc}`,
            zh: `${baseUrl}/zh/calculators/${calc}`,
          },
        },
      });
    });
  });

  // Add external links
  routes.push({
    url: 'https://valuristories.com/',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  });

  return routes;
}
