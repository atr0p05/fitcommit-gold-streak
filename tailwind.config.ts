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
    extend: {
      colors: {
        // Black and white color palette
        fitTrue: {
          DEFAULT: '#000000', // true black
          foreground: '#FFFFFF', // white text
        },
        fitCharcoal: {
          DEFAULT: '#222222', // dark charcoal for cards
          foreground: '#FFFFFF',
        },
        fitSilver: {
          DEFAULT: '#888888', // silver/gray for secondary text
          foreground: '#000000',
        },
        fitWhite: {
          DEFAULT: '#F1F1F1', // soft white for highlights
          foreground: '#000000',
        },
        fitGray: {
          DEFAULT: '#555555', // mid gray
          foreground: '#FFFFFF',
        },
        fitSuccess: {
          DEFAULT: '#666666', // muted gray for success
          foreground: '#FFFFFF',
        },
        fitError: {
          DEFAULT: '#333333', // deep dark gray for errors
          foreground: '#FFFFFF',
        },
        border: "#555555", // Adding the border color
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
        'sans': ['SF Pro Display', 'Helvetica Neue', 'sans-serif'],
      },
      spacing: {
        'premium': '24px',
      },
      fontSize: {
        'xs': ['0.75rem', { 
          lineHeight: '1rem', 
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }],
        'sm': ['0.875rem', { 
          lineHeight: '1.25rem', 
          letterSpacing: '0.025em',
          textTransform: 'uppercase'
        }],
        'base': ['1rem', { 
          lineHeight: '1.5rem', 
          letterSpacing: '0.025em' 
        }],
        'lg': ['1.125rem', { 
          lineHeight: '1.75rem', 
          letterSpacing: '0.035em',
          fontWeight: '300'
        }],
        'xl': ['1.25rem', { 
          lineHeight: '1.75rem', 
          letterSpacing: '0.05em',
          fontWeight: '400'
        }],
        '2xl': ['1.5rem', { 
          lineHeight: '2rem', 
          letterSpacing: '0.05em',
          fontWeight: '300'
        }],
        '3xl': ['1.875rem', { 
          lineHeight: '2.25rem', 
          letterSpacing: '0.05em',
          fontWeight: '200'
        }],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
