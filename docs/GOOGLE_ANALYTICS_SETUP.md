# Google Analytics 设置指南

## 📊 为什么需要Google Analytics？

Google Analytics可以帮助您：
- 了解用户如何使用您的计算器
- 追踪哪些计算器最受欢迎
- 分析用户来源和行为
- 优化用户体验

## 🚀 快速设置

### 1. 获取Google Analytics ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建一个新的GA4属性（如果还没有）
3. 找到您的**Measurement ID**（格式：`G-XXXXXXXXXX`）
   - 在管理 → 数据流 → 选择您的网站数据流
   - 复制 Measurement ID

### 2. 本地开发配置

1. 复制环境变量示例文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，添加您的 GA ID：
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. 重启开发服务器：
```bash
npm run dev
```

### 3. 生产环境配置（Vercel）

1. 登录 [Vercel Dashboard](https://vercel.com/)
2. 选择您的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加新变量：
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: 您的 GA Measurement ID（例如：`G-XXXXXXXXXX`）
   - **Environment**: 选择 Production, Preview, Development（或根据需要）
5. 点击 **Save**
6. 重新部署项目以应用更改

## ✅ 验证安装

### 方法1：浏览器开发者工具

1. 打开您的网站
2. 打开浏览器开发者工具（F12）
3. 切换到 **Network** 标签
4. 刷新页面
5. 搜索 `google-analytics` 或 `gtag`
6. 应该能看到发送到 Google Analytics 的请求

### 方法2：Google Analytics实时报告

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 选择您的属性
3. 进入 **报告** → **实时**
4. 打开您的网站
5. 应该能在实时报告中看到当前访问

### 方法3：Google Analytics Debugger扩展

1. 安装 [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome扩展
2. 启用调试模式
3. 打开浏览器控制台
4. 访问您的网站
5. 查看详细的GA调试信息

## 📈 追踪的数据

当前配置会自动追踪：
- ✅ 页面浏览量（Page Views）
- ✅ 用户会话（Sessions）
- ✅ 用户来源（Traffic Sources）
- ✅ 设备类型（Desktop/Mobile/Tablet）
- ✅ 地理位置
- ✅ 浏览器和操作系统

## 🔒 隐私和GDPR合规

当前实现：
- ✅ 不收集个人身份信息（PII）
- ✅ 使用Google Analytics 4（符合最新隐私标准）
- ✅ 仅在有GA ID时加载脚本

### 推荐添加（如需符合GDPR）：

1. **Cookie同意横幅**
   - 在用户同意前不加载GA脚本
   - 提供选择退出选项

2. **隐私政策页面**
   - 说明收集的数据类型
   - 说明数据使用方式
   - 提供联系方式

## 🛠️ 高级配置

### 追踪自定义事件

如需追踪特定用户操作（如计算按钮点击），可以添加：

```typescript
// 在需要追踪的地方添加
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'calculator_used', {
    calculator_type: 'compound_interest',
    event_category: 'engagement',
    event_label: 'Calculate Button',
  });
}
```

### TypeScript类型定义

在 `next-env.d.ts` 或单独的类型文件中添加：

```typescript
interface Window {
  gtag?: (
    command: 'config' | 'event' | 'js',
    targetId: string | Date,
    config?: Record<string, any>
  ) => void;
  dataLayer?: any[];
}
```

## 📝 注意事项

1. **环境变量前缀**：必须使用 `NEXT_PUBLIC_` 前缀才能在客户端访问
2. **重新部署**：修改环境变量后需要重新部署才能生效
3. **测试环境**：建议使用不同的GA ID用于开发和生产环境
4. **数据延迟**：GA4数据可能有24-48小时延迟

## 🆘 故障排查

### GA没有收到数据？

1. 检查环境变量是否正确设置
2. 验证GA ID格式（必须是 `G-XXXXXXXXXX`）
3. 确认浏览器没有启用广告拦截器
4. 检查浏览器控制台是否有错误
5. 验证网络请求中是否有GA相关调用

### 本地开发看不到数据？

- GA在本地开发环境也会工作
- 确保 `.env` 文件配置正确
- 检查是否在 localhost 上运行

## 📚 参考资源

- [Google Analytics 4 文档](https://support.google.com/analytics/answer/10089681)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [gtag.js 参考](https://developers.google.com/analytics/devguides/collection/gtagjs)
