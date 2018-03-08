import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles, Header } from '../header/header';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  headers: Header[];

  constructor(headerService: HeaderService) {
    headerService.activateItem(HeaderTitles.CONTACT);
    headerService.getHeaders().subscribe((headers: Header[]) => {
      this.headers = headers;
    });
  }

  ngOnInit() {
  }

}
