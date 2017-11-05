import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlaylistService } from '../playlist.service';
import { Item } from '../item';
import { Track } from '../track';

@Component({
    selector: 'app-track-card',
    templateUrl: './track-card.component.html',
    styleUrls: ['./track-card.component.css'],
    providers: [PlaylistService]
})
export class TrackCardComponent implements OnInit, OnChanges {

    @Input()
    track: Track;
    @Input()
    playingSongId: Track;
    isAdmin = false;

    @Output()
    playlistUpdate: EventEmitter<Track> = new EventEmitter();
    @Output()
    playingTrackUpdate: EventEmitter<Track> = new EventEmitter();

    constructor(private playlistService: PlaylistService) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    playSample(track: Track) {
        this.playingTrackUpdate.emit(track);
    }

    toggleAdmin() {
        this.isAdmin = !this.isAdmin;
    }

    deleteTrack(track: Track) {
        this.playlistService.deleteTrackFromPlaylist(track).subscribe((response: string) => {
            this.playlistUpdate.emit();
        });
    }

    addTrack(trackToAdd: Track) {
        this.playlistService.addTrackToPlaylist(trackToAdd).subscribe((response: string) => {
            this.playlistUpdate.emit();
        });
    }

}
