import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Person, Rsvp } from './person';
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
		return this.httpClient.get<Person[]>('api/person/').pipe(
			map(response => {
				response.forEach(value => {
					if (value.attending != null && !value.attending) {
						value.attending = 'false';
					}
				});
				return response;
			})
		);
	}

	savePersons(persons: Person[]) {
		return this.httpClient.put('api/person/', JSON.stringify(persons), this.httpOptions);
	}
}
