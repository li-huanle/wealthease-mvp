import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';

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

  // Format content with proper HTML structure
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph) => {
        // Handle headings
        if (paragraph.startsWith('## ')) {
          return `<h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">${paragraph.replace('## ', '')}</h2>`;
        }
        if (paragraph.startsWith('### ')) {
          return `<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${paragraph.replace('### ', '')}</h3>`;
        }

        // Handle lists
        if (paragraph.includes('\n- ')) {
          const items = paragraph
            .split('\n- ')
            .filter((item) => item.trim())
            .map((item) => `<li class="mb-2">${item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`)
            .join('');
          return `<ul class="list-disc list-inside space-y-2 mb-6 ml-4">${items}</ul>`;
        }

        // Handle code blocks
        if (paragraph.startsWith('```')) {
          const code = paragraph.replace(/```/g, '').trim();
          return `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6"><code class="text-sm">${code}</code></pre>`;
        }

        // Handle regular paragraphs with bold text
        const formattedParagraph = paragraph
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');

        return `<p class="text-lg text-gray-700 leading-relaxed mb-6">${formattedParagraph}</p>`;
      })
      .join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
          <span>{post.readTime} {t.readTime}</span>
        </div>

        {/* Featured Image Placeholder */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="h-96 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <div className="text-center text-white">
              <svg
                className="w-24 h-24 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-2xl font-bold">{post.title[lang]}</p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content[lang]) }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.tags}:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
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
                  className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {relatedPost.readTime} {t.readTime}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
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
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            {lang === 'en'
              ? 'Put Your Knowledge Into Action'
              : '将您的知识付诸实践'}
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Use our free financial calculators to apply what you\'ve learned and make informed decisions about your money.'
              : '使用我们的免费理财计算器，应用您所学的知识，为您的财务做出明智决策。'}
          </p>
          <Link
            href={`/${locale}/calculators`}
            className="inline-block bg-white text-primary-700 font-bold px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
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
