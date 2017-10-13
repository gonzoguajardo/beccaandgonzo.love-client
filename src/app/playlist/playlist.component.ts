import { Component, OnInit, NgZone } from '@angular/core';
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

    searchPlaylistObservable: Observable<Item[]>;
    dataObserver: Observer<Item[]>;

    constructor(private playlistService: PlaylistService, private ngZone: NgZone) {
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

    search(search: String) {
        console.log(search);
        this.playlistService.searchPlaylist(search).subscribe((playlist: Item[]) => {
            // this.ngZone.run(() => {
                this.searchPlaylist = playlist;
            // });
        });
        // if (this.searchPlaylist) {
        //     this.searchPlaylist.forEach((item) => {
        //         console.log(item.track.name);
        //     });
        // }
    }

}
