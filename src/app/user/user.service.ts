import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService implements OnInit {

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};


	constructor(private httpClient: HttpClient) {

	}


	ngOnInit(): void {

	}

	isAdmin(): Observable<boolean> {
		return this.httpClient.get('api/user').pipe(
			map(response => {
				return new User(response).isAdmin;
			})
		);
	}


}
