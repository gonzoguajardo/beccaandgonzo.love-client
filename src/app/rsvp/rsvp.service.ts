import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Person } from './person';

@Injectable()
export class RsvpService implements OnInit {

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};


	constructor(private httpClient: HttpClient) {

	}


	ngOnInit(): void {

	}

	getPersonsForReservationCode(code: string) {
		return this.httpClient.get<Person[]>('http://localhost:8090/api/person/search/findByRsvpCode?code=' + code).pipe(
			map((response: string) => {
				const persons = [];
				response['_embedded']['person'].forEach((personString: string) => {
					const person = new Person();
					person.personToken = personString['personToken'];
					person.firstName = personString['firstName'];
					person.lastName = personString['lastName'];
					person.rsvpCode = personString['rsvpCode'];
					person.attending = personString['attending'];
					person.dinnerOption = personString['dinnerOption'];
					persons.push(person);
				});
				return persons;
			})
		);
	}

	getAllPersons() {
		return this.httpClient.get<Person[]>('http://localhost:8090/api/person').pipe(
			map((response: string) => {
				const persons = [];
				response['_embedded']['person'].forEach((personString: string) => {
					const person = new Person();
					person.firstName = personString['firstName'];
					person.lastName = personString['lastName'];
					person.rsvpCode = personString['rsvpCode'];
					person.attending = personString['attending'];
					person.dinnerOption = personString['dinnerOption'];
					persons.push(person);
				});
				return persons;
			})
		);
	}

	savePerson(person: Person) {
		return this.httpClient.put('http://localhost:8090/api/person/' + person.personToken, JSON.stringify(person), this.httpOptions);
	}
}
