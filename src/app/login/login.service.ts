import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService implements OnInit {

	constructor(private httpClient: HttpClient) {

	}

	ngOnInit(): void {

	}

	login(request: string) {
		const headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.httpClient.put('api/user/login', request, {headers: headers}).pipe(
			map((response: string) => {
				console.log(response);
				return response;
			})
		);
	}
}
