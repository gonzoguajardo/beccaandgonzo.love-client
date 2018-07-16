import { Component, OnInit } from '@angular/core';
import { HeaderService } from "../header/header.service";
import { HeaderTitles } from "../header/header";

@Component({
	selector: 'app-rsvp',
	templateUrl: './rsvp.component.html',
	styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

	constructor(private headerService: HeaderService) {
		this.headerService.activateItem(HeaderTitles.RSVP);
	}

	ngOnInit() {
	}

}
