module.exports = {
  collectCoverage: true,
  testURL: 'http://localhost/',
  collectCoverageFrom: ['src/**/*.{t,j}s?(x)', '!src/**/*.d.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.test\\.tsx?$',
  testPathIgnorePatterns: [
    '/dist/',
    '/es/',
    '/lib/',
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
}
