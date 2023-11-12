import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import sentry from '@sentry/astro';


// https://astro.build/config
export default defineConfig({
	site: 'https://hcihsc.pages.dev',
	image: {
		domains: ['images.ctfassets.net'],
	},
	integrations: [react(), tailwind(), mdx(), sitemap(), icon({
		include: {
			mdi: ['calendar', 'location', 'facebook', 'instagram', 'youtube', 'arrow-right'],
			uil: ['envelope', 'instagram'],
		},
	}), partytown({
		config: {
			forward: ['dataLayer.push'],
		},
	}), sentry({
		dsn: 'https://7fe022e75fa6bbf1ba04f227f37431c9@o975437.ingest.sentry.io/4506211627565056',
		sourceMapsUploadOptions: {
			project: 'hci-hsc',
			authToken: process.env.SENTRY_AUTH_TOKEN,
		},
	})],
	output: 'server',
	adapter: cloudflare({
		runtime: {
			mode: 'local',
		},
	}),
});