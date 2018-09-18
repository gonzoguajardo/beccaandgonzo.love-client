import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-authenticate',
	templateUrl: './authenticate.component.html',
	styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit, OnChanges {

	uat: boolean = environment.uat;
	prod: boolean = environment.production;

	constructor() {
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
	}

}
