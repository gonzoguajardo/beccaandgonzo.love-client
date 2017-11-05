import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlaylistService } from '../playlist.service';
import { Item } from '../item';
import { Track } from '../track';

@Component({
    selector: 'app-sorted-table',
    templateUrl: './sorted-table.component.html',
    styleUrls: ['./sorted-table.component.css'],
    providers: [PlaylistService]
})
export class SortedTableComponent {

    @Input()
    playlist: Item[];
    @Input()
    playingSongId: string;
    @Input()
    isAdmin: boolean;
    @Output()
    playlistUpdate: EventEmitter<Track> = new EventEmitter();
    @Output()
    playingTrackUpdate: EventEmitter<Track> = new EventEmitter();

    updatePlaylist() {
        this.playlistUpdate.emit();
    }

    playTrack(track: Track) {
        this.playingTrackUpdate.emit(track);
    }
}
