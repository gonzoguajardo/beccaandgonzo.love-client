import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthenticateService implements OnInit {

	constructor(private http: HttpClient) {

	}

	ngOnInit(): void {

	}

	// authenticate(): Observable<string> {
	// 	console.log('hi2');
	// 	return this.http.get<string>('http://localhost:8080/guajardo-wedding-web/api/authenticate/').pipe(
	// 		map((response: Response) => {
	// 			return 'hi';
	// 		}),
	// 		catchError(err => {
	// 			return '';
	// 		})
	// 	);
	// }

}
