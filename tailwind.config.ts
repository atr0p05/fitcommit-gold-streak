
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// FitCommit custom colors
				fitTrue: {
					DEFAULT: '#000000', // true black
					foreground: '#FFFFFF', // white text
				},
				fitCharcoal: {
					DEFAULT: '#221F26', // dark charcoal for cards
					foreground: '#FFFFFF',
				},
				fitGold: {
					DEFAULT: '#D9B673', // gold accent
					foreground: '#000000',
				},
				fitSilver: {
					DEFAULT: '#9F9EA1', // silver/gray for secondary text
					foreground: '#000000',
				},
				fitSuccess: {
					DEFAULT: '#8BAA8E', // muted sage green
					foreground: '#FFFFFF',
				},
				fitError: {
					DEFAULT: '#ea384c', // deep rust red
					foreground: '#FFFFFF',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'pulse-gold': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.7'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'pulse-gold': 'pulse-gold 2s ease-in-out infinite'
			},
			fontFamily: {
				'serif': ['Georgia', 'serif'],
				'sans': ['SF Pro Display', 'Helvetica', 'sans-serif'],
			},
			spacing: {
				'premium': '24px',
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
				'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.025em' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.025em' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.05em' }],
				'2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.05em' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.05em' }],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
