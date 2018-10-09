import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class EnvironmentInterceptor implements HttpInterceptor {

	localUrl = 'http://localhost:8090/';
	uatUrl = 'https://api.gon.zone/';
	prodUrl = 'https://api.beccaandgonzo.love/';

	constructor() {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith('assets')) {
			return next.handle(request);
		}
		let newRequest;
		if (request.url.startsWith('http')) {
			newRequest = request.clone({
				url: request.url,
				headers: new HttpHeaders({
					'Authorization': 'Basic dXNlcjp1c2Vy',
					'Content-Type': 'application/json'
				})
			});
		} else if (environment.uat) {
			newRequest = request.clone({
				url: this.uatUrl + request.url,
				headers: new HttpHeaders({
					'Authorization': 'Basic dXNlcjp1c2Vy',
					'Content-Type': 'application/json'
				})
			});
		} else if (environment.production) {
			newRequest = request.clone({
				url: this.prodUrl + request.url
			});
		} else {
			newRequest = request.clone({
				url: this.localUrl + request.url,
				headers: new HttpHeaders({
					'Authorization': 'Basic dXNlcjp1c2Vy',
					'Content-Type': 'application/json'
				})
			});
		}

		return next.handle(newRequest);
	}
}
