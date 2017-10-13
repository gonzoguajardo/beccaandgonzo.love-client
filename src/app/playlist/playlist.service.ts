import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

@Injectable()
export class PlaylistService implements OnInit {

    observablePlaylist: Observable<Item[]>;
    playlist: Item[];

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {

    }

    getPlaylist(): Observable<Item[]> {
        if (this.playlist) {
            return Observable.of(this.playlist);
        } else if (this.observablePlaylist) {
            return this.observablePlaylist;
        } else {
            this.observablePlaylist = this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/')
                .map((response: Response) => {
                    this.playlist = response['items'] as Item[];
                    return this.playlist;
                }).catch(error => {
                    return Observable.throw(new Item());
                }).share();
            return this.observablePlaylist;
        }
    }

}
