import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Header } from './header';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {

    readonly headerWidth = 505;

    router: Router;
    @Input()
    headers: Header[];

    private config = {
        closeOnCLick: true,
        offset: {
            top: 65
        }
    };
    private hamburgerMenu = false;

    constructor(router: Router) {
        this.router = router;
        this.scaleHeader();
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    private onItemSelect(item: any) {
        this.router.navigateByUrl(item['link']);
    }

    private scaleHeader() {
        this.hamburgerMenu = window.innerWidth < this.headerWidth;
    }

    @HostListener('window:resize', ['$event'])
    sizeChange(event) {
        this.scaleHeader();
    }

}
