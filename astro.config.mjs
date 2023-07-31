import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import deno from '@astrojs/deno';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import icon from 'astro-icon';

const platform = process.env.PLATFORM || 'NODE';

let adapterConfig = {};

// https://astro.build/reference/configuration
if (platform === 'DENO') {
	console.log('Deno');
	adapterConfig = {
		...deno(),
	};
}
else if (platform === 'CLOUDFLARE') {
	console.log('Cloudflare Functions');
	adapterConfig = {
		...cloudflare({
			mode: 'advanced',
		}),
	};
}
else {
	console.log('Node.js (default)');
	adapterConfig = {
		...node({
			mode: 'standalone',
		}),
	};
}


// https://astro.build/config
export default defineConfig({
	site: 'https://hcihsc.pages.dev',
	integrations: [react(), tailwind(), mdx(), sitemap(), icon({
		include: {
			mdi: ['*'],
		},
	})],
	output: 'server',
	adapter: adapterConfig,
});