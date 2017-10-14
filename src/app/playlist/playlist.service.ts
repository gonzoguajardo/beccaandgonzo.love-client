import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
import { Track } from './track';
import { Album } from './album';
import { Image } from './image';
import { Artist } from './artist';

@Injectable()
export class PlaylistService implements OnInit {

    search: Item[];

    observablePlaylist: Observable<Item[]>;
    observableSearch: Observable<Item[]>;

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {

    }

    getPlaylist(): Observable<Item[]> {
        if (this.observablePlaylist) {
            return this.observablePlaylist;
        } else {
            this.observablePlaylist = this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/')
                .map((response: Response) => {
                    return response['items'] as Item[];
                }).catch(error => {
                    return Observable.throw(new Item());
                }).share();
            return this.observablePlaylist;
        }
    }

    searchPlaylist(searchString: String): Observable<Item[]> {
        if (searchString) {
            this.observableSearch = this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/search/' + searchString)
            .map((response: Response) => {
                const items: Item[] = new Array<Item>();
                response['tracks']['items'].forEach(item => {
                    const currentItem = new Item();
                    currentItem.track = new Track();
                    currentItem.track.id = item['id'];
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
        console.log('done with :' + searchString);
        return this.observableSearch;
    }

}
