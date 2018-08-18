import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles } from '../header/header';
import { RsvpService } from './rsvp.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { Person } from './person';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, timer } from 'rxjs';

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
	guestForm = new FormGroup({});
	rsvpFound = false;
	justSaved = false;
	validationError = false;

	// table variables
	allPersons: Person[];

	constructor(private headerService: HeaderService, private rsvpService: RsvpService, private formBuilder: FormBuilder) {
		this.headerService.activateHeader(HeaderTitles.RSVP);
		this.rsvpForm = this.formBuilder.group({
			code: ['EBENEZER', Validators.required]
		});

		this.populateAllPersonTable();
	}

	ngOnInit() {
	}

	rsvpFormSubmit() {
		this.rsvpService.getPersonsForReservationCode(this.rsvpForm.get('code').value).subscribe((persons: Person[]) => {
			this.persons = persons;
			this.persons.forEach(person => {
				this.guestForm.addControl('attending' + person.personToken, new FormControl(person.attending + ''));
				this.guestForm.addControl('dinnerOption' + person.personToken, new FormControl(person.dinnerOption));
			});
			this.rsvpFound = true;
		}), catchError((err => {
			console.log(err);
			return err;
		}));
	}

	guestFormSubmit() {
		this.validationError = false;
		this.persons.forEach(person => {
			if (this.guestForm.get('attending' + person.personToken).value === 'true') {
				person.attending = true;
				person.dinnerOption = this.guestForm.get('dinnerOption' + person.personToken).value;
				if (null === person.dinnerOption) {
					this.validationError = true;
				}
			} else if (this.guestForm.get('attending' + person.personToken).value === 'false') {
				person.attending = false;
				person.dinnerOption = null;
			}

			if (!this.validationError) {
				this.rsvpService.savePerson(person).subscribe(
					response => {
					}, catchError(err => {
						console.log(err);
						return err;
					}));
				this.populateAllPersonTable();
			}
		});
		this.justSaved = true;
		interval(5000).pipe(
			takeUntil(timer(5001))
		).subscribe(value => {
			this.justSaved = false;
		});
	}

	private populateAllPersonTable() {
		this.rsvpService.getAllPersons().subscribe((persons: Person[]) => {
			this.allPersons = persons;
		}, catchError((err => {
			console.log(err);
			return err;
		})));
	}

}
