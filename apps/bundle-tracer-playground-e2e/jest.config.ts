/* eslint-disable */
export default {
  displayName: 'bundle-tracer-playground-e2e',
  preset: '../..//jest.preset.js',
  globals: {},
  setupFiles: ['<rootDir>/src/test-setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../..//coverage/bundle-tracer-playground-e2e',
};
