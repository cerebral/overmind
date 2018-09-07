const path = require('path')

module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: '<rootDir>/tsconfig.spec.json',
    },
    __TRANSFORM_HTML__: true,
  },
  collectCoverage: true,
  preset: path.resolve('..', '..', '..', 'node_modules', 'jest-preset-angular'),
  setupTestFrameworkScriptFile: '<rootDir>/setupJest.ts',
  collectCoverageFrom: ['src/**/*.{t,j}s?(x)', '!src/**/*.d.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(ts|js|html)$':
      '<rootDir>/../../../node_modules/jest-preset-angular/preprocessor.js',
  },
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
    providesModuleNodeModules: ['overmind-angular'],
  },
  snapshotSerializers: [
    '<rootDir>/../../../node_modules/jest-preset-angular/AngularSnapshotSerializer.js',
    '<rootDir>/../../../node_modules/jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
