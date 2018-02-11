import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  hrMargins = false;

  constructor() {
    this.toggleHrMargins();
  }

  ngOnInit() {
  }

  toggleHrMargins() {
    if (window.innerWidth < 660) {
      this.hrMargins = true;
    } else {
      this.hrMargins = false;
    }
  }


  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    this.toggleHrMargins();
  }
}
