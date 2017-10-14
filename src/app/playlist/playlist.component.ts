import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Rx';
import { PlaylistService } from './playlist.service';
import { Item } from './item';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styles: ['./playlist.component.css'],
    providers: [PlaylistService]
})
export class PlaylistComponent implements OnInit {

    playlist: Item[];
    searchPlaylist: Item[];
    searchString = '';
    searching = false;
    queuedSearch: string;

    searchPlaylistObservable: Observable<Item[]>;
    dataObserver: Observer<Item[]>;

    constructor(private playlistService: PlaylistService) {
    }

    ngOnInit(): void {
        this.playlistService.getPlaylist().subscribe((playlist: Item[]) => {
            this.playlist = playlist;
        });
    }

    search(newSearch: string) {
        this.searchString = newSearch;
        if (newSearch && !this.searching) {
            this.searching = true;
            this.playlistService.searchPlaylist(newSearch).subscribe((playlist: Item[]) => {
                this.searchPlaylist = playlist;
                this.setOnPlaylist(this.playlist, this.searchPlaylist);
                if (this.queuedSearch) {
                    const searchString = this.queuedSearch;
                    this.queuedSearch = null;
                    this.searching = false;
                    this.search(searchString);
                } else {
                    this.searching = false;
                }
            });

        } else {
            this.queuedSearch = newSearch;
        }
    }

    private setOnPlaylist(playlist: Item[], searchPlaylist: Item[]) {
        searchPlaylist.forEach((searchItem) => {
            playlist.some((playlistItem) => {
                if (playlistItem.track.id === searchItem.track.id) {
                    searchItem.track.onPlaylist = true;
                    return false;
                }
            });
        });
    }

}
