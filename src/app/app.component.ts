import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showHeader = ['/details', '/photos', '/registry', '/guest-book', '/rsvp', '/playlist'];

  constructor(private router: Router) {
  }
}
