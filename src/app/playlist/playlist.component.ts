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
export class PlaylistComponent implements OnInit, OnChanges {

    playlist: Item[];
    searchPlaylist: Item[];
    searchString = '';

    searchPlaylistObservable: Observable<Item[]>;
    dataObserver: Observer<Item[]>;

    constructor(private playlistService: PlaylistService) {
        this.searchPlaylistObservable = new Observable(observer => this.dataObserver = observer);
        this.searchPlaylistObservable.subscribe((playlist: Item[]) => {
            this.searchPlaylist = playlist;
        });
    }

    ngOnInit(): void {
        this.playlistService.getPlaylist().subscribe((playlist: Item[]) => {
            this.playlist = playlist;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    search(newSearch: string) {
        if (newSearch) {
            this.playlistService.searchPlaylist(newSearch).subscribe((playlist: Item[]) => {
                this.searchPlaylist = playlist;
            });
        }
        this.searchString = newSearch;
    }

}
