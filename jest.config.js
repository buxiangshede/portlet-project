module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupJest.js'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  resetMocks: true,
};
