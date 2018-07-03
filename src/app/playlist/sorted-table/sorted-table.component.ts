import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { Track } from '../track';
import { Playlist } from '../playlist';

@Component({
	selector: 'app-sorted-table',
	templateUrl: './sorted-table.component.html',
	styleUrls: ['./sorted-table.component.css'],
	providers: [PlaylistService]
})
export class SortedTableComponent {

	@Input()
	playlist: Playlist;
	@Input()
	playingSongId: string;
	@Output()
	playlistUpdate: EventEmitter<Track> = new EventEmitter();
	@Output()
	playingTrackUpdate: EventEmitter<Track> = new EventEmitter();
	@Input()
	isAdmin: boolean;
	@Output() isAdminChange = new EventEmitter<boolean>();

	constructor(private playlistService: PlaylistService) {

	}

	updatePlaylist() {
		this.playlistUpdate.emit();
	}

	playTrack(track: Track) {
		this.playingTrackUpdate.emit(track);
	}

	next() {
		this.playlistService.getPlaylist(this.playlist.next).subscribe(
			(playlist: Playlist) => {
				this.playlist = playlist;
			});
	}

	previous() {
		this.playlistService.getPlaylist(this.playlist.previous).subscribe(
			(playlist: Playlist) => {
				this.playlist = playlist;
			});
	}

	toggleAdmin() {
		this.isAdmin = !this.isAdmin;
		this.isAdminChange.emit(this.isAdmin);
	}
}
