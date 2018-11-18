import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable()
export class UserService implements OnInit {

	private attemptedCredentials: string;
	private cachedCredentials: string;

	constructor(private httpClient: HttpClient, private router: Router) {

	}


	ngOnInit(): void {

	}

	login(request: string): Observable<any> {
		return this.httpClient.post('api/login', request).pipe(
			map(response => {
				console.log(response);
				return response;
			})
		);
	}

	isAdmin(): Observable<boolean> {
		return this.httpClient.get('api/user', {responseType: 'text'}).pipe(
			map(response => {
				const user = new User(response);
				if (user.isAdmin) {
					this.cachedCredentials = this.attemptedCredentials;
				}
				return user.isAdmin;
			})
		);
	}

	setAttemptedCredentials(username: string, password: string) {
		this.attemptedCredentials = btoa(username + ':' + password);
	}

	getAttemptedCredentials(): string {
		return this.attemptedCredentials;
	}

	getCachedCredentials(): string {
		return this.cachedCredentials;
	}

}
