import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  loading = true;
  googleMapSource = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDKdrs1gTYdi-b5IBRqJdnCpguIZ_SF8y8'
  // + '&origin=Miami+International+Airport&destination=Briza+on+the+Bay+1717+N+Bayshore+Dr+Miami+FL+33132';
  + '&q=Space+Needle+Seattle+WA';

  constructor() { }

  ngOnInit() {

  }

  load() {
    this.loading = false;
  }

}
