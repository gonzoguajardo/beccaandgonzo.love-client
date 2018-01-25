import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
import { Track } from './track';
import { Album } from './album';
import { Image } from './image';
import { Artist } from './artist';
import { Playlist } from './playlist';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';
// import 'rxjs/Rx';

@Injectable()
export class PlaylistService implements OnInit {

    observablePlaylist: Observable<Playlist>;
    observableSearch: Observable<Item[]>;
    observableAdd: Observable<string>;
    observableDelete: Observable<string>;

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {

    }

    getPlaylist(url: string): Observable<Playlist> {
        if (url) {
            this.observablePlaylist = this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/?url=' + url)
                .map((playlist: Playlist) => {
                    playlist.items.forEach((item: Item) => {
                        item.track.onPlaylist = true;
                    });
                    return playlist;
                }).catch(error => {
                    return Observable.throw(new Playlist());
                }).share();
            return this.observablePlaylist;
        } else {
            this.observablePlaylist = this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/')
                .map((playlist: Playlist) => {
                    playlist.items.forEach((item: Item) => {
                        item.track.onPlaylist = true;
                    });
                    return playlist;
                }).catch(error => {
                    return Observable.throw(new Playlist());
                }).share();
            return this.observablePlaylist;
        }
    }

    searchPlaylist(searchString: String): Observable<Item[]> {
        if (searchString) {
            this.observableSearch = this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/search?queryParameter='
                + searchString)
                .map((response: Response) => {
                    const items: Item[] = new Array<Item>();
                    response['tracks']['items'].forEach(item => {
                        const currentItem = new Item();
                        currentItem.track = new Track();
                        currentItem.track.id = item['id'];
                        currentItem.track.uri = item['uri'];
                        currentItem.track.name = item['name'];
                        currentItem.track.preview_url = item['preview_url'];
                        currentItem.track.album = new Album(item['album']['images'] as Image[]);
                        currentItem.track.artists = new Array<Artist>();
                        item['artists'].forEach(artist => {
                            currentItem.track.artists.push(new Artist(artist['name']));
                        });
                        items.push(currentItem);
                    });
                    return items;
                }).catch(error => {
                    return Observable.throw(new Item());
                }).share();
        }
        return this.observableSearch;
    }

    addTrackToPlaylist(track: Track) {
        if (track && !track.onPlaylist) {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            this.observableAdd = this.http.post('http://localhost:8080/guajardo-wedding-web/api/playlist/add'
                , JSON.stringify({ trackUri: track.uri }), { headers: headers })
                .map((response: Response) => {
                    return '';
                }).share();
        }
        return this.observableAdd;
    }

    deleteTrackFromPlaylist(track: Track) {
        if (track) {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            this.observableDelete = this.http.post('http://localhost:8080/guajardo-wedding-web/api/playlist/delete'
                , JSON.stringify({ tracks: [{ uri: track.uri }] }), { headers: headers })
                .map((response: Response) => {
                    return '';
                }).share();
        }
        return this.observableDelete;

    }

}
