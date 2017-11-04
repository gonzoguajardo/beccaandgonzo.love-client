import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticateService implements OnInit {

    observableAuthenticate: Observable<string>;

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {

    }

    // getPlaylist(): Observable<Item[]> {
    //     if (this.observablePlaylist) {
    //         return this.observablePlaylist;
    //     } else {
    //         this.observablePlaylist = this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/')
    //             .map((response: Response) => {
    //                 return response['items'] as Item[];
    //             }).catch(error => {
    //                 return Observable.throw(new Item());
    //             }).share();
    //         return this.observablePlaylist;
    //     }
    // }

    authenticate(): Observable<string> {
        console.log('hi2');
        this.observableAuthenticate = this.http.get('http://localhost:8080/guajardo-wedding-web/api/authenticate/')
            .map((response: Response) => {
                return 'hi';
            }).catch((error) => {
                return Observable.throw('');
            }).share();
        return this.observableAuthenticate;
    }

}