import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class EnvironmentInterceptor implements HttpInterceptor {

	localUrl = 'http://localhost:8090/';
	uatUrl = 'https://api.gon.zone/';

	constructor() {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith('assets')) {
			return next.handle(request);
		}
		let newRequest;
		if (environment.uat) {
			newRequest = request.clone({
				url: this.uatUrl + request.url
			});
		} else if (environment.production) {
			newRequest = request.clone({});
		} else {
			newRequest = request.clone({
				url: this.localUrl + request.url
			});
		}

		return next.handle(newRequest);
	}
}
