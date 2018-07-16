import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "./login.service";
import { catchError } from "rxjs/operators";

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

	constructor(private fb: FormBuilder, private loginService: LoginService) {
		this.createForm();
	}

	ngOnInit() {
	}

	createForm() {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		this.loginService.login(JSON.stringify(this.loginForm.value)).subscribe(() => {

			},
			catchError(err => {
				console.log(err);
				return err
			})
		);
	}
}
