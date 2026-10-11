import Script from 'next/script';

// Cloudflare Web Analytics is cookieless, so it loads without waiting for cookie consent.
export default function CloudflareAnalytics({ token }: { token: string }) {
  return (
    <Script
      id="cloudflare-web-analytics"
      type="module"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
      strategy="afterInteractive"
    />
  );
}
