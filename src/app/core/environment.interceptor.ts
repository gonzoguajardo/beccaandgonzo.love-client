import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable()
export class EnvironmentInterceptor implements HttpInterceptor {

	localUrl = 'http://localhost:8090/';
	uatUrl = 'https://api.gon.zone/';
	prodUrl = 'https://api.beccaandgonzo.love/';

	constructor(private userService: UserService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith('assets')) {
			return next.handle(request);
		}
		let newRequest;
		const authString = this.getAuthorizationString(request.url);
		if (environment.uat) {
			newRequest = request.clone({
				url: this.uatUrl + request.url,
				headers: new HttpHeaders({
					'Authorization': 'Basic ' + authString,
					'Content-Type': 'application/json'
				})
			});
		} else if (environment.production) {
			newRequest = request.clone({
				url: this.prodUrl + request.url,
				headers: new HttpHeaders({
					'Authorization': 'Basic ' + authString,
					'Content-Type': 'application/json'
				})
			});
		} else {
			newRequest = request.clone({
				url: this.localUrl + request.url,
				headers: new HttpHeaders({
					'Authorization': 'Basic ' + authString,
					'Content-Type': 'application/json'
				})
			});
		}

		return next.handle(newRequest);
	}

	private getAuthorizationString(url: string) {
		if (url.startsWith('api/user') && null != this.userService.getAttemptedCredentials()) {
			return this.userService.getAttemptedCredentials();
		} else if (null != this.userService.getCachedCredentials()) {
			return this.userService.getCachedCredentials();
		} else {
			return 'Y2xpZW50OmYyNDVpeExFWUJldlhleVZKbzVwNlhKSWc=';
		}
	}
}
