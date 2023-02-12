import { defaultEventData } from '../__mocks__/cwEvents';
import { mockStore } from '../__mocks__/stateContext';
import App from '@app/App';
import { initContext } from '@app/services/cogwork';
import { storeConsentCookie } from '@app/services/cookies';
import * as ics from '@app/services/ics';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
	document.cookie = '';
});

it('Cookie header is shown by default', async () => {
	const renderResult = render(
		<App
			{...initContext(defaultEventData.events)}
			colors={defaultEventData.colors}
		/>
	);
	const cookieHeader = await renderResult.findByTestId('cookie-header');

	expect(cookieHeader).toBeTruthy();
});

it('Cookie header is hidden if there are cookies', () => {
	act(() => {
		storeConsentCookie();
	});
	const renderResult = render(
		<App
			{...initContext(defaultEventData.events)}
			colors={defaultEventData.colors}
		/>
	);
	const cookieHeader = renderResult.queryByTestId('cookie-header');
	expect(cookieHeader).toBeNull();
});

it('Clicking on Download calls exportICS', () => {
	const { getByTestId } = render(
		<App
			{...initContext(defaultEventData.events)}
			colors={defaultEventData.colors}
		/>
	);

	const exportICS = jest.spyOn(ics, 'exportICS').mockImplementation();

	const downloadButton = getByTestId('export-ics-button')
		.children[0] as HTMLButtonElement;
	act(() => {
		downloadButton.click();
	});

	expect(exportICS).toHaveBeenCalledTimes(1);
	jest.restoreAllMocks();
});

it('exportICS creates an ics-file', async () => {
	const link = document.createElement('a');
	jest.spyOn(document, 'createElement').mockImplementation(() => link);
	URL.createObjectURL = jest.fn(() => 'data:mock');
	URL.revokeObjectURL = jest.fn(() => undefined);

	await ics.exportICS(mockStore.events);
	expect(link.download).toEqual('cw-events.ics');
	expect(link.href).toEqual('data:mock');
	jest.restoreAllMocks();
	jest.clearAllMocks();
});
