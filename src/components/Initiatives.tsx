import type { CollectionEntry } from 'astro:content';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import Fuse from 'fuse.js';

export default function Initiatives({ initiatives }: { initiatives: CollectionEntry<'initiatives'>[] }) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
			{initiatives.map((initiative) => (
				<div className='rounded-lg bg-gray-200 shadow-2xl overflow-hidden' key={initiative.id}>
					<img className='w-full h-48 object-cover' src={initiative.data.image.src} alt={initiative.data.image.alt} />
					<div className='p-4'>
						<div className='text-lg font-semibold text-gray-700'>{initiative.data.title}</div>
						{initiative.data.date && <div className='mt-2 text-sm text-gray-500 flex items-center space-x-1'>
							<Icon icon='mdi:calendar' className="w-4 h-4 inline-block" />
							<span>{dayjs(initiative.data.date).format('D MMM YYYY hh:mm a')}</span>
						</div>}
						<div className='mt-2 text-sm text-gray-500 line-clamp-2'>{initiative.data.description}</div>
						<div className='mt-2 text-sm text-gray-500 hover:text-gray-700'>
							<Icon icon='ph:link-bold' className="w-4 h-4 mr-1 inline-block" />
							<a href={initiative.data.link} target='_blank' rel='noopener noreferrer'>{initiative.data.link}</a>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}