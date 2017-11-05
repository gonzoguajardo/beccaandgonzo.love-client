import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Rx';
import { PlaylistService } from './playlist.service';
import { Item } from './item';
import { Track } from './track';
import { Playlist } from './playlist';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.css'],
    providers: [PlaylistService]
})
export class PlaylistComponent implements OnInit, OnDestroy {

    @Input()
    isAdmin = false;
    @Output() isAdminChange = new EventEmitter<boolean>();

    playlist: Playlist;
    searchPlaylist: Item[];
    searchString = '';
    searching = false;
    queuedSearch: string;
    audio = new Audio();
    playingSongId = '';

    constructor(private playlistService: PlaylistService) {
    }

    ngOnInit(): void {
        this.updatePlaylist();
    }

    ngOnDestroy(): void {
        this.audio.pause();
        this.audio = null;
    }

    search(newSearch: string) {
        this.searchString = newSearch;
        if (newSearch && !this.searching) {
            this.searching = true;
            this.playlistService.searchPlaylist(newSearch).subscribe((playlist: Item[]) => {
                this.searchPlaylist = playlist;
                this.setOnPlaylist();
                if (this.queuedSearch) {
                    const searchString = this.queuedSearch;
                    this.queuedSearch = null;
                    this.searching = false;
                    this.search(searchString);
                } else {
                    this.searching = false;
                }
            });

        } else {
            this.queuedSearch = newSearch;
        }
    }

    updatePlaylist() {
        this.playlistService.getPlaylist(null).subscribe((playlist: Playlist) => {
            this.playlist = playlist;
            this.setOnPlaylist();
        });
    }

    playTrack(track: Track) {
        if (this.audio.src === track.preview_url) {
            if ((this.playingSongId === '')) {
                this.audio.load();
                this.audio.play();
                this.playingSongId = track.id;
            } else {
                this.audio.pause();
                this.playingSongId = '';
            }
        } else {
            this.audio.src = track.preview_url;
            this.audio.load();
            this.audio.play();
            this.playingSongId = track.id;
        }
    }
    // toggleAdmin() {
    //     this.isAdmin = !this.isAdmin;
    // }

    private setOnPlaylist() {
        if (this.searchPlaylist) {
            this.searchPlaylist.forEach((searchItem) => {
                searchItem.track.onPlaylist = false;
                this.playlist.items.some((playlistItem) => {
                    if (playlistItem.track.id === searchItem.track.id) {
                        searchItem.track.onPlaylist = true;
                        return false;
                    }
                });
            });
        }
    }

}
