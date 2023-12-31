// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)


const teamCollection = defineCollection({
	schema: z.object({
		draft: z.boolean(),
		name: z.string(),
		title: z.string(),
		committee: z.string(),
		avatar: z.object({
			src: z.string(),
		}),
	}),
});

const eventCollection = defineCollection({
	schema: z.object({
		draft: z.boolean(),
		title: z.string(),
		description: z.string(),
		date: z.date(),
		location: z.string().optional(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		link: z.string().optional(),
	}),
});

const batch = defineCollection({
	schema: z.object({
		name: z.string(),
		batch: z.number(),
	}),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
	'council': teamCollection,
	'batch': batch,
};