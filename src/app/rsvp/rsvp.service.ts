import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Person } from './person';
import { Observable } from 'rxjs';

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

	getPersonsByRsvpCode(rsvpCode: string): Observable<Person[]> {
		return this.httpClient.get<Person[]>('api/person/' + rsvpCode).pipe(
			map(response => {
				return response;
			})
		);
	}


	getAllPersons(): Observable<Person[]> {
		return this.httpClient.get<string>('api/person').pipe(
			map((response: string) => {
				const persons = [];
				response['_embedded']['person'].forEach((personObject: object) => {
					const person = personObject as Person;
					// this.getRsvpWithLink(personObject['_links']['rsvp'].href).subscribe((rsvp: Rsvp) => {
					// 	person.rsvp = rsvp;
					// }, (err) => {
					// 	person.rsvp = null;
					// });
					persons.push(person);
				});
				return persons;
			})
		);
	}

	savePerson(person: Person) {
		return this.httpClient.put('api/person/', JSON.stringify(person), this.httpOptions);
	}
}
