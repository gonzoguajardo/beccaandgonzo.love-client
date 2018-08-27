import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Person, Rsvp } from './person';
import { Observable, of, throwError } from 'rxjs';

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

	getPersonsAndRsvpForRsvpCode(rsvpCode: string): Observable<Person[]> {
		return this.getRsvpForRsvpCode(rsvpCode).pipe(
			mergeMap(response => {
				const rsvp = response as Rsvp;
				return this.getPersonsForRsvp(rsvp);
			}), catchError(err => {
				return of(null);
			})
		);
	}


	getAllPersons(): Observable<Person[]> {
		return this.httpClient.get<Person[]>('http://localhost:8090/api/person').pipe(
			map((response: string) => {
				const persons = [];
				response['_embedded']['person'].forEach((personObject: object) => {
					const person = personObject as Person;
					this.getRsvpWithLink(personObject['_links']['rsvp'].href).subscribe((rsvp: Rsvp) => {
						person.rsvp = rsvp;
					}, (err) => {
						person.rsvp = null;
					});
					persons.push(person);
				});
				return persons;
			})
		);
	}

	getPersonsForRsvp(rsvp: Rsvp): Observable<Person[]> {
		return this.httpClient.get<Person[]>('http://localhost:8090/api/person/search/findByRsvpRsvpCode?rsvpCode=' + rsvp.rsvpCode).pipe(
			map((response: string) => {
				const persons = [];
				response['_embedded']['person'].forEach((personObject: object) => {
					const person = personObject as Person;
					person.rsvp = rsvp;
					persons.push(person);
				});
				return persons;
			})
		);
	}

	getRsvpForRsvpCode(rsvpCode: string): Observable<Rsvp> {
		return this.httpClient.get<Rsvp>('http://localhost:8090/api/rsvp/' + rsvpCode).pipe(
			map(response => {
				return response as Rsvp;
			}), catchError(err => {
				return of(null);
			})
		);
	}

	savePerson(person: Person) {
		return this.httpClient.put('http://localhost:8090/api/person/' + person.personToken, JSON.stringify(person), this.httpOptions);
	}

	saveRsvp(rsvp: Rsvp) {
		return this.httpClient.put('http://localhost:8090/api/person/' + rsvp.rsvpCode, JSON.stringify(rsvp), this.httpOptions);
	}

	private getRsvpWithLink(link: string): Observable<Rsvp> {
		return this.httpClient.get<Rsvp>(link).pipe(
			map((response: object) => {
				return response as Rsvp;
			}), catchError(err => {
				return throwError(err);
			})
		);
	}
}
