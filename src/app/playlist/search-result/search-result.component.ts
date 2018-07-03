import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { Item } from '../item';
import { Track } from '../track';

@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.css'],
	providers: [PlaylistService]
})
export class SearchResultComponent {

	@Input()
	playlist: Item[];
	@Input()
	playingSongId: String;
	@Input()
	isAdmin: boolean;
	@Output() isAdminChange = new EventEmitter<boolean>();
	@Output()
	playlistUpdate: EventEmitter<Track> = new EventEmitter();
	@Output()
	playingTrackUpdate: EventEmitter<Track> = new EventEmitter;

	updatePlaylist() {
		this.playlistUpdate.emit();
	}

	playTrack(track: Track) {
		this.playingTrackUpdate.emit(track);
	}

}
