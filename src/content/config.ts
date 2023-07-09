// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const blogCollection = defineCollection({
	schema: z.object({
		draft: z.boolean(),
		title: z.string(),
		snippet: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		publishDate: z.date(),
		author: z.string().default('HSC'),
		category: z.string(),
		tags: z.array(z.string()),
	}),
});

const teamCollection = defineCollection({
	schema: z.object({
		draft: z.boolean(),
		name: z.string(),
		title: z.string(),
		committee: z.string(),
		avatar: z.object({
			src: z.string(),
		}),
		publishDate: z.string().transform(str => new Date(str)),
	}),
});

const eventCollection = defineCollection({
	schema: z.object({
		draft: z.boolean(),
		title: z.string(),
		description: z.string(),
		date: z.string().transform(str => new Date(str)),
		location: z.string().optional(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		link: z.string().optional(),
	}),
});

const initiativeCollection = defineCollection({
	schema: z.object({
		draft: z.boolean(),
		title: z.string(),
		description: z.string(),
		date: z.string().transform(str => new Date(str)).optional(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		link: z.string().optional(),
	}),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
	'blog': blogCollection,
	'council': teamCollection,
	'events': eventCollection,
	'initiatives': initiativeCollection,
};