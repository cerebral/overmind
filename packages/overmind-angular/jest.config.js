const path = require('path')

const angularPresetPath = path.resolve(
  '..',
  '..',
  'node_modules',
  'jest-preset-angular'
)
module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: '<rootDir>/tsconfig.spec.json',
    },
    __TRANSFORM_HTML__: true,
  },
  collectCoverage: true,
  preset: angularPresetPath,
  setupTestFrameworkScriptFile: '<rootDir>/setupJest.ts',
  collectCoverageFrom: ['src/**/*.{t,j}s?(x)', '!src/**/*.d.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(ts|js|html)$': path.join(angularPresetPath, 'preprocessor.js'),
  },
  testPathIgnorePatterns: [
    '/dist/',
    '/es/',
    '/lib/',
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  snapshotSerializers: [
    path.join(angularPresetPath, 'AngularSnapshotSerializer.js'),
    path.join(angularPresetPath, 'HTMLCommentSerializer.js'),
  ],
}
