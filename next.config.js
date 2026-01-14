/** @type {import('next').NextConfig} */
const nextConfig = {
  // 优化图片
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // 压缩优化
  compress: true,
  // 实验性功能
  experimental: {
    // 优化CSS加载
    optimizeCss: true,
    // typedRoutes: true,
  },
}

const withNextIntl = require('next-intl/plugin')('./i18n.ts');

module.exports = withNextIntl(nextConfig);
