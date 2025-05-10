/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'main-color': '#14b8a6'
			},
			screens: {
				'3xl': '2570px'
			},
			keyframes: {
				'slide-down': {
					'0%': { transform: 'translateY(-10%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'slide-down': 'slide-down 300ms ease-in-out forwards'
			}
		}
	},
	plugins: [daisyui]
};
