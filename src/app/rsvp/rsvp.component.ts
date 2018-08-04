import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles } from '../header/header';
import { RsvpService } from './rsvp.service';
import { catchError } from 'rxjs/operators';
import { Person } from './person';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-rsvp',
	templateUrl: './rsvp.component.html',
	styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

	persons: Person[];
	rsvpForm = new FormGroup({
		name: new FormControl()
	});
	allPersons: Person[];

	constructor(private headerService: HeaderService, private rsvpService: RsvpService, private formBuilder: FormBuilder) {
		this.headerService.activateHeader(HeaderTitles.RSVP);
		this.rsvpForm = this.formBuilder.group({
			code: ['EBENEZER', Validators.required]
		});

		this.rsvpService.getAllPersons().subscribe((persons: Person[]) => {
			this.allPersons = persons;
		}, catchError((err => {
			console.log(err);
			return err;
		})));
	}

	ngOnInit() {
	}

	rsvpFormSubmit() {
		this.rsvpService.getPersonsForReservationCode(this.rsvpForm.get('code').value).subscribe((persons: Person[]) => {
			this.persons = persons;
		}), catchError((err => {
			console.log(err);
			return err;
		}));
	}
}
