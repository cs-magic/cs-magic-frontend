module.exports = {
	apps: [
		{
			name: 'cs-magic-frontend-alpha',
			cwd: '.',
			script: './run-start.sh',
			env: {
				ENV: "alpha",
			},
		},
		{
			name: 'cs-magic-frontend-prod',
			cwd: '.',
			script: './run-start.sh',
			env: {
				ENV: "prod",
			},
		},
	]
}

