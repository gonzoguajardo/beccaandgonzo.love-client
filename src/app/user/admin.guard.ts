import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate, OnInit {


	constructor(private userService: UserService) {
	}

	ngOnInit(): void {

	}

	canActivate(): Observable<boolean> {
		return this.userService.isAdmin();
	}

}
