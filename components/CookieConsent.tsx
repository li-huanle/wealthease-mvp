'use client';

import {useState, useEffect} from 'react';
import {useLocale} from 'next-intl';
import Link from 'next/link';
import {Cookie, X, Check, Settings} from 'lucide-react';

type ConsentState = 'pending' | 'accepted' | 'declined' | 'customized';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
}

export default function CookieConsent() {
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    advertising: true,
  });

  const translations = {
    en: {
      title: 'Cookie Consent',
      message: 'We use cookies to enhance your browsing experience, analyze site traffic, and serve relevant ads. By clicking "Accept All", you consent to our use of cookies.',
      acceptAll: 'Accept All',
      decline: 'Decline',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      learnMore: 'Learn more in our',
      privacyPolicy: 'Privacy Policy',
      settings: {
        title: 'Cookie Settings',
        necessary: {
          title: 'Necessary Cookies',
          description: 'Essential for the website to function properly. Cannot be disabled.',
        },
        analytics: {
          title: 'Analytics Cookies',
          description: 'Help us understand how visitors interact with our website.',
        },
        advertising: {
          title: 'Advertising Cookies',
          description: 'Used to deliver relevant advertisements and track ad campaign performance.',
        },
      },
    },
    zh: {
      title: 'Cookie 同意',
      message: '我们使用 Cookie 来增强您的浏览体验、分析网站流量并投放相关广告。点击「全部接受」即表示您同意我们使用 Cookie。',
      acceptAll: '全部接受',
      decline: '拒绝',
      customize: '自定义',
      savePreferences: '保存设置',
      learnMore: '了解更多请查看我们的',
      privacyPolicy: '隐私政策',
      settings: {
        title: 'Cookie 设置',
        necessary: {
          title: '必要 Cookie',
          description: '网站正常运行所必需的。无法禁用。',
        },
        analytics: {
          title: '分析 Cookie',
          description: '帮助我们了解访客如何与网站互动。',
        },
        advertising: {
          title: '广告 Cookie',
          description: '用于投放相关广告并跟踪广告活动效果。',
        },
      },
    },
  };

  const t = translations[locale as 'en' | 'zh'] || translations.en;

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner to avoid layout shift
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      state: 'accepted' as ConsentState,
      preferences: {necessary: true, analytics: true, advertising: true},
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);

    // Enable Google Analytics and AdSense
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  const handleDecline = () => {
    const consentData = {
      state: 'declined' as ConsentState,
      preferences: {necessary: true, analytics: false, advertising: false},
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);

    // Disable Google Analytics and AdSense
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  };

  const handleSavePreferences = () => {
    const consentData = {
      state: 'customized' as ConsentState,
      preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowSettings(false);

    // Update consent based on preferences
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.advertising ? 'granted' : 'denied',
        ad_user_data: preferences.advertising ? 'granted' : 'denied',
        ad_personalization: preferences.advertising ? 'granted' : 'denied',
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Main Banner */}
          {!showSettings ? (
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-full flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {t.message}{' '}
                    <Link href={`/${locale}/privacy`} className="text-primary-600 hover:underline">
                      {t.learnMore} {t.privacyPolicy}
                    </Link>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {t.acceptAll}
                    </button>
                    <button
                      onClick={handleDecline}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t.decline}
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {t.customize}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Settings Panel */
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.settings.title}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{t.settings.necessary.title}</h4>
                    <p className="text-sm text-gray-600">{t.settings.necessary.description}</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-primary-600 rounded-full cursor-not-allowed opacity-70"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition translate-x-5"></div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{t.settings.analytics.title}</h4>
                    <p className="text-sm text-gray-600">{t.settings.analytics.description}</p>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                    className="relative"
                  >
                    <div className={`w-11 h-6 rounded-full transition-colors ${preferences.analytics ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-5' : ''}`}></div>
                  </button>
                </div>

                {/* Advertising Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{t.settings.advertising.title}</h4>
                    <p className="text-sm text-gray-600">{t.settings.advertising.description}</p>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, advertising: !preferences.advertising})}
                    className="relative"
                  >
                    <div className={`w-11 h-6 rounded-full transition-colors ${preferences.advertising ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.advertising ? 'translate-x-5' : ''}`}></div>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  {t.savePreferences}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add gtag type declaration
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
