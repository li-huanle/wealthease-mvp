import Link from 'next/link';
import { TrendingUp, PiggyBank, Calculator, Home, BarChart3 } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export const metadata = {
  title: 'Financial Calculators | WealthEase',
  description: 'Free financial calculators for compound interest, retirement planning, loans, and more',
};

export default async function CalculatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const calculators = [
    {
      icon: <TrendingUp className="w-10 h-10 text-primary-600" />,
      title: 'Compound Interest Calculator',
      description: 'See how your investments grow with compound interest over time',
      href: `/${locale}/calculators/compound-interest`,
      available: true,
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-primary-600" />,
      title: 'Retirement Calculator',
      description: 'Plan for a comfortable retirement',
      href: `/${locale}/calculators/retirement`,
      available: true,
    },
    {
      icon: <Calculator className="w-10 h-10 text-primary-600" />,
      title: 'Loan Calculator',
      description: 'Calculate loan payments and total interest',
      href: `/${locale}/calculators/loan`,
      available: true,
    },
    {
      icon: <Home className="w-10 h-10 text-primary-600" />,
      title: 'Mortgage Calculator',
      description: 'Estimate your monthly mortgage payments',
      href: `/${locale}/calculators/mortgage`,
      available: true,
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-primary-600" />,
      title: 'ROI Calculator',
      description: 'Calculate return on investment and annualized returns',
      href: `/${locale}/calculators/roi`,
      available: true,
    },
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Financial Calculators
            </h1>
            <p className="text-xl text-gray-600">
              Professional-grade tools to help you make smarter financial decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <div key={calc.title}>
                {calc.available ? (
                  <Link
                    href={calc.href}
                    className="block h-full p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary-500"
                  >
                    <div className="mb-4">{calc.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {calc.title}
                    </h3>
                    <p className="text-gray-600">{calc.description}</p>
                  </Link>
                ) : (
                  <div className="h-full p-6 bg-gray-100 rounded-xl border-2 border-gray-200">
                    <div className="mb-4">{calc.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">
                      {calc.title}
                    </h3>
                    <p className="text-gray-500">{calc.description}</p>
                    <span className="inline-block mt-3 text-sm text-gray-400">
                      Coming soon
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
