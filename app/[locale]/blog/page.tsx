import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === 'zh' ? 'zh' : 'en';

  const metadata = {
    en: {
      title: 'Financial Planning Blog - Practical Tips & Guides | WealthEase',
      description: 'Learn about compound interest, retirement planning, investment strategies, and smart borrowing from our expert financial guides. Free educational resources for better money management.',
      keywords: 'financial planning blog, investment tips, retirement planning guide, compound interest explained, loan advice, money management',
    },
    zh: {
      title: '理财规划博客 - 实用建议与指南 | WealthEase',
      description: '学习复利计算、退休规划、投资策略和明智借贷。免费的专业理财指南，帮助您更好地管理财富。',
      keywords: '理财博客, 投资建议, 退休规划指南, 复利计算, 贷款建议, 财务管理',
    },
  };

  const baseUrl = 'https://www.wealthease.top';

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: metadata[lang].keywords,
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[lang].title,
      description: metadata[lang].description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        zh: `${baseUrl}/zh/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lang = locale === 'zh' ? 'zh' : 'en';

  const pageContent = {
    en: {
      title: 'Financial Planning Blog',
      subtitle: 'Practical tips, guides, and insights to help you make smarter financial decisions',
      readMore: 'Read More',
      readTime: 'min read',
      allPosts: 'All Posts',
      categories: 'Categories',
    },
    zh: {
      title: '理财规划博客',
      subtitle: '实用建议、指南和见解，帮助您做出更明智的财务决策',
      readMore: '阅读更多',
      readTime: '分钟阅读',
      allPosts: '全部文章',
      categories: '分类',
    },
  };

  const content = pageContent[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-gradient-to-b from-primary-50/60 to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold text-primary-700">{lang === 'zh' ? '理财知识' : 'Learn'}</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{content.title}</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">{content.subtitle}</p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col rounded-xl bg-white p-6 shadow-card transition-[box-shadow,transform] duration-base ease-out hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  <time dateTime={post.date}>{post.date}</time> · {parseInt(post.readTime, 10)} {content.readTime}
                </span>
              </div>

              <h2 className="mb-2 text-lg font-semibold leading-snug text-gray-900 transition-colors duration-quick ease-out group-hover:text-primary-700">
                <Link href={`/${locale}/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-xl">
                  {post.title[lang]}
                </Link>
              </h2>

              <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt[lang]}</p>

              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex shrink-0 items-center text-sm font-semibold text-primary-700">
                  {content.readMore}
                  <svg className="ml-1 h-4 w-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 prose prose-lg max-w-none rounded-xl bg-muted/50 p-8">
          {lang === 'en' ? (
            <>
              <h2>Your Guide to Financial Success</h2>
              <p>
                Welcome to the WealthEase blog: practical guides on money management, written to pair with our free calculators.
                Our mission is to empower you with the knowledge and tools you need to make informed financial decisions and achieve your long-term wealth goals.
              </p>

              <h3>What You'll Learn</h3>
              <p>
                Our comprehensive guides cover everything from the fundamentals of compound interest to advanced retirement planning strategies.
                Whether you're just starting your financial journey or looking to optimize your existing portfolio, you'll find actionable insights that you can apply immediately.
              </p>

              <h3>Topics We Cover</h3>
              <ul>
                <li><strong>Investment Strategies:</strong> Learn how to grow your wealth through smart investing, understanding compound interest, and leveraging time in the market</li>
                <li><strong>Retirement Planning:</strong> Discover how to calculate your retirement needs, choose the right savings vehicles, and create a sustainable withdrawal strategy</li>
                <li><strong>Smart Borrowing:</strong> Understand different loan types, compare interest rates, and make informed decisions about mortgages, personal loans, and credit</li>
                <li><strong>Money Management:</strong> Master budgeting techniques, emergency fund planning, and cash flow optimization</li>
              </ul>

              <h3>Free Financial Tools</h3>
              <p>
                All our blog posts are complemented by free, professional-grade financial calculators. Use our tools to:
              </p>
              <ul>
                <li>Calculate compound interest and project investment growth</li>
                <li>Plan your retirement with detailed projections</li>
                <li>Compare loan options and understand total costs</li>
                <li>Analyze mortgage payments including taxes and insurance</li>
                <li>Measure investment returns with ROI and CAGR calculations</li>
              </ul>

              <h3>Why Trust Our Advice?</h3>
              <p>
                Our content is based on proven financial principles, industry best practices, and real-world applications.
                We break down complex financial concepts into easy-to-understand guides, complete with examples, formulas, and actionable steps.
              </p>

              <p>
                Start exploring our blog posts today and take control of your financial future. Every article is designed to give you practical knowledge
                that you can use right away, backed by our suite of free financial calculators.
              </p>
            </>
          ) : (
            <>
              <h2>您的财务成功指南</h2>
              <p>
                欢迎来到 WealthEase 博客：这里有实用的理财指南，可以配合我们的免费计算器一起使用。
                我们的使命是为您提供所需的知识和工具，帮助您做出明智的财务决策，实现长期财富目标。
              </p>

              <h3>您将学到什么</h3>
              <p>
                我们的综合指南涵盖从复利基础知识到高级退休规划策略的所有内容。
                无论您是刚刚开始理财之旅，还是希望优化现有投资组合，都能找到可以立即应用的实用见解。
              </p>

              <h3>我们涵盖的主题</h3>
              <ul>
                <li><strong>投资策略：</strong>学习如何通过明智投资、理解复利和利用市场时间来增加财富</li>
                <li><strong>退休规划：</strong>了解如何计算退休需求、选择合适的储蓄工具以及制定可持续的提取策略</li>
                <li><strong>明智借贷：</strong>了解不同贷款类型、比较利率，并就抵押贷款、个人贷款和信用做出明智决策</li>
                <li><strong>资金管理：</strong>掌握预算技巧、应急基金规划和现金流优化</li>
              </ul>

              <h3>免费理财工具</h3>
              <p>
                我们所有的博客文章都配有免费的专业级理财计算器。使用我们的工具可以：
              </p>
              <ul>
                <li>计算复利并预测投资增长</li>
                <li>通过详细预测规划退休</li>
                <li>比较贷款选项并了解总成本</li>
                <li>分析包括税费和保险在内的抵押贷款支付</li>
                <li>通过ROI和CAGR计算衡量投资回报</li>
              </ul>

              <h3>为什么信任我们的建议？</h3>
              <p>
                我们的内容基于经过验证的财务原则、行业最佳实践和实际应用。
                我们将复杂的财务概念分解为易于理解的指南，配有示例、公式和可行的步骤。
              </p>

              <p>
                立即开始浏览我们的博客文章，掌控您的财务未来。每篇文章都旨在为您提供可以立即使用的实用知识，
                并由我们的免费理财计算器套件提供支持。
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
