import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showHeader = ['/our-story', '/details', '/photos', '/registry', '/guest-book', '/rsvp', '/playlist', '/contact'];

  constructor(private router: Router) {
  }
}
