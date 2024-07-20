import { Icon } from '@iconify/react';
import type React from 'react';
import dayjs from 'dayjs';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import Fuse from 'fuse.js';
import type { Initiatives as InitiativesType } from '@lib/contentful';

export default function Initiatives({ initiatives }: { initiatives: InitiativesType[] }) {
	const [search, setSearch] = useState('');
	const [filteredInitiatives, setFilteredInitiatives] = useState(initiatives);

	const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		if (e.target.value === '') {
			setFilteredInitiatives(initiatives);
			return;
		}

		const fuse = new Fuse(initiatives, { keys: ['fields.title', 'fields.description'], threshold: 0.3 });
		const results = fuse.search(e.target.value);
		const filteredResults = results.map((result) => result.item);
		setFilteredInitiatives(filteredResults);
	};


	return (
		<>
			<div className='w-11/12 lg:w-3/4 m-auto mt-5'>
				<input
					type='text'
					placeholder='Search for an initiative'
					className='sm:col-span-3 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent bg-gray-200 text-gray-600'
					value={search}
					onChange={handleQuery}
				/>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
				{filteredInitiatives.map((initiative) => (
					<div className='rounded-lg bg-gray-200 shadow-2xl overflow-hidden' key={initiative.fields.slug as unknown as string}>
						{initiative.fields.banner &&
							<swiper-container
								navigation='true'
							>
								<swiper-slide>
									<img className='w-full h-48 object-cover'
										src={initiative.fields.banner.fields.file.url}
										alt={initiative.fields.banner.fields.file.title}/>
								</swiper-slide>
								{/* <swiper-slide>*/}
								{/*	<img className='w-full h-48 object-cover'*/}
								{/*		src={event.fields.banner.fields.file.url}*/}
								{/*		alt={event.fields.banner.fields.file.title}/>*/}
								{/* </swiper-slide>*/}
								{initiative.fields.extraImgs && initiative.fields.extraImgs.map((img) => (
									<swiper-slide>
										<img className='w-full h-48 object-cover'
											src={img.fields.file.url}
											alt={img.fields.file.title}/>
									</swiper-slide>
								))}
							</swiper-container>
						}
						<div className='p-4'>
							<div
								className='text-lg font-semibold text-gray-700'>{initiative.fields.title as unknown as string}</div>
							{initiative.fields.date && (
								<div className='mt-2 text-sm text-gray-500 flex items-center space-x-1'>
									<Icon icon='mdi:calendar' className='w-4 h-4 inline-block'/>
									<span>{dayjs(initiative.fields.date as any).format('D MMM YYYY hh:mm a')}</span>
								</div>
							)}
							<div
								className='mt-2 text-sm text-gray-500 line-clamp-2'>{initiative.fields.description as unknown as string}</div>
							<div className='mt-2 text-sm text-gray-500 hover:text-gray-700'>
								<Icon icon='ph:link-bold' className='w-4 h-4 mr-1 inline-block'/>
								<a href={initiative.fields.link as unknown as string} target='_blank'
								   rel='noopener noreferrer'>
									{initiative.fields.link as unknown as string}
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}