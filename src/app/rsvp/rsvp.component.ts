import { Component, HostListener, OnInit } from '@angular/core';
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

	readonly rsvp = true;
	readonly testing = false;

	persons: Person[];
	rsvpForm = new FormGroup({
		name: new FormControl()
	});
	guestForm = new FormGroup({});
	rsvpFound = false;
	invalidRsvpCode = false;
	justSaved = false;
	validationError = false;
	validationErrorMessages: string[] = [];
	flexWidth = 650;
	flex = true;

	constructor(private headerService: HeaderService, private rsvpService: RsvpService, private formBuilder: FormBuilder) {
		this.setFlex();
		this.headerService.activateHeader(HeaderTitles.RSVP);
		this.rsvpForm = this.formBuilder.group({
			code: ['INTERCOM', Validators.required]
		});
	}

	ngOnInit() {
	}

	rsvpFormSubmit() {
		this.invalidRsvpCode = false;

		let rsvpCode = this.rsvpForm.get('code').value as string;
		rsvpCode = rsvpCode.toUpperCase();
		if (rsvpCode.length === 0) {
			this.invalidRsvpCode = true;
			return;
		}
		this.rsvpService.getPersonsByRsvpCode(rsvpCode).subscribe((persons: Person[]) => {
			this.persons = persons;
			this.persons.forEach(person => {
				this.guestForm.addControl('attending' + person.personToken, new FormControl(person.attending + ''));
				this.guestForm.addControl('dinnerOption' + person.personToken, new FormControl(person.dinnerOption));
				if (person.plusOne) {
					this.guestForm.addControl('firstName' + person.personToken, new FormControl(person.firstName));
					this.guestForm.addControl('lastName' + person.personToken, new FormControl(person.lastName));
				}

			});
			if (this.persons.length === 0) {
				this.invalidRsvpCode = true;
			} else {
				this.rsvpFound = true;
			}
		}), catchError((err => {
			console.log(err);
			return err;
		}));


	}

	guestFormSubmit() {
		this.validationError = false;
		this.validationErrorMessages = [];
		this.persons.forEach(person => {
			if (this.guestForm.get('attending' + person.personToken).value === 'true') {
				person.attending = true;
				person.dinnerOption = this.guestForm.get('dinnerOption' + person.personToken).value;
				if (null === person.dinnerOption) {
					this.validationError = true;
					this.addValidationErrorMessage('Please ensure that everyone attending has a dinner option selected.');
				}
			} else if (this.guestForm.get('attending' + person.personToken).value === 'false') {
				person.attending = false;
				person.dinnerOption = null;
			} else {
				this.validationError = true;
				this.addValidationErrorMessage('Please ensure the attending field is filled for all the guests.');
			}

			if (person.plusOne) {
				person.firstName = this.guestForm.get('firstName' + person.personToken).value;
				person.lastName = this.guestForm.get('lastName' + person.personToken).value;
				if (null == person.firstName || person.firstName.length === 0) {
					this.validationError = true;
					this.addValidationErrorMessage('Please ensure the first name field is filled for all the guests.');
				}
				if (null == person.lastName) {
					this.validationError = true;
					this.addValidationErrorMessage('Please ensure the last name field is filled for all the guests.');
				}
			}


		});

		if (!this.validationError) {
			this.rsvpService.savePersons(this.persons).subscribe(
				response => {
					this.justSaved = true;
					interval(5000).pipe(
						takeUntil(timer(5001))
					).subscribe(value => {
						this.justSaved = false;
					});
				});
		}
	}

	private addValidationErrorMessage(error: string) {
		if (!this.validationErrorMessages.includes(error)) {
			this.validationErrorMessages.push(error);
		}
	}

	private setFlex() {
		this.flex = window.innerWidth > this.flexWidth;

	}

	@HostListener('window:resize', ['$event'])
	sizeChange(event) {
		this.setFlex();
	}

}
