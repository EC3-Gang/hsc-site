import type { CollectionEntry } from 'astro:content';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useState, Fragment } from 'react';
import type React from 'react';
import Fuse from 'fuse.js';

export default function aEvents({ events }: { events: CollectionEntry<'events'>[] }) {
	const options = [
		{
			name: 'Upcoming',
			filter: (event: CollectionEntry<'events'>) => dayjs(event.data.date).isAfter(dayjs()),
		},
		{
			name: 'Past',
			filter: (event: CollectionEntry<'events'>) => dayjs(event.data.date).isBefore(dayjs()),
		},
		{
			name: 'All',
			filter: () => true,
		},
	];
	const [filter, setFilter] = useState(options[0]);
	const [search, setSearch] = useState('');
	const [results, setResults] = useState(events);

	const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		if (e.target.value === '') {
			setResults(events);
			return;
		}
		setResults(fuse.search(e.target.value).map((result) => result.item));
	};

	const fuse = new Fuse(events, {
		keys: ['data.title', 'data.description'],
	});


	return (
		<>
			<div className='grid sm:grid-cols-4 grid-cols-2 gap-4 w-11/12 lg:w-3/4 m-auto mt-5'>
				<Listbox value={filter} onChange={setFilter} className='w-full -mt-0'>
					<div className="relative mt-1 z-10 w-1/5">
						<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border-gray-300 border-2 focus:ring-amber-600 focus:ring-2  sm:text-sm">
							<span className="block truncate">{filter.name}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{options.map((person, personIdx) => (
									<Listbox.Option
										key={personIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
											}`
										}
										value={person}
									>
										{({ selected }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													{person.name}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
				<input type='text' placeholder='Search' className='sm:col-span-3 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent' value={search} onChange={handleQuery} />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
				{results.filter(filter.filter).length > 0 ? results
					.filter(filter.filter)
					.map((event) => (
						<div className='bg-white rounded-lg shadow-lg overflow-hidden' key={event.id}>
							<img className='w-full h-48 object-cover' src={event.data.image.src} alt={event.data.image.alt} />
							<div className='p-4'>
								<div className='text-lg font-semibold'>{event.data.title}</div>
								<div className='mt-2 text-sm text-gray-500 flex items-center space-x-1'>
									<Icon icon='mdi:calendar' className="w-4 h-4 inline-block" />
									<span>{dayjs(event.data.date).format('D MMM YYYY hh:mm a')}</span>
								</div>
								{event.data.location && <div className='mt-2 text-sm text-gray-500 flex items-center space-x-1'>
									<Icon icon='mdi:location' className="w-4 h-4 inline-block" />
									<span>{event.data.location}</span>
								</div>}
								<div className='mt-2 text-sm text-gray-500 line-clamp-2'>{event.data.description}</div>
								<div className='mt-2 text-sm text-gray-500'>
									<a href={event.data.link} target='_blank' rel='noopener noreferrer'>{event.data.link}</a>
								</div>
							</div>
						</div>
					)) : (
					<div className='flex flex-col items-center justify-center text-gray-500 col-span-full'>
						<Icon icon='mdi:calendar' className='w-12 h-12' />
						<p className='mt-2'>No events found</p>
					</div>
				)}
			</div>
		</>
	);
}