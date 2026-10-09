# WealthEase - 智能理财工具

WealthEase.top 是一个提供免费金融计算器和理财资源的专业网站，帮助用户做出明智的财务决策。

## 功能特性

✅ **双语支持**：完整的中英文切换（基于next-intl）
✅ **20个计算器**：覆盖投资、贷款、房贷、退休、储蓄、税务、保险年金、教育储蓄等
✅ **博客**：理财指南文章，中英双语（含改编自 HowToLiveBetter 的中国个人理财系列，CC BY 4.0）
✅ **专业UI设计**：金融级界面，专业的配色方案
✅ **响应式设计**：移动端完美适配
✅ **SEO优化**：完整的sitemap、meta标签和结构化数据
✅ **图表可视化**：Chart.js 提供直观的数据展示
✅ **专家建议**：每个计算器附带专业金融建议

## 可用计算器

| 计算器 | 路径 |
|--------|------|
| **复利计算器** | `/calculators/compound-interest` |
| **退休规划计算器** | `/calculators/retirement` |
| **储蓄目标计算器** | `/calculators/savings-goal` |
| **贷款计算器** | `/calculators/loan` |
| **房贷计算器** | `/calculators/mortgage` |
| **ROI计算器** | `/calculators/roi` |
| **债务还清计算器** | `/calculators/debt-payoff` |
| **401(k) 投资计算器** | `/calculators/investment-401k` |
| **通货膨胀计算器** | `/calculators/inflation` |
| **租房 vs 买房计算器** | `/calculators/rent-vs-buy` |
| **教育储蓄计算器** | `/calculators/college-savings` |
| **股息收入计算器** | `/calculators/dividend-income` |
| **投资对比计算器** | `/calculators/investment-comparison` |
| **年金计算器** | `/calculators/annuity` |
| **车贷计算器** | `/calculators/auto-loan` |
| **定期存单（CD）计算器** | `/calculators/cd` |
| **信用评分计算器** | `/calculators/credit-score` |
| **社会保障计算器** | `/calculators/social-security` |
| **税务计算器** | `/calculators/tax` |
| **小费计算器** | `/calculators/tip` |

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **图表**: Chart.js + react-chartjs-2
- **图标**: Lucide React
- **部署**: Vercel

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看结果。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com) 并导入项目
3. 配置域名 `wealthease.top`
4. 自动部署

### 环境变量

创建 `.env.local` 文件：

```bash
# Google Analytics (可选)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense (可选)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## 项目结构

```
wealthease-mvp/
├── app/
│   ├── [locale]/              # 多语言路由
│   │   ├── page.tsx           # 首页
│   │   ├── layout.tsx         # 布局
│   │   ├── calculators/       # 计算器页面
│   │   │   └── [20个计算器，每个一个目录]
│   │   ├── about/            # 关于我们
│   │   ├── privacy/          # 隐私政策
│   │   └── blog/             # 博客
│   ├── globals.css           # 全局样式
│   ├── sitemap.ts            # 站点地图
│   └── robots.ts             # 爬虫规则
├── components/
│   ├── Navigation.tsx        # 导航栏
│   ├── Footer.tsx            # 页脚
│   ├── ui/                   # UI组件（Slider）
│   └── calculators/          # 计算器组件
│       ├── CalculatorInput.tsx
│       ├── ResultCard.tsx
│       ├── ExpertTips.tsx
│       └── [各计算器组件]
├── data/
│   ├── blog-posts.ts         # 博客文章
│   └── life-guide-posts.ts   # 改编自 HowToLiveBetter 的文章（CC BY 4.0）
├── lib/
│   └── markdown.ts           # 博客 Markdown 渲染
├── messages/
│   ├── en.json               # 英文翻译
│   └── zh.json               # 中文翻译
├── middleware.ts             # 语言检测中间件
├── i18n.ts                   # i18n配置
└── package.json
```

## SEO优化

已实现：
- ✅ 语义化 HTML 结构
- ✅ 完整的 sitemap.xml（包含所有计算器页面）
- ✅ robots.txt
- ✅ 多语言 hreflang 标签
- ✅ Meta 标签优化
- ✅ 结构化数据（Schema.org）
- ✅ 响应式设计
- ✅ 快速加载（Vercel CDN）

## 性能优化

- 懒加载图表组件
- 图片优化（Next.js 自动）
- CSS 优化（Tailwind purge）
- 代码分割（自动）
- 静态生成（SSG）和服务端渲染（SSR）结合

## 监控和分析

已集成：
- ✅ Google Analytics
- ✅ Google Search Console
- ✅ Google AdSense
- ✅ Vercel Analytics（内置）

## 开发计划

### 已完成 ✅
- [x] 20个金融计算器
- [x] 博客（数据文件形式）
- [x] 中英文双语支持
- [x] 响应式设计
- [x] SEO优化
- [x] 专业UI设计系统

### 计划中 📋
- [ ] 博客迁移到 MDX
- [ ] 用户账户系统（NextAuth.js）
- [ ] 保存和分享计算结果
- [ ] 更多计算器（预算、通货膨胀等）
- [ ] 移动 App（React Native）

## 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 联系方式

- 网站: [wealthease.top](https://www.wealthease.top)
- 邮箱: contact@wealthease.top

---

**开发提示**：
- 始终在本地测试后再部署
- 使用 `npm run build` 检查构建错误
- 关注 Vercel 部署日志
- 定期备份代码到 GitHub
- 遵循 Git 提交规范
