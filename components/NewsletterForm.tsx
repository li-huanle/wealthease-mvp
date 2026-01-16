'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const t = useTranslations('home.newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
    <div className="card max-w-2xl mx-auto text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white">
      <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
      <p className="mb-6 text-primary-100">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-4 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
