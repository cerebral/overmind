module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{t,j}s?(x)', '!src/**/*.d.ts'],
  moduleFileExtensions: ['ts', 'js', 'svelte'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
    '^.+\\.svelte$': 'svelte-jester',
  },
  testRegex: '\\.test\\.ts?$',
  testPathIgnorePatterns: [
    '/dist/',
    '/es/',
    '/lib/',
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: ['node_modules/(?!(svelte|@testing-library/svelte|esm-env)/)'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
}
