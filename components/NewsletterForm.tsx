'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const t = useTranslations('home.newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证邮箱
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(t('errorInvalid'));
      return;
    }

    setStatus('loading');

    try {
      // 模拟API调用（稍后可以连接真实的邮件服务）
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 保存到localStorage作为临时存储
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
      }

      setStatus('success');
      setMessage(t('success'));
      setEmail('');

      // 3秒后重置状态
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(t('error'));

      // 3秒后重置状态
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl bg-gray-950 px-6 py-10 text-center text-white sm:px-10">
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[28rem] max-w-full -translate-x-1/2 rounded-full bg-primary-500/25 blur-3xl" />
      <h2 className="relative mb-3 text-2xl font-bold tracking-tight sm:text-3xl">{t('title')}</h2>
      <p className="relative mb-6 text-gray-300">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="relative mx-auto max-w-md">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            disabled={status === 'loading'}
            aria-label={t('placeholder')}
            className="h-11 min-w-0 flex-1 rounded-lg border-0 bg-white px-4 text-gray-900 outline-none ring-2 ring-transparent transition-[box-shadow] duration-quick ease-out focus:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="h-11 rounded-lg bg-primary-500 px-6 font-semibold text-gray-950 transition-colors duration-quick ease-out hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'loading' ? t('subscribing') : t('subscribe')}
          </button>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
