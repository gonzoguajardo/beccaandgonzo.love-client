import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate, OnInit {


	constructor(private userService: UserService, private router: Router) {
	}

	ngOnInit(): void {

	}

	canActivate(): Observable<boolean> {
		return this.userService.isAdmin().pipe(
			map(value => {
				if (value) {
					return true;
				} else {
					this.router.navigateByUrl('login');
				}
			})
		);
	}

}
