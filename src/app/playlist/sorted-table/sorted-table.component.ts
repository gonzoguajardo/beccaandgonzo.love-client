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

	private pageNumber: number;

	constructor(public playlistService: PlaylistService) {
		this.pageNumber = PlaylistService.PAGE_SIZE;
	}

	updatePlaylist() {
		this.playlistUpdate.emit();
	}

	playTrack(track: Track) {
		this.playingTrackUpdate.emit(track);
	}

	next() {
		this.playlistService.getPlaylist(this.playlist.offset - PlaylistService.PAGE_SIZE).subscribe(
			(playlist: Playlist) => {
				this.playlist = playlist;
			});
	}

	previous() {
		let offset = this.playlist.offset;
		if (offset < PlaylistService.PAGE_SIZE) {
			offset = offset + this.playlist.items.length;
		} else {
			offset = offset + PlaylistService.PAGE_SIZE;
		}

		if (offset > this.playlist.total) {
			offset = this.playlist.total - PlaylistService.PAGE_SIZE;
		}
		this.playlistService.getPlaylist(offset).subscribe(
			(playlist: Playlist) => {
				this.playlist = playlist;
			});
	}

	toggleAdmin() {
		this.isAdmin = !this.isAdmin;
		this.isAdminChange.emit(this.isAdmin);
	}
}
