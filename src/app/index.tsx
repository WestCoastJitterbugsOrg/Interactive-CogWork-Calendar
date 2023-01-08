import { StrictMode, lazy, Suspense } from 'react';
import { render } from 'react-dom';
import WCJ from './types/wcj';

const App = lazy(() => import('./App'));

export function initApp(el: Element, data: WCJ.Context) {
	render(
		<StrictMode>
			<Suspense fallback={<SpinLoader />}>
				<App data={data} />
			</Suspense>
		</StrictMode>,
		el
	);
}

function SpinLoader() {
	return (
		<div className="flex h-screen items-center justify-center bg-light">
			<div className="h-16 w-16 animate-spin rounded-[50%] border-8 border-solid border-t-primary-alt border-r-secondary border-b-primary border-l-secondary-alt"></div>
		</div>
	);
}
