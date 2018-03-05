import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Header, HeaderLinks, HeaderTitles } from './header';

@Injectable()
export class HeaderService implements OnInit {

    private _headers: Header[] = [
        { 'title': HeaderTitles.HOME, 'link': HeaderLinks.HOME, 'active': false },
        { 'title': HeaderTitles.OUR_STORY, 'link': HeaderLinks.OUR_STORY, 'active': false },
        { 'title': HeaderTitles.DETAILS, 'link': HeaderLinks.DETAILS, 'active': false },
        { 'title': HeaderTitles.PHOTOS, 'link': HeaderLinks.PHOTOS, 'active': false },
        { 'title': HeaderTitles.CONTACT, 'link': HeaderLinks.CONTACT, 'active': false },
    ];
    private headers: Observable<Header[]>;

    constructor() {

    }

    getHeaders(): Observable<Header[]> {
        return Observable.of(this._headers);
    }

    activateItem(title: string) {
        this._headers.forEach((header: Header) => {
            if (header.title === title) {
                header.active = true;
            } else {
                header.active = false;
            }
        });
        this.headers = Observable.of(this._headers);
    }

    ngOnInit(): void {

    }

}
