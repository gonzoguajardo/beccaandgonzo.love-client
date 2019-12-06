export class Header {
	readonly title: string;
	readonly link: string;
	active: boolean;
}

export enum HeaderTitles {
	HOME = 'Home',
	PHOTOS = 'Photos',
	VIDEO = 'Video',
	CONTACT = 'Contact',
}

export enum HeaderLinks {
	HOME = '/home',
	PHOTOS = '/photos',
	VIDEO = '/video',
	CONTACT = '/contact',
}
