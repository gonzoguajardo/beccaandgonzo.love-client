import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HeaderTitles, Header } from '../header/header';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  readonly bedBathLink = 'https://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?pwsToken=&eventType=Wedding&inventoryCallEnabled=true&registryId=545458868&pwsurl=';

  headers: Header[];

  constructor(headerService: HeaderService) {
    headerService.activateItem(HeaderTitles.REGISTRY);
    headerService.getHeaders().subscribe((headers: Header[]) => {
      this.headers = headers;
    });
  }

  ngOnInit() {
  }

  bedBatchClick() {
    window.open(this.bedBathLink);
  }

}
