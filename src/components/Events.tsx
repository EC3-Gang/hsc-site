import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useState, Fragment } from 'react';
import type React from 'react';
import Fuse from 'fuse.js';
import type { Events as EventsType } from '@lib/contentful';
import { Chrono } from 'react-chrono';
import './Events.css';


export default function Events({ events }: { events: EventsType[] }) {
	const [tabIndex, setTabIndex] = useState(0);

	return (
		<>
			<div className='flex justify-center items-center space-x-4 mt-8'>
				<button onClick={() => setTabIndex(0)} className={`px-4 py-2 rounded-lg focus:outline-none ${tabIndex === 0 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Events</button>
				<button onClick={() => setTabIndex(1)} className={`px-4 py-2 rounded-lg focus:outline-none ${tabIndex === 1 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Timeline</button>
			</div>

			{tabIndex === 0 ? <EventsSearch events={events} /> : <Timeline events={events} />}
		</>
	);
}


function Timeline({ events }: { events: EventsType[] }) {
	/*
	const items = [{
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg"
        }
      }
    }, ...];
	*/
	return (
		<div className='mx-auto mt-12'>
			<Chrono
				items={events.map((event) => ({
					title: dayjs(event.fields.date as unknown as string).format('D MMM YYYY'),
					cardTitle: event.fields.title as unknown as string,
					cardSubtitle: event.fields.location as unknown as string,
					cardDetailedText: event.fields.description as unknown as string,
					media: {
						type: 'IMAGE',
						source: {
							url: event.fields.banner.fields.file.url,
						},
					},
				}))}
				mode='VERTICAL_ALTERNATING'
				enableDarkToggle={true}
				textOverlay
				cardHeight={350}
				disableToolbar={true}
			/>
		</div>
	);
}


function EventsSearch({ events }: { events: EventsType[] }) {
	const options = [
		{
			name: 'Upcoming',
			filter: (event: EventsType) => dayjs(event.fields.date).isAfter(dayjs()),
		},
		{
			name: 'Past',
			filter: (event: EventsType) => dayjs(event.fields.date).isBefore(dayjs()),
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
		keys: ['fields.title', 'fields.description'],
	});


	return (
		<>
			<div className='grid sm:grid-cols-4 grid-cols-2 gap-4 w-11/12 lg:w-3/4 m-auto mt-5'>
				<Listbox value={filter} onChange={setFilter} className='w-full -mt-0'>
					<div className="relative mt-1 z-10 w-1/5">
						<Listbox.Button className="relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-gray-700 text-left border-gray-300 border-2 focus:ring-amber-600 focus:ring-2 bg-gray-200 sm:text-sm">
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
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{options.map((person, personIdx) => (
									<Listbox.Option
										key={personIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-amber</div>-100 text-amber-900' : 'text-gray-700'
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
				<input type='text' placeholder='Search for an event' className='sm:col-span-3 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent bg-gray-200 text-gray-600' value={search} onChange={handleQuery} />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
				{results.filter(filter.filter).length > 0 ? results
					.filter(filter.filter)
					.map((event) => (
						<>
							<div className='bg-gray-200 rounded-lg shadow-2xl overflow-hidden' key={event.fields.slug}>
								<img className='w-full h-48 object-cover' src={event.fields.banner.fields.file.url} alt={event.fields.banner.fields.file.title} />
								<div className='p-4'>
									<div className='text-lg font-semibold text-gray-700'>{event.fields.title as unknown as string}</div>
									<div className='mt-2 text-sm text-gray-500 flex items-center space-x-1'>
										<Icon icon='mdi:calendar' className="w-4 h-4 inline-block" />
										<span>{dayjs(event.fields.date as unknown as string).format('D MMM YYYY hh:mm a')}</span>
									</div>
									{event.fields.location && <div className='mt-2 text-sm text-gray-500 flex items-center space-x-1'>
										<Icon icon='mdi:location' className="w-4 h-4 inline-block" />
										<span>{event.fields.location as unknown as string}</span>
									</div>}
									<div className='mt-2 text-sm text-gray-500 line-clamp-2'>{event.fields.description as unknown as string}</div>
									{event.fields.link && (<div className='mt-2 text-sm text-gray-500'>
										<a href={event.fields.link as unknown as string} target='_blank' rel='noopener noreferrer'>{event.fields.link as unknown as string}</a>
									</div>)}
								</div>
							</div>
						</>
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