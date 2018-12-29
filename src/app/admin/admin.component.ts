import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RsvpService } from '../rsvp/rsvp.service';
import { Person } from '../rsvp/person';
import { SharkColumn } from 'shark-ng-table';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnChanges {

	persons: Person[];

	rsvpAttending = 0;
	rsvpNotAttending = 0;
	rsvpNull = 0;

	dinnerSteak = 0;
	dinnerFish = 0;
	dinnerVeg = 0;
	dinnerChild = 0;
	dinnerNull = 0;

	tableColumns: SharkColumn[] = [
		{header: 'First Name', property: 'firstName'},
		{header: 'Last Name', property: 'lastName'},
		{header: 'Attending', property: 'attending'},
		{header: 'RSVP Code', property: 'rsvpCode'},
		{header: 'Dinner Option', property: 'dinnerOption'},
		{header: 'Plus One', property: 'plusOne'},
		{header: 'Last Updated', property: 'lastUpdated'},
	];

	constructor(private rsvpService: RsvpService) {

	}

	ngOnInit(): void {
		this.rsvpService.getAllPersons().subscribe(
			value => {
				this.persons = value;
				this.persons.forEach((person: Person) => {
					if (null == person.attending) {
						this.rsvpNull++;
					} else if (person.attending === 'false') {
						this.rsvpNotAttending++;
					} else {
						this.rsvpAttending++;
					}

					if (null == person.dinnerOption) {
						this.dinnerNull++;
					} else if (person.dinnerOption === 'STEAK') {
						this.dinnerSteak++;
					} else if (person.dinnerOption === 'FISH') {
						this.dinnerFish++;
					} else if (person.dinnerOption === 'VEG') {
						this.dinnerVeg++;
					} else if (person.dinnerOption === 'CHILD') {
						this.dinnerChild++;
					} else {
						this.dinnerNull++;
					}
				});
			}
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
	}

}
