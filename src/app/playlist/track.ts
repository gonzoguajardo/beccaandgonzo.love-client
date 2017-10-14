import { Album } from './album';
import { Artist } from './artist';

export class Track {
    album: Album;
    artists: Artist[];
    id: string;
    name: string;
    preview_url: string;
    uri: string;

    onPlaylist = false;
}
