'use client';

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
  icon?: React.ReactNode;
  tooltip?: string;
}

export default function ResultCard({
  title,
  value,
  subtitle,
  trend,
  highlight = false,
  icon,
  tooltip,
}: ResultCardProps) {
  return (
    <div
      className={`rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 opacity-0 animate-fade-in-up ${highlight
          ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white'
          : 'bg-white'
        }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p
            className={`text-sm font-medium mb-1 ${highlight ? 'text-accent-100' : 'text-gray-500'
              }`}
          >
            {title}
          </p>
          {icon && <div className="mb-2">{icon}</div>}
        </div>
        {tooltip && (
          <div className="group relative flex-shrink-0 ml-2">
            <svg
              className={`w-5 h-5 cursor-help ${highlight ? 'text-accent-200' : 'text-gray-400'
                }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div
              className={`absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 p-3 rounded-lg shadow-lg z-50 text-xs ${highlight ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'
                }`}
            >
              {tooltip}
              <div
                className={`absolute right-4 top-full w-2 h-2 transform rotate-45 -mt-1 ${highlight ? 'bg-white' : 'bg-gray-900'
                  }`}
              ></div>
            </div>
          </div>
        )}
      </div>

      <p
        className={`text-3xl md:text-4xl font-bold mb-2 font-mono ${highlight ? 'text-white' : 'text-gray-900'
          }`}
      >
        {value}
      </p>

      {subtitle && (
        <p
          className={`text-sm ${highlight ? 'text-accent-100' : 'text-gray-500'
            }`}
        >
          {subtitle}
        </p>
      )}

      {trend && (
        <div className="mt-3 flex items-center">
          <span
            className={`text-sm font-semibold flex items-center ${trend.isPositive
                ? highlight
                  ? 'text-white'
                  : 'text-success-600'
                : highlight
                  ? 'text-accent-200'
                  : 'text-danger-600'
              }`}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        </div>
      )}
    </div>
  );
}
