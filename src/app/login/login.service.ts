import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class LoginService implements OnInit {

	constructor(private httpClient: HttpClient) {

	}

	ngOnInit(): void {

	}

	login(request: string) {
		return this.httpClient.put('http://localhost:8090/api/user/login', request).pipe(
			map((response: string) => {
				console.log(response);
				return response;
			})
		);
	}
}
