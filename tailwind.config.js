const {fontFamily} = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}'],
	darkMode: 'media',
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				// border: "hsl(var(--border))",
				// input: "hsl(var(--input))",
				// ring: "hsl(var(--ring))",
				// background: "hsl(var(--background))",
				// foreground: "hsl(var(--foreground))",
				// primary: {
				// 	DEFAULT: "hsl(var(--primary))",
				// 	foreground: "hsl(var(--primary-foreground))",
				// },
				// secondary: {
				// 	DEFAULT: "hsl(var(--secondary))",
				// 	foreground: "hsl(var(--secondary-foreground))",
				// },
				// destructive: {
				// 	DEFAULT: "hsl(var(--destructive))",
				// 	foreground: "hsl(var(--destructive-foreground))",
				// },
				// muted: {
				// 	DEFAULT: "hsl(var(--muted))",
				// 	foreground: "hsl(var(--muted-foreground))",
				// },
				// accent: {
				// 	DEFAULT: "hsl(var(--accent))",
				// 	foreground: "hsl(var(--accent-foreground))",
				// },
				// popover: {
				// 	DEFAULT: "hsl(var(--popover))",
				// 	foreground: "hsl(var(--popover-foreground))",
				// },
				// card: {
				// 	DEFAULT: "hsl(var(--card))",
				// 	foreground: "hsl(var(--card-foreground))",
				// },
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: "calc(var(--radius) - 4px)",
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
