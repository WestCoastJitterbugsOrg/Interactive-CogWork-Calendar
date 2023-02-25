import AppInit from './AppInit';
import { StrictMode } from 'react';
import { render as reactRender } from 'react-dom';
import { SWRConfig } from 'swr';
import { WpCwfc } from 'types/wcj';

export function render(data: WpCwfc, container: Element) {
	return reactRender(
		<StrictMode>
			<SWRConfig value={{ provider: localStorageProvider }}>
				<AppInit {...data} />
			</SWRConfig>
		</StrictMode>,
		container
	);
}

function localStorageProvider() {
	// When initializing, we restore the data from `localStorage` into a map.
	const map = new Map(
		JSON.parse(localStorage.getItem('app-cache') ?? '[]') as [string, object][]
	);

	// Before unloading the app, we write back all the data into `localStorage`.
	window.addEventListener('beforeunload', () => {
		const appCache = JSON.stringify(Array.from(map.entries()));
		localStorage.setItem('app-cache', appCache);
	});

	// We still use the map for write & read for performance.
	return map;
}