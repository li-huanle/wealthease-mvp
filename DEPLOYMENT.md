# 🚀 WealthEase MVP 部署指南

## 快速部署到 Vercel（5分钟）

### 步骤 1: 准备代码

```bash
# 进入项目目录
cd wealthease-mvp

# 安装依赖
npm install

# 测试本地运行
npm run dev
```

访问 http://localhost:3000 确认一切正常。

### 步骤 2: 推送到 GitHub

```bash
# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Initial commit: WealthEase MVP"

# 推送到 GitHub
git remote add origin https://github.com/你的用户名/wealthease.git
git push -u origin main
```

### 步骤 3: 部署到 Vercel

**选项 A - 通过网页（推荐新手）：**

1. 访问 https://vercel.com
2. 点击 "Import Project"
3. 选择你的 GitHub 仓库
4. Vercel 自动检测 Next.js
5. 点击 "Deploy" - 完成！

**选项 B - 通过 CLI：**

```bash
npm i -g vercel
vercel login
vercel
```

### 步骤 4: 配置域名 wealthease.top

#### 在 Cloudflare（你的域名提供商）：

1. 登录 Cloudflare
2. 选择 wealthease.top 域名
3. 进入 DNS 设置
4. 添加以下记录：

```
类型: CNAME
名称: @
目标: cname.vercel-dns.com
代理状态: DNS only（灰色云朵）
```

对于 www 子域名：
```
类型: CNAME
名称: www
目标: cname.vercel-dns.com
```

对于中文站 cn.wealthease.top：
```
类型: CNAME
名称: cn
目标: cname.vercel-dns.com
```

#### 在 Vercel：

1. 进入你的项目
2. Settings > Domains
3. 添加域名：
   - wealthease.top
   - www.wealthease.top
   - cn.wealthease.top
4. Vercel 会自动验证并配置 SSL

**注意**：DNS 传播可能需要 5-30 分钟。

### 步骤 5: 验证部署

访问以下 URL 确认：
- https://wealthease.top （英文首页）
- https://wealthease.top/zh （中文首页）
- https://wealthease.top/calculators/compound-interest （计算器）
- https://cn.wealthease.top （中文子域名）

## 环境变量配置

如果你需要添加 API 密钥（如 Google Analytics）：

在 Vercel 项目中：
1. Settings > Environment Variables
2. 添加变量：
   - `NEXT_PUBLIC_GA_ID`: 你的 Google Analytics ID
   - `MAILCHIMP_API_KEY`: Mailchimp API 密钥（未来）

在本地开发：
创建 `.env.local` 文件：

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 性能检查清单

部署后立即检查：

### 1. Google PageSpeed Insights
访问：https://pagespeed.web.dev/
输入你的网址，目标分数 90+

### 2. 移动端测试
用手机访问，检查：
- [ ] 导航菜单正常
- [ ] 计算器输入流畅
- [ ] 图表显示正确
- [ ] 语言切换正常

### 3. SEO 检查
```bash
# 检查 robots.txt（需要创建）
https://wealthease.top/robots.txt

# 检查 sitemap（需要创建）
https://wealthease.top/sitemap.xml
```

## Google Search Console 设置

1. 访问 https://search.google.com/search-console
2. 添加资产（Property）：wealthease.top
3. 验证所有权（通过 Vercel DNS 或 HTML 标签）
4. 提交 sitemap：`https://wealthease.top/sitemap.xml`

## Google Analytics 设置

1. 创建 GA4 账号
2. 获取测量 ID（G-XXXXXXXXX）
3. 在 Vercel 添加环境变量
4. 在 `app/[locale]/layout.tsx` 添加追踪代码

## 监控和维护

### 必装工具：
1. **Vercel Analytics**（免费）- 自动启用
2. **Google Analytics** - 追踪流量
3. **Google Search Console** - 监控 SEO
4. **Uptime Robot**（可选）- 监控网站可用性

### 每周检查：
- [ ] 网站响应时间
- [ ] 错误日志（Vercel Dashboard）
- [ ] 流量数据（GA）
- [ ] 搜索排名（GSC）

## 常见问题

### 问题 1: 域名不生效
**解决**：
- 检查 DNS 是否正确配置
- 等待 DNS 传播（最多 24 小时）
- 在 Cloudflare 关闭代理（灰色云朵）

### 问题 2: 中文路由 404
**解决**：
- 确保 middleware.ts 正确配置
- 检查 messages/zh.json 存在
- 重新部署

### 问题 3: 图表不显示
**解决**：
- 检查浏览器控制台错误
- 确认 Chart.js 正确安装
- 清除缓存重试

## 下一步行动

部署成功后：

### 第1周：
- [ ] 配置 Google Analytics
- [ ] 提交到 Google Search Console
- [ ] 发布首篇博客文章
- [ ] 在社交媒体分享

### 第2周：
- [ ] 添加更多计算器
- [ ] 优化 SEO（meta 描述）
- [ ] 设置邮件订阅
- [ ] A/B 测试首页 CTA

### 第3周：
- [ ] 开始内容营销
- [ ] Reddit/Quora 推广
- [ ] 考虑付费广告
- [ ] 分析用户行为数据

### 第4周：
- [ ] 优化转化率
- [ ] 添加 CPS 佣金链接
- [ ] 准备更多工具
- [ ] 评估 MVP 表现

## 成功指标

### 第1个月目标：
- 🎯 1,000+ 独立访客
- 🎯 3,000+ 页面浏览
- 🎯 5+ 有机搜索关键词排名
- 🎯 20+ 邮件订阅

### 第3个月目标：
- 🎯 10,000+ 独立访客
- 🎯 50+ 关键词排名前10
- 🎯 200+ 邮件订阅
- 🎯 $200-500 月收入

---

**准备好了吗？开始部署！** 🚀

有问题？参考：
- Vercel 文档：https://vercel.com/docs
- Next.js 文档：https://nextjs.org/docs
- 或查看 README.md
