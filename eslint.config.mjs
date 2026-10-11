import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextCoreWebVitals,
  { ignores: ['.next/**', 'node_modules/**'] },
  {
    rules: {
      // Apostrophes in JSX copy render fine; not worth escaping everywhere.
      'react/no-unescaped-entities': 'off',
      // Existing calculators compute results in effects; kept visible as warnings.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default config;
