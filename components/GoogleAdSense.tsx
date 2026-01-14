import Script from 'next/script';

export default function GoogleAdSense({ adSenseId }: { adSenseId: string }) {
  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload" // 改为 lazyOnload，延迟加载直到浏览器空闲
    />
  );
}
