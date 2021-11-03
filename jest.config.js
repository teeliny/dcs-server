/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	roots: ['<rootDir>/'],
	// The glob patterns Jest uses to detect test files
	testMatch: ['**/?(*.)+(spec|test).ts'],
	preset: 'ts-jest',
	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: ['/node_modules/'],
	moduleFileExtensions: ['ts', 'js'],
}
