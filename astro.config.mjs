import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
	site: 'https://hcihsc.pages.dev',
	integrations: [
		react(),
		tailwind(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
			cacheDir: false,
		}),
		mdx(),
		sitemap(),
	],
});
