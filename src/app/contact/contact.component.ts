import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles } from '../header/header';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	constructor(headerService: HeaderService) {
		headerService.activateHeader(HeaderTitles.CONTACT);
	}

	ngOnInit() {
	}

}
