import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Person } from './person';

@Injectable()
export class RsvpService implements OnInit {

	constructor(private httpClient: HttpClient) {

	}

	ngOnInit(): void {

	}

	getPersons() {
		return this.httpClient.get<Person[]>('http://localhost:8090/api/person').pipe(
			map((response: string) => {
				const persons = [];
				response['_embedded']['person'].forEach((personString: string) => {
					const person = new Person();
					person.firstName = personString['firstName'];
					person.lastName = personString['lastName'];
					persons.push(person);
				});
				return persons;
			})
		);
	}
}
