import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlaylistService } from '../playlist.service';
import { Item } from '../item';

@Component({
    selector: 'app-playlist-table',
    templateUrl: './playlist-table.component.html',
    styles: ['./playlist-table.component.css'],
    providers: [PlaylistService]
})
export class PlaylistTableComponent implements OnInit, OnChanges {

    @Input()
    playlist: Item[];
    audio = new Audio();
    paused = true;

    constructor(private playlistService: PlaylistService) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    playSample(source) {
        if (this.audio.src === source) {
            if (this.paused) {
                this.audio.load();
                this.audio.play();
                this.paused = false;
            } else {
                this.audio.pause();
                this.paused = true;
            }
        } else {
            this.audio.src = source;
            this.audio.load();
            this.audio.play();
            this.paused = false;
        }
    }
}
