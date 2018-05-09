import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from './header';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {

    readonly headerWidth = 515;

    private router: Router;
    @Input()
    headers: Header[];

    config = {
        closeOnCLick: true,
        offset: {
            top: 65
        }
    };
    hamburgerMenu = false;

    constructor(router: Router) {
        this.router = router;
        this.scaleHeader();
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    onItemSelect(item: any) {
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
