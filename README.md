# WealthEase - 智能理财工具

WealthEase.top 是一个提供免费金融计算器和理财资源的专业网站，帮助用户做出明智的财务决策。

## 功能特性

✅ **双语支持**：完整的中英文切换（基于next-intl）
✅ **7大计算器**：覆盖投资、贷款、房贷、退休、储蓄、ROI、债务管理
✅ **专业UI设计**：金融级界面，专业的配色方案
✅ **响应式设计**：移动端完美适配
✅ **SEO优化**：完整的sitemap、meta标签和结构化数据
✅ **图表可视化**：Chart.js 提供直观的数据展示
✅ **专家建议**：每个计算器附带专业金融建议

## 可用计算器

| 计算器 | 功能 |
|--------|------|
| **复利计算器** | 计算投资随时间的复利增长 |
| **退休规划计算器** | 规划退休储蓄，估算未来需求 |
| **储蓄目标计算器** | 规划储蓄，更快实现财务目标 |
| **贷款计算器** | 计算贷款月供和总利息 |
| **房贷计算器** | 估算月供，包括税费和保险 |
| **ROI计算器** | 计算投资回报率和年化收益率 |
| **债务还清计算器** | 制定计划，摆脱债务 |

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
NEXT_PUBLIC_ADSENSE_ID=pub-XXXXXXXXXXXXXXXX
```

## 项目结构

```
wealthease-mvp/
├── app/
│   ├── [locale]/              # 多语言路由
│   │   ├── page.tsx           # 首页
│   │   ├── layout.tsx         # 布局
│   │   ├── calculators/       # 计算器页面
│   │   │   ├── compound-interest/
│   │   │   ├── retirement/
│   │   │   ├── savings-goal/
│   │   │   ├── loan/
│   │   │   ├── mortgage/
│   │   │   ├── roi/
│   │   │   └── debt-payoff/
│   │   ├── about/            # 关于我们
│   │   ├── privacy/          # 隐私政策
│   │   └── blog/             # 博客
│   ├── globals.css           # 全局样式
│   ├── sitemap.ts            # 站点地图
│   └── robots.ts             # 爬虫规则
├── components/
│   ├── Navigation.tsx        # 导航栏
│   ├── Footer.tsx            # 页脚
│   ├── ui/                   # UI组件库
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Slider.tsx
│   │   └── ...
│   └── calculators/          # 计算器组件
│       ├── CalculatorInput.tsx
│       ├── ResultCard.tsx
│       ├── ExpertTips.tsx
│       └── [7个计算器组件]
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
- [x] 7个金融计算器
- [x] 中英文双语支持
- [x] 响应式设计
- [x] SEO优化
- [x] 专业UI设计系统

### 计划中 📋
- [ ] 博客系统（MDX）
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
