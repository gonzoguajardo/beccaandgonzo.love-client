import { Item } from './item';

export class Playlist {
	items: Item[];
	previous: string;
	next: string;
	offset: number;
	total: number;
}
