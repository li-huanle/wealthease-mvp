import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import { renderMarkdown } from '@/lib/markdown';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
  const paths: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    blogPosts.forEach((post) => {
      paths.push({ locale, slug: post.slug });
    });
  });

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = 'https://www.wealthease.top';

  return {
    title: `${post.title[lang]} | WealthEase Blog`,
    description: post.excerpt[lang],
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title[lang],
      description: post.excerpt[lang],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      locale: locale,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title[lang],
      description: post.excerpt[lang],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        zh: `${baseUrl}/zh/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const lang = locale === 'zh' ? 'zh' : 'en';
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const labels = {
    en: {
      backToBlog: 'Back to Blog',
      readTime: 'min read',
      publishedOn: 'Published on',
      author: 'By',
      category: 'Category',
      tags: 'Tags',
      relatedPosts: 'Related Posts',
      readMore: 'Read More',
    },
    zh: {
      backToBlog: '返回博客',
      readTime: '分钟阅读',
      publishedOn: '发布于',
      author: '作者',
      category: '分类',
      tags: '标签',
      relatedPosts: '相关文章',
      readMore: '阅读更多',
    },
  };

  const t = labels[lang];

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.backToBlog}
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title[lang]}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {t.author} <strong>{post.author}</strong>
            </span>
          </div>
          <span>•</span>
          <time dateTime={post.date}>
            {t.publishedOn} {post.date}
          </time>
          <span>•</span>
          <span>{parseInt(post.readTime, 10)} {t.readTime}</span>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none [overflow-wrap:anywhere]"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content[lang]) }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.tags}:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2.5 py-1 text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.relatedPosts}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  className="group block rounded-xl bg-white shadow-card transition-[box-shadow,transform] duration-base ease-out hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {parseInt(relatedPost.readTime, 10)} {t.readTime}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-quick ease-out group-hover:text-primary-700">
                      {relatedPost.title[lang]}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{relatedPost.excerpt[lang]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="relative mt-16 overflow-hidden rounded-xl bg-gray-950 p-8 text-center text-white">
          <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary-500/25 blur-3xl" />
          <h3 className="relative mb-3 text-2xl font-bold tracking-tight">
            {lang === 'en'
              ? 'Put Your Knowledge Into Action'
              : '将您的知识付诸实践'}
          </h3>
          <p className="relative mx-auto mb-6 max-w-2xl text-gray-300">
            {lang === 'en'
              ? 'Use our free financial calculators to apply what you\'ve learned and make informed decisions about your money.'
              : '使用我们的免费理财计算器，应用您所学的知识，为您的财务做出明智决策。'}
          </p>
          <Link
            href={`/${locale}/calculators`}
            className="relative inline-flex h-11 items-center rounded-lg bg-white px-6 font-semibold text-gray-950 transition-colors duration-quick ease-out hover:bg-primary-50"
          >
            {lang === 'en' ? 'Try Our Calculators' : '试用计算器'}
          </Link>
        </div>
      </article>

      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title[lang],
            description: post.excerpt[lang],
            author: {
              '@type': 'Person',
              name: post.author,
            },
            datePublished: post.date,
            publisher: {
              '@type': 'Organization',
              name: 'WealthEase',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.wealthease.top/logo.png',
              },
            },
            articleSection: post.category,
            keywords: post.tags.join(', '),
            inLanguage: locale,
          }),
        }}
      />
    </div>
  );
}
