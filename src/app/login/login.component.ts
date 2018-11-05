import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm = new FormGroup({
		username: new FormControl(),
		password: new FormControl()
	});

	constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
		this.loginForm = this.formBuilder.group({
			username: ['admin', Validators.required],
			password: ['admin', Validators.required],
			submit: ['Login']
		});
	}

	ngOnInit() {
	}

	loginFormSubmit() {
		this.userService.setAttemptedCredentials(this.loginForm.get('username').value, this.loginForm.get('password').value);
		this.userService.isAdmin().subscribe(
			value => {
				if (value) {
					this.router.navigateByUrl('admin');
				}
			}
		);
	}

}
