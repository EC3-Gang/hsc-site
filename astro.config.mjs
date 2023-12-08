import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import sentry from '@sentry/astro';
import node from '@astrojs/node';
import { loadEnv } from 'vite';
import vercel from '@astrojs/vercel/serverless';
import critters from 'astro-critters';
const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	site: 'https://hcihsc.pages.dev',
	image: {
		domains: ['images.ctfassets.net'],
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
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
	}), /* sentry({ sentry on vercel is kinda broken rn
		dsn: 'https://7fe022e75fa6bbf1ba04f227f37431c9@o975437.ingest.sentry.io/4506211627565056',
		sourceMapsUploadOptions: {
			project: 'hci-hsc',
			authToken: env.SENTRY_AUTH_TOKEN,
		},
	}), */ critters()],
	output: 'server',
	// adapter: node({ mode: 'standalone' }),
	adapter: vercel({
		imageService: true,
	}), // kys cloudflare
});