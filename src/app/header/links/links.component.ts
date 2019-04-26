import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../header.service';
import { Header } from '../header';

@Component({
	selector: 'app-links',
	templateUrl: './links.component.html',
	styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

	@Input()
	showHome: boolean;

	headers: Header[];

	constructor(headerService: HeaderService) {
		headerService.getHeaders().subscribe((headers: Header[]) => {
			this.headers = headers;
		});
	}

	ngOnInit() {
	}

}
