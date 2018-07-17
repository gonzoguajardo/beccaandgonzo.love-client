import { Image } from './image';

export class Album {
	images: Image[];

	constructor(images: Image[]) {
		this.images = images;
	}
}
