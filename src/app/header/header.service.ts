import { Injectable, OnInit } from '@angular/core';
import { Header, HeaderLinks, HeaderTitles } from './header';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class HeaderService implements OnInit {

	// This sets the order of the links
	// When adding something here make sure to add css class and update html
	private _headers: Header[] = [
		{'title': HeaderTitles.HOME, 'link': HeaderLinks.HOME, 'active': false, 'viewing': false},
		{'title': HeaderTitles.OUR_STORY, 'link': HeaderLinks.OUR_STORY, 'active': false, 'viewing': false},
		{'title': HeaderTitles.DETAILS, 'link': HeaderLinks.DETAILS, 'active': false, 'viewing': false},
		{'title': HeaderTitles.RSVP, 'link': HeaderLinks.RSVP, 'active': false, 'viewing': false},
		{'title': HeaderTitles.PHOTOS, 'link': HeaderLinks.PHOTOS, 'active': false, 'viewing': false},
		{'title': HeaderTitles.REGISTRY, 'link': HeaderLinks.REGISTRY, 'active': false, 'viewing': false},
		{'title': HeaderTitles.CONTACT, 'link': HeaderLinks.CONTACT, 'active': false, 'viewing': false},
	];
	private headers: Observable<Header[]>;

	constructor() {

	}

	getHeaders(): Observable<Header[]> {
		return of(this._headers);
	}

	activateItem(title: string) {
		this._headers.forEach((header: Header) => {
			if (header.title === title) {
				header.viewing = true;
			} else {
				header.viewing = false;
			}
		});
		this.headers = of(this._headers);
	}

	ngOnInit(): void {

	}

}
