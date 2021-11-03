module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['standard', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		quotes: ['error', 'single'],
		'no-use-before-define': 'warn',
		semi: 'error',
		'no-unused-vars': 'warn',
		camelcase: 'warn',
	},
	'overrides': [
		{
		  'files': ['*.test.ts','*.spec.ts'],
		  'rules': {
			'no-undef': 'off'
		  }
		}
	  ]
}
