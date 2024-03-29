import { MaybeArray } from './utils';

export type Event = {
	'@attributes': { eventId: string };
	title: string;
	longdescription?: string;
	schedule?: Schedule;
	category?: string | { '@attributes': { catId: number } };
	primaryEventGroup?: string;
	requirements: MaybeArray<{
		level: { '@attributes': { minValue: number } };
	}>;
	registration: MaybeArray<{
		'@attributes': { status: 'ONLY_INFO' | 'STOPED_SHOWING' | 'OPEN' };
		url: string;
	}>;
	place?: string;
	pricing?: {
		base: string;
	};
	instructors?: { combinedTitle: string };
};

export type Schedule = {
	occasions?: {
		occasion: MaybeArray<Occasion>;
	};
	startDate?: string;
	startTime?: string;
	endDate?: string;
	endTime?: string;
};

export type Occasion = {
	startDateTime?: string;
	endDateTime?: string;
};
