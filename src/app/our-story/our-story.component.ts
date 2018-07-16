import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles } from '../header/header';

@Component({
	selector: 'app-our-story',
	templateUrl: './our-story.component.html',
	styleUrls: ['./our-story.component.css'],
})
export class OurStoryComponent implements OnInit {

	constructor(headerService: HeaderService) {
		headerService.activateItem(HeaderTitles.OUR_STORY);
	}

	ngOnInit() {
	}

}
