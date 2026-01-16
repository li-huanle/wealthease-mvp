import {getTranslations, setRequestLocale} from 'next-intl/server';
import {CheckCircle, Users, Calculator, TrendingUp, Award, BookOpen, ExternalLink, AlertTriangle} from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'about'});

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'about'});

  const values = [
    {
      icon: CheckCircle,
      title: t('values.free.title'),
      description: t('values.free.description'),
    },
    {
      icon: Award,
      title: t('values.accurate.title'),
      description: t('values.accurate.description'),
    },
    {
      icon: Users,
      title: t('values.private.title'),
      description: t('values.private.description'),
    },
    {
      icon: TrendingUp,
      title: t('values.simple.title'),
      description: t('values.simple.description'),
    },
  ];

  const stats = [
    {
      number: '50,000+',
      label: t('stats.users'),
    },
    {
      number: '200,000+',
      label: t('stats.calculations'),
    },
    {
      number: '12',
      label: t('stats.tools'),
    },
    {
      number: '98%',
      label: t('stats.satisfaction'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-primary-600">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('mission.title')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('mission.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('story.title')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('story.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Expertise & Reliability Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('expertise.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('expertise.subtitle')}
            </p>
          </div>

          {/* Formulas Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <div className="flex items-start mb-6">
              <div className="bg-primary-100 rounded-lg p-3 mr-4">
                <Calculator className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t('expertise.formulas.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('expertise.formulas.content')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                      {t('expertise.formulasList.compound')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                      {t('expertise.formulasList.amortization')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                      {t('expertise.formulasList.roi')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                      {t('expertise.formulasList.retirement')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sources Section */}
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <div className="flex items-start mb-6">
              <div className="bg-primary-600 rounded-lg p-3 mr-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t('expertise.sources.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('expertise.sources.content')}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="https://www.cfainstitute.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-gray-700 text-sm">{t('expertise.sourcesList.cfa')}</span>
                  </a>
                  <a
                    href="https://www.cfp.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-gray-700 text-sm">{t('expertise.sourcesList.fp')}</span>
                  </a>
                  <a
                    href="https://www.federalreserveeducation.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-gray-700 text-sm">{t('expertise.sourcesList.federal')}</span>
                  </a>
                  <a
                    href="https://www.investopedia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-gray-700 text-sm">{t('expertise.sourcesList.investopedia')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-start">
              <div className="bg-amber-100 rounded-lg p-3 mr-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t('expertise.disclaimer.title')}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t('expertise.disclaimer.content')}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-600">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>{t('expertise.disclaimer.point1')}</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>{t('expertise.disclaimer.point2')}</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>{t('expertise.disclaimer.point3')}</span>
                  </li>
                  <li className="flex items-start text-gray-600">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>{t('expertise.disclaimer.point4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('values.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            href={`/${locale}/calculators`}
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
