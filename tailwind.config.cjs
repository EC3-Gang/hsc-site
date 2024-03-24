/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	dark: 'class',
	theme: {
		nightwind: {
			typography: true,
			colorClasses: [
				'placeholder',
			],
			fixedClass: 'nightwind-prevent',
			fixedBlockClass: 'nightwind-prevent-block',
		},
		extend: {
			fontFamily: {
				sans: ['InterVariable', 'Inter', ...defaultTheme.fontFamily.sans],
			},
			screens: {
				'2xs': '320px',
				'xs': '475px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('nightwind'),
	],
};
