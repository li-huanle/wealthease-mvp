import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Set default consent state before loading gtag
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });

            // Check for existing consent
            try {
              const consent = localStorage.getItem('cookie-consent');
              if (consent) {
                const parsed = JSON.parse(consent);
                if (parsed.state === 'accepted') {
                  gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'analytics_storage': 'granted'
                  });
                } else if (parsed.state === 'customized') {
                  gtag('consent', 'update', {
                    'analytics_storage': parsed.preferences.analytics ? 'granted' : 'denied',
                    'ad_storage': parsed.preferences.advertising ? 'granted' : 'denied',
                    'ad_user_data': parsed.preferences.advertising ? 'granted' : 'denied',
                    'ad_personalization': parsed.preferences.advertising ? 'granted' : 'denied'
                  });
                }
              }
            } catch(e) {}
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
