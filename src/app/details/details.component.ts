import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  readonly PX = 'px';

  loading = true;
  dateOfWedding = new Date(1549753200 * 1000);
  mobHeight: any;
  mobWidth: any;
  googleMapHeight = '600px';

  constructor() {
    this.scaleGoogleMap();
  }

  ngOnInit() {

  }

  load() {
    this.loading = false;
    this.scaleGoogleMap();
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

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    this.scaleGoogleMap();
  }

}
