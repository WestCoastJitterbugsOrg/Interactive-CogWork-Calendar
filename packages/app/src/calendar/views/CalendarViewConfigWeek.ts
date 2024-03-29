import { formatDate, FormatterInput } from '@fullcalendar/core';
import { FC } from 'src/types';

const titleFormat: FormatterInput = (args) =>
	`Week ${formatDate(args.date.marker, { week: 'numeric' })}, 
      ${formatDate(args.date.marker, {
				year: 'numeric',
				month: 'long',
			})}`;

const dayHeaderFormat: FormatterInput = (args) =>
	formatDate(args.date.marker, { weekday: 'long' }) +
	'\n' +
	formatDate(args.date.marker, { day: 'numeric' });

const viewOptions: FC.ViewOptions = {
	scrollTimeReset: false,
	scrollTime: '09:00:00',
	slotLabelFormat: {
		hour: '2-digit',
		minute: '2-digit',
		meridiem: false,
		hour12: false,
	},
	titleFormat,
	dayHeaderFormat,
};

export default viewOptions;
