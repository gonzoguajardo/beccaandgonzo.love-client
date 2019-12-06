import { Injectable } from '@angular/core';
import { Header, HeaderLinks, HeaderTitles } from './header';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class HeaderService {

	private menuOpen: boolean;
	menuOpenChange: Subject<boolean> = new Subject<boolean>();
	private readonly styleTag: HTMLStyleElement;

	private _headers: Header[] = [];
	private headers: Observable<Header[]>;

	constructor() {
		this.menuOpen = false;
		this.menuOpenChange.subscribe((isMenuOpen: boolean) => {
			this.menuOpen = isMenuOpen;
		});
		this.styleTag = this.buildStyleElement();
		Object.keys(HeaderTitles).forEach(header => {
			this._headers.push({'title': HeaderTitles[header], 'link': HeaderLinks[header], 'active': false});
		});
	}

	getHeaders(): Observable<Header[]> {
		return of(this._headers);
	}

	activateHeader(title: string) {
		this._headers.forEach((header: Header) => {
			if (header.title === title) {
				header.active = true;
			} else {
				header.active = false;
			}
		});
		this.headers = of(this._headers);
	}

	toggleMenuOpen() {
		if (!this.menuOpen) {
			document.body.appendChild(this.styleTag);
		} else {
			document.body.removeChild(this.styleTag);
		}
		this.menuOpenChange.next(!this.menuOpen);
	}

	isMenuOpen(): boolean {
		return this.menuOpen;
	}

	private buildStyleElement(): HTMLStyleElement {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.setAttribute('data-debug', 'Injected by WindowScrollingService service.');
		style.textContent = `
            body {
                overflow: hidden !important ;
                height: 100%;
                width: 100%;
                position: fixed;
            }
        `;
		return (style);
	}

}
