import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles, Header } from '../header/header';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.css'],
})
export class OurStoryComponent implements OnInit {

  headers: Header[];

  constructor(headerService: HeaderService) {
    headerService.activateItem(HeaderTitles.OUR_STORY);
    headerService.getHeaders().subscribe((headers: Header[]) => {
      this.headers = headers;
    });
  }

  ngOnInit() {
  }

}
