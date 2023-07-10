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
					{
						name: 'draft',
						label: 'Draft',
						type: 'boolean',
						required: true,
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
								type: 'image',
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
						ui: {
							timeFormat: 'hh:mm a',
						},
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
			{
				name: 'events',
				label: 'Events',
				path: 'src/content/events',
				format: 'md',
				fields: [
					{
						name: 'draft',
						label: 'Draft',
						type: 'boolean',
						required: true,
					},
					{
						name: 'title',
						label: 'Title',
						type: 'string',
						required: true,
						isTitle: true,
					},
					{
						name: 'description',
						label: 'Description',
						type: 'string',
						required: true,
					},
					{
						name: 'date',
						label: 'Date',
						type: 'datetime',
						ui: {
							timeFormat: 'hh:mm a',
						},
						required: true,
					},
					{
						name: 'location',
						label: 'Location',
						type: 'string',
						required: false,
					},
					{
						name: 'image',
						label: 'Image',
						type: 'object',
						fields: [
							{
								name: 'src',
								label: 'Image Source',
								type: 'image',
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
						name: 'link',
						label: 'Link',
						type: 'string',
						required: false,
					},
				],
			},
			{
				name: 'initiatives',
				label: 'Initiatives',
				path: 'src/content/initiatives',
				format: 'md',
				fields: [
					{
						name: 'draft',
						label: 'Draft',
						type: 'boolean',
						required: true,
					},
					{
						name: 'title',
						label: 'Title',
						type: 'string',
						required: true,
						isTitle: true,
					},
					{
						name: 'description',
						label: 'Description',
						type: 'string',
						required: true,
					},
					{
						name: 'date',
						label: 'Date',
						type: 'datetime',
						ui: {
							timeFormat: 'hh:mm a',
						},
						required: false,
					},
					{
						name: 'image',
						label: 'Image',
						type: 'object',
						fields: [
							{
								name: 'src',
								label: 'Image Source',
								type: 'image',
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
						name: 'link',
						label: 'Link',
						type: 'string',
						required: false,
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
