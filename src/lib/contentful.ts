import contentful, { EntryFieldTypes } from 'contentful';

export interface BlogPost {
	contentTypeId: 'blogPost';
	fields: {
		title: EntryFieldTypes.Text;
		slug: EntryFieldTypes.Text;
		snippet: EntryFieldTypes.Text;
		banner: EntryFieldTypes.Object;
		author: EntryFieldTypes.Text;
		category: EntryFieldTypes.Text;
		tags: EntryFieldTypes.Text[];
		postBody: EntryFieldTypes.RichText;
	}
}

export interface Event {
	contentTypeId: 'events';
	fields: {
		title: EntryFieldTypes.Text;
		slug: EntryFieldTypes.Text;
		description: EntryFieldTypes.Text;
		banner: EntryFieldTypes.Object;
		date: EntryFieldTypes.Date;
		location: EntryFieldTypes.Text;
		link?: EntryFieldTypes.Text;
	}
}

export const contentfulClient = contentful.createClient({
	space: import.meta.env.CONTENTFUL_SPACE_ID,
	accessToken: import.meta.env.DEV
		? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
		: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
	host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});