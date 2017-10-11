import { Album } from './album';
import { Artist } from './artist';

export class Track {
    album: Album;
    artists: Artist[];
    name: String;
    preview_url: String;
}
