import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  loading = true;
  googleMapSource = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDKdrs1gTYdi-b5IBRqJdnCpguIZ_SF8y8'
    + '&q=Space+Needle+Seattle+WA';
  dateOfWedding = new Date(1549753200 * 1000);

  constructor() { }

  ngOnInit() {

  }

  load() {
    this.loading = false;
  }

}
