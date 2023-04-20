const {fontFamily} = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				bg: {
					base: 'var(--bg-base)',
					sub: 'var(--bg-sub)',
					shade: 'var(--bg-shade)',
					border: 'var(--bg-border)',
					'border-strong': 'var(--bg-border-strong)',
					'modal-overlay': 'var(--bg-modal-overlay)',
					// 这样对应地就可以使用 bg-bg-tag，或者 text-bg-tag 之类的了
					tag: 'var(--tag-base)',
					contrast: 'var(--bg-contrast)',
					error: 'var(--bg-error)',
				},
				label: {
					title: 'var(--label-title)',
					base: 'var(--label-base)',
					muted: 'var(--label-muted)',
					faint: 'var(--label-faint)',
					link: 'var(--label-link)',
					'link-hover': 'var(--label-link-hover)',
				},
			},
			
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			keyframes: {
				// chatGPT 3.5
				"bounce-start": {
					'0%': {transform: 'translateY(20px)',},
					'75%': {transform: "translateY(5px)"},
					'100%': {transform: 'translateY(0x)'}
				},
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
				'bounce-start': 'bounce-start 1.5s ease-in-out',
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		}
	},
	plugins: [
		require('@tailwindcss/typography'), // ref: https://tailwindcss.com/docs/typography-plugin
		require("tailwindcss-animate"),
		require("daisyui"),
	],
	
	// daisyui config, ref: https://daisyui.com/docs/config/
	daisyui: {
		logs: false
	}
}
