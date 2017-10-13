import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

    constructor(private playlistService: PlaylistService) { }

    ngOnInit(): void {
        this.playlistService.getPlaylist().subscribe((playlist: Item[]) => {
            this.playlist = playlist;
        });
    }

    search(search) {
        console.log(search);
    }

}
