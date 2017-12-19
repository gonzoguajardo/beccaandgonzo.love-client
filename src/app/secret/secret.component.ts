import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  dateOfWedding = new Date(1549753200 * 1000);

  constructor() { }

  ngOnInit() {
  }

}
