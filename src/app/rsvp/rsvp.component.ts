import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles } from '../header/header';
import { RsvpService } from './rsvp.service';
import { catchError } from 'rxjs/operators';
import { Person } from './person';

@Component({
	selector: 'app-rsvp',
	templateUrl: './rsvp.component.html',
	styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

	persons: Person[];

	constructor(private headerService: HeaderService, private rsvpService: RsvpService) {
		this.headerService.activateHeader(HeaderTitles.RSVP);
		this.rsvpService.getPersons().subscribe((persons: Person[]) => {
			this.persons = persons;
		}, catchError((err => {
			console.log(err);
			return err;
		})));
	}

	ngOnInit() {
	}

}
