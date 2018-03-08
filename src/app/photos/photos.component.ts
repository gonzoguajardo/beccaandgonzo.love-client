import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles, Header } from '../header/header';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  headers: Header[];

  constructor(headerService: HeaderService) {
    headerService.activateItem(HeaderTitles.PHOTOS);
    headerService.getHeaders().subscribe((headers: Header[]) => {
      this.headers = headers;
    });
  }

  ngOnInit() {

  }
}
