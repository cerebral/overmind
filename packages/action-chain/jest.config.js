var semver = require('semver');

function getSupportedTypescriptTarget() {
	var nodeVersion = process.versions.node;

	if (semver.gt(nodeVersion, '7.6.0')) {
		return 'es2017';
	} else if (semver.gt(nodeVersion, '7.0.0')) {
		return 'es2016';
	} else if (semver.gt(nodeVersion, '6.0.0')) {
		return 'es2015';
	} else if (semver.gt(nodeVersion, '4.0.0')) {
		return 'es5';
	} else {
		return 'es3';
	}
}

module.exports = {
	transform: {
		'.(tsx?)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
	},
	testMatch: [ '**/__tests__/**/*.{t,j}s?(x)', '**/?(*.)(spec|test).{t,j}s?(x)' ],
	testPathIgnorePatterns: [ '<rootDir>/(node_modules|lib|es|dist)' ],
	collectCoverageFrom: [ 'src/**/*.{t,j}s?(x)', '!src/**/*.d.ts' ],
	moduleFileExtensions: [ 'js', 'jsx', 'json', 'ts', 'tsx' ],
	mapCoverage: true,
	globals: {
		'ts-jest': {
			skipBabel: true,
			tsConfigFile: {
				target: getSupportedTypescriptTarget(),
				module: 'commonjs'
			}
		}
	}
};
