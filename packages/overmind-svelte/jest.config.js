module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{t,j}s?(x)', '!src/**/*.d.ts'],
  moduleFileExtensions: ['ts', 'js', 'svelte'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svelte$': 'svelte-jester',
  },
  testRegex: '\\.test\\.ts?$',
  testPathIgnorePatterns: [
    '/dist/',
    '/es/',
    '/lib/',
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  haste: {
    // This option is needed or else globbing ignores <rootDir>/node_modules.
    providesModuleNodeModules: ['overmind-svelte'],
  },
}
