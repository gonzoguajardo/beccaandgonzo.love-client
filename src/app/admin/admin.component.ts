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

	private persons: Person[];

	tableColumns: SharkColumn[] = [
		{ header: 'First Name', property: 'firstName'},
		{ header: 'Last Name', property: 'lastName'},
		{ header: 'Attending', property: 'attending'},
		{ header: 'RSVP Code', property: 'rsvpCode'},
		{ header: 'Dinner Optoin', property: 'dinnerOption'}
	];

	constructor(private rsvpService: RsvpService) {

	}

	ngOnInit(): void {
		this.rsvpService.getAllPersons().subscribe(
			value => {
				this.persons = value;
			}
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
	}

}
