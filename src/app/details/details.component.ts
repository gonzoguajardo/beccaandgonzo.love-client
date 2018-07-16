import { Component, HostListener, OnInit } from '@angular/core';

import { HeaderService } from '../header/header.service';
import { HeaderTitles } from '../header/header';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

	readonly PX = 'px';

	loading = true;
	dateOfWedding = new Date(1549753200 * 1000);
	googleMapHeight = '600px';
	hrMargins = false;

	constructor(headerService: HeaderService) {
		headerService.activateItem(HeaderTitles.DETAILS);
		this.scaleGoogleMap();
	}

	ngOnInit() {

	}

	load() {
		this.loading = false;
		this.scaleGoogleMap();
		this.toggleHrMargins();
	}

	scaleGoogleMap() {
		if (this.loading) {
			this.googleMapHeight = 0 + this.PX;
		} else if (window.innerWidth < 640) {
			this.googleMapHeight = (window.innerWidth * .90) + this.PX;
		} else {
			this.googleMapHeight = 600 + this.PX;
		}
	}

	toggleHrMargins() {
		if (window.innerWidth < 760) {
			this.hrMargins = true;
		} else {
			this.hrMargins = false;
		}
	}

	@HostListener('window:resize', ['$event'])
	sizeChange(event) {
		this.scaleGoogleMap();
		this.toggleHrMargins();
	}

}
