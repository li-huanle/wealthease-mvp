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
      title: 'Financial Planning Blog - Expert Tips & Guides | WealthEase',
      description: 'Learn about compound interest, retirement planning, investment strategies, and smart borrowing from our expert financial guides. Free educational resources for better money management.',
      keywords: 'financial planning blog, investment tips, retirement planning guide, compound interest explained, loan advice, money management',
    },
    zh: {
      title: '理财规划博客 - 专家建议与指南 | WealthEase',
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
      subtitle: 'Expert tips, guides, and insights to help you make smarter financial decisions',
      readMore: 'Read More',
      readTime: 'min read',
      allPosts: 'All Posts',
      categories: 'Categories',
    },
    zh: {
      title: '理财规划博客',
      subtitle: '专家建议、指南和见解，帮助您做出更明智的财务决策',
      readMore: '阅读更多',
      readTime: '分钟阅读',
      allPosts: '全部文章',
      categories: '分类',
    },
  };

  const content = pageContent[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl text-primary-100 max-w-3xl">{content.subtitle}</p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-white text-primary-700 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime} {content.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title[lang]}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt[lang]}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  {content.readMore}
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 prose prose-lg max-w-none bg-white rounded-xl p-8 shadow-sm">
          {lang === 'en' ? (
            <>
              <h2>Your Guide to Financial Success</h2>
              <p>
                Welcome to the WealthEase blog, your trusted source for expert financial advice and practical money management tips.
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
                欢迎来到WealthEase博客，您值得信赖的专业理财建议和实用资金管理技巧来源。
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
