import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
	}

}
