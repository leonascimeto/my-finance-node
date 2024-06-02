import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/__tests__/*.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/__tests__/*.ts?(x)', '!**/node_modules/**'],
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: {
    '@authentication/(.*)': ['<rootDir>/src/$1'],
  },
};

export default config;
