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
			{
				name: 'batch',
				label: 'Batch',
				path: 'src/content/batch',
				format: 'md',
				ui: {
					allowedActions: {
						create: false,
						delete: false,
					},
				},
				fields: [
					{
						name: 'name',
						label: 'Name',
						type: 'string',
						required: true,
					},
					{
						name: 'batch',
						label: 'Batch',
						type: 'number',
						required: true,
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
