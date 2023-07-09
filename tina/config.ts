import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
	branch,
	clientId: process.env.TINA_CLIENT_ID!!, // Get this from tina.io
	token: process.env.TINA_TOKEN!!, // Get this from tina.io

	build: {
		outputFolder: 'admin',
		publicFolder: 'public',
	},
	media: {
		tina: {
			mediaRoot: '',
			publicFolder: 'public',
		},
	},
	schema: {
		collections: [
			{
				name: 'post',
				label: 'Blog Posts',
				path: 'src/content/blog',
				format: 'md',
				fields: [
					/*
					const blogCollection = defineCollection({
						schema: z.object({
							draft: z.boolean(),
							title: z.string(),
							snippet: z.string(),
							image: z.object({
								src: z.string(),
								alt: z.string(),
							}),
							publishDate: z.string().transform(str => new Date(str)),
							author: z.string().default('HSC'),
							category: z.string(),
							tags: z.array(z.string()),
						}),
					});
					*/
					{
						name: 'draft',
						label: 'Draft',
						type: 'boolean',
					},
					{
						name: 'title',
						label: 'Title',
						type: 'string',
						required: true,
						isTitle: true,
					},
					{
						name: 'snippet',
						label: 'Snippet/Excerpt',
						type: 'string',
						required: true,
					},
					{
						name: 'image',
						label: 'Image',
						type: 'object',
						fields: [
							{
								name: 'src',
								label: 'Image Source',
								type: 'string',
								required: true,
							},
							{
								name: 'alt',
								label: 'Image Alt Text',
								type: 'string',
								required: true,
							},
						],
					},
					{
						name: 'publishDate',
						label: 'Publish Date',
						type: 'datetime',
						required: true,
					},
					{
						name: 'author',
						label: 'Author',
						type: 'string',
						required: true,
					},
					{
						name: 'category',
						label: 'Category',
						type: 'string',
						required: true,
					},
					{
						name: 'tags',
						label: 'Tags',
						list: true,
						type: 'string',
						description: 'Add tags that describe your post',
						ui: {
							component: 'tags',
						},
					},
					{
						name: 'body',
						label: 'Body',
						isBody: true,
						required: true,
						type: 'rich-text',
					},
				],
			},
		],
	},
	search: {
		tina: {
			indexerToken: process.env.TINA_SEARCH_TOKEN!!,
			stopwordLanguages: ['eng'],
		},
		indexBatchSize: 100,
		maxSearchIndexFieldLength: 100,
	},
});
