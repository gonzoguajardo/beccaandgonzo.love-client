export class Header {
	readonly title: string;
	readonly link: string;
	active: boolean;
	viewing: boolean;
}

export enum HeaderTitles {
	HOME = 'Home',
	OUR_STORY = 'Our Story',
	DETAILS = 'Details',
	RSVP = 'RSVP',
	MIAMI = 'Miami',
	PHOTOS = 'Photos',
	REGISTRY = 'Registry',
	CONTACT = 'Contact',
}

export enum HeaderLinks {
	HOME = '/home',
	OUR_STORY = '/our-story',
	DETAILS = '/details',
	RSVP = '/rsvp',
	MIAMI = '/miami',
	PHOTOS = '/photos',
	REGISTRY = '/registry',
	CONTACT = '/contact',
}
