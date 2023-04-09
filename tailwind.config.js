const {fontFamily} = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				bg: {
					base: 'var(--bg-base)',
					'base-hover': 'var(--bg-base-hover)',
					sub: 'var(--bg-sub)',
					shade: 'var(--bg-shade)',
					border: 'var(--bg-border)',
					'border-strong': 'var(--bg-border-strong)',
					'modal-overlay': 'var(--bg-modal-overlay)',
					// 这样对应地就可以使用 bg-bg-tag，或者 text-bg-tag 之类的了
					tag: 'var(--tag-base)',
					contrast: 'var(--bg-contrast)',
				},
				label: {
					title: 'var(--label-title)',
					base: 'var(--label-base)',
					muted: 'var(--label-muted)',
					faint: 'var(--label-faint)',
					link: 'var(--label-link)',
					'link-hover': 'var(--label-link-hover)',
				},
				accent: {
					label: 'var(--accent-label)',
					base: 'var(--accent-base)',
					'base-hover': 'var(--accent-base-hover)',
					'selected-label': 'var(--accent-selected-label)',
					'selected-bg': 'var(--accent-selected-bg)',
					'muted-label': 'var(--accent-muted-label)',
					'muted-bg': 'var(--accent-muted-bg)',
				},
				semantic: {
					info: {
						highlight: 'var(--semantic-info-highlight)',
						base: 'var(--semantic-info-base)',
						border: 'var(--semantic-info-border)',
						bg: 'var(--semantic-info-bg)',
					},
					success: {
						highlight: 'var(--semantic-success-highlight)',
						base: 'var(--semantic-success-base)',
						border: 'var(--semantic-success-border)',
						bg: 'var(--semantic-success-bg)',
					},
					warning: {
						highlight: 'var(--semantic-warning-highlight)',
						base: 'var(--semantic-warning-base)',
						border: 'var(--semantic-warning-border)',
						bg: 'var(--semantic-warning-bg)',
					},
					error: {
						highlight: 'var(--semantic-error-highlight)',
						base: 'var(--semantic-error-base)',
						border: 'var(--semantic-error-border)',
						bg: 'var(--semantic-error-bg)',
					},
				},
			},
			
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			keyframes: {
				"accordion-down": {
					from: {height: 0},
					to: {height: "var(--radix-accordion-content-height)"},
				},
				"accordion-up": {
					from: {height: "var(--radix-accordion-content-height)"},
					to: {height: 0},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		}
	},
	plugins: [
		require("daisyui"),
		require("tailwindcss-animate")
	],
	
	// daisyui config, ref: https://daisyui.com/docs/config/
	daisyui: {
		logs: false
	}
}
