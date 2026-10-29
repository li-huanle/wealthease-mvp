import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      {
        // Automatic search discovery — allow (feeds ChatGPT / Perplexity / Claude search answers).
        userAgent: ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot'],
        allow: '/',
      },
      {
        // Model-training crawlers — disallow. Training control is separate from search discovery: blocking training does not by itself block search citations. Google-Extended does not affect Google Search inclusion/ranking.
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended'],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.wealthease.top/sitemap.xml',
  };
}
