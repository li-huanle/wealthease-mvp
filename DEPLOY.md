# 🚀 快速部署指南

## 立即部署到Vercel（5分钟）

### 步骤1: 准备代码
```bash
cd wealthease-mvp
npm install
npm run build  # 测试构建是否成功
```

### 步骤2: 推送到GitHub
```bash
git init
git add .
git commit -m "Initial commit - WealthEase MVP"
git branch -M main
git remote add origin https://github.com/你的用户名/wealthease.git
git push -u origin main
```

### 步骤3: 部署到Vercel
1. 访问 https://vercel.com/new
2. 用GitHub账号登录
3. 选择刚才的仓库
4. Framework Preset: Next.js (自动识别)
5. 点击 "Deploy"

### 步骤4: 配置域名
部署完成后：
1. 进入项目 Settings → Domains
2. 添加 `wealthease.top`
3. 按照提示配置DNS A记录：
   - Type: A
   - Name: @
   - Value: 76.76.21.21 (Vercel IP)
4. 添加 `www.wealthease.top`
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com

### 步骤5: 测试
等待DNS生效（5-30分钟），访问：
- https://wealthease.top
- https://wealthease.top/zh (中文版)

## 本地开发

```bash
npm run dev
```
访问 http://localhost:3000

## 常见问题

**Q: 构建失败？**
A: 检查 Node.js 版本 >= 18，运行 `npm install` 重新安装依赖

**Q: 域名不生效？**
A: DNS生效需要时间，使用 https://你的项目.vercel.app 先测试

**Q: 修改后如何更新？**
A: 推送到GitHub，Vercel自动重新部署
```bash
git add .
git commit -m "更新说明"
git push
```

## 性能检查

部署后检查：
- ✅ Lighthouse分数 > 90
- ✅ 移动端响应式
- ✅ 中英文切换正常
- ✅ 计算器功能完整

## 下一步

1. 添加Google Analytics
2. 提交到Google Search Console
3. 开始SEO优化和内容创作
4. 开发更多计算器

## 需要帮助？

查看完整README.md或联系开发者。
