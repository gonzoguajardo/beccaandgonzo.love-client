import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles } from '../header/header';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

	constructor(headerService: HeaderService) {
		headerService.activateHeader(HeaderTitles.PHOTOS);
	}

	ngOnInit() {

	}
}
