import { Component } from '@angular/core';
import { HeaderService } from './header/header.service';
import { Header } from './header/header';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	showHeader = ['/our-story', '/details', '/photos', '/registry', '/guest-book', '/rsvp', '/playlist', '/contact', '/login'];
	headers: Header[];
	menuOpen: boolean;

	constructor(public router: Router, public headerService: HeaderService) {
		headerService.getHeaders().subscribe((headers: Header[]) => {
			this.headers = headers;
		});
		headerService.menuOpenChange.subscribe((menuOpen: boolean) => {
			this.menuOpen = menuOpen;
		});
	}
}
