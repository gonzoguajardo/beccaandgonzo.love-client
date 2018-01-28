import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  loading = true;
  dateOfWedding = new Date(1549753200 * 1000);
  mobHeight: any;
  mobWidth: any;
  googleMapHeight = '600px';

  constructor() {
    this.changeGoogleMapWidth();
  }

  ngOnInit() {

  }

  load() {
    this.loading = false;
  }

  changeGoogleMapWidth() {
    if (window.innerWidth < 640) {
      this.googleMapHeight = (window.innerWidth * .90) + 'px';
    } else {
      this.googleMapHeight = 600 + 'px';
    }
  }

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    this.changeGoogleMapWidth();
  }

}
