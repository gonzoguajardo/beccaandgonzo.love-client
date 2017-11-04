import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlaylistService } from '../playlist.service';
import { Item } from '../item';
import { Track } from '../track';

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
    isAdmin = false;

    @Output()
    playlistUpdate: EventEmitter<Track> = new EventEmitter();

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

    toggleAdmin() {
        this.isAdmin = !this.isAdmin;
    }

    deleteTrack(track: Track) {
        this.playlistService.deleteTrackFromPlaylist(track).subscribe((response: string) => {
            this.playlistUpdate.emit();
        });
    }
}
